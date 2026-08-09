import type { Metadata } from "next";

import HomePageClient from "./HomePageClient";

import { businessConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: "Tandarts Nieuwegein | Dental Time",
  },
  description:
    "Zoekt u een tandarts in Nieuwegein? Dental Time biedt persoonlijke mondzorg op het Muntplein. Bekijk onze behandelingen of schrijf u direct in.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tandarts Nieuwegein | Dental Time",
    description:
      "Persoonlijke tandheelkundige zorg in Nieuwegein. Nieuwe patiënten zijn welkom bij Dental Time op het Muntplein.",
    url: businessConfig.url,
    images: [
      {
        url: "/clinic-dental-time.jpeg",
        width: 1600,
        height: 1066,
        alt: "De praktijk van Dental Time in Nieuwegein",
      },
    ],
    locale: "nl_NL",
    siteName: "Dental Time",
    type: "website",
  },
};

export default function Home() {
  return <HomePageClient />;
}
