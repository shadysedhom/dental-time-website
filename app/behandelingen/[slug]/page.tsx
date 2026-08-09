import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Crown,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

import StructuredData from "@/components/StructuredData";
import { businessConfig } from "@/config/site";
import { getTreatment, treatments } from "@/config/treatments";

type TreatmentPageProps = {
  params: Promise<{ slug: string }>;
};

type TreatmentPresentation = {
  Icon: LucideIcon;
  label: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  promise: string;
  promiseDetail: string;
};

const treatmentPresentation: Record<string, TreatmentPresentation> = {
  "algemene-tandheelkunde": {
    Icon: ShieldCheck,
    label: "Preventie & behoud",
    image: "/clinic-dental-time.jpeg",
    imageAlt: "De moderne praktijk van Dental Time in Nieuwegein",
    imagePosition: "center",
    promise: "Voorkomen waar het kan, behandelen waar het nodig is.",
    promiseDetail:
      "We volgen uw mondgezondheid zorgvuldig en adviseren alleen zorg die past bij wat we tijdens het onderzoek zien.",
  },
  "cosmetische-tandheelkunde": {
    Icon: Sparkles,
    label: "Natuurlijke esthetiek",
    image: "/sitting-smile.jpg",
    imageAlt: "Een patiënt met een stralende glimlach",
    imagePosition: "62% center",
    promise: "Een natuurlijk resultaat dat bij ú past.",
    promiseDetail:
      "Uw wensen zijn het vertrekpunt. Gezondheid, balans en een realistische verwachting blijven altijd leidend.",
  },
  "angst-voor-de-tandarts": {
    Icon: HeartHandshake,
    label: "Rust & vertrouwen",
    image: "/treatment-dental-anxiety.jpg",
    imageAlt: "Een tandarts stelt een patiënt met kiespijn gerust",
    imagePosition: "center 45%",
    promise: "U bepaalt het tempo. Wij zorgen voor rust en duidelijkheid.",
    promiseDetail:
      "We luisteren zonder oordeel, spreken een duidelijk stopsignaal af en nemen iedere stap vooraf met u door.",
  },
  "restauratieve-tandheelkunde": {
    Icon: Wrench,
    label: "Zorgvuldig herstel",
    image: "/dentist-explaining.png",
    imageAlt: "Een tandarts die een behandeling rustig toelicht",
    imagePosition: "center",
    promise: "Herstel met respect voor gezond tandweefsel.",
    promiseDetail:
      "We kijken verder dan de schade alleen en zoeken naar een passende oplossing voor functie, vorm en onderhoud.",
  },
  "kronen-en-bruggen": {
    Icon: Crown,
    label: "Persoonlijk maatwerk",
    image: "/treatment-crowns-bridges.jpg",
    imageAlt: "Tandtechnisch gebitsmodel voor een kroon of brug",
    imagePosition: "center 52%",
    promise: "Maatwerk met aandacht voor pasvorm en functie.",
    promiseDetail:
      "U krijgt vooraf duidelijke uitleg over de mogelijkheden, de behandelstappen en het onderhoud daarna.",
  },
  wortelkanaalbehandeling: {
    Icon: Activity,
    label: "Behoud van uw tand",
    image: "/treatment-root.jpg",
    imageAlt:
      "Een tandarts legt een wortelkanaalbehandeling uit met een tandmodel",
    imagePosition: "center 45%",
    promise: "Rustige uitleg bij iedere stap van de behandeling.",
    promiseDetail:
      "We onderzoeken eerst waar uw klacht vandaan komt en bespreken daarna wat nodig is om de tand zo goed mogelijk te behouden.",
  },
  "prothetische-behandelingen": {
    Icon: Smile,
    label: "Functie & comfort",
    image: "/treatment-prosthetics.jpg",
    imageAlt: "Een gebitsprothese wordt zorgvuldig afgewerkt",
    imagePosition: "center 48%",
    promise: "Comfort en dagelijkse bruikbaarheid staan centraal.",
    promiseDetail:
      "We nemen de tijd voor uw wensen, een zorgvuldige pasvorm en duidelijke begeleiding bij gebruik en onderhoud.",
  },
};

export function generateStaticParams() {
  return treatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({
  params,
}: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);

  if (!treatment) {
    return {};
  }

  const path = `/behandelingen/${treatment.slug}`;
  const presentation = treatmentPresentation[treatment.slug];

  return {
    title: `${treatment.name} in Nieuwegein`,
    description: treatment.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${treatment.name} in Nieuwegein | Dental Time`,
      description: treatment.metaDescription,
      url: `${businessConfig.url}${path}`,
      images: [
        {
          url: presentation.image,
          alt: presentation.imageAlt,
        },
      ],
      locale: "nl_NL",
      siteName: businessConfig.name,
      type: "website",
    },
  };
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const treatment = getTreatment(slug);

  if (!treatment) {
    notFound();
  }

  const presentation = treatmentPresentation[treatment.slug];
  const { Icon } = presentation;
  const pageUrl = `${businessConfig.url}/behandelingen/${treatment.slug}`;
  const relatedTreatments = treatment.relatedSlugs
    .map((relatedSlug) => getTreatment(relatedSlug))
    .filter((item) => item !== undefined);
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${treatment.name} in Nieuwegein`,
        description: treatment.metaDescription,
        image: `${businessConfig.url}${presentation.image}`,
        inLanguage: "nl-NL",
        isPartOf: {
          "@id": `${businessConfig.url}/#website`,
        },
        about: {
          "@type": "Service",
          name: treatment.name,
          areaServed: "Nieuwegein",
          provider: {
            "@id": `${businessConfig.url}/#dental-practice`,
          },
        },
      },
      {
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
          {
            "@type": "ListItem",
            position: 3,
            name: treatment.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="relative pb-24 pt-7 text-[#11182b] sm:pt-10">
      <StructuredData data={pageSchema} />

      <nav
        aria-label="Broodkruimel"
        className="mb-6 flex flex-wrap items-center text-sm text-slate-500 sm:mb-8"
      >
        <Link className="transition hover:text-[#314784]" href="/">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2 text-[#b18a36]">
          /
        </span>
        <Link className="transition hover:text-[#314784]" href="/behandelingen">
          Behandelingen
        </Link>
        <span aria-hidden="true" className="mx-2 text-[#b18a36]">
          /
        </span>
        <span aria-current="page">{treatment.name}</span>
      </nav>

      <header className="relative isolate overflow-hidden rounded-[2rem] bg-[#11182b] text-white shadow-[0_32px_90px_rgba(17,24,43,0.2)] sm:rounded-[2.75rem]">
        <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#3a4e9d]/35 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#b18a36]/20 blur-3xl" />

        <div className="relative grid lg:min-h-[37rem] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
            <div className="flex items-center gap-3 text-[#efd897]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
                {presentation.label}
              </p>
            </div>

            <h1 className="mt-7 max-w-3xl font-serif text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]">
              {treatment.name}
              <span className="mt-2 block text-[#d8bd75]">in Nieuwegein</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {treatment.shortDescription} U bent welkom bij Dental Time op het
              Muntplein.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d7b45a] px-6 py-3 font-bold text-[#11182b] shadow-[0_12px_30px_rgba(177,138,54,0.26)] transition hover:-translate-y-0.5 hover:bg-[#e2c474] motion-reduce:transform-none"
                href="/nieuwe-patienten-inschrijven"
              >
                Online inschrijven
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
          </div>

          <div className="relative m-2 min-h-[23rem] overflow-hidden rounded-[1.55rem] sm:m-3 sm:min-h-[30rem] sm:rounded-[2.15rem] lg:min-h-0">
            <Image
              fill
              priority
              alt={presentation.imageAlt}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 53vw"
              src={presentation.image}
              style={{ objectPosition: presentation.imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/65 via-transparent to-white/5" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[#11182b]/70 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#efd897]">
                Persoonlijke mondzorg
              </p>
              <p className="mt-2 font-serif text-xl font-semibold sm:text-2xl">
                Duidelijke uitleg. Zorgvuldige aandacht.
              </p>
            </div>
          </div>
        </div>
      </header>

      <dl className="mt-5 grid overflow-hidden rounded-2xl border border-[#ded8cc] bg-white shadow-[0_12px_40px_rgba(17,24,43,0.05)] sm:grid-cols-3 sm:divide-x sm:divide-[#ded8cc]">
        <div className="flex items-center gap-4 border-b border-[#ded8cc] px-5 py-5 sm:border-b-0 sm:px-6">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f7f0df] text-[#8f6d25]">
            <Star aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <dt className="font-serif text-xl font-semibold">
              4.4 beoordeling
            </dt>
            <dd className="text-sm text-slate-500">Google</dd>
          </div>
        </div>
        <div className="flex items-center gap-4 border-b border-[#ded8cc] px-5 py-5 sm:border-b-0 sm:px-6">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#eef1f8] text-[#314784]">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <dt className="font-serif text-xl font-semibold">25+ jaar</dt>
            <dd className="text-sm text-slate-500">Ervaring en aandacht</dd>
          </div>
        </div>
        <div className="flex items-center gap-4 px-5 py-5 sm:px-6">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f7f0df] text-[#8f6d25]">
            <MapPin aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <dt className="font-serif text-xl font-semibold">Muntplein</dt>
            <dd className="text-sm text-slate-500">Centraal in Nieuwegein</dd>
          </div>
        </div>
      </dl>

      <div className="sticky bottom-3 z-20 mt-5 flex gap-2 rounded-2xl border border-[#ded8cc] bg-white/95 p-2 shadow-[0_18px_50px_rgba(17,24,43,0.2)] backdrop-blur-xl sm:hidden">
        <Link
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#d7b45a] px-4 py-3 font-bold text-[#11182b]"
          href="/nieuwe-patienten-inschrijven"
        >
          Online inschrijven
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <a
          aria-label="Bel Dental Time op 030 604 9005"
          className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#11182b] text-white"
          href="tel:0306049005"
        >
          <Phone aria-hidden="true" className="h-5 w-5" />
        </a>
      </div>

      <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16 xl:gap-20">
        <div>
          <section aria-labelledby="intro-heading">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a752b] sm:text-sm">
              Persoonlijke zorg
            </p>
            <h2
              className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl"
              id="intro-heading"
            >
              Eerst begrijpen. Dan pas behandelen.
            </h2>
            <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-slate-600">
              {treatment.introduction.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0 ? "text-xl leading-9 text-slate-700" : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="indications-heading"
            className="mt-16 overflow-hidden rounded-[2rem] border border-[#ded8cc] bg-[#f3efe7] p-6 sm:p-10"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b] sm:text-sm">
                Wanneer is onderzoek verstandig?
              </p>
              <h2
                className="mt-4 font-serif text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
                id="indications-heading"
              >
                {treatment.indicationsTitle}
              </h2>
            </div>
            <ul className="mt-8 grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {treatment.indications.map((indication) => (
                <li
                  key={indication}
                  className="flex gap-4 border-t border-[#d9d0bf] py-5 leading-7 text-slate-700"
                >
                  <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white text-[#8f6d25] shadow-sm">
                    <Check aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {indication}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="promise-heading"
            className="relative mt-16 isolate overflow-hidden rounded-[2rem] bg-[#26396f] px-7 py-9 text-white shadow-[0_24px_60px_rgba(38,57,111,0.16)] sm:px-10 sm:py-12"
          >
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#b18a36]/20 blur-3xl" />
            <div className="relative max-w-3xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#efd897]">
                <HeartHandshake aria-hidden="true" className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#efd897] sm:text-sm">
                Wat u van ons mag verwachten
              </p>
              <h2
                className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl"
                id="promise-heading"
              >
                {presentation.promise}
              </h2>
              <p className="mt-5 text-lg leading-8 text-blue-100">
                {presentation.promiseDetail}
              </p>
              <ul className="mt-8 grid gap-3 text-sm font-semibold sm:grid-cols-3">
                {[
                  "Zorgvuldig onderzoek",
                  "Keuzes in overleg",
                  "Heldere uitleg vooraf",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 border-t border-white/15 pt-4"
                  >
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 text-[#efd897]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="approach-heading" className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a752b] sm:text-sm">
              Zo werken we
            </p>
            <h2
              className="mt-4 font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
              id="approach-heading"
            >
              In drie duidelijke stappen
            </h2>
            <div className="relative mt-10">
              <span
                aria-hidden="true"
                className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-[#c8ad68] md:block"
              />
              <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
                {treatment.approach.map((step, index) => (
                  <li key={step.title} className="relative">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#c8ad68] bg-white font-serif text-sm font-semibold text-[#8f6d25] shadow-[0_5px_18px_rgba(17,24,43,0.08)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 font-serif text-2xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>

        <aside className="h-fit overflow-hidden rounded-[2rem] border border-[#d9c99f] bg-[#f7f1e4] shadow-[0_20px_55px_rgba(17,24,43,0.09)] lg:sticky lg:top-28">
          <div className="bg-[#11182b] px-7 py-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#efd897]">
              Dental Time Nieuwegein
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">
              Wilt u patiënt worden?
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Schrijf uzelf of uw gezin online in. Wij nemen binnen twee
              werkdagen contact met u op.
            </p>
          </div>
          <div className="p-7">
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-3">
                <Check aria-hidden="true" className="h-4 w-4 text-[#8f6d25]" />
                Eenvoudig online geregeld
              </li>
              <li className="flex items-center gap-3">
                <Clock3 aria-hidden="true" className="h-4 w-4 text-[#8f6d25]" />
                Contact binnen twee werkdagen
              </li>
              <li className="flex items-center gap-3">
                <HeartHandshake
                  aria-hidden="true"
                  className="h-4 w-4 text-[#8f6d25]"
                />
                Persoonlijke aandacht
              </li>
            </ul>
            <Link
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d7b45a] px-5 py-3 font-bold text-[#11182b] transition hover:-translate-y-0.5 hover:bg-[#e2c474] motion-reduce:transform-none"
              href="/nieuwe-patienten-inschrijven"
            >
              Online inschrijven
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#c9bea9] bg-white px-5 py-3 font-semibold text-[#25376d] transition hover:border-[#b18a36]"
              href="tel:0306049005"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              030 604 9005
            </a>
            <p className="mt-6 flex gap-2 border-t border-[#d9d0bf] pt-5 text-sm leading-6 text-slate-600">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-none text-[#8f6d25]"
              />
              Waardijnburg 3, 3437 AR Nieuwegein
            </p>
          </div>
        </aside>
      </div>

      <section
        aria-labelledby="faq-heading"
        className="border-y border-[#ded8cc] py-16 sm:py-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a752b] sm:text-sm">
              Goed om te weten
            </p>
            <h2
              className="mt-4 font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
              id="faq-heading"
            >
              Veelgestelde vragen
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
              Antwoorden op veelgestelde vragen over{" "}
              {treatment.name.toLowerCase()}. Voor persoonlijk advies
              onderzoeken we altijd eerst uw situatie.
            </p>
          </div>
          <div className="divide-y divide-[#ded8cc] border-t border-[#ded8cc]">
            {treatment.faqs.map((faq, index) => (
              <details key={faq.question} className="group py-6">
                <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-start gap-3 text-lg font-semibold marker:content-none sm:text-xl">
                  <span className="font-serif text-sm font-semibold text-[#9a752b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="ml-2 text-2xl font-light leading-none text-[#9a752b] transition group-open:rotate-45 motion-reduce:transform-none"
                  >
                    +
                  </span>
                </summary>
                <p className="ml-[3.25rem] mt-4 max-w-2xl leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="pt-16 sm:pt-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a752b] sm:text-sm">
              Verder ontdekken
            </p>
            <h2
              className="mt-4 font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
              id="related-heading"
            >
              Gerelateerde behandelingen
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 font-semibold text-[#314784] transition hover:gap-3"
            href="/behandelingen"
          >
            Alle behandelingen
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {relatedTreatments.map((related) => {
            const relatedPresentation = treatmentPresentation[related.slug];

            return (
              <Link
                key={related.slug}
                className="group overflow-hidden rounded-[2rem] border border-[#ded8cc] bg-white shadow-[0_14px_40px_rgba(17,24,43,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b18a36]/60 hover:shadow-[0_24px_60px_rgba(17,24,43,0.12)] motion-reduce:transform-none"
                href={`/behandelingen/${related.slug}`}
              >
                <article className="grid h-full sm:grid-cols-[12rem_1fr]">
                  <div className="relative min-h-52 overflow-hidden sm:min-h-full">
                    <Image
                      fill
                      alt={relatedPresentation.imageAlt}
                      className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                      sizes="(max-width: 640px) 100vw, 12rem"
                      src={relatedPresentation.image}
                      style={{
                        objectPosition: relatedPresentation.imagePosition,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/35 to-transparent" />
                  </div>
                  <div className="flex flex-col p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a752b]">
                      {relatedPresentation.label}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">
                      {related.name}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {related.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#314784] transition group-hover:gap-3 sm:mt-auto sm:pt-6">
                      Lees meer
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <Link
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#314784]"
          href="/behandelingen"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Terug naar alle behandelingen
        </Link>
      </section>
    </article>
  );
}
