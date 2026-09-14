"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-3 rounded-full bg-gradient-to-r from-[#08295b] via-[#0d47a1] to-[#2196f3] text-white shadow-xl shadow-[#08295b]/25 border border-white/25 hover:shadow-2xl hover:shadow-[#2196f3]/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer group backdrop-blur-md ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="text-[11px] font-bold tracking-wider uppercase pr-1 hidden sm:inline">
        Top
      </span>
    </button>
  );
}
