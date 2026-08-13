# Sanmati chat API deployment

This service keeps the Gemini API key on Render and exposes only a chat endpoint to the website.

## Deploy on Render

1. In Render, select **New > Blueprint** and connect this GitHub repository.
2. Render detects `render.yaml`. Create the `sanmati-chat-api` service.
3. In the service's **Environment** settings, set `GEMINI_API_KEY` to a newly generated, restricted Gemini key. Do not commit it to this repository.
4. Deploy, then copy the public URL Render gives the service, for example `https://sanmati-chat-api.onrender.com`.
5. Confirm `https://YOUR-RENDER-URL/health` returns `{"status":"ok"}`.

## Connect Vercel

In Vercel, open the frontend project, then **Settings > Environment Variables** and add:

```text
VITE_CHAT_API_URL=https://YOUR-RENDER-URL
```

Apply it to Production, Preview, and Development as needed, then redeploy Vercel.

`VITE_CHAT_API_URL` is public by design; `GEMINI_API_KEY` must exist only on Render. The API accepts requests only from the configured website domains.
