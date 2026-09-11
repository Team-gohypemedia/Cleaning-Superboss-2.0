import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Bond & Vacate Cleaning Australia | Cleaning Superboss",
  description:
    "100% Bond Back Guarantee! Comprehensive end-of-lease vacate cleaning tailored for Australian real estate checklists. Free 72-hour re-clean. Upfront pricing & online booking.",
  keywords: [
    "Bond Cleaning",
    "End of Lease Cleaning",
    "Vacate Cleaning",
    "Bond Cleaners",
    "End of Tenancy Cleaning",
    "Real Estate Vacate Cleaning",
  ],
};

export default function BondCleaningPage() {
  return (
    <ServicePageTemplate
      serviceTitle="Bond Cleaning"
      badge="100% Bond Back Guarantee · Real Estate Approved"
      tagline="Inspection-Ready Vacate Cleaning. 100% Bond Back Guarantee."
      description="Don't risk losing your deposit. Our experienced cleaners follow approved Australian real estate exit checklists with an unconditional 72-hour free reclean guarantee."
      heroImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
      startingPrice="$309"
      hourlyRate="Fixed Upfront Pricing (No Hidden Fees)"
      pricingRows={[
        { property: "1 Bedroom / 1 Bathroom", durationApprox: "3.5 – 4.5 hrs", oneOff: "$309", recurring: "$279" },
        { property: "2 Bedroom / 1-2 Bathroom", durationApprox: "4.5 – 6.0 hrs", oneOff: "$419", recurring: "$389", popular: true },
        { property: "3 Bedroom / 2 Bathroom", durationApprox: "6.0 – 7.5 hrs", oneOff: "$519", recurring: "$479" },
        { property: "4 Bedroom / 2+ Bathroom", durationApprox: "7.5 – 9.0 hrs", oneOff: "$639", recurring: "$599" },
        { property: "5+ Bedroom / Large House", durationApprox: "9.0+ hrs", oneOff: "$759", recurring: "$719" },
      ]}
      included={[
        {
          category: "Kitchen & Appliances (Exit Standard)",
          tasks: [
            "Inside & outside of oven, wire racks, trays & glass door degreased",
            "Rangehood exhaust filters degreased & stovetop scrubbed",
            "All cupboards, drawers, shelving & kickboards wiped inside & out",
            "Dishwasher wiped inside & out with filter rinsed",
            "Deep scrub & polish of sink, chrome tapware & splashback",
          ],
        },
        {
          category: "Bathrooms, Ensuites & Laundry",
          tasks: [
            "Shower screens & wall grout descaled of heavy limescale & soap scum",
            "Deep scrub & disinfection of bathtubs, sinks & chrome tapware",
            "Toilets sanitised inside and out including base & cistern",
            "Mirrors polished streak-free & vanity cupboards wiped inside/out",
            "Laundry tub, tapware, dryer lint filter & cabinets detailed",
          ],
        },
        {
          category: "Living, Bedrooms & Structural Detail",
          tasks: [
            "Interior window glass, window sills & tracks vacuumed and wiped",
            "Built-in wardrobes, drawers & mirrors cleaned inside and out",
            "Skirting boards, door frames, architraves & light switches wiped",
            "Ceiling fan blades & air conditioning vent covers dusted",
            "Spot wipe scuff marks off walls & high-power carpet vacuuming",
          ],
        },
      ]}
      testimonial={{
        quote: "Got our full $2,400 bond refunded with zero issues! The property manager was genuinely impressed with how clean the oven and bathrooms were. The 72-hour guarantee gave us huge peace of mind.",
        author: "Marcus Vance",
        location: "Tenant · Perth WA",
        rating: 5,
      }}
      faqs={[
        {
          q: "What does your 100% Bond Back Guarantee cover?",
          a: "If your landlord or property manager notes any cleaning issues during their outgoing property inspection, notify us within 72 hours. We dispatch our team back to reclean the flagged areas free of charge.",
        },
        {
          q: "Is carpet steam cleaning included?",
          a: "Carpet steam cleaning can be added seamlessly to your booking. We provide an official receipt suitable for real estate property managers who mandate professional steam cleaning.",
        },
        {
          q: "Is the oven included in the bond clean price?",
          a: "Yes! Full interior oven detailing, wire racks, trays, and rangehood filter degreasing are included as standard in all our vacate cleans.",
        },
        {
          q: "Do I need to be present during the clean?",
          a: "No. You can leave a key in a lockbox or let our team in before handing over keys. We will notify you when the clean is complete.",
        },
        {
          q: "Do you supply an itemised receipt for real estate?",
          a: "Yes. Once the clean is finished, you receive an itemised tax invoice showing full Australian real estate exit checklist compliance.",
        },
      ]}
    />
  );
}
