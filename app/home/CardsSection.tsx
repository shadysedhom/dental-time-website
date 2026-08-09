"use client";

import Image from "next/image";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import {
  ArrowRight,
  CalendarCheck,
  Phone,
  ShieldAlert,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

type ActionCardProps = {
  Icon: LucideIcon;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  linkText: string;
  title: string;
};

const actionCards: ActionCardProps[] = [
  {
    Icon: UserPlus,
    title: "Nieuwe patiënt",
    description:
      "Welkom bij Dental Time. Schrijf uzelf en uw gezin eenvoudig online in.",
    href: "/nieuwe-patienten-inschrijven",
    linkText: "Online inschrijven",
    image: "/hall.webp",
    imageAlt: "De rustige gang van Dental Time met zitbank en planten",
    imagePosition: "center 46%",
  },
  {
    Icon: CalendarCheck,
    title: "Een afspraak maken",
    description:
      "Wij nemen graag de tijd om een passend moment voor uw bezoek te vinden.",
    href: "tel:0306049005",
    linkText: "Bel 030 604 9005",
    image: "/clinic-dental-time.jpeg",
    imageAlt: "De moderne praktijk van Dental Time",
    imagePosition: "center",
  },
];

function ActionCard({
  Icon,
  description,
  href,
  image,
  imageAlt,
  imagePosition,
  linkText,
  title,
}: ActionCardProps) {
  return (
    <article className="group relative min-h-[27rem] overflow-hidden rounded-[1.75rem] bg-[#11182b] shadow-[0_20px_60px_rgba(17,24,43,0.12)] sm:min-h-[31rem]">
      <Image
        fill
        alt={imageAlt}
        className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transform-none"
        sizes="(max-width: 1024px) 100vw, 50vw"
        src={image}
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#11182b]/95 via-[#11182b]/48 to-[#11182b]/5" />

      <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#efd897]/50 bg-[#11182b]/55 text-[#efd897] backdrop-blur-sm">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-3xl font-semibold sm:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
          {description}
        </p>
        <Button
          as={Link}
          className="mt-6 min-h-12 rounded-xl border border-[#d7b45a] bg-[#d7b45a] px-5 font-bold text-[#11182b] shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e2c269] motion-reduce:transform-none"
          color="primary"
          endContent={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
          href={href}
        >
          {linkText}
        </Button>
      </div>
    </article>
  );
}

export default function CardsSection() {
  return (
    <section
      className="bg-[#f6f0e6] px-4 py-20 sm:px-6 lg:py-28"
      id="praktisch"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b]">
            Praktische informatie
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.025em] text-[#11182b] sm:text-5xl">
            Uw bezoek, helder geregeld
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Of u zich wilt inschrijven of een afspraak wilt plannen: we helpen u
            snel en persoonlijk verder.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {actionCards.map((card) => (
            <ActionCard key={card.title} {...card} />
          ))}
        </div>

        <div className="relative mt-6 min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-[#d7b45a]/25 bg-[#11182b] text-white shadow-[0_20px_60px_rgba(17,24,43,0.16)] sm:min-h-[20rem] lg:min-h-[18rem]">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
            <Image
              fill
              alt=""
              aria-hidden="true"
              className="object-cover object-[64%_42%]"
              sizes="(max-width: 1024px) 100vw, 45rem"
              src="/emergency-2.jpeg"
            />
            <div className="absolute inset-0 bg-[#11182b]/58 lg:bg-gradient-to-r lg:from-[#11182b] lg:via-[#11182b]/62 lg:to-[#11182b]/12" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#11182b] via-[#11182b]/82 to-[#11182b]/18 lg:via-[#11182b]/68 lg:to-transparent" />

          <div className="relative z-10 flex min-h-[inherit] max-w-2xl flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#efd897]/35 bg-[#11182b]/45 text-[#efd897] backdrop-blur-md">
              <ShieldAlert aria-hidden="true" className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#efd897]">
              Hulp wanneer het nodig is
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Spoed buiten onze openingstijden?
            </h3>
            <p className="mt-3 max-w-lg leading-7 text-white/80">
              Tandartsspoedpraktijk St. Antonius Leidsche Rijn is 24 uur per dag
              bereikbaar.
            </p>
            <Button
              as={Link}
              className="mt-6 min-h-12 w-fit rounded-xl border border-[#efd897]/55 bg-[#fffdf9]/95 px-5 font-bold text-[#11182b] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white motion-reduce:transform-none"
              href="tel:09008602"
              startContent={<Phone className="h-4 w-4 text-[#9a752b]" />}
            >
              0900 8602
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
