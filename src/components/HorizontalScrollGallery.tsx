"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

interface GalleryCard {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  highlight: string;
}

const GALLERY_CARDS: GalleryCard[] = [
  {
    id: 1,
    tag: "KITCHEN RESTORATION",
    title: "Heavy Degreasing & Burnt Carbon Removal",
    subtitle: "Pristine glass doors, wire racks, stovetops & rangehood exhaust filters scrubbed clean.",
    image: "/bond/WhatsApp Image 2026-09-04 at 5.06.42 AM (1).jpeg",
    highlight: "100% Inspection Passed",
  },
  {
    id: 2,
    tag: "BATHROOM & GROUT",
    title: "Limescale & Soap Scum Elimination",
    subtitle: "Crystal-clear shower screens, disinfected tile grout, polished tapware & mirrors.",
    image: "/bond/WhatsApp Image 2026-09-04 at 5.06.42 AM (2).jpeg",
    highlight: "Hospital-Grade Sanitisation",
  },
  {
    id: 3,
    tag: "100% BOND BACK",
    title: "Real Estate Inspection-Ready Standards",
    subtitle: "Every cupboard, drawer, skirting board, and door frame cleaned to WA agent checklists.",
    image: "/bond/WhatsApp Image 2026-09-04 at 5.06.41 AM.jpeg",
    highlight: "Full Deposit Returned",
  },
  {
    id: 4,
    tag: "WINDOW & TRACKS",
    title: "Streak-Free Glass & Vacuumed Tracks",
    subtitle: "Sliding window tracks deep cleaned of grime, glass polished streak-free inside & out.",
    image: "/bond/WhatsApp Image 2026-09-04 at 5.06.42 AM.jpeg",
    highlight: "Ultra Clarity Detailing",
  },
  {
    id: 5,
    tag: "STEAM EXTRACTION",
    title: "Deep Carpet Fibre Wash & Stain Lift",
    subtitle: "Commercial hot-water extraction that removes ingrained dirt, allergens, and stubborn stains.",
    image: "/bond/WhatsApp Image 2026-09-04 at 5.06.43 AM.jpeg",
    highlight: "Quick-Dry Technology",
  },
  {
    id: 6,
    tag: "COMMERCIAL HYGIENE",
    title: "Executive Suites, Clinics & Workstations",
    subtitle: "After-hours janitorial solutions, sanitized meeting rooms, staff kitchens & spotless floors.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    highlight: "Flexible After-Hours Service",
  },
];

export default function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.4}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              GALLERY_CARDS.length - 1,
              Math.round(self.progress * (GALLERY_CARDS.length - 1))
            );
            setActiveIndex(index);
          },
        },
      });

      return () => {
        scrollTween.kill();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#051329] text-white overflow-hidden select-none"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#0d47a1]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[550px] h-[550px] bg-[#2196f3]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Left Fixed Heading - Oryzo Style */}
      <div className="absolute top-8 sm:top-12 md:top-16 left-6 sm:left-10 md:left-16 z-30 pointer-events-none max-w-sm sm:max-w-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#2196f3] uppercase mb-2 sm:mb-3">
          <Sparkles className="w-3 h-3 text-[#2196f3]" />
          <span>The Superboss Standard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white">
          SO THOROUGH, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#2196f3]">
            it’s spotless.
          </span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-white/60 font-light leading-relaxed hidden sm:block">
          Explore our real transformations delivered across Australian homes and businesses.
        </p>
      </div>

      {/* Center Dashed Focus Frame - Exactly Matching Oryzo Aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center">
        <div className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[450px] xl:w-[480px] aspect-[4/5] rounded-3xl border-2 border-dashed border-white/40 shadow-[0_0_50px_rgba(33,150,243,0.2)] transition-all duration-300" />
      </div>

      {/* Horizontally Translating Cards Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full px-[45vw] sm:px-[50vw] gap-6 sm:gap-10 md:gap-14 relative z-10 will-change-transform"
      >
        {GALLERY_CARDS.map((card, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={card.id}
              className={`w-[280px] sm:w-[340px] md:w-[400px] lg:w-[450px] xl:w-[480px] aspect-[4/5] rounded-3xl overflow-hidden relative shrink-0 transition-all duration-500 bg-[#08295b] border ${
                isCurrent
                  ? "scale-100 opacity-100 shadow-2xl border-[#2196f3]/60 ring-2 ring-[#2196f3]/20"
                  : "scale-90 opacity-40 border-white/10 hover:opacity-75"
              }`}
            >
              {/* Card Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                loading="eager"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-[#051329]/40 to-transparent pointer-events-none" />

              {/* Top Tag Pill */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-extrabold tracking-wider text-white uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3] animate-pulse" />
                <span>{card.tag}</span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2196f3] bg-[#2196f3]/15 px-2.5 py-0.5 rounded-full border border-[#2196f3]/30">
                  <CheckCircle2 className="w-3 h-3 text-[#2196f3]" />
                  <span>{card.highlight}</span>
                </div>
                <h3 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-2">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Center Indicator - "SCROLL TO CONTINUE" - Oryzo Style */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest text-white/80 uppercase">
          <ChevronDown className="w-3.5 h-3.5 text-[#2196f3] animate-bounce" />
          <span>Scroll to Continue</span>
        </div>

        {/* Dynamic Dot Indicators */}
        <div className="flex items-center gap-1.5 pt-1">
          {GALLERY_CARDS.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex
                  ? "w-6 bg-[#2196f3]"
                  : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
