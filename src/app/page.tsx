import React from "react";
// Dedicated End-of-Lease Cleaning Services Page component (commented out as requested)
// import BondPageContent from "@/components/BondPageContent";
import type { Metadata } from "next";

import HeroMachineScroll from "@/components/HeroMachineScroll";
import RibbonSection from "@/components/RibbonSection";
import InstantQuoteHero from "@/components/InstantQuoteHero";
import LogoGrid from "@/components/LogoGrid";
import MasterBrand from "@/components/MasterBrand";
import ServicesHoverModalSection from "@/components/ServicesHoverModalSection";
import ShowcaseBentoGallery from "@/components/ShowcaseBentoGallery";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import TestimonialBanner from "@/components/TestimonialBanner";
import AustralianTrustAndAreas from "@/components/AustralianTrustAndAreas";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cleaning Superboss | Professional Home & Commercial Cleaning Australia",
  description:
    "Professional cleaning services across Australia. Home cleaning, deep cleaning, bond cleaning, Airbnb turnovers & commercial cleaning. Police checked, insured cleaners. Book online in 60 seconds.",
};

export default function Home() {
  return (
    <main>
      {/* 
      ========================================================
      BOND PAGE CONTENT (COMMENTED OUT AS REQUESTED)
      ========================================================
      <BondPageContent /> 
      */}

      {/* Main Home Page Sections */}
      <div className="relative bg-[#f8fbfe] text-[#08295b] min-h-screen overflow-x-clip">
        {/* Hero Machine Scroll Sequence */}
        <HeroMachineScroll />

        {/* Hero End Sentinel Marker */}
        <div id="hero-end-marker" className="w-full h-0 pointer-events-none" />

        {/* Infinite Ribbon Dual Marquee */}
        <RibbonSection />

        {/* Hero Quoting Engine: Get Your Price in Minutes */}
        <InstantQuoteHero />

        {/* Built by the Industry Logo Grid */}
        <LogoGrid />

        {/* The Authority Engine Sticky Scroll Section */}
        <MasterBrand />

        {/* Services with Animated Hover Modal */}
        <ServicesHoverModalSection />

        {/* Before & After Photo Transformations */}
        <BeforeAfterShowcase />

        {/* Australian Credentials, ABN, Insurance & Multiple Service Locations */}
        <AustralianTrustAndAreas />

        {/* Production Output Bento Grid Gallery */}
        <ShowcaseBentoGallery />

        {/* Testimonial Banner Section */}
        <TestimonialBanner />

        {/* Contact Form Section */}
        <ContactSection />

        {/* Interactive Tabbed FAQ Section */}
        <FaqSection />

        {/* Footer with Parallax CTA */}
        <Footer />
      </div>
    </main>
  );
}

