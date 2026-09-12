"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import {
  CountryCode,
  CountryConfig,
  COUNTRIES,
  detectCountryFromHostname,
} from "@/config/countries";

interface CountryContextType {
  country: CountryCode;
  countryConfig: CountryConfig;
  setCountry: (country: CountryCode) => void;
  allCountries: CountryConfig[];
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  // Default to 'au' initially for hydration match
  const [country, setCountryState] = useState<CountryCode>("au");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Automatic Domain / Hostname detection (always takes priority when hosted on country domain)
    const host = window.location.hostname.toLowerCase().split(":")[0];
    const isLocalhost = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");

    if (!isLocalhost) {
      const detected = detectCountryFromHostname(host);
      setCountryState(detected);
      return;
    }

    // 2. On localhost/testing environment: allow query parameter ?country=us | uk | au
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get("country")?.toLowerCase() as CountryCode | undefined;
    if (countryParam && COUNTRIES[countryParam]) {
      setCountryState(countryParam);
      return;
    }

    // 3. Default fallback on local development
    setCountryState("au");
  }, []);

  const setCountry = (newCountry: CountryCode) => {
    if (COUNTRIES[newCountry]) {
      setCountryState(newCountry);
      try {
        localStorage.setItem("preferred_country", newCountry);
      } catch {
        // ignore
      }
    }
  };

  const countryConfig = useMemo(() => COUNTRIES[country] || COUNTRIES.au, [country]);
  const allCountries = useMemo(() => Object.values(COUNTRIES), []);

  return (
    <CountryContext.Provider
      value={{
        country,
        countryConfig,
        setCountry,
        allCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    // Fallback safe defaults if used outside provider
    return {
      country: "au" as CountryCode,
      countryConfig: COUNTRIES.au,
      setCountry: () => {},
      allCountries: Object.values(COUNTRIES),
    };
  }
  return context;
}
