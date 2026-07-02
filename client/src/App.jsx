import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Announcement from "./components/Announcement/Announcement";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import {
  FAQ,
  Gallery,
  GoogleMap,
  PrintingPortfolio,
  ProductShowcase,
  Testimonials,
  WhyChooseUs,
} from "./components/HomeSections/HomeSections";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./components/NotFound/NotFound";

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

function WebsiteShell({ children }) {
  return (
    <>
      <Announcement />
      <Header />
      {children}
      <Footer />
      <FloatingActions />
    </>
  );
}

function Home() {
  return (
    <WebsiteShell>
      <main id="main-content">
        <Hero />
        <Services />
        <ProductShowcase />
        <PrintingPortfolio />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <About />
        <Contact />
        <GoogleMap />
      </main>
    </WebsiteShell>
  );
}

function ServicePage({ children }) {
  return (
    <WebsiteShell>
      <main id="main-content">{children}</main>
    </WebsiteShell>
  );
}

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <ScrollToTop />

      <Suspense fallback={<div className="container section">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/school-stationery"
            element={
              <ServicePage>
                <SchoolStationery />
              </ServicePage>
            }
          />

          <Route
            path="/office-supplies"
            element={
              <ServicePage>
                <OfficeSupplies />
              </ServicePage>
            }
          />

          <Route
            path="/printing-services"
            element={
              <ServicePage>
                <PrintingServices />
              </ServicePage>
            }
          />

          <Route
            path="/furniture"
            element={
              <ServicePage>
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