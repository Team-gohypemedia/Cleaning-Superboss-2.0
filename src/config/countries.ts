export type CountryCode = "au" | "us" | "uk";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  shortName: string;
  domainSuffix: string;
  flagEmoji: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  formattedPhone: string;
  email: string;
  office: {
    title: string;
    fullAddress: string;
    street: string;
    cityStateZip: string;
    country: string;
  };
  registration: {
    label: string;
    value: string;
  };
  insurance: string;
  coverageText: string;
  serviceCoverage: string;
  operatingHours: string;
  addressPlaceholder: string;
  emailPlaceholder: string;
  privacyNotice: string;
  cleanerTrustText: string;
  brandSubtitle: string;
  copyrightTag: string;
  keyCities: {
    name: string;
    badge: string;
    suburbs: string[];
  }[];
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  au: {
    code: "au",
    name: "Australia",
    shortName: "AU",
    domainSuffix: ".au",
    flagEmoji: "🇦🇺",
    currency: "AUD",
    currencySymbol: "$",
    phone: "+61460849843",
    formattedPhone: "+61 460 849 843",
    email: "marketingsuperboss@gmail.com",
    office: {
      title: "Perth Office / Australian Headquarters",
      fullAddress: "Unit 3, 25 Morrison Street, Como WA 6152, Australia",
      street: "Unit 3, 25 Morrison Street",
      cityStateZip: "Como WA 6152",
      country: "Australia",
    },
    registration: {
      label: "ABN",
      value: "48 642 918 203",
    },
    insurance: "$10M Public Liability Cover",
    coverageText: "Australia Wide",
    serviceCoverage: "Greater Perth, Sydney, Melbourne, Brisbane, Gold Coast & Adelaide",
    operatingHours: "Mon–Sun: 7:00 AM – 8:00 PM AWST / AEST",
    addressPlaceholder: "e.g. 142 St Georges Terrace, Perth WA 6000",
    emailPlaceholder: "yourname@email.com.au",
    privacyNotice: "No spam guaranteed. Your information is protected under Australian Privacy Principles.",
    cleanerTrustText: "100% Police Checked & $10M Insured Cleaners",
    brandSubtitle: "Cleaning Superboss Ltd — registered in Australia. Providing hotel-grade residential, bond, and commercial cleaning with upfront pricing and police-checked cleaners nationwide.",
    copyrightTag: "AUSTRALIA WIDE",
    keyCities: [
      {
        name: "Perth",
        badge: "WA Hub",
        suburbs: ["Perth CBD & Northbridge", "Fremantle & South Fremantle", "Subiaco, Nedlands & Claremont", "Scarborough & Cottesloe Coastal", "Joondalup & Victoria Park"],
      },
      {
        name: "Sydney",
        badge: "NSW Hub",
        suburbs: ["Sydney CBD & Surry Hills", "Bondi, Bronte & Eastern Suburbs", "Manly & Northern Beaches", "Inner West (Newtown, Balmain)", "North Shore & Chatswood"],
      },
      {
        name: "Melbourne",
        badge: "VIC Hub",
        suburbs: ["Melbourne CBD & Docklands", "South Yarra, Prahran & Toorak", "Fitzroy, Carlton & Brunswick", "Richmond & South Melbourne", "St Kilda & Brighton Bayside"],
      },
      {
        name: "Brisbane",
        badge: "QLD Hub",
        suburbs: ["Brisbane CBD & Spring Hill", "New Farm, Teneriffe & Fortitude Valley", "Paddington & West End", "South Bank & Kangaroo Point", "Hamilton, Ascot & Bulimba"],
      },
      {
        name: "Gold Coast",
        badge: "Coastal Hub",
        suburbs: ["Surfers Paradise & Main Beach", "Broadbeach & Mermaid Beach", "Burleigh Heads & Palm Beach", "Robina & Varsity Lakes", "Southport, Labrador & Hope Island"],
      },
      {
        name: "Adelaide",
        badge: "SA Hub",
        suburbs: ["Adelaide CBD & North Adelaide", "Norwood, Kensington & Burnside", "Glenelg, Brighton & Coastal West", "Unley, Hyde Park & Goodwood", "Prospect, Medindie & Walkerville"],
      },
    ],
  },
  us: {
    code: "us",
    name: "United States",
    shortName: "USA",
    domainSuffix: ".us / .com",
    flagEmoji: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    phone: "+61460849843",
    formattedPhone: "+61 460 849 843",
    email: "marketingsuperboss@gmail.com",
    office: {
      title: "California Headquarters / US Office",
      fullAddress: "15442 Ventura Blvd, Suite 201-2176, Sherman Oaks, CA 91403, United States",
      street: "15442 Ventura Blvd, Suite 201-2176",
      cityStateZip: "Sherman Oaks, CA 91403",
      country: "United States",
    },
    registration: {
      label: "Entity Registration",
      value: "California State Registered Entity · Sherman Oaks, CA",
    },
    insurance: "$10M Comprehensive Liability Cover",
    coverageText: "California & Nationwide Metros",
    serviceCoverage: "Los Angeles, Sherman Oaks, San Fernando Valley, Orange County & San Diego",
    operatingHours: "Mon–Sun: 7:00 AM – 8:00 PM PST",
    addressPlaceholder: "e.g. 15442 Ventura Blvd, Sherman Oaks, CA 91403",
    emailPlaceholder: "yourname@email.com",
    privacyNotice: "No spam guaranteed. Your information is protected under US Federal & California Consumer Privacy Acts (CCPA).",
    cleanerTrustText: "100% Background Checked & $10M Insured Cleaners",
    brandSubtitle: "Cleaning Superboss Ltd — registered in California, United States. Providing hotel-grade residential, move-out, and commercial cleaning with upfront pricing and background-checked cleaners.",
    copyrightTag: "UNITED STATES",
    keyCities: [
      {
        name: "Los Angeles & Sherman Oaks",
        badge: "HQ Hub",
        suburbs: ["Sherman Oaks & Ventura Blvd", "Beverly Hills & West Hollywood", "Santa Monica & Culver City", "Pasadena & Glendale", "Downtown Los Angeles"],
      },
      {
        name: "San Francisco Bay Area",
        badge: "NorCal Hub",
        suburbs: ["San Francisco CBD & SoMa", "San Jose & Silicon Valley", "Oakland & Berkeley", "Palo Alto & Mountain View", "Marin County"],
      },
      {
        name: "Orange County",
        badge: "Coastal Hub",
        suburbs: ["Newport Beach & Irvine", "Huntington Beach & Costa Mesa", "Laguna Beach & Mission Viejo", "Anaheim & Fullerton", "San Clemente"],
      },
      {
        name: "San Diego",
        badge: "SoCal Hub",
        suburbs: ["Downtown San Diego & Gaslamp", "La Jolla & Pacific Beach", "Del Mar & Solana Beach", "Chula Vista & Coronado", "Carlsbad & Oceanside"],
      },
    ],
  },
  uk: {
    code: "uk",
    name: "United Kingdom",
    shortName: "UK",
    domainSuffix: ".co.uk / .uk",
    flagEmoji: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    phone: "+61460849843",
    formattedPhone: "+61 460 849 843",
    email: "marketingsuperboss@gmail.com",
    office: {
      title: "London Office / UK Headquarters",
      fullAddress: "1st Floor, 124 Cleveland Street, London, W1T 6PG, United Kingdom",
      street: "1st Floor, 124 Cleveland Street",
      cityStateZip: "London, W1T 6PG",
      country: "United Kingdom",
    },
    registration: {
      label: "Companies House",
      value: "UK Registered Entity · Westminster, London W1T",
    },
    insurance: "£10M Public Liability Cover",
    coverageText: "Greater London & UK Wide",
    serviceCoverage: "Central London, Westminster, Camden, Fitzrovia, Kensington, Chelsea & Canary Wharf",
    operatingHours: "Mon–Sun: 7:00 AM – 8:00 PM GMT",
    addressPlaceholder: "e.g. 124 Cleveland Street, London, W1T 6PG",
    emailPlaceholder: "yourname@email.co.uk",
    privacyNotice: "No spam guaranteed. Your information is protected under UK GDPR & Data Protection Act 2018.",
    cleanerTrustText: "100% DBS Checked & £10M Insured Cleaners",
    brandSubtitle: "Cleaning Superboss Ltd — registered in the United Kingdom. Providing hotel-grade residential, end-of-tenancy, and commercial cleaning with upfront pricing and vetted cleaners.",
    copyrightTag: "UNITED KINGDOM",
    keyCities: [
      {
        name: "Central London",
        badge: "London HQ",
        suburbs: ["Fitzrovia & Cleveland Street", "Westminster & Victoria", "City of London & Holborn", "Mayfair & Marylebone", "Soho & Covent Garden"],
      },
      {
        name: "West London",
        badge: "West Hub",
        suburbs: ["Kensington & Chelsea", "Notting Hill & Holland Park", "Fulham & Hammersmith", "Richmond & Chiswick", "Ealing & Acton"],
      },
      {
        name: "North & East London",
        badge: "Urban Hub",
        suburbs: ["Camden Town & Regent's Park", "Islington, Angel & Highbury", "Canary Wharf & Docklands", "Shoreditch & Hackney", "Hampstead & Highgate"],
      },
      {
        name: "South London",
        badge: "South Hub",
        suburbs: ["Battersea & Clapham", "Wandsworth & Putney", "Wimbledon & Merton", "Dulwich & Greenwich", "Brixton & Southwark"],
      },
    ],
  },
};

/**
 * Detect country code from hostname or explicit country param.
 */
export function detectCountryFromHostname(hostname: string): CountryCode {
  // Strip any port number (e.g. localhost:3000 -> localhost)
  const host = hostname.toLowerCase().split(":")[0];

  // Australia domains: .com.au, .net.au, .au
  if (host.endsWith(".au") || host.includes(".com.au") || host.includes(".net.au")) {
    return "au";
  }

  // United Kingdom domains: .co.uk, .org.uk, .uk, or uk. subdomain
  if (host.endsWith(".uk") || host.includes(".co.uk") || host.startsWith("uk.")) {
    return "uk";
  }

  // United States domains: .us, us. subdomain, or .com
  if (host.endsWith(".us") || host.startsWith("us.") || (host.endsWith(".com") && !host.endsWith(".com.au"))) {
    return "us";
  }

  // Default fallback (e.g. localhost)
  return "au";
}
