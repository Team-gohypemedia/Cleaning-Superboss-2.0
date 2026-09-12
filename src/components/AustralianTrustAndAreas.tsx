"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  CheckCircle2,
  FileCheck,
  Building2,
  Globe2,
} from "lucide-react";
import { useCountry } from "@/context/CountryContext";

interface AustralianCityHub {
  id: string;
  region: string;
  badge: string;
  phone: string;
  suburbs: string[];
  ctaText: string;
  slug: string;
}

interface InternationalHub {
  id: string;
  region: string;
  badge: string;
  phone: string;
  address: string;
  suburbs: string[];
  ctaText: string;
  slug: string;
}

const AUSTRALIAN_CITIES: AustralianCityHub[] = [
  {
    id: "perth",
    region: "Perth",
    badge: "WA Hub",
    phone: "+61 460 849 843",
    suburbs: [
      "Perth CBD & Northbridge",
      "Fremantle & South Fremantle",
      "Subiaco, Nedlands & Claremont",
      "Scarborough & Cottesloe Coastal",
      "Joondalup & Victoria Park",
    ],
    ctaText: "Book in Perth",
    slug: "/book?city=perth",
  },
  {
    id: "sydney",
    region: "Sydney",
    badge: "NSW Hub",
    phone: "+61 460 849 843",
    suburbs: [
      "Sydney CBD & Surry Hills",
      "Bondi, Bronte & Eastern Suburbs",
      "Manly & Northern Beaches",
      "Inner West (Newtown, Balmain)",
      "North Shore & Chatswood",
    ],
    ctaText: "Book in Sydney",
    slug: "/book?city=sydney",
  },
  {
    id: "melbourne",
    region: "Melbourne",
    badge: "VIC Hub",
    phone: "+61 460 849 843",
    suburbs: [
      "Melbourne CBD & Docklands",
      "South Yarra, Prahran & Toorak",
      "Fitzroy, Carlton & Brunswick",
      "Richmond & South Melbourne",
      "St Kilda & Brighton Bayside",
    ],
    ctaText: "Book in Melbourne",
    slug: "/book?city=melbourne",
  },
  {
    id: "brisbane",
    region: "Brisbane",
    badge: "QLD Hub",
    phone: "+61 460 849 843",
    suburbs: [
      "Brisbane CBD & Spring Hill",
      "New Farm, Teneriffe & Fortitude Valley",
      "Paddington & West End",
      "South Bank & Kangaroo Point",
      "Hamilton, Ascot & Bulimba",
    ],
    ctaText: "Book in Brisbane",
    slug: "/book?city=brisbane",
  },
  {
    id: "gold-coast",
    region: "Gold Coast",
    badge: "Coastal Hub",
    phone: "+61 460 849 843",
    suburbs: [
      "Surfers Paradise & Main Beach",
      "Broadbeach & Mermaid Beach",
      "Burleigh Heads & Palm Beach",
      "Robina & Varsity Lakes",
      "Southport, Labrador & Hope Island",
    ],
    ctaText: "Book in Gold Coast",
    slug: "/book?city=gold-coast",
  },
  {
    id: "adelaide",
    region: "Adelaide",
    badge: "SA Hub",
    phone: "+61 460 849 843",
    suburbs: [
      "Adelaide CBD & North Adelaide",
      "Norwood, Kensington & Burnside",
      "Glenelg, Brighton & Coastal West",
      "Unley, Hyde Park & Goodwood",
      "Prospect, Medindie & Walkerville",
    ],
    ctaText: "Book in Adelaide",
    slug: "/book?city=adelaide",
  },
];

const INTERNATIONAL_HUBS: InternationalHub[] = [
  {
    id: "australia",
    region: "Australia",
    badge: "Primary Registered Hub",
    phone: "+61 460 849 843",
    address: "Unit 3, 25 Morrison Street, Como WA 6152, Australia",
    suburbs: [
      "Greater Sydney (CBD, Eastern Suburbs, Inner West, North Shore)",
      "Greater Melbourne (CBD, South Yarra, Richmond, St Kilda, Brighton)",
      "Brisbane & Gold Coast (CBD, New Farm, Surfers Paradise, Broadbeach)",
      "Perth (CBD, Fremantle, Subiaco) & Adelaide Metro",
      "Canberra & ACT Central",
    ],
    ctaText: "Book in Australia",
    slug: "/book",
  },
  {
    id: "california",
    region: "California, USA",
    badge: "State Registered Entity",
    phone: "+61 460 849 843",
    address: "15442 Ventura Blvd, Suite 201-2176, Sherman Oaks, CA 91403, United States",
    suburbs: [
      "Sherman Oaks & Ventura Blvd Headquarters",
      "Los Angeles & West Hollywood",
      "San Francisco & Bay Area",
      "Silicon Valley & San Jose",
      "Orange County & San Diego",
    ],
    ctaText: "Book in California",
    slug: "/book",
  },
  {
    id: "london",
    region: "London, UK",
    badge: "Registered UK Office",
    phone: "+61 460 849 843",
    address: "1st Floor, 124 Cleveland Street, London, W1T 6PG, United Kingdom",
    suburbs: [
      "124 Cleveland Street & Fitzrovia",
      "Central London & City of London",
      "Westminster, Kensington & Chelsea",
      "Camden, Islington & Highbury",
      "Canary Wharf & Greater London",
    ],
    ctaText: "Book in London",
    slug: "/book",
  },
];

function CountryFlagBadge({ country }: { country: string }) {
  if (country.includes("California") || country.includes("USA")) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-4.5 rounded-xs overflow-hidden shadow-2xs border border-slate-300/60 shrink-0 bg-white relative">
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#b22234" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M0 37h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z" />
          <path fill="#3c3b6e" d="M0 0h260v260H0z" />
          <circle cx="130" cy="130" r="28" fill="#fff" />
        </svg>
      </span>
    );
  }
  if (country.includes("London") || country.includes("UK")) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-4.5 rounded-xs overflow-hidden shadow-2xs border border-slate-300/60 shrink-0 bg-[#00247d] relative">
        <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
          <path fill="#00247d" d="M0 0h640v480H0z" />
          <path d="m0 0 640 480m0-480L0 480" stroke="#fff" strokeWidth="60" />
          <path d="m0 0 640 480m0-480L0 480" stroke="#cf142b" strokeWidth="40" />
          <path d="M320 0v480M0 240h640" stroke="#fff" strokeWidth="100" />
          <path d="M320 0v480M0 240h640" stroke="#cf142b" strokeWidth="60" />
        </svg>
      </span>
    );
  }
  // Australia (default)
  return (
    <span className="inline-flex items-center justify-center w-6 h-4.5 rounded-xs overflow-hidden shadow-2xs border border-slate-300/60 shrink-0 bg-[#00008b] relative">
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#00008b" d="M0 0h640v480H0z" />
        <path d="m0 0 320 240m0-240L0 240" stroke="#fff" strokeWidth="40" />
        <path d="m0 0 320 240m0-240L0 240" stroke="#c8102e" strokeWidth="24" />
        <path d="M160 0v240M0 120h320" stroke="#fff" strokeWidth="64" />
        <path d="M160 0v240M0 120h320" stroke="#c8102e" strokeWidth="40" />
        <circle cx="160" cy="360" r="36" fill="#fff" />
        <circle cx="480" cy="360" r="22" fill="#fff" />
        <circle cx="440" cy="200" r="18" fill="#fff" />
        <circle cx="520" cy="140" r="18" fill="#fff" />
        <circle cx="540" cy="240" r="14" fill="#fff" />
      </svg>
    </span>
  );
}

export default function AustralianTrustAndAreas() {
  const { country, countryConfig } = useCountry();
  const [coverageMode, setCoverageMode] = useState<"national" | "international">(
    country === "us" || country === "uk" ? "international" : "national"
  );

  useEffect(() => {
    if (country === "us" || country === "uk") {
      setCoverageMode("international");
    }
  }, [country]);

  return (
    <section className="py-12 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-10 lg:px-14 bg-[#f8fbfe] border-t border-[#d0e4f7]">
      <div className="max-w-[1360px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Top Trust Banner: Verified Corporate Credentials */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d0e4f7] p-5 sm:p-8 md:p-10 shadow-sm space-y-6 sm:space-y-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#d0e4f7] pb-6 sm:pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-[#e3f2fd] text-[#0d47a1] text-[10px] sm:text-xs font-mono font-bold uppercase">
                <Building2 className="w-3.5 h-3.5 text-[#2196f3]" />
                <span>Verified Corporate Credentials</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#08295b] tracking-tight">
                Cleaning Superboss Ltd
              </h2>
              <p className="text-xs sm:text-sm text-[#08295b]/80 max-w-xl font-medium leading-relaxed">
                Officially registered in <strong className="text-[#0d47a1]">Australia, California and London</strong>. Providing hotel-grade domestic, bond, and commercial cleaning with upfront pricing and police-checked specialists.
              </p>
            </div>

            {/* Direct Contact & Phone Pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href={`tel:${countryConfig.phone}`}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {countryConfig.formattedPhone}</span>
              </a>
              <Link
                href="/book"
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-white border border-[#d0e4f7] hover:bg-[#f0f7fe] text-[#08295b] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-center"
              >
                Book Online
              </Link>
            </div>
          </div>

          {/* 4 Trust Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
            
            {/* 1. Business Registration */}
            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7]">
              <div className="flex items-center gap-2 text-[#0d47a1]">
                <FileCheck className="w-4.5 h-4.5 text-[#2196f3]" />
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Business Identity</h3>
              </div>
              <p className="text-sm font-extrabold text-[#08295b]">ABN: 48 642 918 203</p>
              <p className="text-[11px] sm:text-xs text-[#08295b]/65 leading-relaxed">
                Registered in Australia, California &amp; London with full tax invoice and legal compliance.
              </p>
            </div>

            {/* 2. $10M Insurance */}
            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7]">
              <div className="flex items-center gap-2 text-[#0d47a1]">
                <ShieldCheck className="w-4.5 h-4.5 text-[#2196f3]" />
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">$10M Public Liability</h3>
              </div>
              <p className="text-sm font-extrabold text-[#08295b]">Comprehensive Protection</p>
              <p className="text-[11px] sm:text-xs text-[#08295b]/65 leading-relaxed">
                Total property and contents damage insurance cover on every scheduled clean.
              </p>
            </div>

            {/* 3. Google Reviews */}
            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7]">
              <div className="flex items-center gap-2 text-[#0d47a1]">
                <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-400" />
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Google Rating</h3>
              </div>
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-black text-[#08295b]">4.9 / 5.0</span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#08295b]/60">(1,200+ Reviews)</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#08295b]/65 leading-relaxed">
                Verified 5-star reviews from satisfied domestic and commercial customers across all hubs.
              </p>
            </div>

            {/* 4. Guarantee Terms */}
            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7]">
              <div className="flex items-center gap-2 text-[#0d47a1]">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Clear Guarantee Terms</h3>
              </div>
              <p className="text-sm font-extrabold text-[#08295b]">100% Spotless Guarantee</p>
              <p className="text-[11px] sm:text-xs text-[#08295b]/65 leading-relaxed">
                72-Hour free re-clean on bond/vacate jobs. If any detail is questioned, we re-clean for free.
              </p>
            </div>

          </div>

        </div>

        {/* Global Serving Areas Directory */}
        <div className="space-y-6 sm:space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 px-1">
            
            {/* National / International Mode Tab Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#d0e4f7] shadow-xs gap-1 max-w-full">
              <button
                onClick={() => setCoverageMode("national")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  coverageMode === "national"
                    ? "bg-[#0d47a1] text-white shadow-xs"
                    : "text-[#08295b]/70 hover:text-[#08295b] hover:bg-[#f8fbfe]"
                }`}
              >
                National (Australia)
              </button>

              <button
                onClick={() => setCoverageMode("international")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  coverageMode === "international"
                    ? "bg-[#0d47a1] text-white shadow-xs"
                    : "text-[#08295b]/70 hover:text-[#08295b] hover:bg-[#f8fbfe]"
                }`}
              >
                International Presence
              </button>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e3f2fd] text-[#0d47a1] text-[10px] sm:text-xs font-mono font-bold uppercase">
                <Globe2 className="w-3.5 h-3.5 text-[#2196f3]" />
                <span>
                  {coverageMode === "national"
                    ? "Australian Service Coverage"
                    : "International Service Presence"}
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08295b] tracking-tight">
              {coverageMode === "national"
                ? "Cleaning Across Australia"
                : "Serving Australia, California and London"}
            </h2>

            <p className="text-xs sm:text-sm text-[#08295b]/70">
              {coverageMode === "national"
                ? "Operating across Australia's 6 core metropolitan hubs with dedicated local teams and uniform excellence."
                : "Operating across our three core registered jurisdictions with dedicated local teams and uniform excellence."}
            </p>
          </div>

          {/* NATIONAL 6-CARD GRID (Perth, Sydney, Melbourne, Brisbane, Gold Coast, Adelaide) */}
          {coverageMode === "national" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {AUSTRALIAN_CITIES.map((area) => (
                <div
                  key={area.id}
                  className="bg-white rounded-2xl border border-[#d0e4f7] p-4.5 sm:p-6 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-[#d0e4f7] pb-3 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <CountryFlagBadge country="Australia" />
                        <h3 className="font-extrabold text-base sm:text-lg text-[#08295b] tracking-tight leading-tight truncate">
                          {area.region}
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold text-[#0d47a1] bg-[#e3f2fd] px-2.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                        {area.badge}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#0d47a1] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#2196f3]" />
                      <span>Dispatch: {area.phone}</span>
                    </div>

                    <ul className="space-y-1.5 sm:space-y-2 text-xs text-[#08295b]/75">
                      {area.suburbs.map((hub, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#2196f3] shrink-0 mt-0.5" />
                          <span className="leading-snug">{hub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3.5 sm:pt-4 border-t border-[#d0e4f7]">
                    <Link
                      href={area.slug}
                      className="block text-center py-2.5 rounded-lg bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                    >
                      {area.ctaText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INTERNATIONAL 3-CARD GRID (Australia, California, London) */}
          {coverageMode === "international" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {INTERNATIONAL_HUBS.map((area) => {
                const isCurrentHub =
                  (country === "us" && area.id === "california") ||
                  (country === "uk" && area.id === "london") ||
                  (country === "au" && area.id === "australia");

                return (
                  <div
                    key={area.id}
                    className={`bg-white rounded-2xl border p-4.5 sm:p-6 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between relative ${
                      isCurrentHub
                        ? "border-[#0d47a1] ring-2 ring-[#2196f3]/30"
                        : "border-[#d0e4f7]"
                    }`}
                  >
                    {isCurrentHub && (
                      <span className="absolute -top-2.5 right-4 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#0d47a1] text-white px-2 py-0.5 rounded-full shadow-xs">
                        Active Hub
                      </span>
                    )}

                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-[#d0e4f7] pb-3 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <CountryFlagBadge country={area.region} />
                          <h3 className="font-extrabold text-base sm:text-lg text-[#08295b] tracking-tight leading-tight truncate">
                            {area.region}
                          </h3>
                        </div>
                        <span className="text-[10px] font-bold text-[#0d47a1] bg-[#e3f2fd] px-2.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                          {area.badge}
                        </span>
                      </div>

                      {/* Physical Address Block */}
                      <div className="bg-[#f8fbfe] border border-[#d0e4f7] rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#08295b]/60">
                          <Building2 className="w-3.5 h-3.5 text-[#2196f3]" />
                          <span>Registered Location</span>
                        </div>
                        <p className="text-xs font-semibold text-[#08295b] leading-snug">
                          {area.address}
                        </p>
                      </div>

                      <div className="text-xs font-bold text-[#0d47a1] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#2196f3]" />
                        <span>Dispatch: {area.phone}</span>
                      </div>

                      <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#08295b]/50 mb-1.5">
                          Metropolitan Service Hubs
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2 text-xs text-[#08295b]/75">
                          {area.suburbs.map((hub, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 text-[#2196f3] shrink-0 mt-0.5" />
                              <span className="leading-snug">{hub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3.5 sm:pt-4 border-t border-[#d0e4f7]">
                      <Link
                        href={area.slug}
                        className="block text-center py-2.5 rounded-lg bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                      >
                        {area.ctaText}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
