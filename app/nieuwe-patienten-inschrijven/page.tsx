import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Star,
  Users,
} from "lucide-react";

import CampaignStickyCTA from "./CampaignStickyCTA";

import RegistrationForm from "@/app/inschrijven/RegistrationForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Nieuwe patiënt inschrijven | Tandarts Nieuwegein",
  description:
    "Schrijf uzelf of uw gezin online in bij Dental Time in Nieuwegein. Persoonlijke tandheelkundige zorg met aandacht en rust.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Nieuwe patiënten welkom bij Dental Time",
    description:
      "Uw nieuwe tandarts in Nieuwegein. Schrijf uzelf of uw gezin eenvoudig online in.",
    images: ["/new-patients-consultation.jpg"],
    locale: "nl_NL",
    type: "website",
  },
};

const benefits = [
  {
    Icon: HeartHandshake,
    title: "Persoonlijke aandacht",
    description:
      "We luisteren naar uw wensen, leggen behandelingen rustig uit en nemen de tijd voor uw vragen.",
  },
  {
    Icon: Users,
    title: "Voor het hele gezin",
    description:
      "U kunt uzelf en uw gezinsleden in één keer bij onze praktijk inschrijven.",
  },
  {
    Icon: ShieldCheck,
    title: "Zorg met rust en vertrouwen",
    description:
      "Ook wanneer u opziet tegen een tandartsbezoek zorgen we voor een rustige, duidelijke aanpak.",
  },
];

const reviews = [
  {
    name: "Salomé",
    text: "Wij zijn superblij met de kundigheid van de tandarts. Ze houdt rekening met je, legt de mogelijkheden goed uit en is erg aardig.",
  },
  {
    name: "Wouter",
    text: "Kom hier al een decennium tevreden langs. De behandeling is professioneel, effectief en communicatief.",
  },
  {
    name: "Frans W.",
    text: "Zeer vriendelijke, zorgzame en professionele tandarts. Werkt met de nieuwste technieken.",
  },
];

const registrationSteps = [
  {
    number: "01",
    title: "Vul uw gegevens in",
    description:
      "Doorloop het online formulier voor uzelf en eventueel uw gezinsleden.",
  },
  {
    number: "02",
    title: "Wij nemen contact op",
    description:
      "Ons team neemt binnen 2 werkdagen contact met u op om uw inschrijving te bevestigen.",
  },
  {
    number: "03",
    title: "Plan de volgende stap",
    description:
      "Samen bespreken we uw wensen en plannen we uw eerste bezoek aan de praktijk.",
  },
];

export default function NewPatientsRegistrationPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="absolute left-0 top-0 w-screen overflow-x-hidden bg-[#f7f6f2] text-slate-950">
      <header className="fixed inset-x-0 top-0 z-40 mx-auto w-full bg-zinc-100 bg-opacity-60 backdrop-blur-lg backdrop-saturate-150 md:mt-3 md:w-5/6 md:rounded-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link aria-label="Dental Time home" href="/">
            <Image
              priority
              alt="Dental Time"
              className="h-16 w-auto sm:h-20"
              height={120}
              src="/dental-time-gold.svg"
              width={200}
            />
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-[#3a4e9d] bg-[#3a4e9d] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(58,78,157,0.22)] transition duration-200 hover:border-[#2d3d7a] hover:bg-[#2d3d7a] hover:shadow-[0_10px_24px_rgba(45,61,122,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a4e9d] focus-visible:ring-offset-2"
            href="tel:0306049005"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">030 604 9005</span>
            <span className="sm:hidden">Bel ons</span>
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(66,87,157,0.14),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#f7f6f2_100%)] px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-40">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Smile aria-hidden="true" className="h-4 w-4" />
                Nieuwe patiënten welkom
              </span>
              <h1 className="mt-7 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Uw nieuwe tandarts in Nieuwegein
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Bij Dental Time krijgt u persoonlijke tandheelkundige zorg voor
                uzelf en uw gezin. Schrijf u eenvoudig online in bij onze
                praktijk.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3a4e9d] px-6 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(58,78,157,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2d3d7a] hover:shadow-[0_16px_36px_rgba(45,61,122,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a4e9d] focus-visible:ring-offset-2 motion-reduce:transform-none sm:w-auto"
                  href="#inschrijven"
                >
                  Start mijn inschrijving
                  <ArrowDown aria-hidden="true" className="h-5 w-5" />
                </a>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Clock3 aria-hidden="true" className="h-5 w-5 text-primary" />
                  Contact binnen 2 werkdagen
                </span>
              </div>

              <dl className="mt-10 grid max-w-2xl grid-cols-2 divide-x divide-slate-200 rounded-2xl border border-white bg-white/75 p-4 shadow-sm backdrop-blur sm:p-5">
                <div className="px-2 text-center sm:px-5 sm:text-left">
                  <dt className="text-xs leading-tight text-slate-500 sm:text-sm">
                    Tandarts.nl
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">
                    9,4
                  </dd>
                </div>
                <div className="px-2 text-center sm:px-5 sm:text-left">
                  <dt className="text-xs leading-tight text-slate-500 sm:text-sm">
                    Ervaring
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">
                    25+ jaar
                  </dd>
                </div>
              </dl>
            </div>

            <figure className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
              <div className="absolute -inset-4 -rotate-2 rounded-[2rem] bg-primary/10" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl shadow-slate-900/10">
                <Image
                  priority
                  alt="Tandarts die mondverzorging rustig uitlegt aan een patiënt"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  src="/new-patients-consultation.jpg"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg backdrop-blur">
                  <p className="font-serif text-lg font-semibold text-slate-950">
                    Persoonlijke aandacht en duidelijke uitleg
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Uw comfort en mondgezondheid staan voorop.
                  </p>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Waarom Dental Time?
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Tandheelkundige zorg met aandacht
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Een kleinschalige praktijk waar moderne tandheelkunde en
                persoonlijke begeleiding samenkomen.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {benefits.map(({ Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-3xl border border-slate-200 bg-[#faf9f6] p-6 sm:p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
                  Ervaringen van patiënten
                </p>
                <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold sm:text-5xl">
                  Wat patiënten over Dental Time zeggen
                </h2>
              </div>
              <a
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white"
                href="https://g.co/kgs/XuoK1aZ"
                rel="noopener noreferrer"
                target="_blank"
              >
                Bekijk alle Google-reviews
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {reviews.map((review) => (
                <figure
                  key={review.name}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
                >
                  <div className="flex gap-1 text-amber-300" aria-label="5 van 5 sterren">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        aria-hidden="true"
                        className="h-5 w-5 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-slate-100">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-blue-200">
                    {review.name} · Google-review
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Eenvoudig inschrijven
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-slate-950 sm:text-5xl">
                Zo werkt uw inschrijving
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {registrationSteps.map((step) => (
                <article key={step.number} className="relative border-t border-slate-200 pt-6">
                  <span className="font-serif text-4xl font-semibold text-primary/30">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f6f2] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-primary text-white lg:grid-cols-[1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">
                Dichtbij in Nieuwegein
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-5xl">
                Een vertrouwde praktijk in uw buurt
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-50">
                Dental Time is gevestigd aan Waardijnburg 3 op het Muntplein.
                Heeft u vóór uw inschrijving een vraag? Ons team helpt u graag
                telefonisch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary transition hover:bg-blue-50"
                  href="https://maps.app.goo.gl/x1usR2bYpxEx1ebV8"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                  Bekijk route
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  href="tel:0306049005"
                >
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  030 604 9005
                </a>
              </div>
            </div>
            <div className="border-t border-white/15 bg-slate-950/15 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
              <h3 className="text-lg font-semibold">Openingstijden</h3>
              <dl className="mt-5 space-y-3">
                {siteConfig.openingTimes.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between gap-6 border-b border-white/15 pb-3 text-sm"
                  >
                    <dt className="text-blue-100">{item.day}</dt>
                    <dd className="font-semibold text-white">{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          className="scroll-mt-4 bg-[linear-gradient(180deg,#ffffff_0%,#f7f6f2_100%)] px-5 py-16 sm:px-8 sm:py-24"
          id="inschrijven"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Nieuwe patiënt worden
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-slate-950 sm:text-5xl">
                Schrijf u in bij Dental Time
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                Doorloop vier duidelijke stappen. Na verzending neemt ons team
                binnen 2 werkdagen contact met u op.
              </p>
            </div>
            <RegistrationForm variant="campaign" />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Dental Time B.V. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="transition hover:text-primary" href="/privacyverklaring">
              Privacyverklaring
            </Link>
            <Link className="transition hover:text-primary" href="/algemene-voorwaarden">
              Algemene voorwaarden
            </Link>
            <span>Waardijnburg 3, Nieuwegein</span>
          </div>
        </div>
      </footer>

      <CampaignStickyCTA />
    </div>
  );
}
