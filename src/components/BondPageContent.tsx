"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Phone,
  ArrowRight,
  ArrowLeft,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Home,
  Flame,
  Layers,
  Bath,
  Plus,
  Minus,
  X,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Send,
  Building2,
  KeyRound,
  FileCheck2,
  Sofa,
  Utensils,
  Trees,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";
import PerthLiveBookingMap from "@/components/PerthLiveBookingMap";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";

const BOND_SLIDER_IMAGES = [
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.41 AM.jpeg",
    tag: "Perth Vacate Specialists",
    title: "Real Estate Inspection-Ready Standards",
    desc: "Every nook, cranny, and appliance cleaned to perfection.",
  },
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.42 AM (1).jpeg",
    tag: "Deep Oven & Rangehood",
    title: "Heavy Degreasing & Burnt Carbon Removal",
    desc: "Pristine glass doors, wire racks, and exhaust filters.",
  },
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.42 AM (2).jpeg",
    tag: "Bathroom & Grout Polish",
    title: "Limescale & Soap Scum Elimination",
    desc: "Sparkling shower screens, tiles, mirrors, and drains.",
  },
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.42 AM.jpeg",
    tag: "Full Tenancy Handover",
    title: "Spotless Windows, Tracks & Skirtings",
    desc: "Detailed dust removal from flyscreens to door frames.",
  },
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.43 AM (1).jpeg",
    tag: "Kitchen Sanitisation",
    title: "Cupboards & Benchtop Deep Disinfection",
    desc: "Inside and out cleaning of all cupboards, drawers & sinks.",
  },
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.43 AM (2).jpeg",
    tag: "Agent Approved Finish",
    title: "High Standard Move-Out Presentation",
    desc: "Ready for immediate final inspection by property managers.",
  },
  {
    src: "/bond/WhatsApp Image 2026-09-04 at 5.06.43 AM.jpeg",
    tag: "100% Bond Guarantee",
    title: "Pristine Exit Clean Guaranteed",
    desc: "Complete 72-hour re-clean support with every booking.",
  },
];

const PERTH_SUBURB_REGIONS = [
  {
    region: "Perth CBD & Inner City",
    suburbs: [
      "Perth CBD",
      "East Perth",
      "West Perth",
      "Northbridge",
      "Subiaco",
      "Leederville",
      "Highgate",
      "Mount Lawley",
      "South Perth",
      "Victoria Park",
    ],
  },
  {
    region: "Northern Suburbs",
    suburbs: [
      "Joondalup",
      "Scarborough",
      "Innaloo",
      "Karrinyup",
      "Hillarys",
      "Clarkson",
      "Duncraig",
      "Balcatta",
      "Morley",
      "Wangara",
    ],
  },
  {
    region: "Southern Suburbs & Fremantle",
    suburbs: [
      "Fremantle",
      "Cockburn Central",
      "Cannington",
      "Melville",
      "Applecross",
      "Murdoch",
      "Rockingham",
      "Baldivis",
      "Mandurah",
      "Booragoon",
    ],
  },
  {
    region: "Eastern Suburbs & Hills",
    suburbs: [
      "Midland",
      "Bayswater",
      "Bassendean",
      "Guildford",
      "Belmont",
      "Ellenbrook",
      "Kalamunda",
      "Forrestfield",
      "Armadale",
      "Maddington",
    ],
  },
];

const PERTH_TESTIMONIALS: TestimonialItem[] = [
  {
    text: "Our property manager in Subiaco was notoriously strict, but Cleaning Superboss passed the exit condition report on the very first inspection. Full $2,400 bond refunded within 48 hours.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    name: "Sarah T.",
    role: "3 Bed House Bond Clean",
    location: "Subiaco, Perth WA",
    rating: 5,
  },
  {
    text: "Moving out of our Scarborough rental was super stressful until we hired this team. The oven and shower screens looked brand new. Got our quote in 15 mins and clean done the next day.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "Mark & Dan",
    role: "2 Bed Unit Vacate Clean",
    location: "Scarborough, Perth WA",
    rating: 5,
  },
  {
    text: "Booked their end of lease clean with carpet steam cleaning in Joondalup. The tax invoice and carpet certificate were accepted by the real estate agent immediately with zero fuss.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    name: "Chloe R.",
    role: "Townhouse + Carpet Steam",
    location: "Joondalup, Perth WA",
    rating: 5,
  },
  {
    text: "Pass first time guarantee was the main reason we booked. The team arrived on time in Fremantle, deep cleaned every window track and grease filter. Got 100% of our deposit back.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    name: "James & Emma",
    role: "4 Bed House Move-Out",
    location: "Fremantle, Perth WA",
    rating: 5,
  },
  {
    text: "Ray White property manager did the final walk-through and signed off with zero cleaning issues. Best vacate cleaning service in Perth!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    name: "David L.",
    role: "Apartment Bond Clean",
    location: "South Perth, WA",
    rating: 5,
  },
  {
    text: "Exceptional bond cleaning in East Perth. Our landlord checked the rangehood filters and window tracks with a flashlight and found nothing to complain about. 10/10 service.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    name: "Jessica Miller",
    role: "End of Lease Vacate",
    location: "East Perth, WA",
    rating: 5,
  },
  {
    text: "Needed a last-minute bond clean before our lease handover on Friday. Superboss fitted us in next morning and delivered an immaculate exit clean. Full bond released on Monday!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    name: "Lachlan Cooper",
    role: "Urgent Vacate Clean",
    location: "Victoria Park, WA",
    rating: 5,
  },
  {
    text: "We had pets so carpet steam cleaning + flea treatment receipt was required by our real estate agency. Superboss provided everything itemised and our bond was returned in full.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    name: "Dr. Priya Sharma",
    role: "House + Pet Bond Clean",
    location: "Mount Lawley, WA",
    rating: 5,
  },
  {
    text: "The cleanest oven and grout lines I have ever seen. Passed our inspection without a single rectification required. Worth every dollar for the peace of mind.",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop",
    name: "Harrison Blake",
    role: "Full Bond Clean",
    location: "Hillarys, Perth WA",
    rating: 5,
  },
];

const PERTH_CREDENTIALS = [
  {
    icon: Star,
    title: "4.9 / 5.0 Rating",
    desc: "Over 850+ verified Perth tenants and landlords with 5-star feedback.",
    badge: "★★★★★ Google Reviews",
  },
  {
    icon: ShieldCheck,
    title: "$10M Public Liability",
    desc: "Comprehensive insurance coverage protecting your rental premises.",
    badge: "Fully Insured",
  },
  {
    icon: CheckCircle2,
    title: "72-Hour Re-Clean",
    desc: "Free return rectification if your property manager flags any item.",
    badge: "100% Bond Guarantee",
  },
  {
    icon: Clock,
    title: "Fast 15-Min Quotes",
    desc: "Instant upfront itemised pricing tailored to your property specs.",
    badge: "Fast Response",
  },
];

const firstReviewCol = PERTH_TESTIMONIALS.slice(0, 3);
const secondReviewCol = PERTH_TESTIMONIALS.slice(3, 6);
const thirdReviewCol = PERTH_TESTIMONIALS.slice(6, 9);

const PERTH_FAQS = [
  {
    q: "Do you provide a 100% Bond Back Guarantee?",
    a: "Yes. Getting your bond back requires meeting strict Real Estate exit inspection standards. If your Perth property manager or landlord flags any cleaning item on the exit condition report within our guarantee period, we return to the property and rectify it completely free of charge. We prioritize inspection re-cleans urgently to protect your deposit.",
  },
  {
    q: "Do you provide an itemised tax invoice for my Perth real estate agent?",
    a: "Yes, 100%. Immediately upon completion of your clean, we issue a formal digital tax invoice and a signed end-of-lease vacate checklist certificate. You can forward this receipt directly to your property manager to prove professional vacate cleaning compliance.",
  },
  {
    q: "I don't have time to be at the property, can you organise key pick-up and drop-off with my Perth real estate agent?",
    a: "Absolutely! We frequently coordinate key collection and return directly with Perth real estate agencies or lockboxes. You don't need to take time off work or wait around on cleaning day.",
  },
  {
    q: "Do you do pre-sale cleaning and move-in cleaning?",
    a: "Yes. In addition to tenant vacate cleaning, we specialize in pre-sale property detailing for homeowners preparing to sell, as well as fresh move-in sanitisation cleans across all Perth suburbs.",
  },
  {
    q: "The previous tenant left the property in bad condition, will you still clean?",
    a: "Yes! Our commercial Perth cleaning teams have heavy-duty equipment and professional chemicals to tackle heavy oven grime, neglected shower glass limescale, and full-property deep restorations.",
  },
  {
    q: "Can I customize the quote or exclude items to save cost?",
    a: "Yes. If certain rooms or areas have already been cleaned or are not required by your landlord, let us know in your quote enquiry and we will adjust your custom quote accordingly.",
  },
  {
    q: "My house is a 2-storey townhouse, can you clean 2nd-floor windows?",
    a: "Yes. We clean all interior windows and accessible external glass. For 2-storey homes, we use specialized extension water-fed poles for external upper-level windows as an add-on.",
  },
  {
    q: "Is vacate cleaning the same as end of lease cleaning or bond cleaning in Perth?",
    a: "Yes. In Western Australia, 'vacate cleaning', 'end of lease cleaning', and 'bond cleaning' all refer to the comprehensive deep clean required to return a rental property to its original condition under WA real estate tenancy agreements.",
  },
  {
    q: "Can I add Carpet Steam Cleaning with a certificate for pet bond requirements?",
    a: "Yes! We offer hot-water extraction carpet steam cleaning and provide a certified receipt that satisfies WA real estate pet bond and flea treatment clauses.",
  },
  {
    q: "Does the rental property need electricity and hot water connected?",
    a: "Yes. To achieve a spotless finish that passes Real Estate exit standards, active power and hot water are required to operate commercial vacuum systems and hot water degreasers.",
  },
];

const POPULAR_PERTH_SUBURBS = [
  "Perth CBD",
  "Subiaco",
  "Scarborough",
  "Joondalup",
  "Fremantle",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BondPageContent() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const [showAllSuburbs, setShowAllSuburbs] = useState(false);
  const [showAllMobileFaqs, setShowAllMobileFaqs] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleExpandAllFaqs = () => {
    if (openFaqs.length === PERTH_FAQS.length) {
      setOpenFaqs([]);
    } else {
      setOpenFaqs(PERTH_FAQS.map((_, i) => i));
    }
  };

  // Multi-Step Quote Form State: 1 = Property & Contact, 2 = Date & Add-ons, 3 = Confirmation
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);

  // Bond Image Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  useEffect(() => {
    if (isSliderHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BOND_SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isSliderHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BOND_SLIDER_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BOND_SLIDER_IMAGES.length) % BOND_SLIDER_IMAGES.length);
  };

  // Step 1 Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [propertyType, setPropertyType] = useState("House");
  const [bedrooms, setBedrooms] = useState("3 Bedrooms");
  const [bathrooms, setBathrooms] = useState("2 Bathrooms");
  const [formError, setFormError] = useState("");

  // Step 2 Fields & Calendar State
  const [addCarpetSteam, setAddCarpetSteam] = useState(true);
  const [hasPets, setHasPets] = useState(false);
  const [addWindowCleaning, setAddWindowCleaning] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [currentCalendarDate, setCurrentCalendarDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calendar calculations
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const startOffset = (firstDayIndex + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  const handleSelectDate = (dayNum: number) => {
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      dayNum
    ).padStart(2, "0")}`;
    setSelectedDate(formatted);
  };

  const formatPillDate = (dateStr: string) => {
    if (!dateStr) return "Not selected";
    const [y, m, d] = dateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = DAY_NAMES[dateObj.getDay()];
    const monthShort = MONTH_NAMES[m - 1].slice(0, 3);
    return `${dayName}, ${d} ${monthShort} ${y}`;
  };

  const GHL_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/oOILUumPBLG7ihohI6gJ/webhook-trigger/5949a2ae-165e-478c-a6d0-57f96aa209e6";

  // Step 1: Validate and move to Step 2 (Calendar)
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !suburb.trim()) {
      setFormError("Please fill in your name, phone number, and Perth suburb.");
      return;
    }
    setFormError("");
    setFormStep(2);
  };

  // Step 2: Final Submit with Date, Address & Property Specs
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: fullName.trim(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      phoneNumber: phone.trim(),
      email: email.trim(),
      emailAddress: email.trim(),
      address: streetAddress.trim() || suburb.trim(),
      streetAddress: streetAddress.trim(),
      suburb: suburb.trim(),
      city: suburb.trim(),
      suburbPostcode: suburb.trim(),
      propertyType: propertyType,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      date: selectedDate,
      moveOutDate: selectedDate,
      selectedDate: selectedDate,
      service: "Perth Bond Cleaning",
      source: "Website Quote Form",
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("GoHighLevel Webhook Final Error:", err);
    } finally {
      setIsSubmitting(false);
      setFormStep(3);
    }
  };

  const handleResetForm = () => {
    setFormStep(1);
    setFullName("");
    setPhone("");
    setEmail("");
    setStreetAddress("");
    setSuburb("");
    setPropertyType("House");
    setBedrooms("3 Bedrooms");
    setBathrooms("2 Bathrooms");
    setAddCarpetSteam(true);
    setHasPets(false);
    setAddWindowCleaning(false);
    setAdditionalNotes("");
    const d = new Date();
    d.setDate(d.getDate() + 3);
    setSelectedDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-[#08295b]">
      {/* Hero Section with Dedicated Quote Enquiry Form */}
      <section className="relative w-full pt-20 sm:pt-24 pb-8 sm:pb-14 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7] overflow-hidden">
        {/* Background Video with Clean Visible Presentation & Left Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/Short_ready_to_paste_version_C_gwr_video_mvp.mp4" type="video/mp4" />
          </video>
          {/* Left-side targeted blur & gradient for crisp headline legibility */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-[#f8fbfe]/85 via-[#f8fbfe]/60 to-transparent backdrop-blur-[6px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-white/20" />
          <div className="absolute inset-0 bg-[#08295b]/5" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Streamlined Heading, Value Cards & Reassurance */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#e3f2fd]/90 backdrop-blur-xs border border-[#d0e4f7] text-[#0d47a1] text-[11px] sm:text-xs font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2196f3]" />
              <span>PERTH BOND CLEANING • FAST QUOTE RESPONSE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-5xl font-black text-[#08295b] tracking-tight leading-[1.15]">
                Perth Bond Cleaning &amp; <br className="hidden sm:inline" />
                <span className="text-[#0d47a1]">End Of Lease Specialists</span>
              </h1>
              <p className="text-xs sm:text-base text-[#08295b]/80 max-w-xl font-medium leading-relaxed">
                Pass your Perth property manager&apos;s exit inspection first time. Includes full oven degreasing, window tracks, sanitisation, and a 72-hour free re-clean guarantee.
              </p>
            </div>

            {/* Reassurance Feature Line */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-[#08295b]">
              <span className="flex items-center gap-1 text-[#0d47a1]">
                <Check className="w-3.5 h-3.5 text-[#2196f3] stroke-[3]" />
                Perth-Wide Service
              </span>
              <span className="flex items-center gap-1 text-[#0d47a1]">
                <Check className="w-3.5 h-3.5 text-[#2196f3] stroke-[3]" />
                Detailed Cleaning Checklist
              </span>
              <span className="flex items-center gap-1 text-[#0d47a1]">
                <Check className="w-3.5 h-3.5 text-[#2196f3] stroke-[3]" />
                Free Quote
              </span>
            </div>
          </div>

          {/* Right Column: Multi-Step Quote Form Card */}
          <div id="quote-form" className="lg:col-span-5 scroll-mt-24 mt-4 sm:mt-6 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-[#d0e4f7] shadow-xl shadow-[#0d47a1]/10 px-5 sm:px-7 pt-6 sm:pt-7 pb-5 sm:pb-7 overflow-hidden transition-all">
              
              {/* ================= STEP 1: PROPERTY & CONTACT DETAILS ================= */}
              {formStep === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-3.5">
                  <div className="text-center pb-0.5 space-y-0.5">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0d47a1] bg-[#e3f2fd] px-2.5 py-0.5 rounded-full border border-[#d0e4f7]">
                      Step 1 of 2 · Property &amp; Contact
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#08295b] tracking-tight">
                      Request a Quote
                    </h3>
                    <p className="text-xs text-[#08295b]/70">
                      Perth Bond Cleaning · Fast 15-Min Response
                    </p>
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
                      {formError}
                    </div>
                  )}

                  {/* Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#08295b]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Liam Smith"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#fcfdff] text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] focus:ring-2 focus:ring-[#2196f3]/15 transition-all placeholder:text-[#08295b]/35 shadow-2xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#08295b]">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0400 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#fcfdff] text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] focus:ring-2 focus:ring-[#2196f3]/15 transition-all placeholder:text-[#08295b]/35 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-[#08295b]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="liam@example.com.au (for tax quote & invoice)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#fcfdff] text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] focus:ring-2 focus:ring-[#2196f3]/15 transition-all placeholder:text-[#08295b]/35 shadow-2xs"
                    />
                  </div>

                  {/* Perth Suburb / Postcode & Street Address */}
                  <div className="space-y-2 text-left">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#08295b]">
                          Perth Suburb / Postcode *
                        </label>
                        <span className="text-[10px] text-[#0d47a1] font-semibold">
                          WA Metro Area
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Subiaco 6008, Joondalup 6027, Fremantle..."
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#fcfdff] text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] focus:ring-2 focus:ring-[#2196f3]/15 transition-all placeholder:text-[#08295b]/35 shadow-2xs"
                      />
                      {/* Quick Suburb Suggestions */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {POPULAR_PERTH_SUBURBS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSuburb(s)}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#e3f2fd] text-[#0d47a1] hover:bg-[#2196f3] hover:text-white transition-colors cursor-pointer"
                          >
                            +{s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Street Address / Unit (Optional) */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#08295b]">
                        Street Address / Unit # <span className="text-[#08295b]/50 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Unit 4, 128 Hay Street"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-[#fcfdff] text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] focus:ring-2 focus:ring-[#2196f3]/15 transition-all placeholder:text-[#08295b]/35 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-[#08295b]">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {["House", "Unit / Apt", "Townhouse", "Villa"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                            propertyType === type
                              ? "bg-[#0d47a1] text-white shadow-xs"
                              : "bg-[#f8fbfe] border border-[#d0e4f7] text-[#08295b] hover:bg-[#e3f2fd]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div className="grid grid-cols-2 gap-2.5 text-left">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#08295b]">
                        Bedrooms
                      </label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-white text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] cursor-pointer shadow-2xs"
                      >
                        <option value="Studio">Studio</option>
                        <option value="1 Bedroom">1 Bedroom</option>
                        <option value="2 Bedrooms">2 Bedrooms</option>
                        <option value="3 Bedrooms">3 Bedrooms</option>
                        <option value="4 Bedrooms">4 Bedrooms</option>
                        <option value="5+ Bedrooms">5+ Bedrooms</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#08295b]">
                        Bathrooms
                      </label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#d0e4f7] bg-white text-xs font-medium text-[#08295b] outline-none focus:border-[#2196f3] cursor-pointer shadow-2xs"
                      >
                        <option value="1 Bathroom">1 Bathroom</option>
                        <option value="2 Bathrooms">2 Bathrooms</option>
                        <option value="3 Bathrooms">3 Bathrooms</option>
                        <option value="4+ Bathrooms">4+ Bathrooms</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 1 Next Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#0d47a1]/25 transition-all cursor-pointer active:scale-98 flex items-center justify-center"
                    >
                      <span>Continue to Select Date</span>
                    </button>
                    <p className="text-[10px] text-[#08295b]/60 text-center">
                      Free quote • No obligation • Instant dispatch
                    </p>
                  </div>
                </form>
              )}

              {/* ================= STEP 2: PREFERRED DATE CALENDAR ================= */}
              {formStep === 2 && (
                <form onSubmit={handleFinalSubmit} className="space-y-3.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#d0e4f7]/70">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0d47a1] hover:text-[#2196f3] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <span className="text-[10px] font-bold text-[#0d47a1] bg-[#e3f2fd] px-2.5 py-0.5 rounded-full border border-[#d0e4f7]">
                      Step 2 of 2 · Select Date
                    </span>
                  </div>

                  <div className="text-center space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-black text-[#08295b] tracking-tight">
                      Select Preferred Clean Date
                    </h3>
                    <p className="text-xs text-[#08295b]/70">
                      When is your lease handover or exit inspection?
                    </p>
                  </div>

                  {/* Interactive Month/Date Calendar */}
                  <div className="bg-[#f8fbfe] p-3 rounded-2xl border border-[#d0e4f7] space-y-2.5">
                    {/* Month Navigator Header */}
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-7 h-7 rounded-lg border border-[#d0e4f7] bg-white flex items-center justify-center text-[#08295b] hover:bg-[#e3f2fd] cursor-pointer"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-black text-[#08295b]">
                        {MONTH_NAMES[month]} {year}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-7 h-7 rounded-lg border border-[#d0e4f7] bg-white flex items-center justify-center text-[#08295b] hover:bg-[#e3f2fd] cursor-pointer"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Weekday Names */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#08295b]/60">
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {[...Array(startOffset)].map((_, i) => (
                        <div key={`blank-${i}`} className="h-7 sm:h-8" />
                      ))}
                      {[...Array(daysInMonth)].map((_, i) => {
                        const dayNum = i + 1;
                        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                          dayNum
                        ).padStart(2, "0")}`;
                        const isSelected = selectedDate === dateString;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => handleSelectDate(dayNum)}
                            className={`h-7 sm:h-8 w-full rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? "bg-[#0d47a1] text-white shadow-xs"
                                : "bg-white border border-[#d0e4f7]/70 text-[#08295b] hover:bg-[#e3f2fd]"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Date Summary Badge */}
                    <div className="pt-1 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0d47a1] bg-white border border-[#d0e4f7] px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-[#2196f3]" />
                        <span>Move-out Clean: {formatPillDate(selectedDate)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Final Submit Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#0d47a1]/25 transition-all cursor-pointer active:scale-98 flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">SUBMITTING QUOTE REQUEST...</span>
                      ) : (
                        <span>REQUEST A QUOTE</span>
                      )}
                    </button>
                    <p className="text-[10px] text-[#08295b]/60 text-center">
                      Free quote • 72-Hour Inspection Re-clean Guarantee
                    </p>
                  </div>
                </form>
              )}

              {/* ================= STEP 3: SUCCESS / CONFIRMATION SCREEN ================= */}
              {formStep === 3 && (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0d47a1] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#0d47a1]/25">
                    <Check className="w-9 h-9 stroke-[3]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[#08295b] tracking-tight">
                      Quote Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#0d47a1]">
                      Our Perth team is preparing your custom quote.
                    </p>
                  </div>

                  <p className="text-xs text-[#08295b]/75 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{fullName || "there"}</strong>! We have received your bond cleaning enquiry for your <strong>{propertyType} in {suburb || "Perth"}</strong>. We will contact you within 15–30 minutes with a fixed, transparent quote.
                  </p>

                  <div className="p-3.5 bg-[#f8fbfe] rounded-2xl border border-[#d0e4f7] text-left text-xs space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-[#08295b]">
                      <MapPin className="w-3.5 h-3.5 text-[#2196f3]" />
                      <span>Location: {streetAddress ? `${streetAddress}, ${suburb}` : `${suburb}, Perth WA`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#08295b]/80">
                      <Home className="w-3.5 h-3.5 text-[#2196f3]" />
                      <span>{bedrooms} · {bathrooms} · {propertyType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0d47a1] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#2196f3]" />
                      <span>Requested Date: {formatPillDate(selectedDate)}</span>
                    </div>
                  </div>

                  {/* Immediate Response Info */}
                  <div className="pt-2">
                    <div className="p-3 bg-[#e3f2fd] rounded-xl border border-[#d0e4f7] text-xs font-bold text-[#0d47a1] flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2196f3]" />
                      <span>Priority Dispatch: We will reach out within 15–30 minutes</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-[11px] text-[#08295b]/50 hover:text-[#0d47a1] underline cursor-pointer"
                    >
                      Submit another Perth quote enquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Cleaning Superboss for Perth Bond Cleaning */}
      <section id="why-us" className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7] bg-[#f8fbfe] scroll-mt-16">
        <div className="max-w-[1360px] mx-auto space-y-8 lg:space-y-0">
          
          {/* Mobile Title (Appears before photo slider on mobile screens) */}
          <div className="space-y-2 sm:space-y-3 lg:hidden">
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3.5 py-1.5 rounded-full border border-[#d0e4f7]">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08295b] tracking-tight">
              Why Perth Tenants Choose Cleaning Superboss for Vacate Cleans
            </h2>
            <p className="text-xs sm:text-sm text-[#08295b]/70 leading-relaxed">
              We take the stress out of moving in Perth by delivering property manager-approved cleans backed by our unconditional guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Action Photo Carousel */}
            <div className="lg:col-span-5 relative lg:sticky lg:top-24">
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#d0e4f7] aspect-[4/3] sm:aspect-[4/5] bg-[#08295b] group select-none"
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
              >
                {/* Slides */}
                {BOND_SLIDER_IMAGES.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={`Perth bond cleaning showcase ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}

                {/* Slider Controls Overlay */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20">
                    {currentSlide + 1} / {BOND_SLIDER_IMAGES.length}
                  </span>
                </div>

                {/* Nav Arrows */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#08295b] shadow-lg backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#08295b] shadow-lg backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {BOND_SLIDER_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlide
                          ? "w-5 bg-[#2196f3]"
                          : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 4 Feature Value Pillars (Desktop title inside) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="hidden lg:block space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3.5 py-1.5 rounded-full border border-[#d0e4f7]">
                    Why Choose Us
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08295b] tracking-tight">
                  Why Perth Tenants Choose Cleaning Superboss for Vacate Cleans
                </h2>
                <p className="text-xs sm:text-sm text-[#08295b]/70 leading-relaxed">
                  We take the stress out of moving in Perth by delivering property manager-approved cleans backed by our unconditional guarantee.
                </p>
              </div>

            <div className="space-y-4">
              {[
                {
                  num: "1",
                  title: "100% Bond Return Guarantee",
                  desc: "If your Perth property fails inspection on any cleaning item, we return to fix it completely free of charge. Your deposit return is guaranteed with an official Real Estate-compliant tax invoice.",
                },
                {
                  num: "2",
                  title: "Local Perth Expertise & Suburb Knowledge",
                  desc: "From coastal salt residue and grit in Fremantle to heavy hard water stains in Joondalup, we understand each suburb's unique cleaning challenges.",
                },
                {
                  num: "3",
                  title: "Transparent Quotes & No Hidden Fees",
                  desc: "Upfront, transparent quote tailored specifically to your property size and tenancy requirements. No surprise surcharges on cleaning day.",
                },
                {
                  num: "4",
                  title: "Trusted by 50+ Real Estate Agencies & Key Drop-off",
                  desc: "Perth real estate agents recommend us as their preferred cleaning provider. We can even coordinate key pick-up and drop-off directly with your agency.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d0e4f7] shadow-sm flex items-start gap-4 hover:border-[#2196f3] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0d47a1] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md shadow-[#0d47a1]/20">
                    {item.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#08295b]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#08295b]/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#0d47a1]/25 transition-all cursor-pointer"
              >
                <span>Request a Quote</span>
              </button>
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* Interactive Before & After Transformation Showcase */}
      <BeforeAfterShowcase />

      {/* Perth Suburbs & Greater WA Metro Coverage Section */}
      <section id="suburbs" className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7] bg-[#f8fbfe] scroll-mt-16">
        <div className="max-w-[1360px] mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-4 py-1.5 rounded-full border border-[#d0e4f7]">
                Service Area
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08295b] tracking-tight">
              Perth Suburbs & Areas We Service
            </h2>
            <p className="text-xs sm:text-sm text-[#08295b]/70 leading-relaxed">
              Covering all suburbs North and South of the Swan River, from Joondalup down to Mandurah and east to the Perth Hills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PERTH_SUBURB_REGIONS.map((regionData, idx) => {
              const isHiddenOnMobile = !showAllSuburbs && idx >= 1;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#d0e4f7] shadow-sm hover:border-[#2196f3] transition-all space-y-3.5 ${
                    isHiddenOnMobile ? "hidden md:block" : "block"
                  }`}
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-[#d0e4f7]">
                    <MapPin className="w-4 h-4 text-[#0d47a1]" />
                    <h3 className="font-bold text-sm text-[#08295b]">{regionData.region}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {regionData.suburbs.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#d0e4f7] text-[#08295b]/80 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile "See More / Show Less" Suburb Toggle Button */}
          <div className="md:hidden flex justify-center pt-1">
            <button
              type="button"
              onClick={() => setShowAllSuburbs((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#d0e4f7] hover:border-[#2196f3] text-[#0d47a1] text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span>{showAllSuburbs ? "Show Fewer Areas" : "See More Perth Suburbs & Areas (+3)"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAllSuburbs ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-[#08295b]/70 mb-3">
              Don&apos;t see your suburb listed? We cover 100% of the Greater Perth Metropolitan Area.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>Get a Quote for Your Suburb</span>
            </button>
          </div>

        </div>
      </section>

      {/* Perth Customer Testimonials (Rich Testimonial Cards & Carousel) */}
      <section id="reviews" className="bg-[#f8fbfe] py-14 sm:py-20 md:py-24 relative overflow-hidden border-y border-[#d0e4f7] scroll-mt-16">
        
        {/* Background ambient lighting accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#2196f3]/10 via-[#0d47a1]/5 to-transparent blur-[160px] pointer-events-none -z-0" />

        <div className="max-w-[1360px] z-10 mx-auto px-3.5 sm:px-6 md:px-10 lg:px-12 relative">
          
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 px-1">
            {/* Google Reviews Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#d0e4f7] shadow-xs">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-amber-500 font-black text-xs sm:text-sm tracking-wider">★★★★★</span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#08295b]">
                Google Reviews
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#08295b]">
              Trusted by Hundreds of Perth Tenants &amp; Landlords
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#08295b]/75 max-w-2xl font-medium leading-relaxed">
              Real feedback from verified tenants, homeowners, and real estate property managers across Perth and Western Australia.
            </p>
          </div>

          {/* Verified Credentials 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mt-8 sm:mt-10">
            {PERTH_CREDENTIALS.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#d0e4f7] p-4.5 sm:p-5 shadow-xs hover:shadow-md hover:border-[#2196f3] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#e3f2fd] border border-[#d0e4f7] flex items-center justify-center text-[#0d47a1]">
                        <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#0d47a1]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#0d47a1] bg-[#e3f2fd] px-2.5 py-0.5 rounded-full border border-[#d0e4f7]">
                        {cred.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#08295b]">
                        {cred.title}
                      </h3>
                      <p className="text-xs text-[#08295b]/70 mt-1 leading-relaxed">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Column Infinite Vertical Scrolling Carousel */}
          <div className="flex justify-center gap-6 mt-10 sm:mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[600px] sm:max-h-[660px] overflow-hidden">
            <TestimonialsColumn testimonials={firstReviewCol} duration={16} />
            <TestimonialsColumn testimonials={secondReviewCol} className="hidden md:block" duration={21} />
            <TestimonialsColumn testimonials={thirdReviewCol} className="hidden lg:block" duration={18} />
          </div>

          {/* Bottom CTA Button */}
          <div className="mt-8 sm:mt-10 text-center flex items-center justify-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="px-7 sm:px-8 py-3.5 rounded-full bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Get a Free Bond Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Service-Specific FAQs with Background Watermark & Refined Accordion */}
      <section id="faq" className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-14 border-b border-[#d0e4f7] bg-[#f8fbfe] overflow-hidden scroll-mt-16">
        
        {/* Background Watermark Text "FAQS" matching the reference design */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden leading-none">
          <span className="text-[28vw] sm:text-[24vw] md:text-[260px] font-black uppercase tracking-widest text-[#08295b]/[0.035] translate-y-6 sm:translate-y-10">
            FAQS
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#d0e4f7] pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#0d47a1] uppercase bg-[#e3f2fd] px-3.5 py-1 rounded-full border border-[#d0e4f7]">
                Perth Bond Cleaning
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#08295b] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#08295b]/70 max-w-xl">
                Everything you need to know about your bond clean, real estate inspection checklists, and guarantee.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExpandAllFaqs}
              className="self-start md:self-end text-xs font-bold text-[#0d47a1] hover:text-[#2196f3] underline cursor-pointer"
            >
              {openFaqs.length === PERTH_FAQS.length ? "Collapse All" : "Expand All"}
            </button>
          </div>

          {/* Minimalist Line-Separated Accordion with Circular +/- Pill Toggle */}
          <div className="divide-y divide-[#d0e4f7]/80 border-b border-[#d0e4f7]/80">
            {PERTH_FAQS.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx);
              const isHiddenOnMobile = !showAllMobileFaqs && idx >= 5;

              return (
                <div
                  key={idx}
                  className={`py-5 sm:py-6 group transition-colors ${
                    isHiddenOnMobile ? "hidden md:block" : "block"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-6 text-left cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm md:text-[15px] font-bold text-[#08295b] group-hover:text-[#0d47a1] transition-colors leading-snug">
                      {faq.q}
                    </span>

                    {/* Circular +/- Action Icon */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? "bg-[#08295b] text-white shadow-sm"
                          : "border border-[#d0e4f7] bg-white text-[#08295b]/70 group-hover:border-[#0d47a1] group-hover:text-[#0d47a1]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Content */}
                  {isOpen && (
                    <div className="mt-3.5 pr-10 sm:pr-14 text-xs sm:text-sm text-[#08295b]/80 leading-relaxed font-medium">
                      <p className="p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-[#d0e4f7]/60 shadow-2xs">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile-Only "See More / Show Less FAQs" Toggle */}
          <div className="md:hidden flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllMobileFaqs((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#d0e4f7] hover:border-[#2196f3] text-[#0d47a1] text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>{showAllMobileFaqs ? "Show Fewer Questions" : `See More FAQs (+${PERTH_FAQS.length - 5})`}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAllMobileFaqs ? "rotate-180" : ""}`} />
            </button>
          </div>

        </div>
      </section>

      {/* Contact & Operating Hours Section (Perth / WA Timezone) */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-14 relative overflow-hidden border-b border-[#d0e4f7] scroll-mt-16">
        
        {/* Background Stock Image with Clean Visible Presentation */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/contact_support_bg.jpg"
            alt="Perth Customer Support Team"
            className="w-full h-full object-cover object-center"
          />
          {/* Translucent overlay for vibrant visibility & crisp contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/35 to-white/60" />
          <div className="absolute inset-0 bg-[#08295b]/10" />
        </div>

        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#d0e4f7] text-[#0d47a1] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Perth Customer Support</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08295b] tracking-tight drop-shadow-xs">
              Get In Touch
            </h2>
            <p className="text-sm sm:text-base text-[#08295b] font-bold">
              Multiple ways to reach our friendly team across Western Australia
            </p>
          </div>

          {/* 2-Column Responsive Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Column: Direct Contact Details (7 cols) */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#d0e4f7] shadow-xl shadow-[#08295b]/5 flex flex-col justify-between space-y-6">
              <div className="space-y-5 sm:space-y-6">
                
                <div className="border-b border-[#d0e4f7]/70 pb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#08295b]">
                    Contact Information
                  </h3>
                  <p className="text-xs sm:text-sm text-[#08295b]/60 mt-0.5">
                    Reach out for vacate quotes, scheduling, or real estate inspection inquiries.
                  </p>
                </div>



                {/* Email Card */}
                <a
                  href="mailto:marketingsuperboss@gmail.com"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-[#f8fbfe] border border-[#d0e4f7]/80 hover:border-[#2196f3]/60 hover:bg-white transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200/80 flex items-center justify-center text-indigo-500 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="pt-0.5 space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#08295b]">Email Support</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100/70 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">Fast Reply</span>
                    </div>
                    <div className="text-sm font-semibold text-[#0d47a1] group-hover:underline break-all">
                      marketingsuperboss@gmail.com
                    </div>
                    <div className="text-[11px] text-[#08295b]/60">
                      Average response time under 15 minutes during operating hours
                    </div>
                  </div>
                </a>

                {/* Bookings Card */}
                <div
                  onClick={scrollToForm}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-[#f8fbfe] border border-[#d0e4f7]/80 hover:border-[#2196f3]/60 hover:bg-white transition-all duration-200 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200/80 flex items-center justify-center text-[#2196f3] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5 text-[#2196f3]" />
                  </div>
                  <div className="pt-0.5 space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#08295b]">Bookings & Quotes</span>
                      <span className="text-[11px] font-bold text-[#0d47a1] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Get Quote ↑
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[#0d47a1] group-hover:underline">
                      Instant Online Quote / Booking
                    </div>
                    <div className="text-[11px] text-[#08295b]/60">
                      Calculate your bond clean price and lock in your move-out date
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Working Hours Card (5 cols) */}
            <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#d0e4f7] shadow-xl shadow-[#08295b]/5 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                
                {/* Hours Header with Live Badge */}
                <div className="flex items-center justify-between border-b border-[#d0e4f7]/70 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#08295b]">
                        Working Hours
                      </h3>
                      <div className="text-[11px] font-medium text-[#08295b]/60">
                        WA Time (AWST)
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Open 7 Days
                  </span>
                </div>

                {/* Day-by-day Timetable */}
                <div className="space-y-2 text-xs sm:text-sm">
                  {[
                    { day: "Monday", time: "7:00 am - 8:00 pm" },
                    { day: "Tuesday", time: "7:00 am - 8:00 pm" },
                    { day: "Wednesday", time: "7:00 am - 8:00 pm" },
                    { day: "Thursday", time: "7:00 am - 8:00 pm" },
                    { day: "Friday", time: "7:00 am - 8:00 pm" },
                    { day: "Saturday", time: "7:00 am - 7:00 pm", isWeekend: true },
                    { day: "Sunday", time: "8:00 am - 6:00 pm", isWeekend: true },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                        item.isWeekend
                          ? "bg-[#e3f2fd]/40 font-semibold text-[#08295b]"
                          : "bg-[#f8fbfe] hover:bg-[#e3f2fd]/30 text-[#08295b]"
                      }`}
                    >
                      <span className="font-bold">{item.day}</span>
                      <span className="font-mono text-xs text-[#08295b]/80 font-medium">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Guarantee Reassurance */}
              <div className="pt-2 border-t border-[#d0e4f7]/60 flex items-center gap-2.5 text-xs text-[#08295b]/70">
                <ShieldCheck className="w-4 h-4 text-[#2196f3] shrink-0" />
                <span>Backed by our 72-Hour Inspection Re-clean Guarantee</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Recent Cleaning Bookings Across Perth (Live Activity Map) */}
      <PerthLiveBookingMap />

      {/* Bottom Conversion CTA Banner */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#0d47a1] text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-white uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2196f3]" />
            100% Bond Back Guarantee
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Moving Out in Perth? Claim Your Free Vacate Quote Today
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto">
            Get an itemised quote tailored to your Perth rental. 100% inspection-ready results backed by our 72-hour free reclean policy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToForm}
              className="px-8 py-4 rounded-full bg-white hover:bg-[#e3f2fd] text-[#0d47a1] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Shared Global Footer */}
      <div className="pb-16 md:pb-0">
        <Footer />
      </div>
    </div>
  );
}
