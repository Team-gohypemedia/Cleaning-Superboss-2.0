"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useCountry } from "@/context/CountryContext";
import { CountryCode } from "@/config/countries";

export default function CountrySelector({ className = "" }: { className?: string }) {
  const { country, countryConfig, setCountry, allCountries } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: CountryCode) => {
    setCountry(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Minimal Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium text-[#08295b]/70 hover:text-[#08295b] hover:bg-[#08295b]/5 transition-colors cursor-pointer border border-[#d0e4f7]/70 select-none bg-white/50"
        aria-label="Change country region"
        aria-expanded={isOpen}
      >
        <span className="text-xs leading-none">{countryConfig.flagEmoji}</span>
        <span className="font-semibold text-[#08295b]">{countryConfig.name}</span>
        <ChevronDown
          className={`w-3 h-3 opacity-60 text-[#08295b] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Minimal Dropdown Popup */}
      {isOpen && (
        <div className="absolute bottom-full mb-1.5 right-0 z-50 w-44 rounded-xl bg-white/95 backdrop-blur-md border border-[#d0e4f7] shadow-lg p-1 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#08295b]/45 border-b border-[#d0e4f7]/50 mb-0.5">
            Region
          </div>

          <div className="space-y-0.5">
            {allCountries.map((c) => {
              const isSelected = c.code === country;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#e3f2fd] text-[#0d47a1] font-bold"
                      : "hover:bg-[#f8fbfe] text-[#08295b] font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-xs leading-none shrink-0">{c.flagEmoji}</span>
                    <span className="truncate">{c.name}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3 h-3 text-[#0d47a1] shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
