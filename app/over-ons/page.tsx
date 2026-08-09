import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  HeartHandshake,
  MapPin,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import FooterSection from "@/components/footer";
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
    images: ["/about-us-hero-upscaled.jpeg"],
    locale: "nl_NL",
    siteName: businessConfig.name,
    type: "website",
  },
};

type Principle = {
  description: string;
  Icon: LucideIcon;
  title: string;
};

const principles: Principle[] = [
  {
    Icon: HeartHandshake,
    title: "Persoonlijke aandacht",
    description:
      "We luisteren naar wat u belangrijk vindt en nemen uw vragen serieus.",
  },
  {
    Icon: MessageCircleMore,
    title: "Duidelijke uitleg",
    description:
      "U hoort rustig wat we zien, welke mogelijkheden er zijn en waarom.",
  },
  {
    Icon: ShieldCheck,
    title: "Zorgvuldig behandeld",
    description:
      "We werken nauwkeurig en kiezen samen een behandeling die bij u past.",
  },
];

function PrincipleCard({ description, Icon, title }: Principle) {
  return (
    <article className="rounded-[1.5rem] border border-[#d8c79f]/45 bg-[#fffdf9] p-7 shadow-[0_18px_50px_rgba(17,24,43,0.07)] sm:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7b45a]/35 bg-[#f6f0e6] text-[#9a752b]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-[#11182b]">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className="relative left-1/2 -mt-16 flex min-h-screen w-screen -translate-x-1/2 flex-col overflow-x-clip bg-[#fbfaf7] text-[#11182b]">
      <main>
        <section className="relative isolate overflow-hidden bg-[#f6f0e6] pb-8 sm:pb-16 lg:min-h-[49rem] lg:bg-transparent lg:pb-0">
          <div className="absolute inset-x-0 top-0 h-[32rem] lg:inset-0 lg:h-auto">
            <Image
              fill
              priority
              alt="De lichte receptie van Dental Time in Nieuwegein"
              className="object-cover object-[34%_center] lg:object-center"
              sizes="100vw"
              src="/about-us-hero-upscaled.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11182b]/38 via-[#11182b]/10 to-transparent lg:from-[#11182b]/44 lg:via-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/30 via-transparent to-[#11182b]/15 lg:from-[#11182b]/25 lg:to-[#11182b]/10" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#f6f0e6]/70 to-[#f6f0e6] lg:hidden" />
          </div>

          <div className="relative mx-auto flex max-w-6xl px-4 pt-[17.5rem] sm:px-6 sm:pt-[22rem] lg:min-h-[49rem] lg:items-center lg:pb-10 lg:pt-32">
            <div className="w-full max-w-2xl rounded-[1.75rem] border border-white/80 bg-[#fffdf9] p-6 shadow-[0_24px_70px_rgba(17,24,43,0.2)] sm:p-9 lg:rounded-[2rem] lg:bg-[#fffdf9]/95 lg:p-12 lg:shadow-[0_28px_90px_rgba(17,24,43,0.24)] lg:backdrop-blur-xl">
              <div className="flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8d6a25] sm:gap-3 sm:text-xs sm:tracking-[0.2em]">
                <span className="h-px w-6 bg-[#c59b3d] sm:w-8" />
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Muntplein, Nieuwegein
              </div>
              <h1 className="mt-5 max-w-xl font-serif text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:mt-7 sm:text-6xl lg:text-7xl">
                Klein in omvang. Groot in aandacht.
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">
                Dental Time is een moderne, betrokken tandartspraktijk waar we
                de tijd nemen voor u, uw verhaal en uw glimlach.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#b88e32] bg-[#d7b45a] px-5 font-bold text-[#11182b] shadow-[0_12px_28px_rgba(177,138,54,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e2c269] motion-reduce:transform-none"
                  href="/nieuwe-patienten-inschrijven"
                >
                  Kennismaken als patiënt
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#11182b]/15 bg-white/70 px-5 font-semibold text-[#11182b] transition-colors hover:bg-white"
                  href="tel:0306049005"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 text-[#9a752b]"
                  />
                  {businessConfig.phone}
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#d8c79f]/55 pt-4 text-xs font-medium leading-5 text-slate-600 sm:mt-8 sm:pt-6 sm:text-sm">
                <span className="flex items-start gap-2">
                  <Sparkles
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#b88e32]"
                  />
                  Nieuwe patiënten welkom
                </span>
                <span className="flex items-start gap-2">
                  <Clock3
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#b88e32]"
                  />
                  Rustige, persoonlijke zorg
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f0e6] px-4 pb-20 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-[#b88e32]/60 sm:-left-6 sm:-top-6" />
              <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-[#11182b] shadow-[0_24px_70px_rgba(17,24,43,0.16)] sm:min-h-[38rem]">
                <Image
                  fill
                  alt="De rustige gang in de praktijk van Dental Time"
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  src="/hall.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/45 via-transparent to-transparent" />
                <p className="absolute bottom-0 left-0 m-6 max-w-[15rem] rounded-xl border border-white/25 bg-[#11182b]/70 px-4 py-3 text-sm leading-6 text-white/85 backdrop-blur-md">
                  Een rustige, lichte praktijk op het Muntplein.
                </p>
              </div>
              <div className="absolute -bottom-5 -right-4 h-28 w-28 border-b border-r border-[#b88e32]/60 sm:-right-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b]">
                Onze praktijk
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Een plek waar u zich gezien mag voelen.
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  Bij Dental Time geloven we dat goede mondzorg begint met
                  aandacht. We luisteren, onderzoeken zorgvuldig en leggen in
                  gewone taal uit wat we zien.
                </p>
                <p>
                  U kunt bij ons terecht voor periodieke controles, preventieve
                  zorg en uiteenlopende tandheelkundige behandelingen. Daarbij
                  kijken we niet alleen naar uw gebit, maar ook naar wat voor u
                  prettig en haalbaar voelt.
                </p>
              </div>

              <blockquote className="mt-9 border-l-2 border-[#c59b3d] pl-6 font-serif text-2xl leading-9 text-[#2c3447]">
                “Rust, helderheid en samen kiezen. Zo hoort een bezoek aan de
                tandarts te voelen.”
              </blockquote>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#d8c79f]/50 bg-[#fffdf9]/75 p-5">
                  <p className="font-serif text-3xl font-semibold text-[#9a752b]">
                    25+
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    jaar ervaring
                  </p>
                </div>
                <div className="rounded-2xl border border-[#d8c79f]/50 bg-[#fffdf9]/75 p-5">
                  <p className="font-serif text-3xl font-semibold text-[#9a752b]">
                    9.6
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    waardering op Tandarts.nl
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf7] px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b]">
                Wat u van ons mag verwachten
              </p>
              <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">
                Zorg met aandacht voor het geheel
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Deskundige mondzorg voelt beter wanneer u weet waar u aan toe
                bent en ruimte krijgt om vragen te stellen.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {principles.map((principle) => (
                <PrincipleCard key={principle.title} {...principle} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#11182b] px-4 py-20 text-white sm:px-6 lg:py-28">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#171f34] shadow-[0_28px_90px_rgba(0,0,0,0.22)] lg:grid-cols-2">
            <div className="relative min-h-[24rem] lg:min-h-[40rem]">
              <Image
                fill
                alt="Een patiënt tijdens een ontspannen tandartsbezoek"
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="/about-us-1.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#171f34]/20" />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#efd897]">
                Samen beslissen
              </p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl">
                Uw mondzorg, in alle rust besproken.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/75">
                We bespreken bevindingen en behandelopties begrijpelijk. Zo kunt
                u samen met de tandarts een weloverwogen keuze maken, zonder
                onnodig ingewikkelde taal.
              </p>

              <ul className="mt-8 space-y-4 text-white/85">
                {[
                  "Ruimte voor uw wensen en vragen",
                  "Een helder beeld van de mogelijkheden",
                  "Een behandelplan dat bij u past",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[#d7b45a]" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                className="mt-9 inline-flex w-fit items-center gap-2 border-b border-[#d7b45a] pb-1 font-semibold text-[#efd897] transition-colors hover:text-white"
                href="/behandelingen"
              >
                Bekijk onze behandelingen
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f0e6] px-4 py-20 sm:px-6 lg:py-28">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#11182b] shadow-[0_24px_70px_rgba(17,24,43,0.18)]">
            <Image
              fill
              alt=""
              aria-hidden="true"
              className="object-cover object-center opacity-55"
              sizes="(max-width: 1024px) 100vw, 72rem"
              src="/clinic-dental-time.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11182b] via-[#11182b]/90 to-[#11182b]/42" />

            <div className="relative max-w-2xl p-8 text-white sm:p-12 lg:p-16">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#efd897]">
                Welkom bij Dental Time
              </p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl">
                Kennismaken met onze praktijk?
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/75">
                Nieuwe patiënten zijn van harte welkom. Schrijf u eenvoudig
                online in of bel ons wanneer u eerst een vraag wilt stellen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#b88e32] bg-[#d7b45a] px-5 font-bold text-[#11182b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e2c269] motion-reduce:transform-none"
                  href="/nieuwe-patienten-inschrijven"
                >
                  Online inschrijven
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                  href="tel:0306049005"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 text-[#efd897]"
                  />
                  Bel {businessConfig.phone}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
