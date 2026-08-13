import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Announcement from "./components/Announcement/Announcement";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import VisitUs from "./components/VisitUs/VisitUs";
import {
  FAQ,
  PrintingPortfolio,
  WhyChooseUs,
} from "./components/HomeSections/HomeSections";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./components/NotFound/NotFound";
import Chatbot from "./components/Chatbot";

const SchoolStationery = lazy(() =>
  import("./components/SchoolStationery/SchoolStationery")
);
const OfficeSupplies = lazy(() =>
  import("./components/OfficeSupplies/OfficeSupplies")
);
const PrintingServices = lazy(() =>
  import("./components/PrintingServices/PrintingServices")
);
const Furniture = lazy(() =>
  import("./components/Furniture/Furniture")
);

function WebsiteShell({ children, isChatOpen, onChatToggle }) {
  return (
    <>
      <Announcement />
      <Header />
      {children}
      <VisitUs />
      <Footer />
      <FloatingActions isChatOpen={isChatOpen} onChatToggle={onChatToggle} />
    </>
  );
}

function Home({ isChatOpen, onChatToggle }) {
  return (
    <WebsiteShell isChatOpen={isChatOpen} onChatToggle={onChatToggle}>
      <main id="main-content">
        <Hero />
        <Services />
        <PrintingPortfolio />
        <WhyChooseUs />
        <FAQ />
        <About />
        <Contact />
      </main>
    </WebsiteShell>
  );
}

function ServicePage({ children, isChatOpen, onChatToggle }) {
  return (
    <WebsiteShell isChatOpen={isChatOpen} onChatToggle={onChatToggle}>
      <main id="main-content">{children}</main>
    </WebsiteShell>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <ScrollToTop />
      <Chatbot isOpen={isChatOpen} onToggle={toggleChat} />

      <Suspense fallback={<div className="container section">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home isChatOpen={isChatOpen} onChatToggle={toggleChat} />} />

          <Route
            path="/school-stationery"
            element={
              <ServicePage isChatOpen={isChatOpen} onChatToggle={toggleChat}>
                <SchoolStationery />
              </ServicePage>
            }
          />

          <Route
            path="/office-supplies"
            element={
              <ServicePage isChatOpen={isChatOpen} onChatToggle={toggleChat}>
                <OfficeSupplies />
              </ServicePage>
            }
          />

          <Route
            path="/printing-services"
            element={
              <ServicePage isChatOpen={isChatOpen} onChatToggle={toggleChat}>
                <PrintingServices />
              </ServicePage>
            }
          />

          <Route
            path="/furniture"
            element={
              <ServicePage isChatOpen={isChatOpen} onChatToggle={toggleChat}>
                <Furniture />
              </ServicePage>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;