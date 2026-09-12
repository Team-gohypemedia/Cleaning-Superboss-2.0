"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useCountry } from "@/context/CountryContext";

export default function ContactSection() {
  const { countryConfig } = useCountry();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    serviceRequirements: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const GHL_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/oOILUumPBLG7ihohI6gJ/webhook-trigger/5949a2ae-165e-478c-a6d0-57f96aa209e6";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          fullName: formData.fullName,
          email: formData.email,
          emailAddress: formData.email,
          phone: formData.phone,
          phoneNumber: formData.phone,
          suburb: formData.propertyAddress,
          propertyAddress: formData.propertyAddress,
          serviceRequirements: formData.serviceRequirements,
          source: "Website Contact Form",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("GHL Webhook error:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          propertyAddress: "",
          serviceRequirements: "",
        });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#f8fbfe] py-12 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-10 lg:px-14 border-t border-[#d0e4f7]">
      <div className="w-full max-w-[1240px] mx-auto space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3 px-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#e3f2fd] border border-[#d0e4f7] text-[#0d47a1] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#2196f3]" />
            <span>Fast {countryConfig.name} Response</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#08295b] tracking-tight">
            Connect With Our Team
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#08295b]/70 font-normal">
            Get an upfront quote within minutes or speak directly with our friendly {countryConfig.name} customer care team.
          </p>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Get In Touch (Clean White Card) */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 border border-[#d0e4f7] shadow-xl shadow-[#08295b]/5 flex flex-col justify-between space-y-6">
            <div className="space-y-5 sm:space-y-6">
              
              {/* Header */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#08295b] tracking-tight">
                  Get In Touch
                </h3>
                <p className="text-xs sm:text-sm text-[#08295b]/65 font-medium">
                  Multiple ways to reach our friendly {countryConfig.name} team
                </p>
              </div>

              {/* Contact List */}
              <div className="space-y-3.5 sm:space-y-4 pt-1">
                
                {/* Address Item */}
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#e3f2fd] border border-[#d0e4f7] flex items-center justify-center shrink-0 text-[#0d47a1] shadow-xs">
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0d47a1]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#08295b]">{countryConfig.office.title}</h4>
                    <p className="text-xs text-[#08295b]/80 font-medium mt-0.5 leading-relaxed">
                      {countryConfig.office.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#e3f2fd] border border-[#d0e4f7] flex items-center justify-center shrink-0 text-[#0d47a1] shadow-xs">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0d47a1]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#08295b]">Email</h4>
                    <a
                      href={`mailto:${countryConfig.email}`}
                      className="text-xs text-[#0d47a1] hover:text-[#2196f3] font-semibold mt-0.5 block transition-colors break-all sm:break-normal"
                    >
                      {countryConfig.email}
                    </a>
                  </div>
                </div>

                {/* Call Us Item */}
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#e3f2fd] border border-[#d0e4f7] flex items-center justify-center shrink-0 text-[#0d47a1] shadow-xs">
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0d47a1]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#08295b]">Call Us</h4>
                    <a
                      href={`tel:${countryConfig.phone}`}
                      className="text-xs text-[#0d47a1] hover:text-[#2196f3] font-bold mt-0.5 block transition-colors"
                    >
                      {countryConfig.formattedPhone}
                    </a>
                  </div>
                </div>

                {/* Bookings Item */}
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#e3f2fd] border border-[#d0e4f7] flex items-center justify-center shrink-0 text-[#0d47a1] shadow-xs">
                    <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0d47a1]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#08295b]">Online Bookings</h4>
                    <Link
                      href="/book"
                      className="text-xs text-[#0d47a1] hover:text-[#2196f3] font-bold mt-0.5 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Instant Online Quote / Booking</span>
                      <ArrowRight className="w-3 h-3 text-[#2196f3]" />
                    </Link>
                  </div>
                </div>

              </div>

              {/* Service Assurance Highlight Box */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f8fbfe] border border-[#d0e4f7] space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#08295b]">
                  <Sparkles className="w-4 h-4 text-[#2196f3]" />
                  <span>The Superboss Standard</span>
                </div>
                <p className="text-[11px] text-[#08295b]/75 leading-relaxed">
                  Every clean includes commercial equipment, eco-safe supplies, and our 100% Spotless Bond Back Guarantee.
                </p>
              </div>
            </div>

            {/* Bottom Trust Tag */}
            <div className="pt-4 border-t border-[#d0e4f7] flex items-center gap-2 text-xs text-[#08295b]/80 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{countryConfig.cleanerTrustText}</span>
            </div>
          </div>

          {/* Right Column: Get Your Free Quote Form (Old Dark Navy Background) */}
          <div className="lg:col-span-7 bg-[#08295b] text-[#e3f2fd] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Ambient Lighting Gradient */}
            <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-gradient-to-br from-[#0d47a1]/50 via-[#2196f3]/25 to-transparent blur-[90px] pointer-events-none" />

            <div className="space-y-5 sm:space-y-6 relative z-10">
              
              {/* Header */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Get Your Free Quote
                </h3>
                <p className="text-xs sm:text-sm text-[#e3f2fd]/70 font-medium">
                  Fill in your details to receive an instant transparent quote
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#2196f3]/20 text-[#2196f3] rounded-full flex items-center justify-center mx-auto border border-[#2196f3]/40 shadow-sm animate-bounce">
                    <CheckCircle2 className="w-8 h-8 text-[#2196f3]" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Quote Request Received!</h4>
                  <p className="text-xs sm:text-sm text-[#e3f2fd]/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName || "Customer"}</strong>. Our dispatch team has received your request and will contact you promptly with your fixed-price quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 pt-1">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#e3f2fd]/90 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Taylor"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#2196f3] focus:bg-white/15 focus:ring-2 focus:ring-[#2196f3]/25 outline-none text-xs sm:text-sm text-white placeholder-white/40 transition-all font-medium"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#e3f2fd]/90 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={countryConfig.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#2196f3] focus:bg-white/15 focus:ring-2 focus:ring-[#2196f3]/25 outline-none text-xs sm:text-sm text-white placeholder-white/40 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#e3f2fd]/90 uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={countryConfig.formattedPhone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#2196f3] focus:bg-white/15 focus:ring-2 focus:ring-[#2196f3]/25 outline-none text-xs sm:text-sm text-white placeholder-white/40 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Property Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#e3f2fd]/90 uppercase tracking-wider">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={countryConfig.addressPlaceholder}
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#2196f3] focus:bg-white/15 focus:ring-2 focus:ring-[#2196f3]/25 outline-none text-xs sm:text-sm text-white placeholder-white/40 transition-all font-medium"
                    />
                  </div>

                  {/* Service Requirements */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#e3f2fd]/90 uppercase tracking-wider">
                      Service Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your cleaning requirements (e.g. house cleaning, end of lease bond clean, commercial office, carpet steam clean, oven degreasing, etc.)"
                      value={formData.serviceRequirements}
                      onChange={(e) => setFormData({ ...formData, serviceRequirements: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#2196f3] focus:bg-white/15 focus:ring-2 focus:ring-[#2196f3]/25 outline-none text-xs sm:text-sm text-white placeholder-white/40 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* Divider */}
                  <div className="pt-2 border-t border-white/10" />

                  {/* Submit Button & Privacy Note */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-2xl bg-[#0d47a1] hover:bg-[#2196f3] active:scale-[0.99] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#0d47a1]/40 border border-[#2196f3]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? "Calculating..." : "Next: Select Date & Time"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-1.5 px-2 text-center">
                      <Lock className="w-3.5 h-3.5 text-[#2196f3] shrink-0" />
                      <p className="text-[11px] sm:text-xs text-[#e3f2fd]/75 leading-relaxed">
                        {countryConfig.privacyNotice}
                      </p>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
