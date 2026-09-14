"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCountry } from "@/context/CountryContext";

const serviceLinks = [
  { label: "Home Cleaning", href: "/services/home" },
  { label: "Deep Cleaning", href: "/services/deep" },
  { label: "Bond Cleaning", href: "/end-of-lease-cleaning-services" },
  { label: "Airbnb Cleaning", href: "/services/airbnb" },
  { label: "Commercial Cleaning", href: "/services/commercial" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { countryConfig } = useCountry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Direct event from GSAP ScrollTrigger when leaving / re-entering hero
    const handleHeroState = (e: Event) => {
      const customEvent = e as CustomEvent<{ pastHero: boolean }>;
      if (customEvent.detail !== undefined) {
        setIsScrolled(customEvent.detail.pastHero);
      }
    };
    window.addEventListener("heroScrollState", handleHeroState);

    // 2. Continuous scroll check tracking the exact end position of the hero section
    const handleScroll = () => {
      const marker = document.getElementById("hero-end-marker");
      if (marker) {
        const rect = marker.getBoundingClientRect();
        // Background only turns on once the element after the hero reaches the top
        setIsScrolled(rect.top <= 80);
        return;
      }

      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const pinSpacer =
          heroEl.closest(".pin-spacer") ||
          (heroEl.parentElement?.classList.contains("pin-spacer")
            ? heroEl.parentElement
            : null);
        const targetEl = pinSpacer || heroEl;
        const rect = targetEl.getBoundingClientRect();
        setIsScrolled(rect.bottom <= 80);
        return;
      }

      // Default for pages without a hero section
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("heroScrollState", handleHeroState);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isBondPage = pathname === "/landing/bond-cleaning";

  const handleScrollToQuoteForm = () => {
    setMobileMenuOpen(false);
    const formEl = document.getElementById("quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#quote-form";
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3.5 sm:px-6 md:px-8 lg:px-10 transition-all duration-500 ease-out ${
        isScrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-xl border-b border-[#d0e4f7]/90 shadow-sm py-2 sm:py-2.5"
          : "bg-transparent border-b border-transparent shadow-none py-3.5 sm:py-4.5"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center group select-none relative py-1 cursor-pointer"
        >
          <div className="h-9 sm:h-11 md:h-13 lg:h-14 flex items-center justify-start">
            <img
              src="/logo.png"
              alt="Cleaning Superboss"
              className="h-full w-auto max-h-[38px] sm:max-h-[46px] md:max-h-[52px] lg:max-h-[58px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            />
          </div>
        </Link>

        {/* Center: Navigation Links (Hidden on Bond Page) */}
        {!isBondPage && (
          <nav className="hidden lg:flex items-center bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full px-5 xl:px-6 py-2 shadow-xl text-xs font-semibold text-zinc-300 gap-4 xl:gap-5">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-white" : "text-zinc-300 hover:text-white"} transition-colors`}
            >
              Home
            </Link>

            <Link
              href="/book"
              className={`${pathname === "/book" ? "text-white" : "text-zinc-300 hover:text-white"} transition-colors`}
            >
              Book
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                className={`flex items-center gap-1 ${pathname?.startsWith("/services") || pathname?.includes("end-of-lease") ? "text-white" : "text-zinc-300 hover:text-white"} transition-colors cursor-pointer py-1`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 z-50 transition-all duration-200 ${
                  servicesOpen ? "opacity-100 visible translate-y-0 pointer-events-auto" : "opacity-0 invisible -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-2xl space-y-0.5">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <a href="/#partners" className="hover:text-white transition-colors">
              Why Us
            </a>
            <a href="/#proof-of-work" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="/#faq" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="/#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <Link
              href="/careers"
              className={`${pathname === "/careers" ? "text-white font-bold" : "text-zinc-300 hover:text-white"} transition-colors`}
            >
              Careers
            </Link>
          </nav>
        )}

        {/* Right Corner Button(s) */}
        {isBondPage ? (
          <button
            type="button"
            onClick={handleScrollToQuoteForm}
            className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#0d47a1] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-[#2196f3] transition-all shadow-md hover:shadow-[#2196f3]/30 active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>Request a Quote</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Phone Link (desktop & tablet) */}
            <a
              href={`tel:${countryConfig.phone}`}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#08295b] hover:text-[#0d47a1] border border-[#d0e4f7] px-3.5 py-2 rounded-full transition-all shadow-2xs ${
                isScrolled ? "bg-[#f8fbfe] hover:bg-[#e3f2fd]" : "bg-white/85 backdrop-blur-md hover:bg-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#0d47a1]" />
              <span>{countryConfig.formattedPhone}</span>
            </a>

            {/* Quick Call Icon for Small Mobile Screens */}
            <a
              href={`tel:${countryConfig.phone}`}
              className={`sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#d0e4f7] text-[#0d47a1] active:scale-95 transition-all shadow-2xs ${
                isScrolled ? "bg-[#e3f2fd]" : "bg-white/85 backdrop-blur-md"
              }`}
              aria-label={`Call Cleaning Superboss ${countryConfig.name}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <Link
              href="/book"
              className="px-4 sm:px-5 py-2 rounded-full bg-[#0d47a1] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2196f3] transition-all shadow-lg hover:shadow-[#2196f3]/30 active:scale-95 whitespace-nowrap"
            >
              Book Now
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border border-[#d0e4f7] text-[#08295b] hover:text-[#0d47a1] transition-all cursor-pointer ${
                isScrolled ? "bg-[#f8fbfe]" : "bg-white/85 backdrop-blur-md"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer (Only for non-bond pages) */}
      {!isBondPage && mobileMenuOpen && (
        <div className="lg:hidden mt-3 bg-white/95 backdrop-blur-2xl border border-[#d0e4f7] rounded-2xl p-5 space-y-3.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-semibold py-1 ${pathname === "/" ? "text-[#0d47a1]" : "text-[#08295b] hover:text-[#2196f3]"}`}
            >
              Home
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-semibold py-1 ${pathname === "/book" ? "text-[#0d47a1]" : "text-[#08295b] hover:text-[#2196f3]"}`}
            >
              Book Online
            </Link>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full text-sm font-semibold text-[#08295b] hover:text-[#2196f3] py-1"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-2 border-l border-[#d0e4f7]">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-[#08295b]/80 hover:text-[#0d47a1] py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between text-sm font-semibold py-1 ${pathname === "/careers" ? "text-[#0d47a1]" : "text-[#08295b] hover:text-[#2196f3]"}`}
            >
              <span>Careers / Join Crew</span>
              <span className="bg-[#e3f2fd] text-[#0d47a1] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#d0e4f7]">Hiring</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-[#d0e4f7] space-y-2">
            <a
              href={`tel:${countryConfig.phone}`}
              className="flex items-center justify-center gap-2 text-xs font-bold text-[#08295b] bg-[#f8fbfe] border border-[#d0e4f7] py-2.5 rounded-xl hover:bg-[#e3f2fd] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#0d47a1]" />
              <span>Call: {countryConfig.formattedPhone}</span>
            </a>
            <button
              type="button"
              onClick={handleScrollToQuoteForm}
              className="w-full text-center py-2.5 rounded-xl bg-[#0d47a1] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#2196f3] transition-all shadow-md cursor-pointer"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
