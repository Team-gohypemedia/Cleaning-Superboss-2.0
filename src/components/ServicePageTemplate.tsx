"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Phone, ArrowRight, Star, ChevronDown, CheckCircle2 } from "lucide-react";
import TrustBadges from "@/components/TrustBadges";
import PricingTable, { PricingRow } from "@/components/PricingTable";
import ServiceComparisonTable from "@/components/ServiceComparisonTable";
import Footer from "@/components/Footer";
import { useCountry } from "@/context/CountryContext";

export interface ServiceIncludedItem {
  category: string;
  tasks: string[];
}

export interface ServiceFaq {
  q: string;
  a: string;
}

interface ServicePageTemplateProps {
  serviceTitle: string;
  badge: string;
  tagline: string;
  description: string;
  heroImage: string;
  startingPrice: string;
  included: ServiceIncludedItem[];
  pricingRows: PricingRow[];
  hourlyRate?: string;
  faqs: ServiceFaq[];
  testimonial: {
    quote: string;
    author: string;
    location: string;
    rating: number;
  };
}

export default function ServicePageTemplate({
  serviceTitle,
  badge,
  tagline,
  description,
  heroImage,
  startingPrice,
  included,
  pricingRows,
  hourlyRate,
  faqs,
  testimonial,
}: ServicePageTemplateProps) {
  const { countryConfig } = useCountry();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-[#08295b] pt-20 sm:pt-24">
      {/* Top Banner */}
      <div className="w-full bg-[#0d47a1] text-white text-xs py-2 px-4 text-center font-medium">
        <span>🎉 Get {countryConfig.currencySymbol}30 Off Your First Clean — Use Code <strong>CLEAN30</strong></span>
        <span className="mx-2 opacity-40">|</span>
        <a href={`tel:${countryConfig.phone}`} className="underline font-bold hover:text-[#2196f3]">
          Call / SMS {countryConfig.formattedPhone}
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3.5 py-1 rounded-full border border-[#d0e4f7]">
              {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#08295b] tracking-tight leading-[1.1]">
              {tagline}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#08295b]/75 max-w-xl font-normal leading-relaxed">
              {description}
            </p>

            {/* Price pill & CTAs */}
            <div className="pt-2 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-[#08295b]/60 uppercase">Starting From</span>
                <span className="text-3xl sm:text-4xl font-black text-[#0d47a1]">{startingPrice}</span>
                <span className="text-xs font-semibold text-[#08295b]/60">{countryConfig.currency} / clean</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 pt-2">
                <a
                  href="/book"
                  className="px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider shadow-md sm:shadow-xl shadow-[#0d47a1]/25 transition-all active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 text-center"
                >
                  <span className="truncate">Book Clean</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </a>
                <a
                  href={`tel:${countryConfig.phone}`}
                  className="px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white border border-[#d0e4f7] text-[#08295b] hover:bg-[#e3f2fd] text-[11px] sm:text-xs md:text-sm font-bold tracking-wide transition-all shadow-xs flex items-center justify-center gap-1.5 sm:gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0d47a1] shrink-0" />
                  <span className="truncate">Call {countryConfig.formattedPhone}</span>
                </a>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#08295b]/70 border-t border-[#d0e4f7]">
              <div className="flex items-center gap-1.5 font-semibold">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>5.0 / 5.0 Rating</span>
              </div>
              <span className="text-[#d0e4f7] font-bold select-none">•</span>
              <div className="font-semibold text-[#0d47a1]">Police Checked</div>
              <span className="text-[#d0e4f7] font-bold select-none">•</span>
              <div className="font-semibold text-[#0d47a1]">Fully Insured</div>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#d0e4f7] w-full h-[380px] sm:h-[460px] lg:h-[540px] xl:h-[580px] bg-white group">
              <img
                src={heroImage}
                alt={serviceTitle}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08295b]/85 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2196f3] px-3 py-1 rounded-full shadow-sm">
                    Spotless Guarantee
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">{serviceTitle}</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges Strip */}
      <TrustBadges />

      {/* What's Included Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7]">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3 py-1 rounded-full border border-[#d0e4f7]">
              Checklist Standard
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08295b]">
              What&apos;s Included in Your Clean
            </h2>
            <p className="text-xs sm:text-sm text-[#08295b]/70">
              Our cleaners strictly follow standardized hotel-grade checklists to ensure no spot is missed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((col, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#d0e4f7] shadow-lg space-y-4"
              >
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#d0e4f7]">
                  <CheckCircle2 className="w-4 h-4 text-[#2196f3]" />
                  <h3 className="text-base font-bold text-[#08295b]">{col.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {col.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#08295b]/80">
                      <Check className="w-4 h-4 text-[#2196f3] shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Component */}
      <PricingTable
        title={`${serviceTitle} Pricing`}
        subtitle="Upfront pricing by property size or duration. No surprises, no hidden extras."
        rows={pricingRows}
        hourlyRate={hourlyRate}
      />

      {/* Comprehensive Checklist Comparison Table based on CleanerCo Reference */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 bg-white border-y border-[#d0e4f7]">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3 py-1 rounded-full border border-[#d0e4f7]">
              Service Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08295b]">
              Compare What&apos;s Included
            </h2>
            <p className="text-xs sm:text-sm text-[#08295b]/70">
              See how {serviceTitle} compares across all rooms, surfaces and fixtures.
            </p>
          </div>

          <ServiceComparisonTable />
        </div>
      </section>

      {/* Testimonial Quote Spotlight */}
      <section className="py-12 sm:py-16 bg-[#08295b] text-white px-4 sm:px-6 border-y border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex justify-center text-amber-400 gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold italic leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="pt-2">
            <div className="font-bold text-sm sm:text-base">{testimonial.author}</div>
            <div className="text-xs text-white/60">{testimonial.location}</div>
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3 py-1 rounded-full border border-[#d0e4f7]">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08295b]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-[#d0e4f7] border-y border-[#d0e4f7]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-[#08295b] hover:text-[#0d47a1]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[#2196f3] transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-[#08295b]/70 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#e3f2fd]/60">
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#d0e4f7] shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#08295b]">
            Ready for a Spotless {serviceTitle}?
          </h2>
          <p className="text-sm sm:text-base text-[#08295b]/70 max-w-lg mx-auto">
            Book online in 60 seconds. Our vetted, police-checked cleaners are ready across all major Australian cities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="/book"
              className="px-8 py-4 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#0d47a1]/25 transition-all"
            >
              Book Now Online
            </a>
            <a
              href="tel:+61460849843"
              className="px-7 py-4 rounded-full bg-white border border-[#d0e4f7] text-[#08295b] hover:bg-[#e3f2fd] text-xs sm:text-sm font-bold tracking-wide transition-all"
            >
              Call +61 460 849 843
            </a>
          </div>
        </div>
      </section>

      {/* Shared Global Footer (with bottom padding for mobile sticky bar) */}
      <div className="pb-16 md:pb-0">
        <Footer />
      </div>
    </div>
  );
}
