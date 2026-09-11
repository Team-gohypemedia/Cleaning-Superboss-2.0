"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  Home,
  Building2,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Send,
  Bed,
  Bath,
  Flame,
  AppWindow,
  Layers,
  Sparkle,
  Refrigerator,
  Check,
  ChevronDown,
  Info,
  Phone,
  Mail,
  User,
  Zap,
} from "lucide-react";

type CityId = "perth" | "sydney" | "melbourne" | "brisbane" | "gold-coast" | "adelaide";
type CategoryType = "home" | "business" | "property";
type FrequencyOption = "once" | "weekly" | "fortnightly" | "monthly";

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  icon: React.ReactNode;
}

const CITIES: { id: CityId; name: string; state: string; badge: string; popularSuburbs: string[] }[] = [
  { id: "perth", name: "Perth", state: "WA", badge: "WA Hub", popularSuburbs: ["Perth CBD", "Subiaco", "Fremantle", "Scarborough", "Joondalup"] },
  { id: "sydney", name: "Sydney", state: "NSW", badge: "NSW Hub", popularSuburbs: ["Sydney CBD", "Bondi", "Surry Hills", "Manly", "Parramatta"] },
  { id: "melbourne", name: "Melbourne", state: "VIC", badge: "VIC Hub", popularSuburbs: ["Melbourne CBD", "South Yarra", "Fitzroy", "Richmond", "St Kilda"] },
  { id: "brisbane", name: "Brisbane", state: "QLD", badge: "QLD Hub", popularSuburbs: ["Brisbane CBD", "New Farm", "Paddington", "South Bank", "Hamilton"] },
  { id: "gold-coast", name: "Gold Coast", state: "QLD", badge: "Coastal Hub", popularSuburbs: ["Surfers Paradise", "Broadbeach", "Burleigh Heads", "Robina"] },
  { id: "adelaide", name: "Adelaide", state: "SA", badge: "SA Hub", popularSuburbs: ["Adelaide CBD", "North Adelaide", "Norwood", "Glenelg", "Unley"] },
];

const SERVICES = {
  home: [
    { id: "regular", name: "Regular Cleaning", baseRate: 119, desc: "Routine maintenance for kitchens, bathrooms, floors & dusting" },
    { id: "deep", name: "Deep Cleaning", baseRate: 189, desc: "Intensive deep scrub, appliance exteriors, skirting & limescale" },
    { id: "bond", name: "Bond / End of Lease", baseRate: 269, desc: "100% Bond Back Guarantee meeting strict real estate standards" },
  ],
  business: [
    { id: "office", name: "Office Cleaning", baseRate: 149, desc: "Desks, sanitised meeting rooms, staff kitchen & waste disposal" },
    { id: "commercial", name: "Commercial Cleaning", baseRate: 229, desc: "Warehouses, clinics, showrooms & multi-level workplaces" },
  ],
  property: [
    { id: "airbnb", name: "Airbnb Turnover", baseRate: 139, desc: "Fast guest turnover, hotel linen changeovers & restock staging" },
    { id: "carpet", name: "Carpet Steam Clean", baseRate: 129, desc: "Hot water extraction stain removal & deep allergen lift" },
    { id: "window", name: "Window Detailing", baseRate: 119, desc: "Streak-free interior & exterior glass, tracks and frame wash" },
  ],
};

const EXTRAS: ExtraItem[] = [
  { id: "oven", name: "Inside Oven", price: 55, subtitle: "Racks, glass door & burnt grease degrease", icon: <Flame className="w-4 h-4 text-[#2196f3]" /> },
  { id: "windows", name: "Internal Windows", price: 45, subtitle: "Interior glass panes & sliding window tracks", icon: <AppWindow className="w-4 h-4 text-[#2196f3]" /> },
  { id: "balcony", name: "Balcony / Patio", price: 35, subtitle: "Pressure sweep, glass balustrade & railing wash", icon: <Layers className="w-4 h-4 text-[#2196f3]" /> },
  { id: "carpet", name: "Carpet Steam Clean", price: 65, subtitle: "Commercial steam extraction per carpeted room", icon: <Sparkle className="w-4 h-4 text-[#2196f3]" /> },
  { id: "walls", name: "Wall Spotting", price: 40, subtitle: "Spot wipe scuff marks, food splatters & handprints", icon: <Sparkles className="w-4 h-4 text-[#2196f3]" /> },
  { id: "fridge", name: "Inside Fridge", price: 35, subtitle: "Shelves, crispers & antibacterial sanitation", icon: <Refrigerator className="w-4 h-4 text-[#2196f3]" /> },
];

export default function InstantQuoteHero() {
  const router = useRouter();

  // Wizard state
  const [activeTab, setActiveTab] = useState<"quick" | "detailed">("quick");
  const [sizeMethod, setSizeMethod] = useState<"size" | "hourly">("size");
  const [hourlyHours, setHourlyHours] = useState<number>(3);
  const [selectedCity, setSelectedCity] = useState<CityId>("perth");
  const [suburb, setSuburb] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("home");
  const [serviceId, setServiceId] = useState<string>("regular");
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [storeys, setStoreys] = useState<number>(1);
  const [frequency, setFrequency] = useState<FrequencyOption>("once");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("morning");

  // CRM Lead modal/inline state
  const [crmModalOpen, setCrmModalOpen] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [quoteSent, setQuoteSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  // Dynamic Calculation Logic
  const priceCalculation = useMemo(() => {
    const currentServiceList = SERVICES[category] || SERVICES.home;
    const currentService = currentServiceList.find((s) => s.id === serviceId) || currentServiceList[0];
    
    let basePrice = currentService.baseRate;
    let bedCost = 0;
    let bathCost = 0;
    let storeyCost = 0;

    if (sizeMethod === "hourly") {
      basePrice = hourlyHours * 48; // $48/hr standard Australian cleaner hourly rate
    } else {
      bedCost = Math.max(0, bedrooms - 1) * 35;
      bathCost = Math.max(0, bathrooms - 1) * 30;
      storeyCost = storeys > 1 ? (storeys - 1) * 35 : 0;
    }

    // Extras
    const extrasTotal = selectedExtras.reduce((acc, extraId) => {
      const item = EXTRAS.find((e) => e.id === extraId);
      return acc + (item ? item.price : 0);
    }, 0);

    const subtotal = basePrice + bedCost + bathCost + storeyCost + extrasTotal;

    // Frequency Discount
    let discountPercent = 0;
    if (frequency === "weekly") discountPercent = 0.15;
    else if (frequency === "fortnightly") discountPercent = 0.10;
    else if (frequency === "monthly") discountPercent = 0.05;

    const discountAmount = Math.round(subtotal * discountPercent);
    const finalTotal = Math.max(89, subtotal - discountAmount);
    const gstPortion = Math.round((finalTotal / 11) * 100) / 100;

    return {
      serviceName: sizeMethod === "hourly" ? `${hourlyHours} Hours Cleaning` : currentService.name,
      basePrice,
      bedCost,
      bathCost,
      storeyCost,
      extrasTotal,
      subtotal,
      discountPercent: discountPercent * 100,
      discountAmount,
      finalTotal,
      gstPortion,
    };
  }, [category, serviceId, sizeMethod, hourlyHours, bedrooms, bathrooms, storeys, selectedExtras, frequency]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookNow = () => {
    const query = new URLSearchParams({
      city: selectedCity,
      suburb: suburb || "",
      method: sizeMethod,
      hours: String(hourlyHours),
      service: serviceId,
      category,
      bedrooms: String(bedrooms),
      bathrooms: String(bathrooms),
      storeys: String(storeys),
      frequency,
      extras: selectedExtras.join(","),
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      price: String(priceCalculation.finalTotal),
    });
    router.push(`/book?${query.toString()}`);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const payload = {
      leadSource: "InstantQuoteHero",
      customerName,
      customerEmail,
      customerPhone,
      city: selectedCity,
      suburb,
      category,
      sizeMethod,
      service: priceCalculation.serviceName,
      bedrooms: sizeMethod === "size" ? bedrooms : undefined,
      bathrooms: sizeMethod === "size" ? bathrooms : undefined,
      hours: sizeMethod === "hourly" ? hourlyHours : undefined,
      storeys,
      frequency,
      extras: selectedExtras,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      quotedPriceAud: priceCalculation.finalTotal,
      timestamp: new Date().toISOString(),
    };

    console.log("CRM Capture Payload:", payload);

    setTimeout(() => {
      setIsSending(false);
      setQuoteSent(true);
      setTimeout(() => {
        setQuoteSent(false);
        setCrmModalOpen(false);
      }, 4000);
    }, 700);
  };

  // Testimonial snippets mapped by city
  const CITY_TESTIMONIALS: Record<CityId, { name: string; location: string; role: string; quote: string; image: string }> = {
    sydney: {
      name: "Sarah Jenkins",
      location: "Bondi, Sydney NSW",
      role: "Fortnightly Home Clean",
      quote: "Cleaning Superboss has been a game-changer. Our cleaner arrives on the dot, leaves the place smelling fresh and spotless.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
    },
    melbourne: {
      name: "Marcus Vance",
      location: "South Yarra, Melbourne VIC",
      role: "100% Bond Back Clean",
      quote: "Booked an end-of-lease clean for our 2-bed flat. Property manager was thrilled, full bond returned in 48 hours.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    },
    perth: {
      name: "Dr. Priya Sharma",
      location: "Subiaco, Perth WA",
      role: "Weekly Domestic Clean",
      quote: "Police-checked and fully insured cleaners I can trust blindly. The online quote took less than 60 seconds.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    },
    brisbane: {
      name: "Liam O'Donnell",
      location: "Brisbane CBD, QLD",
      role: "Commercial Office Client",
      quote: "Coming into a sanitised, fresh workplace every week has elevated our team morale. Very reliable and punctual.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop",
    },
    "gold-coast": {
      name: "Elena Rostova",
      location: "Surfers Paradise, Gold Coast QLD",
      role: "Airbnb Superhost Portfolio",
      quote: "Handles fast guest turnovers, linen changeovers, and consistently earns us 5-star cleanliness reviews.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop",
    },
    adelaide: {
      name: "Harrison Blake",
      location: "North Adelaide, SA",
      role: "Deep Spring Clean",
      quote: "Detailed every corner, skirting boards, window tracks, and oven. Exceptional quality and professionalism.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    },
  };

  const currentCityObj = CITIES.find((c) => c.id === selectedCity) || CITIES[0];
  const currentTestimonial = CITY_TESTIMONIALS[selectedCity] || CITY_TESTIMONIALS.perth;

  return (
    <section id="quote-form" className="relative w-full bg-[#f8fbfe] text-[#08295b] pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16 border-t border-[#d0e4f7] select-none scroll-mt-20">
      
      {/* Background Architectural Blueprint Grid Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#0d47a1_1px,transparent_1px)] [background-size:28px_28px] -z-0" />

      <div className="max-w-[1360px] mx-auto px-3 sm:px-6 md:px-10 lg:px-14 relative z-10 space-y-5 sm:space-y-6">
        
        {/* Editorial Trust & Header Showcase Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-1 sm:px-2">
          
          {/* Star Rating & Verified Testimonial Proof Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full bg-white border border-[#d0e4f7] text-[10px] sm:text-xs text-[#08295b] shadow-xs">
            {/* Customer Avatars Stack */}
            <div className="flex items-center -space-x-1.5">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop"
                alt="Sarah"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop"
                alt="Marcus"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-white"
              />
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop"
                alt="Priya"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-white"
              />
            </div>

            {/* Stars */}
            <div className="flex items-center text-amber-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-xs sm:text-sm leading-none">★</span>
              ))}
            </div>
            
            <span className="font-extrabold text-[#08295b]">4.9/5</span>
            <span className="text-[#08295b]/40">·</span>
            <span className="text-[#08295b]/80">
              Trusted by <strong className="font-extrabold text-[#08295b]">30,000+ {currentCityObj.name} Homes</strong>
            </span>
          </div>

          {/* Consistent Brand Heading (Matching LogoGrid font-bold) */}
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#08295b] leading-tight max-w-[850px] mx-auto px-1">
            Trusted Home &amp; Commercial Cleaning Across Australia
          </h2>

          {/* Subtitle */}
          <p className="text-[11px] sm:text-sm md:text-base text-[#08295b]/70 font-normal max-w-2xl mx-auto leading-relaxed px-1">
            Get an instant upfront price in under 60 seconds with verified Australian police-checked cleaners and 100% spotless guarantee.
          </p>

          {/* Active Verified Review Highlight */}
          <div className="max-w-2xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white border border-[#d0e4f7] text-[10.5px] sm:text-[11px] text-[#08295b]/85 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 shadow-xs text-center sm:text-left">
            <span className="line-clamp-2 sm:line-clamp-1">"{currentTestimonial.quote}"</span>
            <span className="font-bold text-[#0d47a1] shrink-0">— {currentTestimonial.name} ({currentTestimonial.location.split(",")[0]})</span>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="w-full max-w-3xl mx-auto pt-1">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d0e4f7] to-transparent" />
          </div>

        </div>

        {/* Compact Quoting Mode Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-2.5 w-full pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#d0e4f7] text-[#0d47a1] text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2196f3] animate-pulse" />
            <span>Instant Australian Quoting Engine</span>
          </div>

          <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-[#d0e4f7] shadow-xs gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("quick")}
              className={`flex-1 sm:flex-initial px-3 sm:px-5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                activeTab === "quick"
                  ? "bg-[#0d47a1] text-white shadow-xs"
                  : "text-[#08295b]/70 hover:text-[#08295b] hover:bg-[#f8fbfe]"
              }`}
            >
              ⚡ Quick Estimator Bar
            </button>
            <button
              onClick={() => setActiveTab("detailed")}
              className={`flex-1 sm:flex-initial px-3 sm:px-5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                activeTab === "detailed"
                  ? "bg-[#0d47a1] text-white shadow-xs"
                  : "text-[#08295b]/70 hover:text-[#08295b] hover:bg-[#f8fbfe]"
              }`}
            >
              🛠️ 6-Step Full Customizer
            </button>
          </div>
        </div>

        {/* QUICK 1-BAR ESTIMATOR VIEW */}
        {activeTab === "quick" && (
          <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-[#d0e4f7] p-3.5 sm:p-6 md:p-7 shadow-xl shadow-[#08295b]/8 space-y-4 sm:space-y-5">
            
            {/* Top Bar Header Row */}
            <div className="border-b border-[#d0e4f7] pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
              <div>
                <span className="text-[11px] font-extrabold text-[#0d47a1] uppercase tracking-wider block">
                  Book Your Clean Today:
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#08295b] leading-snug">
                  Select your specs to see your instant fixed rate in {currentCityObj.name}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-[11px] font-semibold shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2196f3]" />
                <span>100% Spotless Guarantee</span>
              </div>
            </div>

            {/* The Unified Horizontal Quick Row (Responsive 2-col on mobile, 6-col on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 sm:p-2 bg-[#f8fbfe] border border-[#d0e4f7] rounded-2xl items-center">
              
              {/* Sizing Method (By Size vs By Hours) */}
              <div className="col-span-1 bg-white rounded-xl border border-[#d0e4f7] p-2 flex flex-col justify-center relative group focus-within:border-[#2196f3]">
                <label className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#08295b]/60 pl-1 truncate">
                  Mode
                </label>
                <div className="relative flex items-center">
                  <select
                    value={sizeMethod}
                    onChange={(e) => setSizeMethod(e.target.value as "size" | "hourly")}
                    className="w-full text-xs font-bold text-[#08295b] bg-transparent outline-none cursor-pointer py-1 pr-4 appearance-none"
                  >
                    <option value="size">By Size</option>
                    <option value="hourly">By Hours</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1] absolute right-0.5 pointer-events-none" />
                </div>
              </div>

              {/* Bedrooms or Hours */}
              {sizeMethod === "size" ? (
                <div className="col-span-1 bg-white rounded-xl border border-[#d0e4f7] p-2 flex flex-col justify-center relative group focus-within:border-[#2196f3]">
                  <label className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#08295b]/60 pl-1 truncate">
                    Bedrooms
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full text-xs font-bold text-[#08295b] bg-transparent outline-none cursor-pointer py-1 pr-4 appearance-none"
                    >
                      <option value={1}>1 Bed</option>
                      <option value={2}>2 Beds</option>
                      <option value={3}>3 Beds</option>
                      <option value={4}>4 Beds</option>
                      <option value={5}>5 Beds</option>
                      <option value={6}>6+ Beds</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1] absolute right-0.5 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="col-span-1 bg-white rounded-xl border border-[#d0e4f7] p-2 flex flex-col justify-center relative group focus-within:border-[#2196f3]">
                  <label className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#08295b]/60 pl-1 truncate">
                    Hours
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={hourlyHours}
                      onChange={(e) => setHourlyHours(Number(e.target.value))}
                      className="w-full text-xs font-bold text-[#08295b] bg-transparent outline-none cursor-pointer py-1 pr-4 appearance-none"
                    >
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={5}>5 Hours</option>
                      <option value={6}>6+ Hours</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1] absolute right-0.5 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Bathrooms */}
              <div className="col-span-1 bg-white rounded-xl border border-[#d0e4f7] p-2 flex flex-col justify-center relative group focus-within:border-[#2196f3]">
                <label className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#08295b]/60 pl-1 truncate">
                  Bathrooms
                </label>
                <div className="relative flex items-center">
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full text-xs font-bold text-[#08295b] bg-transparent outline-none cursor-pointer py-1 pr-4 appearance-none"
                  >
                    <option value={1}>1 Bath</option>
                    <option value={2}>2 Baths</option>
                    <option value={3}>3 Baths</option>
                    <option value={4}>4+ Baths</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1] absolute right-0.5 pointer-events-none" />
                </div>
              </div>

              {/* Clean Type */}
              <div className="col-span-1 bg-white rounded-xl border border-[#d0e4f7] p-2 flex flex-col justify-center relative group focus-within:border-[#2196f3]">
                <label className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#08295b]/60 pl-1 truncate">
                  Clean Type
                </label>
                <div className="relative flex items-center">
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full text-xs font-bold text-[#08295b] bg-transparent outline-none cursor-pointer py-1 pr-4 appearance-none"
                  >
                    <option value="regular">Regular</option>
                    <option value="deep">Deep Clean</option>
                    <option value="bond">100% Bond</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="office">Office</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1] absolute right-0.5 pointer-events-none" />
                </div>
              </div>

              {/* Frequency */}
              <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-[#d0e4f7] p-2 flex flex-col justify-center relative group focus-within:border-[#2196f3]">
                <label className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#08295b]/60 pl-1 truncate">
                  Frequency
                </label>
                <div className="relative flex items-center">
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as FrequencyOption)}
                    className="w-full text-xs font-bold text-[#08295b] bg-transparent outline-none cursor-pointer py-1 pr-4 appearance-none"
                  >
                    <option value="once">Once Off</option>
                    <option value="weekly">Weekly (15% OFF)</option>
                    <option value="fortnightly">Fortnightly (10% OFF)</option>
                    <option value="monthly">Monthly (5% OFF)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1] absolute right-0.5 pointer-events-none" />
                </div>
              </div>

              {/* Book Now Button with Live Price Pill */}
              <button
                onClick={handleBookNow}
                className="col-span-2 sm:col-span-1 w-full min-h-[44px] sm:h-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#2196f3] to-[#0d47a1] hover:from-[#1e88e5] hover:to-[#08295b] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="text-sm font-extrabold">${priceCalculation.finalTotal}</span>
                <span>BOOK NOW</span>
              </button>

            </div>

            {/* Popular Suburbs Quick Pill Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#d0e4f7]/70 text-xs">
              <span className="font-bold text-[#0d47a1] flex items-center gap-1 text-[11px]">
                <MapPin className="w-3 h-3 text-[#2196f3]" />
                {currentCityObj.name} Hubs:
              </span>
              {currentCityObj.popularSuburbs.map((sub, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setSuburb(sub)}
                  className="px-2 py-0.5 rounded-md bg-[#f8fbfe] border border-[#d0e4f7] hover:border-[#2196f3] text-[#08295b]/80 hover:text-[#08295b] transition-colors cursor-pointer text-[10.5px]"
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Quick Summary & Reputation Subtitle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs text-[#08295b]/70 gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Top-rated Australian police-checked cleaners across {currentCityObj.name}.
                </span>
              </div>
              <button
                onClick={() => setActiveTab("detailed")}
                className="text-[#0d47a1] hover:text-[#2196f3] font-bold underline cursor-pointer shrink-0 text-[11px]"
              >
                Add oven, windows &amp; extras ▶
              </button>
            </div>

          </div>
        )}

        {/* FULL MULTI-STEP 6-STAGE ENGINE VIEW */}
        {activeTab === "detailed" && (
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start relative">
            
            {/* Left Column (8 cols): Interactive Step Customizer */}
            <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-[#d0e4f7] p-4 sm:p-6 shadow-xl shadow-[#08295b]/5 space-y-6">
              
              {/* Stage 1: Location & City Hub */}
              <div className="space-y-3 border-b border-[#d0e4f7] pb-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0d47a1]">
                  <span className="w-4 h-4 rounded-full bg-[#0d47a1] text-white flex items-center justify-center text-[9px] font-black">
                    1
                  </span>
                  <span>Service Location</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCity(c.id)}
                      className={`p-2 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                        selectedCity === c.id
                          ? "bg-[#0d47a1] text-white border-[#0d47a1] shadow-xs"
                          : "bg-[#f8fbfe] text-[#08295b] border-[#d0e4f7] hover:border-[#2196f3]"
                      }`}
                    >
                      <div className="text-xs font-bold">{c.name}</div>
                      <div className={`text-[9px] ${selectedCity === c.id ? "text-white/80" : "text-[#08295b]/50"}`}>
                        {c.state}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0d47a1]/50 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter your Suburb or Postcode (e.g. Subiaco, 6008)"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] focus:bg-white focus:border-[#2196f3] outline-none text-xs text-[#08295b] transition-all font-medium placeholder:text-[#08295b]/40"
                  />
                </div>
              </div>

              {/* Stage 2: Service Category & Specific Service */}
              <div className="space-y-3 border-b border-[#d0e4f7] pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0d47a1]">
                    <span className="w-4 h-4 rounded-full bg-[#0d47a1] text-white flex items-center justify-center text-[9px] font-black">
                      2
                    </span>
                    <span>Select Service Category</span>
                  </div>
                </div>

                {/* 3 Categories Pills */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "home", label: "Home", icon: Home },
                    { id: "business", label: "Business", icon: Building2 },
                    { id: "property", label: "Property", icon: KeyRound },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id as CategoryType);
                          const firstId = SERVICES[cat.id as CategoryType][0].id;
                          setServiceId(firstId);
                        }}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          category === cat.id
                            ? "bg-[#0d47a1] text-white border-[#0d47a1] shadow-xs"
                            : "bg-[#f8fbfe] text-[#08295b] border-[#d0e4f7] hover:border-[#2196f3]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Specific Services in Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                  {SERVICES[category].map((serv) => (
                    <button
                      key={serv.id}
                      onClick={() => setServiceId(serv.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        serviceId === serv.id
                          ? "bg-[#e3f2fd] border-[#0d47a1] ring-1 ring-[#0d47a1]"
                          : "bg-white border-[#d0e4f7] hover:border-[#2196f3]"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#08295b]">{serv.name}</div>
                        <p className="text-[10px] text-[#08295b]/70 mt-0.5 leading-snug">{serv.desc}</p>
                      </div>
                      <div className="text-[11px] font-semibold text-[#0d47a1] mt-2 flex items-center justify-between">
                        <span>From ${serv.baseRate} AUD</span>
                        {serviceId === serv.id && <Check className="w-3.5 h-3.5 text-[#0d47a1]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage 3: Property Layout & Size */}
              <div className="space-y-3.5 border-b border-[#d0e4f7] pb-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0d47a1]">
                  <span className="w-4 h-4 rounded-full bg-[#0d47a1] text-white flex items-center justify-center text-[9px] font-black">
                    3
                  </span>
                  <span>Property Layout &amp; Size</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Bedrooms Counter */}
                  <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#08295b]">
                      <span className="flex items-center gap-1.5 text-xs text-[#08295b]/80">
                        <Bed className="w-3.5 h-3.5 text-[#2196f3]" />
                        Bedrooms
                      </span>
                      <span className="text-[#0d47a1] font-bold text-xs">{bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          onClick={() => setBedrooms(num)}
                          className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                            bedrooms === num
                              ? "bg-[#0d47a1] text-white shadow-xs"
                              : "bg-white border border-[#d0e4f7] text-[#08295b] hover:bg-[#e3f2fd]"
                          }`}
                        >
                          {num === 6 ? "6+" : num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms Counter */}
                  <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#08295b]">
                      <span className="flex items-center gap-1.5 text-xs text-[#08295b]/80">
                        <Bath className="w-3.5 h-3.5 text-[#2196f3]" />
                        Bathrooms
                      </span>
                      <span className="text-[#0d47a1] font-bold text-xs">{bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => setBathrooms(num)}
                          className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                            bathrooms === num
                              ? "bg-[#0d47a1] text-white shadow-xs"
                              : "bg-white border border-[#d0e4f7] text-[#08295b] hover:bg-[#e3f2fd]"
                          }`}
                        >
                          {num === 4 ? "4+" : num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storeys */}
                  <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#08295b]">
                      <span className="text-xs text-[#08295b]/80">Building Levels</span>
                      <span className="text-[#0d47a1] font-bold text-xs">{storeys} Level</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          onClick={() => setStoreys(num)}
                          className={`flex-1 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            storeys === num
                              ? "bg-[#0d47a1] text-white shadow-xs"
                              : "bg-white border border-[#d0e4f7] text-[#08295b] hover:bg-[#e3f2fd]"
                          }`}
                        >
                          {num === 1 ? "1 Storey" : num === 2 ? "2 Storey" : "3+ Storey"}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Stage 4: Popular Extras */}
              <div className="space-y-3 border-b border-[#d0e4f7] pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0d47a1]">
                    <span className="w-4 h-4 rounded-full bg-[#0d47a1] text-white flex items-center justify-center text-[9px] font-black">
                      4
                    </span>
                    <span>Add Recommended Extras</span>
                  </div>
                  <span className="text-[10px] text-[#08295b]/60">Select any to include</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {EXTRAS.map((extra) => {
                    const isSelected = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 relative ${
                          isSelected
                            ? "bg-[#e3f2fd] border-[#0d47a1] ring-1 ring-[#0d47a1]"
                            : "bg-white border-[#d0e4f7] hover:border-[#2196f3]"
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-white border border-[#d0e4f7] shrink-0 mt-0.5">
                          {extra.icon}
                        </div>
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#08295b]">{extra.name}</span>
                            <span className="text-[11px] font-extrabold text-[#0d47a1]">+${extra.price}</span>
                          </div>
                          <p className="text-[9.5px] text-[#08295b]/65 leading-tight mt-0.5">{extra.subtitle}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-[#0d47a1] text-white flex items-center justify-center">
                            <Check className="w-2 h-2" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stage 5: Preferred Date & Time Slot */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0d47a1]">
                  <span className="w-4 h-4 rounded-full bg-[#0d47a1] text-white flex items-center justify-center text-[9px] font-black">
                    5
                  </span>
                  <span>Preferred Cleaning Schedule</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Date Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#08295b]/65">
                      Date of Service
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] focus:bg-white focus:border-[#2196f3] outline-none text-xs font-semibold text-[#08295b] cursor-pointer"
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#08295b]/65">
                      Arrival Window
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: "morning", label: "Morning", time: "8am - 11am" },
                        { id: "midday", label: "Midday", time: "11am - 2pm" },
                        { id: "afternoon", label: "Afternoon", time: "2pm - 5pm" },
                      ].map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`py-1.5 px-1 text-center rounded-xl border transition-all cursor-pointer ${
                            selectedTimeSlot === slot.id
                              ? "bg-[#0d47a1] text-white border-[#0d47a1]"
                              : "bg-[#f8fbfe] text-[#08295b] border-[#d0e4f7] hover:bg-white"
                          }`}
                        >
                          <div className="text-[11px] font-bold">{slot.label}</div>
                          <div className={`text-[8.5px] ${selectedTimeSlot === slot.id ? "text-white/80" : "text-[#08295b]/50"}`}>
                            {slot.time}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): Sticky Live Quote Summary & CTAs */}
            <div className="lg:col-span-4 bg-[#08295b] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/10 shadow-2xl space-y-4 lg:sticky lg:top-24 xl:top-28 z-20 self-start">
              
              <div className="border-b border-white/15 pb-3 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[#2196f3] text-[8.5px] font-mono font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3] animate-pulse" />
                  <span>Transparent Australian Quote</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Live Price Summary
                </h3>
              </div>

              {/* Itemized Breakdown List */}
              <div className="space-y-2 text-[11px] text-[#e3f2fd]/85">
                <div className="flex justify-between items-center">
                  <span>{priceCalculation.serviceName} ({bedrooms} bed, {bathrooms} bath)</span>
                  <span className="font-bold text-white">
                    ${priceCalculation.basePrice + priceCalculation.bedCost + priceCalculation.bathCost}
                  </span>
                </div>

                {priceCalculation.storeyCost > 0 && (
                  <div className="flex justify-between items-center text-white/70 text-[10.5px]">
                    <span>Storey Multiplier ({storeys} Levels)</span>
                    <span>+${priceCalculation.storeyCost}</span>
                  </div>
                )}

                {selectedExtras.length > 0 && (
                  <div className="flex justify-between items-center text-white/70 text-[10.5px]">
                    <span>{selectedExtras.length} Selected Extras</span>
                    <span>+${priceCalculation.extrasTotal}</span>
                  </div>
                )}

                {priceCalculation.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-500/20 text-[10.5px]">
                    <span>Recurring Frequency Discount</span>
                    <span>-${priceCalculation.discountAmount} AUD</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/15">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        ${priceCalculation.finalTotal} <span className="text-xs font-normal text-[#e3f2fd]/70">AUD</span>
                      </div>
                      <div className="text-[9.5px] text-[#e3f2fd]/60 mt-0.5">
                        Incl. ${priceCalculation.gstPortion} GST · No hidden fees
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frequency Selector Inside Quote */}
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                <label className="text-[9.5px] font-bold uppercase tracking-wider text-[#e3f2fd]/80">
                  Recurring Clean Discount:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "once", label: "Once-Off", disc: "Standard" },
                    { id: "weekly", label: "Weekly", disc: "15% OFF" },
                    { id: "fortnightly", label: "Fortnightly", disc: "10% OFF" },
                    { id: "monthly", label: "Monthly", disc: "5% OFF" },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq.id as FrequencyOption)}
                      className={`p-1.5 rounded-lg text-center transition-all cursor-pointer ${
                        frequency === freq.id
                          ? "bg-[#2196f3] text-white font-bold shadow-xs"
                          : "bg-white/5 hover:bg-white/10 text-white/80 font-medium"
                      }`}
                    >
                      <div className="text-[11px] font-bold">{freq.label}</div>
                      <div className="text-[8.5px] text-[#e3f2fd]/70">{freq.disc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary & Secondary Action CTAs */}
              <div className="space-y-2 pt-0.5">
                
                {/* 1-Click Direct Book */}
                <button
                  onClick={handleBookNow}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2196f3] to-[#1565c0] hover:from-[#1e88e5] hover:to-[#0d47a1] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#2196f3]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border border-white/20"
                >
                  <span>Book Clean Now · ${priceCalculation.finalTotal} AUD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Send Quote to Email / SMS */}
                <button
                  onClick={() => setCrmModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 hover:text-white font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  <Send className="w-3 h-3 text-[#2196f3]" />
                  <span>Email / SMS My Itemised Quote</span>
                </button>

                <div className="pt-0.5 text-center text-[9.5px] text-[#e3f2fd]/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Police Checked Cleaners · $10M Insured</span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* CRM CAPTURE MODAL / POPUP OVERLAY */}
        {crmModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08295b]/80 backdrop-blur-md">
            <div className="bg-white rounded-3xl border border-[#d0e4f7] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
              
              <div className="flex items-center justify-between border-b border-[#d0e4f7] pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0d47a1]">
                    Instant CRM Delivery
                  </span>
                  <h3 className="text-xl font-black text-[#08295b]">
                    Receive Your ${priceCalculation.finalTotal} AUD Quote
                  </h3>
                </div>
                <button
                  onClick={() => setCrmModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f8fbfe] border border-[#d0e4f7] flex items-center justify-center text-[#08295b] hover:bg-[#e3f2fd] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {quoteSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#08295b]">Quote Dispatched!</h4>
                  <p className="text-xs text-[#08295b]/70 max-w-sm mx-auto">
                    We have sent your itemized quote for <strong>${priceCalculation.finalTotal} AUD</strong> to {customerEmail || customerPhone}. Our local dispatch team is on standby.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendQuote} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#08295b]/70">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Taylor"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm font-medium outline-none focus:border-[#2196f3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#08295b]/70">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@email.com.au"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm font-medium outline-none focus:border-[#2196f3]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#08295b]/70">
                        Phone / SMS *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+61 460 849 843"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d0e4f7] bg-[#f8fbfe] text-xs sm:text-sm font-medium outline-none focus:border-[#2196f3]"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d0e4f7] text-[11px] text-[#08295b]/80 space-y-1">
                    <div className="font-bold text-[#08295b]">Quoting Summary:</div>
                    <div>
                      {priceCalculation.serviceName} in {CITIES.find(c => c.id === selectedCity)?.name} ({bedrooms} Bed, {bathrooms} Bath) · Fixed ${priceCalculation.finalTotal} AUD
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSending ? "Sending Quote..." : "Deliver Quote Instantly"}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-[#08295b]/50">
                    🔒 Strict Australian Privacy Principles compliance. No spam.
                  </p>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
