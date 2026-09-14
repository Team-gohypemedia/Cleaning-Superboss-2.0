"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Car,
  ShieldCheck,
  ChevronRight,
  DollarSign,
  Calendar,
  ArrowRight,
  X,
  FileCheck2,
  Briefcase,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import Footer from "@/components/Footer";
import { useCountry } from "@/context/CountryContext";

export default function CareersPage() {
  const { country, countryConfig } = useCountry();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const primaryCity = countryConfig.keyCities?.[0]?.name || "Perth";

  const handleOpenForm = () => {
    setIsFormVisible(true);
    setTimeout(() => {
      document
        .getElementById("career-application-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-[#08295b] pt-24 sm:pt-32 overflow-x-hidden">
      {/* Background Soft Glows */}
      <div className="fixed top-20 right-0 w-[350px] sm:w-[550px] h-[350px] bg-gradient-to-b from-[#2196f3]/10 to-transparent blur-[120px] sm:blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-0 w-[300px] sm:w-[450px] h-[300px] bg-gradient-to-t from-[#0d47a1]/8 to-transparent blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 sm:space-y-12 pb-20 sm:pb-28">
        {/* Page Hero Header */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-1.5 text-xs text-[#08295b]/60">
            <Link href="/" className="hover:text-[#0d47a1] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#08295b]/40" />
            <span className="text-[#08295b] font-medium">Cleaner Careers</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100 text-[#0d47a1] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Now Hiring Cleaners Across {countryConfig.coverageText}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08295b] tracking-tight leading-snug">
                Join the Cleaning Team at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d47a1] to-[#2196f3]">
                  Cleaning Superboss
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#08295b]/70 leading-relaxed font-normal">
                Reliable contracts, flexible hours, and guaranteed weekly pay. We provide hotel-grade residential, bond, and commercial cleaning across {countryConfig.name}.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
              <button
                type="button"
                onClick={handleOpenForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-white/90" />
                <span>Apply for Job Now</span>
              </button>
            </div>
          </div>

          {/* VISUAL 1: Hero Team Photo Showcase Banner */}
          <div className="relative w-full h-[220px] sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden border border-[#d0e4f7] shadow-lg shadow-[#08295b]/8 group">
            <Image
              src="/brand/cleaner_crew_team.jpg"
              alt="Cleaning Superboss Professional Cleaning Crew"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08295b]/85 via-[#08295b]/25 to-transparent" />

            {/* Floating Info Pills on Image */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#e3f2fd] border border-white/20">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#64b5f6]" />
                  Verified Cleaning Network
                </span>
                <p className="text-sm sm:text-xl md:text-2xl font-black drop-shadow-md">
                  Cleaners Across {primaryCity} &amp; {countryConfig.name}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-white/70 block">Average Rate</span>
                  <span className="text-sm sm:text-base font-black text-white">{countryConfig.currencySymbol}35 - 55+/hr</span>
                </div>
                <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-white/70 block">Insurance</span>
                  <span className="text-sm sm:text-base font-black text-white">$10M Public Cover</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Highlight Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-1">
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#d0e4f7] shadow-xs flex items-center gap-3 hover:border-[#2196f3] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] text-[#0d47a1] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#08295b]/50 block truncate">
                  Competitive Pay
                </span>
                <span className="text-xs sm:text-base font-black text-[#08295b]">
                  {countryConfig.currencySymbol}35 - 55+/hr
                </span>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#d0e4f7] shadow-xs flex items-center gap-3 hover:border-[#2196f3] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] text-[#0d47a1] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#08295b]/50 block truncate">
                  Reliable Pay
                </span>
                <span className="text-xs sm:text-base font-black text-[#08295b]">
                  Weekly Direct
                </span>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#d0e4f7] shadow-xs flex items-center gap-3 hover:border-[#2196f3] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] text-[#0d47a1] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#08295b]/50 block truncate">
                  Flexibility
                </span>
                <span className="text-xs sm:text-base font-black text-[#08295b]">
                  Choose Hours
                </span>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#d0e4f7] shadow-xs flex items-center gap-3 hover:border-[#2196f3] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] text-[#0d47a1] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#08295b]/50 block truncate">
                  Fully Insured
                </span>
                <span className="text-xs sm:text-base font-black text-[#08295b]">
                  $10M Policy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VISUAL 2: 3-Step Simple Hiring Process */}
        <div className="bg-white rounded-3xl border border-[#d0e4f7] p-5 sm:p-8 md:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#0d47a1]">
              Simple Onboarding Flow
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#08295b]">
              How to Start Working With Us
            </h2>
            <p className="text-xs sm:text-sm text-[#08295b]/70 font-normal">
              No complex paperwork. We keep the onboarding fast, transparent, and direct.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            <div className="bg-[#f8fbfe] p-5 rounded-2xl border border-[#d0e4f7] relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0d47a1] text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#08295b]">
                Fill the 2-Minute Form
              </h3>
              <p className="text-xs text-[#08295b]/75 leading-relaxed">
                Provide your basic contact info, suburb preferences, vehicle status, and cleaning background.
              </p>
            </div>

            <div className="bg-[#f8fbfe] p-5 rounded-2xl border border-[#d0e4f7] relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2196f3] text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#08295b]">
                Coordinator Contact
              </h3>
              <p className="text-xs text-[#08295b]/75 leading-relaxed">
                As contracts and vacancies open in your suburb, our local coordinator will phone or SMS you directly.
              </p>
            </div>

            <div className="bg-[#f8fbfe] p-5 rounded-2xl border border-[#d0e4f7] relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#08295b]">
                Start &amp; Get Paid Weekly
              </h3>
              <p className="text-xs text-[#08295b]/75 leading-relaxed">
                Receive your booked schedule, deliver top-grade cleaning, and get paid weekly into your account.
              </p>
            </div>
          </div>
        </div>

        {/* VISUAL 3: Vehicle & Equipment Visual Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#d0e4f7] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="relative h-[220px] sm:h-[300px] lg:h-auto lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#d0e4f7]">
            <Image
              src="/brand/cleaner_car_gear.jpg"
              alt="Professional Cleaner Vehicle and Cleaning Equipment"
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-300" />
              <span>Mobile Cleaners</span>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:col-span-7 space-y-5 flex flex-col justify-center">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#0d47a1]">
                Requirements &amp; Gear
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-[#08295b]">
                Vehicle &amp; Driving Licence Needed
              </h3>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#08295b]/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Personal Vehicle Required:</strong> You must have a car to transport vacuum, caddy, and eco supplies between client jobs.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Valid Driver's Licence:</strong> To ensure you can commute promptly across your chosen service suburbs.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Police or Background Check:</strong> Clean record is required for insurance and client peace of mind.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
              <strong>Application Note:</strong> Because of high applicant volume, we contact candidates as immediate slots match their postcode. If you are not contacted right away, we keep your profile in our queue.
            </div>
          </div>
        </div>

        {/* Minimal Action Banner (Toggles form open) */}
        {!isFormVisible && (
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#d0e4f7] p-5 sm:px-8 sm:py-6 shadow-xs hover:border-[#2196f3]/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Immediate Openings In Your Suburb</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-[#08295b] tracking-tight">
                  Ready to Join Cleaning Superboss?
                </h3>
                <p className="text-xs sm:text-sm text-[#08295b]/70 font-normal max-w-lg">
                  Click below to complete the onboarding questionnaire. It takes just 2 minutes!
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Apply for Job Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 4. The Application Form (Visible when toggled on) */}
        {isFormVisible && (
          <div
            id="career-application-section"
            className="space-y-4 pt-2 scroll-mt-28 sm:scroll-mt-36 animate-in fade-in slide-in-from-top-4 duration-500"
          >
            {/* Form Top Header Control */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#08295b]">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#0d47a1]" />
                  Cleaner Application Form Active
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-red-50 text-[#08295b]/70 hover:text-red-600 border border-[#d0e4f7] hover:border-red-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Hide Form</span>
              </button>
            </div>

            <CareerApplicationForm />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
