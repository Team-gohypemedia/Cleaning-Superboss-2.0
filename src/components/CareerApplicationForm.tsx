"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Car,
  ShieldCheck,
  Clock,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
  Building2,
  FileText,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useCountry } from "@/context/CountryContext";

const COUNTRY_DIAL_CODES = [
  { flag: "🇦🇺", dial: "+61", label: "Australia (+61)" },
  { flag: "🇺🇸", dial: "+1", label: "United States (+1)" },
  { flag: "🇬🇧", dial: "+44", label: "United Kingdom (+44)" },
  { flag: "🇳🇿", dial: "+64", label: "New Zealand (+64)" },
  { flag: "🇨🇦", dial: "+1", label: "Canada (+1)" },
  { flag: "🇮🇪", dial: "+353", label: "Ireland (+353)" },
  { flag: "🇮🇳", dial: "+91", label: "India (+91)" },
  { flag: "🇵🇭", dial: "+63", label: "Philippines (+63)" },
  { flag: "🇿🇦", dial: "+27", label: "South Africa (+27)" },
  { flag: "🇸🇬", dial: "+65", label: "Singapore (+65)" },
  { flag: "🇲🇾", dial: "+60", label: "Malaysia (+60)" },
  { flag: "🇵🇰", dial: "+92", label: "Pakistan (+92)" },
  { flag: "🇳🇵", dial: "+977", label: "Nepal (+977)" },
  { flag: "🇧🇩", dial: "+880", label: "Bangladesh (+880)" },
  { flag: "🇦🇪", dial: "+971", label: "UAE (+971)" },
  { flag: "🇩🇪", dial: "+49", label: "Germany (+49)" },
  { flag: "🇫🇷", dial: "+33", label: "France (+33)" },
  { flag: "🇮🇹", dial: "+39", label: "Italy (+39)" },
  { flag: "🇪🇸", dial: "+34", label: "Spain (+34)" },
  { flag: "🇧🇷", dial: "+55", label: "Brazil (+55)" },
  { flag: "🇨🇳", dial: "+86", label: "China (+86)" },
  { flag: "🇯🇵", dial: "+81", label: "Japan (+81)" },
  { flag: "🇰🇷", dial: "+82", label: "South Korea (+82)" },
  { flag: "🇮🇩", dial: "+62", label: "Indonesia (+62)" },
  { flag: "🇻🇳", dial: "+84", label: "Vietnam (+84)" },
  { flag: "🇹🇭", dial: "+66", label: "Thailand (+66)" },
  { flag: "🇱🇰", dial: "+94", label: "Sri Lanka (+94)" },
  { flag: "🇨🇴", dial: "+57", label: "Colombia (+57)" },
  { flag: "🇲🇽", dial: "+52", label: "Mexico (+52)" },
];

const BASE_COUNTRIES = [
  "Australia", "United States", "United Kingdom", "New Zealand", "Canada", "Ireland",
  "South Africa", "Philippines", "India", "Afghanistan", "Albania", "Algeria", "Andorra",
  "Angola", "Argentina", "Armenia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Chile", "China", "Colombia", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Georgia",
  "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary", "Iceland",
  "Indonesia", "Iran", "Iraq", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lithuania", "Luxembourg",
  "Malaysia", "Maldives", "Malta", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands",
  "Nicaragua", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "Somalia",
  "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Taiwan", "Tanzania",
  "Thailand", "Timor-Leste", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Uganda",
  "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

export default function CareerApplicationForm() {
  const { country, countryConfig } = useCountry();

  const initialDial = country === "uk" ? "+44" : country === "us" ? "+1" : "+61";
  const [phoneDialCode, setPhoneDialCode] = useState(initialDial);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    partnerName: "",
    age: "",
    suburb: "",
    city: countryConfig.keyCities?.[0]?.name || "Perth",
    countryOfBirth: countryConfig.name,
    visaType: "",
    email: "",
    phone: "",
    hasCarAndLicence: "Yes",
    policeClearance: "Yes",
    hoursPerWeek: "20 - 30 hours",
    vacateCleanExperience: "A few",
    commercialExperience: "No",
    hotelExperience: "No",
    residentialExperience: "Yes (1 - 2 years)",
    fifoMinesExperience: "No",
    otherExperience: "",
  });

  useEffect(() => {
    const defaultDial = country === "uk" ? "+44" : country === "us" ? "+1" : "+61";
    setPhoneDialCode(defaultDial);
    setFormData((prev) => ({
      ...prev,
      city: countryConfig.keyCities?.[0]?.name || prev.city,
      countryOfBirth: countryConfig.name,
    }));
  }, [country, countryConfig]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const GHL_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/oOILUumPBLG7ihohI6gJ/webhook-trigger/a96263fc-af7c-47b5-a567-7c3ae37cc301";

  const sortedCountries = [
    countryConfig.name,
    ...BASE_COUNTRIES.filter((c) => c !== countryConfig.name),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing: string[] = [];

    const cleanNumber = phoneNumber.trim().replace(/^0+/, "");
    const fullPhone = phoneNumber.trim().startsWith("+")
      ? phoneNumber.trim()
      : `${phoneDialCode} ${cleanNumber}`.trim();

    if (!formData.fullName.trim()) missing.push("Your Full Name");
    if (!formData.age.trim()) missing.push("How old are you?");
    if (!formData.suburb.trim()) missing.push("Which suburb do you live in?");
    if (!formData.city.trim()) missing.push("City");
    if (!formData.countryOfBirth.trim()) missing.push("Which country were you born in?");
    if (!formData.email.trim()) missing.push("Your email address");
    if (!phoneNumber.trim()) missing.push("Your best contact telephone number");

    if (missing.length > 0) {
      setErrorFields(missing);
      const errEl = document.getElementById("career-form");
      if (errEl) errEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setErrorFields([]);
    setLoading(true);

    const summaryText = `[CLEANER CAREER APPLICATION - ${countryConfig.name.toUpperCase()}]
Name: ${formData.fullName}${formData.partnerName ? ` & Partner: ${formData.partnerName}` : ""}
Age: ${formData.age}
Location: ${formData.suburb}, ${formData.city} (${countryConfig.name})
Birth Country: ${formData.countryOfBirth} | Visa/Status: ${formData.visaType || "Citizen/Local"}
Phone: ${fullPhone} | Email: ${formData.email}
Car & Licence: ${formData.hasCarAndLicence}
Background/Police Check: ${formData.policeClearance}
Hours/Week: ${formData.hoursPerWeek}
Vacate / Move-out Exp: ${formData.vacateCleanExperience}
Commercial Exp: ${formData.commercialExperience}
Hotel Exp: ${formData.hotelExperience}
House Clean Exp: ${formData.residentialExperience}
Remote/FIFO/Industrial Exp: ${formData.fifoMinesExperience}
Other Exp: ${formData.otherExperience || "None"}`;

    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0] || formData.fullName;
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      source: `Website Cleaner Application Form (${countryConfig.shortName})`,
      formType: "Cleaner Career Application",
      country: country,
      countryName: countryConfig.name,
      title: `New Cleaner Application: ${formData.fullName}`,
      taskTitle: `New Cleaner Application: ${formData.fullName}`,
      "First Name": firstName,
      "Last Name": lastName,
      "Full Name": formData.fullName,
      "Name": formData.fullName,
      "Email": formData.email,
      "Phone": fullPhone,
      "Notes": summaryText,
      name: formData.fullName,
      fullName: formData.fullName,
      first_name: firstName,
      firstName: firstName,
      last_name: lastName,
      lastName: lastName,
      partnerName: formData.partnerName,
      age: formData.age,
      email: formData.email,
      emailAddress: formData.email,
      phone: fullPhone,
      phoneNumber: fullPhone,
      suburb: `${formData.suburb}${formData.partnerName ? ` (Partner: ${formData.partnerName})` : ""}`,
      city: formData.city,
      address: `${formData.suburb}, ${formData.city}`,
      address1: `${formData.suburb}, ${formData.city}`,
      streetAddress: `${formData.suburb}, ${formData.city}`,
      propertyAddress: `${formData.suburb}, ${formData.city}, ${countryConfig.name}`,
      service: "Cleaner Career Application",
      countryOfBirth: formData.countryOfBirth,
      visaType: formData.visaType,
      hasCarAndLicence: formData.hasCarAndLicence,
      policeClearance: formData.policeClearance,
      hoursPerWeek: formData.hoursPerWeek,
      vacateCleanExperience: formData.vacateCleanExperience,
      commercialExperience: formData.commercialExperience,
      hotelExperience: formData.hotelExperience,
      residentialExperience: formData.residentialExperience,
      fifoMinesExperience: formData.fifoMinesExperience,
      otherExperience: formData.otherExperience,
      message: summaryText,
      serviceRequirements: summaryText,
      notes: summaryText,
      tags: ["Cleaner Applicant", "Careers Lead", `Region-${countryConfig.shortName}`],
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Send via local server-side API (avoids browser CORS & preflight blocks)
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Fallback directly to webhook if API route had an issue
        await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.warn("API route error, attempting direct fallback:", err);
      try {
        await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (fallbackErr) {
        console.error("GHL Webhook fallback error:", fallbackErr);
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorFields([]);
    setPhoneNumber("");
    setPhoneDialCode(country === "uk" ? "+44" : country === "us" ? "+1" : "+61");
    setFormData({
      fullName: "",
      partnerName: "",
      age: "",
      suburb: "",
      city: countryConfig.keyCities?.[0]?.name || "Perth",
      countryOfBirth: countryConfig.name,
      visaType: "",
      email: "",
      phone: "",
      hasCarAndLicence: "Yes",
      policeClearance: "Yes",
      hoursPerWeek: "20 - 30 hours",
      vacateCleanExperience: "A few",
      commercialExperience: "No",
      hotelExperience: "No",
      residentialExperience: "Yes (1 - 2 years)",
      fifoMinesExperience: "No",
      otherExperience: "",
    });
  };

  return (
    <div
      id="career-form"
      className="w-full bg-white rounded-3xl border border-[#d0e4f7] shadow-xl shadow-[#08295b]/6 overflow-hidden transition-all"
    >
      {/* Form Top Header Banner */}
      <div className="relative bg-gradient-to-r from-[#08295b] via-[#0d47a1] to-[#1e88e5] p-5 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#e3f2fd]">
              <Briefcase className="w-3.5 h-3.5 text-[#64b5f6]" />
              <span>Cleaner Onboarding Application</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Career Application Form
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl font-light">
              We review every application thoroughly. Please complete all fields below to join our verified cleaning network across {countryConfig.coverageText}.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end text-right bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#bbdefb]">
              Location Hub
            </span>
            <span className="text-base font-extrabold flex items-center gap-1.5 mt-0.5">
              <span>{countryConfig.flagEmoji}</span>
              <span>{countryConfig.name}</span>
            </span>
          </div>
        </div>

        {/* Subtle Decorative Gradient Wave */}
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Validation Error Alert Box */}
      {errorFields.length > 0 && (
        <div className="mx-6 sm:mx-8 mt-6 p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-bold text-red-900">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>There was a problem with your submission. Please complete the following required fields:</span>
          </div>
          <div className="flex flex-wrap gap-2 pl-7 pt-1">
            {errorFields.map((field, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-red-200 text-red-700 font-semibold text-xs shadow-xs">
                • {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Form Content */}
      {submitted ? (
        <div className="py-16 px-6 sm:px-12 text-center space-y-6">
          <div className="w-20 h-20 bg-[#e3f2fd] text-[#0d47a1] rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-[#e3f2fd]/50 animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-12 h-12 text-[#2196f3]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h4 className="text-2xl sm:text-3xl font-black text-[#08295b] tracking-tight">
              Application Received!
            </h4>
            <p className="text-sm text-[#08295b]/75 leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Your application has been logged into our candidate queue for <strong>{countryConfig.name}</strong>.
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-[#f8fbfe] border border-[#d0e4f7] rounded-2xl p-5 sm:p-6 text-left space-y-3 text-xs sm:text-sm shadow-xs">
            <h5 className="font-bold text-[#08295b] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2196f3]" />
              What Happens Next:
            </h5>
            <p className="text-[#08295b]/80 leading-relaxed">
              We review applications daily as new cleaning contracts and recurring schedules open up in your suburb. If your profile matches an immediate opening, our coordinator will phone or SMS you on <strong>{formData.phone}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 sm:p-8 md:p-10 space-y-7 sm:space-y-10">
          
          {/* Section 1: Candidate Identification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#d0e4f7]">
              <span className="w-6 h-6 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08295b]">
                Personal &amp; Contact Information
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0d47a1]" />
                  <span>Your Full Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Davies"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0d47a1]" />
                  <span>Your Partner's Name</span>
                  <span className="text-[10px] font-normal text-[#08295b]/50 lowercase">(if applying together)</span>
                </label>
                <input
                  type="text"
                  placeholder="Partner's full name (optional)"
                  value={formData.partnerName}
                  onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0d47a1]" />
                  <span>Your Email Address</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={countryConfig.emailPlaceholder || "yourname@email.com"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0d47a1]" />
                  <span>Your Best Contact Telephone Number/s?</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] focus-within:border-[#2196f3] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2196f3]/10 transition-all shadow-xs overflow-hidden">
                  <div className="relative flex items-center bg-[#edf5fd] border-r border-[#d0e4f7] hover:bg-[#e1effe] transition-colors">
                    <select
                      value={phoneDialCode}
                      onChange={(e) => setPhoneDialCode(e.target.value)}
                      className="h-full pl-3 pr-7 py-3 text-xs sm:text-sm font-bold text-[#08295b] bg-transparent focus:outline-none cursor-pointer appearance-none"
                      aria-label="Phone Country Dial Code"
                    >
                      {COUNTRY_DIAL_CODES.map((item) => (
                        <option key={item.label} value={item.dial} className="text-gray-900 bg-white font-medium">
                          {item.flag} {item.dial} ({item.label.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#08295b]/60 absolute right-2 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder={
                      countryConfig.code === "au"
                        ? "460 849 843"
                        : countryConfig.code === "uk"
                        ? "7911 123456"
                        : "310 555 0199"
                    }
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    }}
                    className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm text-[#08295b] focus:outline-none placeholder:text-[#08295b]/35 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Location, Age & Work Eligibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#d0e4f7]">
              <span className="w-6 h-6 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08295b]">
                Location &amp; Work Eligibility
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide block">
                  How old are you? <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={17}
                  max={99}
                  placeholder="e.g. 29"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide block">
                  Which suburb do you live in? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={country === "au" ? "e.g. Como, Fremantle, Subiaco" : country === "us" ? "e.g. Sherman Oaks, Glendale" : "e.g. Camden, Islington"}
                  value={formData.suburb}
                  onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide block">
                  City / Region Hub <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all shadow-xs cursor-pointer"
                >
                  {countryConfig.keyCities?.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.badge})
                    </option>
                  ))}
                  <option value="Other / Regional">Other / Regional Location</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide block">
                  Which country were you born in? <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.countryOfBirth}
                  onChange={(e) => setFormData({ ...formData, countryOfBirth: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all shadow-xs cursor-pointer"
                >
                  {sortedCountries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide block">
                  {country === "au" && "If you are not Australian, what visa do you have?"}
                  {country === "us" && "If not a US Citizen, what visa or work permit do you have?"}
                  {country === "uk" && "If not British/Irish, what visa or settled status do you have?"}
                </label>
                <input
                  type="text"
                  placeholder={country === "au" ? "e.g. Permanent Resident, Working Holiday 417, Student Visa" : country === "us" ? "e.g. Green Card, EAD, Work Visa" : "e.g. Settled Status, Tier 2, Youth Mobility"}
                  value={formData.visaType}
                  onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Verification, Transport & Work Capacity */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#d0e4f7]">
              <span className="w-6 h-6 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08295b]">
                Transport, Clearance &amp; Schedule
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Question: Own car & drivers licence */}
              <div className="bg-[#f8fbfe] p-4 rounded-2xl border border-[#d0e4f7] space-y-2.5 flex flex-col justify-between">
                <div>
                  <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#0d47a1]" />
                    <span>Do you have your own car and drivers licence?</span>
                  </label>
                  <span className="text-[10px] text-[#08295b]/60 block mt-0.5">
                    Required to carry cleaning equipment between jobs
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {["Yes", "No"].map((val) => {
                    const isSelected = formData.hasCarAndLicence === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData({ ...formData, hasCarAndLicence: val })}
                        className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#0d47a1] text-white shadow-sm ring-2 ring-[#0d47a1]/20"
                            : "bg-white text-[#08295b] border border-[#d0e4f7] hover:border-[#2196f3]"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{val}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question: Police / Background clearance */}
              <div className="bg-[#f8fbfe] p-4 rounded-2xl border border-[#d0e4f7] space-y-2.5 flex flex-col justify-between">
                <div>
                  <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0d47a1]" />
                    <span>
                      {country === "au" && "Able to present a clean police clearance?"}
                      {country === "us" && "Able to pass a clean background check?"}
                      {country === "uk" && "Able to present a clean DBS certificate?"}
                    </span>
                  </label>
                  <span className="text-[10px] text-[#08295b]/60 block mt-0.5">
                    Essential for client trust &amp; residential insurance
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {["Yes", "No"].map((val) => {
                    const isSelected = formData.policeClearance === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData({ ...formData, policeClearance: val })}
                        className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#0d47a1] text-white shadow-sm ring-2 ring-[#0d47a1]/20"
                            : "bg-white text-[#08295b] border border-[#d0e4f7] hover:border-[#2196f3]"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{val}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question: Weekly hours */}
              <div className="bg-[#f8fbfe] p-4 rounded-2xl border border-[#d0e4f7] space-y-2.5 flex flex-col justify-between">
                <div>
                  <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#0d47a1]" />
                    <span>How many hours per week do you wish to work?</span>
                  </label>
                  <span className="text-[10px] text-[#08295b]/60 block mt-0.5">
                    We match jobs directly to your preferred capacity
                  </span>
                </div>

                <select
                  value={formData.hoursPerWeek}
                  onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#d0e4f7] bg-white text-xs sm:text-sm text-[#08295b] font-bold focus:outline-none focus:border-[#2196f3] shadow-xs cursor-pointer"
                >
                  <option value="Less than 20 hours">Less than 20 hours (Part-Time / Casual)</option>
                  <option value="20 - 30 hours">20 - 30 hours (Standard Schedule)</option>
                  <option value="More than 30 hours">More than 30 hours (Full-Time Capacity)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Section 4: Cleaning Experience Questionnaire */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#d0e4f7]">
              <span className="w-6 h-6 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08295b]">
                Cleaning Experience Details
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="space-y-1.5 bg-[#f8fbfe] p-3.5 rounded-xl border border-[#d0e4f7]">
                <label className="text-xs font-bold text-[#08295b] block leading-snug">
                  {country === "au" && "Have you ever done a vacate clean in Western Australia?"}
                  {country === "us" && "Have you ever done a move-out clean in the US?"}
                  {country === "uk" && "Have you ever done an end-of-tenancy clean in the UK?"}
                </label>
                <select
                  value={formData.vacateCleanExperience}
                  onChange={(e) => setFormData({ ...formData, vacateCleanExperience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d0e4f7] bg-white text-xs text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3]"
                >
                  <option value="No">No</option>
                  <option value="A few">A few</option>
                  <option value="Many">Many</option>
                </select>
              </div>

              <div className="space-y-1.5 bg-[#f8fbfe] p-3.5 rounded-xl border border-[#d0e4f7]">
                <label className="text-xs font-bold text-[#08295b] block leading-snug">
                  Do you have commercial cleaning experience?
                </label>
                <select
                  value={formData.commercialExperience}
                  onChange={(e) => setFormData({ ...formData, commercialExperience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d0e4f7] bg-white text-xs text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3]"
                >
                  <option value="No">No</option>
                  <option value="Yes (Less than 1 year)">Yes (Less than 1 year)</option>
                  <option value="Yes (More than 1 year)">Yes (More than 1 year)</option>
                  <option value="Yes (More than 2 years)">Yes (More than 2 years)</option>
                </select>
              </div>

              <div className="space-y-1.5 bg-[#f8fbfe] p-3.5 rounded-xl border border-[#d0e4f7]">
                <label className="text-xs font-bold text-[#08295b] block leading-snug">
                  Have you ever cleaned in a hotel?
                </label>
                <select
                  value={formData.hotelExperience}
                  onChange={(e) => setFormData({ ...formData, hotelExperience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d0e4f7] bg-white text-xs text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3]"
                >
                  <option value="No">No</option>
                  <option value="Yes (Less than 1 year)">Yes (Less than 1 year)</option>
                  <option value="Yes (More than 1 year)">Yes (More than 1 year)</option>
                  <option value="Yes (More than 2 years)">Yes (More than 2 years)</option>
                </select>
              </div>

              <div className="space-y-1.5 bg-[#f8fbfe] p-3.5 rounded-xl border border-[#d0e4f7]">
                <label className="text-xs font-bold text-[#08295b] block leading-snug">
                  Have you ever cleaned houses for a living?
                </label>
                <select
                  value={formData.residentialExperience}
                  onChange={(e) => setFormData({ ...formData, residentialExperience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d0e4f7] bg-white text-xs text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3]"
                >
                  <option value="No">No</option>
                  <option value="Yes (Less than 1 year)">Yes (Less than 1 year)</option>
                  <option value="Yes (1 - 2 years)">Yes (1 - 2 years)</option>
                  <option value="Yes (More than 2 years)">Yes (More than 2 years)</option>
                </select>
              </div>

              <div className="space-y-1.5 bg-[#f8fbfe] p-3.5 rounded-xl border border-[#d0e4f7] sm:col-span-2">
                <label className="text-xs font-bold text-[#08295b] block leading-snug">
                  {country === "au" ? "Have you cleaned on the mines (FIFO)?" : "Have you cleaned in industrial, remote, or camp facilities?"}
                </label>
                <select
                  value={formData.fifoMinesExperience}
                  onChange={(e) => setFormData({ ...formData, fifoMinesExperience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d0e4f7] bg-white text-xs text-[#08295b] font-medium focus:outline-none focus:border-[#2196f3]"
                >
                  <option value="No">No</option>
                  <option value="Yes (Less than 1 year)">Yes (Less than 1 year)</option>
                  <option value="Yes (1 - 3 years)">Yes (1 - 3 years)</option>
                  <option value="Yes (More than 3 years)">Yes (More than 3 years)</option>
                </select>
              </div>

            </div>

            {/* Any other cleaning experience */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-[#08295b] uppercase tracking-wide block">
                Any other cleaning experience?
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about any other relevant cleaning experience, carpet steam extraction, pressure washing, or special equipment skills..."
                value={formData.otherExperience}
                onChange={(e) => setFormData({ ...formData, otherExperience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm text-[#08295b] focus:outline-none focus:border-[#2196f3] focus:bg-white focus:ring-4 focus:ring-[#2196f3]/10 transition-all placeholder:text-[#08295b]/35 shadow-xs resize-none"
              />
            </div>
          </div>

          {/* Bottom Submit Action Bar */}
          <div className="pt-6 border-t border-[#d0e4f7] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-[11px] text-[#08295b]/60 max-w-md">
              <span className="font-semibold text-[#08295b]">Privacy Commitment:</span> {countryConfig.privacyNotice}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#08295b] via-[#0d47a1] to-[#2196f3] hover:from-[#0d47a1] hover:to-[#1e88e5] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-[#0d47a1]/25 hover:shadow-xl hover:shadow-[#2196f3]/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
