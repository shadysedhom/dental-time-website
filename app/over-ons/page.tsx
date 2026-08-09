import type { Metadata } from "next";

import AboutSection from "@/app/about/AboutSection";
import FooterSection from "@/components/footer";
import { title } from "@/components/primitives";
import { businessConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Over Dental Time in Nieuwegein",
  description:
    "Maak kennis met Dental Time: een kleinschalige tandartspraktijk in Nieuwegein met persoonlijke aandacht, moderne zorg en duidelijke uitleg.",
  alternates: {
    canonical: "/over-ons",
  },
  openGraph: {
    title: "Over Dental Time in Nieuwegein",
    description:
      "Persoonlijke tandheelkundige zorg bij onze praktijk op het Muntplein in Nieuwegein.",
    url: `${businessConfig.url}/over-ons`,
    images: ["/about-us-1.webp"],
    locale: "nl_NL",
    siteName: businessConfig.name,
    type: "website",
  },
};

export default function AboutPage() {
  const bgImageUrl = "/about-us-bg.jpeg";

  return (
    <div
      className="absolute left-0 top-0 flex w-full flex-col items-center justify-center gap-2 bg-slate-50 bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.72)), url('${bgImageUrl}')`,
      }}
    >
      <div className="mt-20 md:mt-32" />

      <header className="px-8 pt-10 text-center md:px-20">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#9a752b]">
          Uw tandarts in Nieuwegein
        </p>
        <h1 className={title()}>Over Dental Time</h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-slate-700">
          Persoonlijke mondzorg en duidelijke uitleg in onze praktijk aan de
          Waardijnburg 3 op het Muntplein.
        </p>
      </header>

      <AboutSection
        altTag="De tandartspraktijk van Dental Time in Nieuwegein"
        descriptionOne="Welkom bij Dental Time. Wij zijn een kleinschalige en betrokken tandartspraktijk in Nieuwegein. U kunt bij ons terecht voor periodieke controles, preventieve zorg en verschillende tandheelkundige behandelingen. We werken samen met u aan een gezond gebit en een glimlach die bij u past."
        imagePosition="right"
        imageSrc="/about-us-1.webp"
        title="Voor een gezonde glimlach"
      />

      <AboutSection
        altTag="Persoonlijke tandheelkundige zorg bij Dental Time"
        descriptionOne="Uw comfort en mondgezondheid staan voorop. We luisteren naar uw wensen, onderzoeken zorgvuldig wat nodig is en leggen behandelopties begrijpelijk uit. Zo kunt u samen met de tandarts een weloverwogen keuze maken."
        descriptionTwo="Nieuwe patiënten zijn welkom. U kunt zich online inschrijven of ons bellen wanneer u eerst een vraag wilt stellen."
        imagePosition="left"
        imageSrc="/about-us-2.webp"
        title="Persoonlijke aandacht"
      />

      <div className="mb-10" />
      <FooterSection />
    </div>
  );
}
