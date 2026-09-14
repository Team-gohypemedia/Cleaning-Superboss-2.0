"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { useCountry } from "@/context/CountryContext";
import CountrySelector from "@/components/CountrySelector";

const marqueeText =
  "PROFESSIONAL HOME CLEANING · DEEP CLEANING · BOND CLEANING · AIRBNB TURNOVERS · COMMERCIAL CLEANING · 100% SPOTLESS GUARANTEE · POLICE CHECKED & INSURED";

const capabilitiesLinks = [
  { label: "HOME CLEANING", href: "/services/home" },
  { label: "DEEP CLEANING", href: "/services/deep" },
  { label: "BOND CLEANING (VACATE)", href: "/end-of-lease-cleaning-services" },
  { label: "AIRBNB CLEANING", href: "/services/airbnb" },
  { label: "COMMERCIAL CLEANING", href: "/services/commercial" },
] as const;

function MarqueeStrip() {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16 whitespace-nowrap">
      {Array.from({ length: 4 }).map((_, repeatIndex) => (
        <span
          key={`repeat-${repeatIndex}`}
          className="whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e3f2fd]"
        >
          {marqueeText.split(" · ").map((text, idx, arr) => (
            <span key={idx}>
              {text}
              {idx < arr.length - 1 && (
                <span className="text-[#2196f3] mx-4 inline-block font-bold">·</span>
              )}
            </span>
          ))}
          {/* Add trailing dot to separate repeats */}
          <span className="text-[#2196f3] mx-4 inline-block font-bold">·</span>
        </span>
      ))}
    </div>
  );
}

interface FooterProps {
  hideServices?: boolean;
}

export default function Footer({ hideServices }: FooterProps = {}) {
  const pathname = usePathname();
  const { countryConfig } = useCountry();
  const isBondPage = pathname === "/landing/bond-cleaning";

  const shouldHideServices = hideServices || isBondPage;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full">
      {/* 1. Sustainability / Capability Marquee Strip */}
      <section className="w-full overflow-hidden bg-[#08295b] py-3.5 text-white border-y border-white/10">
        <h2 className="sr-only">Capabilities marquee</h2>
        <div className="flex w-max items-center animate-marquee motion-reduce:animate-none [will-change:transform]">
          <MarqueeStrip />
          <MarqueeStrip />
        </div>
      </section>

      {/* 2. Main Footer Section */}
      <div className="relative overflow-hidden bg-[#f8fbfe] text-[#08295b] pt-10 sm:pt-12 pb-8 border-t border-[#d0e4f7]">
        {/* Background Soft Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-[#0d47a1]/10 via-transparent to-transparent blur-[160px] pointer-events-none z-0" />

        <div className="w-full px-4 sm:px-6 md:px-12 2xl:px-24 mx-auto relative z-10 max-w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-8 relative z-10">
            
            {/* Column 1: Brand Logo & Short Desc */}
            <div className={shouldHideServices ? "col-span-1 sm:col-span-2 md:col-span-4" : "col-span-1 sm:col-span-2 md:col-span-3"}>
              <Link href="/" onClick={handleLogoClick} className="inline-block mb-3 hover:opacity-90 transition-opacity cursor-pointer">
                <div className="h-12 sm:h-14 md:h-16 flex items-center justify-start">
                  <img
                    src="/logo.png"
                    alt="Cleaning Superboss"
                    className="h-full w-auto max-h-[50px] sm:max-h-[58px] md:max-h-[66px] object-contain drop-shadow-sm"
                  />
                </div>
              </Link>
              <p className="text-xs text-[#08295b]/70 leading-relaxed pr-4 font-light mt-1">
                {isBondPage
                  ? "Cleaning Superboss Perth — Providing hotel-grade bond, vacate, and end-of-lease cleaning with upfront pricing and police-checked cleaners across Greater Perth and Western Australia."
                  : countryConfig.brandSubtitle}
              </p>
              {!isBondPage && (
                <div className="mt-3 pt-3 border-t border-[#d0e4f7]/80 space-y-1 text-[11px] text-[#08295b]/80 font-medium">
                  <div><strong>{countryConfig.registration.label}:</strong> {countryConfig.registration.value}</div>
                  <div><strong>Insurance:</strong> {countryConfig.insurance}</div>
                  <div>
                    <strong>Coverage:</strong> {countryConfig.coverageText}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Capabilities Links (Hidden on Bond Page) */}
            {!shouldHideServices && (
              <div className="col-span-1 md:col-span-3">
                <h4 className="font-bold text-xs uppercase mb-4 tracking-wider text-[#08295b]">
                  OUR SERVICES
                </h4>
                <ul className="space-y-2.5 text-[11px] text-[#08295b]/70 tracking-wider">
                  {capabilitiesLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-[#0d47a1] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2 mt-1.5 border-t border-[#d0e4f7]">
                    <Link
                      href="/careers"
                      className="inline-flex items-center gap-1.5 font-bold text-[#0d47a1] hover:text-[#2196f3] transition-colors"
                    >
                      <span>CAREERS / JOIN CREW</span>
                      <span className="bg-[#2196f3] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
                        HIRING
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* Column 3: Get Support */}
            <div className={shouldHideServices ? "col-span-1 sm:col-span-2 md:col-span-4" : "col-span-1 md:col-span-3"}>
              <h4 className="font-bold text-xs uppercase mb-4 tracking-wider text-[#08295b]">
                CONTACT US
              </h4>

              <div className="space-y-3.5 text-xs">
                {!isBondPage && (
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#08295b]/50">
                      {countryConfig.office.title.toUpperCase()}
                    </p>
                    <p className="text-xs font-semibold text-[#08295b] mt-0.5 leading-snug">
                      {countryConfig.office.fullAddress}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#08295b]/50">
                    CUSTOMER SUPPORT EMAIL
                  </p>
                  <p className="text-xs font-semibold text-[#08295b] hover:text-[#0d47a1] transition-colors mt-0.5">
                    <a href={`mailto:${countryConfig.email}`} className="break-all sm:break-normal">
                      {countryConfig.email}
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#08295b]/50">
                    HOURS OF OPERATION
                  </p>
                  <p className="text-xs font-semibold text-[#08295b] mt-0.5">
                    {isBondPage ? "Mon–Sun: 7:00 AM – 8:00 PM AWST" : countryConfig.operatingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter & Social */}
            <div className={shouldHideServices ? "col-span-1 sm:col-span-2 md:col-span-4" : "col-span-1 sm:col-span-2 md:col-span-3"}>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#08295b] font-semibold leading-relaxed mb-3">
                SUBSCRIBE FOR EXCLUSIVE OFFERS & PLATFORM UPDATES
              </p>

              <form
                className="flex flex-col space-y-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex items-center border-b border-[#d0e4f7] pb-2 focus-within:border-[#2196f3] transition-colors">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent text-xs text-[#08295b] placeholder:text-[#08295b]/40 uppercase tracking-wider outline-none pr-12 py-1"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 text-xs font-bold uppercase tracking-wider text-[#08295b] hover:text-[#0d47a1] transition-colors cursor-pointer"
                  >
                    JOIN
                  </button>
                </div>
                <p className="text-[9px] uppercase tracking-wider text-[#08295b]/50 pt-1">
                  BY SUBSCRIBING, YOU AGREE TO OUR TERMS & PRIVACY POLICY.
                </p>
              </form>
            </div>

          </div>

          {/* Bottom copyright row */}
          <div className={`mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-[#d0e4f7] flex flex-col sm:flex-row ${isBondPage ? "justify-end" : "justify-between"} items-center gap-3 relative z-10 w-full`}>
            <div className="flex flex-wrap items-center gap-2.5 text-[8px] sm:text-[9px] text-[#08295b]/60 uppercase tracking-widest font-medium text-left">
              <span>&copy; {new Date().getFullYear()} CLEANING SUPERBOSS LTD · ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex items-center gap-2.5">
              {!isBondPage && (
                <>
                  <CountrySelector />
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#08295b]/60 font-bold bg-[#e3f2fd] px-2 py-0.5 rounded">
                    {countryConfig.copyrightTag}
                  </div>
                </>
              )}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-1 text-[8px] sm:text-[9px] uppercase tracking-widest text-[#08295b]/70 hover:text-[#0d47a1] font-bold bg-white hover:bg-[#e3f2fd] border border-[#d0e4f7] px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-xs active:scale-95"
                title="Scroll to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-2.5 h-2.5 text-[#2196f3]" />
              </button>
            </div>
          </div>

        </div>

        {/* Faded Background Text Watermark */}
        <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none z-0 select-none overflow-hidden leading-none">
          <span className="block text-[6vw] md:text-[5vw] lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.45em] text-transparent bg-clip-text bg-gradient-to-b from-[#08295b]/6 to-transparent translate-x-[3.5vw]">
            CLEANING SUPERBOSS
          </span>
        </div>
      </div>
    </footer>
  );
}
