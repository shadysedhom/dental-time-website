import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Clock3,
  Crown,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Wrench,
} from "lucide-react";

import StructuredData from "@/components/StructuredData";
import FooterSection from "@/components/footer";
import { businessConfig } from "@/config/site";
import { treatments } from "@/config/treatments";

export const metadata: Metadata = {
  title: "Tandheelkundige behandelingen in Nieuwegein",
  description:
    "Bekijk de tandheelkundige behandelingen van Dental Time in Nieuwegein: controles, kronen, wortelkanaalbehandelingen, protheses en meer.",
  alternates: {
    canonical: "/behandelingen",
  },
  openGraph: {
    title: "Tandheelkundige behandelingen in Nieuwegein | Dental Time",
    description:
      "Persoonlijke tandheelkundige zorg in Nieuwegein, met duidelijke uitleg en aandacht voor uw mondgezondheid.",
    url: `${businessConfig.url}/behandelingen`,
    images: ["/clinic-dental-time.jpeg"],
    locale: "nl_NL",
    siteName: businessConfig.name,
    type: "website",
  },
};

const treatmentPresentation: Record<
  string,
  { Icon: LucideIcon; label: string }
> = {
  "algemene-tandheelkunde": {
    Icon: ShieldCheck,
    label: "Preventie & behoud",
  },
  "cosmetische-tandheelkunde": {
    Icon: Sparkles,
    label: "Esthetiek",
  },
  "angst-voor-de-tandarts": {
    Icon: HeartHandshake,
    label: "Rust & vertrouwen",
  },
  "restauratieve-tandheelkunde": {
    Icon: Wrench,
    label: "Herstel",
  },
  "kronen-en-bruggen": {
    Icon: Crown,
    label: "Maatwerk",
  },
  wortelkanaalbehandeling: {
    Icon: Activity,
    label: "Behoud van uw tand",
  },
  "prothetische-behandelingen": {
    Icon: Smile,
    label: "Functie & comfort",
  },
};

export default function TreatmentsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: businessConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Behandelingen",
        item: `${businessConfig.url}/behandelingen`,
      },
    ],
  };

  return (
    <>
      <div className="relative pb-20 pt-7 text-[#11182b] sm:pt-10">
        <StructuredData data={breadcrumbSchema} />

        <nav
          aria-label="Broodkruimel"
          className="mb-6 flex items-center text-sm text-slate-500 sm:mb-8"
        >
          <Link className="transition hover:text-[#314784]" href="/">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2 text-[#b18a36]">
            /
          </span>
          <span aria-current="page">Behandelingen</span>
        </nav>

        <section className="relative isolate overflow-hidden rounded-[2rem] border border-[#ded8cc] bg-[#f3efe7] shadow-[0_30px_90px_rgba(17,24,43,0.10)] sm:rounded-[2.75rem]">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#d7bf82]/20 blur-3xl" />
          <div className="relative grid lg:min-h-[35rem] lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
              <span className="mb-7 h-px w-16 bg-[#b18a36]" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f6d25] sm:text-sm">
                Mondzorg bij Dental Time
              </p>
              <h1 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.75rem]">
                Zorg voor uw glimlach, met aandacht voor u
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Van periodieke controle tot zorgvuldig herstel. Bij onze
                tandartspraktijk in Nieuwegein krijgt u begrijpelijke uitleg en
                een behandeling die past bij uw mondgezondheid.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#314784] px-5 py-3 font-semibold text-white shadow-[0_12px_26px_rgba(49,71,132,0.20)] transition hover:-translate-y-0.5 hover:bg-[#26396d] motion-reduce:transform-none"
                  href="#overzicht"
                >
                  Bekijk behandelingen
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c9bea9] bg-white/60 px-5 py-3 font-semibold text-[#25376d] transition hover:border-[#b18a36] hover:bg-white"
                  href="/nieuwe-patienten-inschrijven"
                >
                  Nieuwe patiënt worden
                </Link>
              </div>
            </div>

            <div className="relative m-2 min-h-80 overflow-hidden rounded-[1.55rem] sm:m-3 sm:rounded-[2.15rem] lg:min-h-0">
              <Image
                fill
                priority
                alt="De moderne receptie van Dental Time in Nieuwegein"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
                src="/clinic-dental-time.jpeg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/50 via-transparent to-white/5" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[#11182b]/70 p-5 text-white shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#efd897]">
                  Welkom in onze praktijk
                </p>
                <p className="mt-2 font-serif text-xl font-semibold sm:text-2xl">
                  Waardijnburg 3 · Muntplein Nieuwegein
                </p>
              </div>
            </div>
          </div>
        </section>

        <dl className="mt-5 grid overflow-hidden rounded-2xl border border-[#ded8cc] bg-white shadow-[0_12px_40px_rgba(17,24,43,0.05)] sm:grid-cols-3 sm:divide-x sm:divide-[#ded8cc]">
          <div className="flex items-center gap-4 border-b border-[#ded8cc] px-6 py-5 sm:border-b-0">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f7f0df] text-[#8f6d25]">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <dt className="font-serif text-xl font-semibold">25+ jaar</dt>
              <dd className="text-sm text-slate-500">Ervaring en aandacht</dd>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-[#ded8cc] px-6 py-5 sm:border-b-0">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#eef1f8] text-[#314784]">
              <Clock3 aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <dt className="font-serif text-xl font-semibold">2 werkdagen</dt>
              <dd className="text-sm text-slate-500">
                Contact na inschrijving
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-5">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f7f0df] text-[#8f6d25]">
              <MapPin aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <dt className="font-serif text-xl font-semibold">Muntplein</dt>
              <dd className="text-sm text-slate-500">Centraal in Nieuwegein</dd>
            </div>
          </div>
        </dl>

        <section
          aria-labelledby="treatments-heading"
          className="scroll-mt-28 py-16 sm:py-24"
          id="overzicht"
        >
          <div className="grid gap-6 border-b border-[#ded8cc] pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a752b] sm:text-sm">
                Onze behandelingen
              </p>
              <h2
                className="mt-4 font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
                id="treatments-heading"
              >
                Zorg die begint bij luisteren
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              Uw situatie is altijd het vertrekpunt. We onderzoeken zorgvuldig,
              bespreken de mogelijkheden en adviseren pas daarna welke zorg bij
              u past.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-3">
            {treatments.map((treatment, index) => {
              const { Icon, label } = treatmentPresentation[treatment.slug];
              const isPrimary = index === 0;
              const isClosing = index === treatments.length - 1;
              const isWide = isPrimary || isClosing;

              return (
                <Link
                  key={treatment.slug}
                  aria-label={`Lees meer over ${treatment.name}`}
                  className={clsx(
                    "group min-h-72 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#314784] focus-visible:ring-offset-4 lg:min-h-0",
                    isWide && "lg:col-span-2",
                  )}
                  href={`/behandelingen/${treatment.slug}`}
                >
                  <article
                    className={clsx(
                      "relative flex h-full min-h-72 flex-col overflow-hidden rounded-[1.75rem] border p-7 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_rgba(17,24,43,0.13)] motion-reduce:transform-none sm:p-8 lg:min-h-0",
                      isPrimary &&
                        "border-[#314784] bg-[#26396f] text-white shadow-[0_20px_50px_rgba(38,57,111,0.16)]",
                      isClosing &&
                        "border-[#d9c99f] bg-[#f3ead6] text-[#11182b]",
                      !isPrimary &&
                        !isClosing &&
                        "border-[#ded8cc] bg-white text-[#11182b] shadow-[0_14px_40px_rgba(17,24,43,0.06)] group-hover:border-[#b18a36]/60",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "absolute -right-2 -top-8 font-serif text-[8rem] font-semibold leading-none",
                        isPrimary
                          ? "text-white/[0.05]"
                          : "text-[#8f6d25]/[0.06]",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-center justify-between gap-4">
                      <span
                        className={clsx(
                          "flex h-12 w-12 items-center justify-center rounded-full border",
                          isPrimary
                            ? "border-white/15 bg-white/10 text-[#efd897]"
                            : "border-[#d9c99f] bg-white/70 text-[#8f6d25]",
                        )}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span
                        className={clsx(
                          "text-xs font-bold uppercase tracking-[0.18em]",
                          isPrimary ? "text-[#efd897]" : "text-[#8f6d25]",
                        )}
                      >
                        {label}
                      </span>
                    </div>

                    <div className="relative mt-auto pt-8">
                      <h3
                        className={clsx(
                          "max-w-xl font-serif font-semibold leading-tight",
                          isWide ? "text-3xl sm:text-4xl" : "text-2xl",
                        )}
                      >
                        {treatment.name}
                      </h3>
                      <p
                        className={clsx(
                          "mt-4 max-w-xl leading-7",
                          isPrimary ? "text-blue-100" : "text-slate-600",
                        )}
                      >
                        {treatment.shortDescription}
                      </p>
                      <span
                        className={clsx(
                          "mt-6 inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3",
                          isPrimary ? "text-white" : "text-[#314784]",
                        )}
                      >
                        Ontdek de behandeling
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#11182b] px-7 py-10 text-white shadow-[0_30px_80px_rgba(17,24,43,0.18)] sm:rounded-[2.5rem] sm:px-12 sm:py-14 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#3a4e9d]/30 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#b18a36]/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#efd897] sm:text-sm">
              Wij denken met u mee
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
              Niet zeker welke behandeling u nodig heeft?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Dat hoeft u vooraf niet te weten. Vertel ons waar u last van heeft
              of wat u graag wilt veranderen; de tandarts onderzoekt uw gebit en
              bespreekt de mogelijkheden met u.
            </p>
          </div>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#24366f] transition hover:-translate-y-0.5 hover:bg-[#fff8e7] motion-reduce:transform-none"
              href="/nieuwe-patienten-inschrijven"
            >
              Schrijf u online in
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              href="tel:0306049005"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              030 604 9005
            </a>
          </div>
        </section>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <FooterSection />
      </div>
    </>
  );
}
