import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
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
  alternates: {
    canonical: "/nieuwe-patienten-inschrijven",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Nieuwe patiënten welkom bij Dental Time",
    description:
      "Uw nieuwe tandarts in Nieuwegein. Schrijf uzelf of uw gezin eenvoudig online in.",
    url: "https://www.dental-time.nl/nieuwe-patienten-inschrijven",
    images: ["/dentist-explaining.png"],
    locale: "nl_NL",
    siteName: "Dental Time",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nieuwe patiënten welkom bij Dental Time",
    description:
      "Schrijf uzelf of uw gezin online in bij Dental Time in Nieuwegein.",
    images: ["/dentist-explaining.png"],
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

function ReviewStars({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-label="5 van 5 sterren"
      className="flex gap-1 text-[#d9b45b]"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={compact ? "h-4 w-4 fill-current" : "h-5 w-5 fill-current"}
        />
      ))}
    </div>
  );
}

export default function NewPatientsRegistrationPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative left-[calc(50%-50vw)] -mt-16 w-screen overflow-x-hidden bg-[#f8f6f1] text-[#11182b] selection:bg-[#3a4e9d] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-40 mx-auto w-full border-b border-white/60 bg-zinc-100 bg-opacity-60 backdrop-blur-lg backdrop-saturate-150 md:mt-3 md:w-5/6 md:rounded-md md:border-b-0">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-6">
          <Link aria-label="Dental Time home" href="/">
            <Image
              priority
              alt="Dental Time"
              className="h-14 w-auto sm:h-20"
              height={120}
              src="/dental-time-gold.svg"
              width={200}
            />
          </Link>
          <a
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#3a4e9d] bg-[#3a4e9d] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(58,78,157,0.22)] transition duration-200 hover:border-[#2d3d7a] hover:bg-[#2d3d7a] hover:shadow-[0_10px_24px_rgba(45,61,122,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a4e9d] focus-visible:ring-offset-2 sm:px-5"
            href="tel:0306049005"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">030 604 9005</span>
            <span className="sm:hidden">Bel ons</span>
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_5%_10%,rgba(58,78,157,0.14),transparent_38%),radial-gradient(circle_at_92%_18%,rgba(177,138,54,0.10),transparent_24%),linear-gradient(180deg,#fff_0%,#f8f6f1_100%)] px-5 pb-14 pt-28 sm:px-8 sm:pb-24 sm:pt-40">
          <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#b18a36]/30 bg-[#fffaf0]/80 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#314784] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                <Smile aria-hidden="true" className="h-4 w-4 text-[#b18a36]" />
                Nieuwe patiënten welkom
              </span>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#0d1428] sm:mt-7 sm:text-5xl lg:text-[4.5rem]">
                Uw nieuwe tandarts in Nieuwegein
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">
                Bij Dental Time krijgt u persoonlijke tandheelkundige zorg voor
                uzelf en uw gezin. Schrijf u eenvoudig online in bij onze
                praktijk.
              </p>
              <div className="mt-7 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                <a
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#3a4e9d] px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(58,78,157,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2d3d7a] hover:shadow-[0_16px_36px_rgba(45,61,122,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a4e9d] focus-visible:ring-offset-2 motion-reduce:transform-none sm:w-auto sm:py-4"
                  href="#inschrijven"
                >
                  Start mijn inschrijving
                  <ArrowDown aria-hidden="true" className="h-5 w-5" />
                </a>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Clock3 aria-hidden="true" className="h-5 w-5 text-[#b18a36]" />
                  Contact binnen 2 werkdagen
                </span>
              </div>

              <dl className="mt-8 grid max-w-xl grid-cols-2 divide-x divide-[#d9d3c7] border-y border-[#d9d3c7] py-4 sm:mt-10 sm:py-5">
                <div className="px-3 sm:px-5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Tandarts.nl
                  </dt>
                  <dd className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#11182b]">
                    9,4
                  </dd>
                </div>
                <div className="px-5 sm:px-8">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Ervaring
                  </dt>
                  <dd className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#11182b]">
                    25+ jaar
                  </dd>
                </div>
              </dl>
            </div>

            <figure className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
              <div className="relative rounded-[2.25rem] border border-[#d8d1c4] bg-white/80 p-2 shadow-[0_28px_70px_rgba(17,24,43,0.14),0_2px_8px_rgba(17,24,43,0.05)] backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-slate-100">
                  <Image
                    priority
                    alt="Tandarts die mondverzorging rustig uitlegt aan een patiënt"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    src="/dentist-explaining.png"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[#11182b]/80 p-4 text-white shadow-xl backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
                    <p className="font-serif text-lg font-semibold">
                      Persoonlijke aandacht en duidelijke uitleg
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      Uw comfort en mondgezondheid staan voorop.
                    </p>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="bg-[#fffefa] px-5 py-16 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b18a36]">
                  Waarom Dental Time?
                </p>
                <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold tracking-[-0.025em] text-[#11182b] sm:text-5xl">
                  Tandheelkundige zorg met aandacht
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
                Een kleinschalige praktijk waar moderne tandheelkunde en
                persoonlijke begeleiding samenkomen.
              </p>
            </div>
            <div className="mt-12 grid border-y border-[#ddd7cb] md:grid-cols-3 md:divide-x md:divide-[#ddd7cb]">
              {benefits.map(({ Icon, title, description }, index) => (
                <article
                  key={title}
                  className={`group py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-[#ddd7cb] md:border-t-0" : ""}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b18a36]/25 bg-[#fffaf0] text-[#8f6d25] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#b18a36]/50 motion-reduce:transform-none">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-[#11182b]">
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

        <section className="relative overflow-hidden bg-[#11182b] px-5 py-16 text-white sm:px-8 sm:py-28">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#3a4e9d]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#b18a36]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d9b45b]">
                  Ervaringen van patiënten
                </p>
                <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold tracking-[-0.025em] sm:text-5xl">
                  Wat patiënten over Dental Time zeggen
                </h2>
              </div>
              <a
                className="group inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-semibold text-slate-200 transition hover:border-[#d9b45b] hover:text-white"
                href="https://g.co/kgs/XuoK1aZ"
                rel="noopener noreferrer"
                target="_blank"
              >
                Bekijk alle Google-reviews
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                />
              </a>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <figure className="relative flex min-h-80 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur sm:p-10">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-12 font-serif text-[11rem] leading-none text-white/[0.04]"
                >
                  “
                </span>
                <ReviewStars />
                <blockquote className="relative mt-8 max-w-3xl flex-1 font-serif text-2xl leading-relaxed text-white sm:text-3xl">
                  “{reviews[0].text}”
                </blockquote>
                <figcaption className="mt-8 text-sm font-semibold text-[#d9b45b]">
                  {reviews[0].name} · Google-review
                </figcaption>
              </figure>
              <div className="grid gap-5">
                {reviews.slice(1).map((review) => (
                <figure
                  key={review.name}
                    className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] motion-reduce:transform-none sm:p-7"
                >
                    <ReviewStars compact />
                    <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-slate-100">
                    “{review.text}”
                  </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-[#d9b45b]">
                    {review.name} · Google-review
                  </figcaption>
                </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffefa] px-5 py-16 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b18a36]">
                Eenvoudig inschrijven
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.025em] text-[#11182b] sm:text-5xl">
                Zo werkt uw inschrijving
              </h2>
            </div>
            <div className="relative mt-12 grid gap-8 lg:grid-cols-3 lg:gap-12">
              <div className="absolute left-0 right-0 top-5 hidden h-px bg-[linear-gradient(90deg,#b18a36_0%,#d8d1c4_50%,#b18a36_100%)] lg:block" />
              {registrationSteps.map((step) => (
                <article
                  key={step.number}
                  className="relative border-l border-[#d8d1c4] pl-6 lg:border-l-0 lg:pl-0 lg:pt-14"
                >
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#b18a36]/30 bg-[#fffaf0] px-2 font-serif text-sm font-semibold text-[#8f6d25] lg:absolute lg:left-0 lg:top-0">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-[#11182b]">
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

        <section className="bg-[#f8f6f1] px-5 py-16 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <figure className="min-w-0 rounded-[2rem] border border-[#d8d1c4] bg-white/80 p-2 shadow-[0_24px_65px_rgba(17,24,43,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem]">
                  <Image
                    alt="De moderne receptie en wachtruimte van Dental Time op het Muntplein"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    src="/clinic-dental-time.jpeg"
                  />
                </div>
              </figure>

              <article className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-[2rem] bg-[#293b75] p-7 text-white shadow-[0_24px_65px_rgba(27,39,77,0.18)] sm:p-10">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#b18a36]/15 blur-3xl" />
                <p className="relative text-sm font-bold uppercase tracking-[0.2em] text-[#ecd38f]">
                  Welkom bij Dental Time
                </p>
                <h2 className="relative mt-4 font-serif text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
                  Een vertrouwde praktijk in uw buurt
                </h2>
                <p className="relative mt-4 leading-7 text-blue-50">
                  Dental Time is gevestigd aan Waardijnburg 3 op het Muntplein.
                  Heeft u vóór uw inschrijving een vraag? Ons team helpt u graag
                  telefonisch.
                </p>
                <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#293b75] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fffaf0] motion-reduce:transform-none"
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
              </article>
            </div>

            <div className="mt-8 border-y border-[#d8d1c4] py-7 lg:grid lg:grid-cols-[0.28fr_1fr] lg:items-center lg:gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b18a36]">
                  Praktische informatie
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-[#11182b]">
                  Openingstijden
                </h3>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-y-5 sm:grid-cols-4 lg:mt-0 lg:grid-cols-7">
                {siteConfig.openingTimes.map((item) => (
                  <div
                    key={item.day}
                    className="border-l border-[#d8d1c4] pl-4"
                  >
                    <dt className="text-xs font-medium text-slate-500">
                      {item.day}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-[#11182b]">
                      {item.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          className="relative scroll-mt-16 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(177,138,54,0.08),transparent_28%),linear-gradient(180deg,#fffefa_0%,#f8f6f1_100%)] px-4 py-12 sm:scroll-mt-20 sm:px-8 sm:py-28"
          id="inschrijven"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center sm:mb-12">
              <span className="mx-auto mb-4 block h-px w-14 bg-[#b18a36] sm:mb-5" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b18a36]">
                Nieuwe patiënt worden
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.025em] text-[#11182b] sm:mt-4 sm:text-5xl">
                Schrijf u in bij Dental Time
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-relaxed">
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
