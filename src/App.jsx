import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import BackToTop from "./Components/BackToTop";
import WhyChoose from "./Components/WhyChoose";
import Work from "./Components/Work";
import Process from "./Components/Process";
import Review from "./Components/Review";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

import Admin from "./pages/Admin";

import ScrollProgress from "./Components/ScrollProgress";
import CustomCursor from "./Components/CustomCursor";

const Home = () => {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <Work />
        <Process />
        <Review />
        <Contact />

      </main>

      <Footer />

      <BackToTop />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      {/* Global Custom Cursor */}
      <CustomCursor />

      <Routes>
        {/* Public Website */}
        <Route path="/" element={<Home />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
