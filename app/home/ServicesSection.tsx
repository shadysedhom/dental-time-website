import {
  Activity,
  Crown,
  HeartHandshake,
  ShieldCheck,
  Smile,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import ServiceCard from "./ServiceCard";

type Service = {
  Icon: LucideIcon;
  description: string;
  href: string;
  title: string;
};

const services: Service[] = [
  {
    Icon: ShieldCheck,
    title: "Algemene tandheelkunde",
    description: "Persoonlijke zorg voor een gezonde en sterke glimlach.",
    href: "/behandelingen/algemene-tandheelkunde",
  },
  {
    Icon: Sparkles,
    title: "Cosmetische tandheelkunde",
    description: "Een natuurlijk resultaat dat past bij uw gezicht en wensen.",
    href: "/behandelingen/cosmetische-tandheelkunde",
  },
  {
    Icon: HeartHandshake,
    title: "Angst voor de tandarts",
    description: "Rust, duidelijke uitleg en zorg in een tempo dat bij u past.",
    href: "/behandelingen/angst-voor-de-tandarts",
  },
  {
    Icon: Wrench,
    title: "Restauratieve tandheelkunde",
    description: "Zorgvuldig herstel met aandacht voor functie en uitstraling.",
    href: "/behandelingen/restauratieve-tandheelkunde",
  },
  {
    Icon: Crown,
    title: "Kronen en bruggen",
    description: "Duurzaam maatwerk voor beschadigde of ontbrekende tanden.",
    href: "/behandelingen/kronen-en-bruggen",
  },
  {
    Icon: Activity,
    title: "Wortelkanaalbehandeling",
    description: "Een nauwkeurige behandeling gericht op behoud van uw tand.",
    href: "/behandelingen/wortelkanaalbehandeling",
  },
  {
    Icon: Smile,
    title: "Prothetische behandelingen",
    description:
      "Comfortabele oplossingen voor dagelijks gebruik en vertrouwen.",
    href: "/behandelingen/prothetische-behandelingen",
  },
];

export default function ServicesSection() {
  return (
    <section
      className="bg-white px-4 py-20 sm:px-6 lg:py-28"
      id="behandelingen-overzicht"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b]">
              Behandelingen
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-[-0.025em] text-[#11182b] sm:text-5xl">
              Mondzorg die bij u past
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
            Van periodieke controle tot uitgebreid herstel: u krijgt heldere
            uitleg, persoonlijke aandacht en een behandelplan dat past bij uw
            situatie.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
