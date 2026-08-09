import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";

import { businessConfig, siteConfig } from "@/config/site";
import { fontSans, fontSerif, fontMontserrat } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import StructuredData from "@/components/StructuredData";
import MetaPixelConsentManager from "@/components/MetaPixelConsent";

export const metadata: Metadata = {
  metadataBase: new URL(businessConfig.url),
  title: {
    default: "Tandarts Nieuwegein | Dental Time",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "health",
  openGraph: {
    title: "Tandarts Nieuwegein | Dental Time",
    description: siteConfig.description,
    images: [
      {
        url: "/clinic-dental-time.jpeg",
        width: 1600,
        height: 1066,
        alt: "De praktijk van Dental Time in Nieuwegein",
      },
    ],
    locale: "nl_NL",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tandarts Nieuwegein | Dental Time",
    description: siteConfig.description,
    images: ["/clinic-dental-time.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/IconBlack.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": `${businessConfig.url}/#dental-practice`,
        name: businessConfig.name,
        legalName: businessConfig.legalName,
        url: businessConfig.url,
        logo: `${businessConfig.url}/dental-time-gold.svg`,
        image: `${businessConfig.url}/clinic-dental-time.jpeg`,
        description: businessConfig.description,
        telephone: businessConfig.phoneInternational,
        email: businessConfig.email,
        address: {
          "@type": "PostalAddress",
          ...businessConfig.address,
        },
        areaServed: {
          "@type": "City",
          name: "Nieuwegein",
        },
        hasMap: businessConfig.mapsUrl,
        sameAs: [
          businessConfig.mapsUrl,
          "https://www.tandarts.nl/tandarts-nieuwegein/tandartspraktijk-zuilenstein",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "08:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "08:00",
            closes: "12:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${businessConfig.url}/#website`,
        url: businessConfig.url,
        name: businessConfig.name,
        inLanguage: "nl-NL",
        publisher: {
          "@id": `${businessConfig.url}/#dental-practice`,
        },
      },
    ],
  };

  return (
    <html suppressHydrationWarning className="light" lang="nl">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
          fontMontserrat.variable,
        )}
      >
        <StructuredData data={localBusinessSchema} />
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
          <Suspense fallback={null}>
            <MetaPixelConsentManager />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
