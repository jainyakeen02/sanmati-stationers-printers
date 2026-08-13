import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';

const required = ['GEMINI_API_KEY'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing required environment variable: ${missing.join(', ')}`);
}

const defaultAllowedOrigins = [
  'https://sanmatistationersandprinters.in',
  'https://www.sanmatistationersandprinters.in',
];

const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Always retain the production storefronts. This prevents a malformed Render
// setting from taking the chat API offline for the website.
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  methods: ['POST'],
  optionsSuccessStatus: 204,
}));
app.use(express.json({ limit: '16kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false }));

app.get('/health', (_request, response) => response.json({ status: 'ok' }));

app.post('/api/chat', async (request, response) => {
  const { message, history = [] } = request.body || {};
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return response.status(400).json({ error: 'Message must contain up to 2,000 characters.' });
  }
  if (!Array.isArray(history) || history.length > 10) {
    return response.status(400).json({ error: 'Invalid chat history.' });
  }

  const sanitizedHistory = history
    .filter((item) => item && ['user', 'bot'].includes(item.role) && typeof item.content === 'string')
    .map((item) => `${item.role === 'bot' ? 'Assistant' : 'Customer'}: ${item.content.slice(0, 2000)}`);

  const instructions = `You are a friendly, concise customer-support assistant for Sanmati Stationers & Printers in Peeth, Dungarpur, Rajasthan. This is a promotional site, not an e-commerce store. For exact prices or unavailable details, direct customers to phone +91 9982542202, WhatsApp, or pareshsanmati@gmail.com. Never invent prices, stock, policies, or contact details.`;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: `${instructions}\n\nConversation:\n${sanitizedHistory.join('\n')}\nCustomer: ${message.trim()}\nAssistant:`,
    });
    const reply = result.text?.trim();
    if (!reply) throw new Error('Gemini returned an empty reply.');
    return response.json({ reply });
  } catch (error) {
    console.error('Gemini request failed:', error instanceof Error ? error.message : 'Unknown error');
    return response.status(502).json({ error: 'The chat service is temporarily unavailable. Please try again later.' });
  }
});

app.use((error, _request, response, _next) => {
  if (error.message === 'Origin is not allowed by CORS') {
    return response.status(403).json({ error: 'Origin is not allowed.' });
  }
  return response.status(500).json({ error: 'Unexpected server error.' });
});

const port = Number(process.env.PORT) || 10000;
app.listen(port, '0.0.0.0', () => console.log(`Chat API listening on port ${port}`));
