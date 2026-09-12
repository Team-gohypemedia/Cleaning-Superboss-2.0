import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import MobileStickyBottomBar from "@/components/MobileStickyBottomBar";
import { CountryProvider } from "@/context/CountryContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cleaning Superboss | Professional Home & Commercial Cleaning Australia",
  description:
    "Professional cleaning services across Australia. Home cleaning, deep cleaning, bond cleaning, Airbnb turnovers & commercial cleaning. Police checked, insured cleaners. Book online in 60 seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18429589795"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18429589795');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#f8fbfe] text-[#08295b] antialiased`}>
        <CountryProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            {/* <MobileStickyBottomBar /> */}
          </SmoothScroll>
        </CountryProvider>
      </body>
    </html>
  );
}
