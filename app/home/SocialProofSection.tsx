import Image from "next/image";
import { Link } from "@heroui/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Quote,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";

type TrustItem = {
  Icon: LucideIcon;
  detail: string;
  label: string;
  value: string;
};

const trustItems: TrustItem[] = [
  {
    Icon: Star,
    value: "4.4",
    label: "Google-rating",
    detail: "Ervaringen van patiënten",
  },
  {
    Icon: ShieldCheck,
    value: "9.4",
    label: "Tandarts.nl",
    detail: "Beoordeeld door patiënten",
  },
  {
    Icon: Clock3,
    value: "25+",
    label: "Jaar ervaring",
    detail: "Vertrouwde mondzorg",
  },
  {
    Icon: MapPin,
    value: "Muntplein",
    label: "Nieuwegein",
    detail: "Centraal en goed bereikbaar",
  },
];

export default function SocialProofSection() {
  return (
    <section
      className="bg-[#fbfaf7] px-4 py-16 sm:px-6 lg:py-24"
      id="vertrouwen"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#b88e32]/20 bg-white shadow-[0_24px_70px_rgba(17,24,43,0.07)]">
        <div className="px-6 pb-4 pt-8 text-center sm:px-10 sm:pt-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b]">
            Met vertrouwen naar de tandarts
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#11182b] sm:text-4xl">
            Persoonlijke zorg, gewaardeerd door patiënten
          </h2>
        </div>

        <div className="grid px-6 py-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:py-8">
          {trustItems.map(({ Icon, detail, label, value }, index) => (
            <div
              key={label}
              className={`flex items-center gap-4 border-[#b88e32]/15 py-5 sm:px-5 lg:justify-center lg:px-6 ${
                index > 0 ? "border-t sm:border-t-0" : ""
              } ${index % 2 === 1 ? "sm:border-l" : ""} ${
                index > 1 ? "sm:border-t lg:border-t-0" : ""
              } ${index > 0 ? "lg:border-l" : ""}`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f6edd8] text-[#9a752b]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold leading-none text-[#11182b]">
                  {value}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#374151]">
                  {label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative border-t border-[#b88e32]/15 bg-[#f8f2e7] px-6 py-8 sm:px-10 lg:flex lg:items-center lg:gap-10 lg:px-14">
          <Quote
            aria-hidden="true"
            className="absolute right-7 top-5 h-16 w-16 text-[#b88e32]/10 sm:right-12"
          />
          <div className="flex shrink-0 items-center gap-3">
            <Image
              alt="Google"
              className="h-10 w-10 rounded-full bg-white p-1.5 shadow-sm"
              height={40}
              src="/google-icon.svg"
              width={40}
            />
            <div>
              <div aria-label="Vijf van vijf sterren" className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-[#b88e32] text-[#b88e32]"
                  />
                ))}
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#76571d]">
                Google-review
              </p>
            </div>
          </div>

          <blockquote className="relative mt-5 max-w-3xl font-serif text-xl leading-relaxed text-[#26304a] sm:text-2xl lg:mt-0">
            “Zeer vriendelijke, zorgzame, professionele arts. Werkt met de
            nieuwste technieken.”
          </blockquote>

          <Link
            isExternal
            className="mt-5 inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#76571d] underline-offset-4 hover:underline lg:ml-auto lg:mt-0"
            href="https://g.co/kgs/XuoK1aZ"
          >
            Alle reviews
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
