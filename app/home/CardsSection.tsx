"use client";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { UserPlus, CalendarCheck, ShieldAlert } from "lucide-react";

type CardContentProps = {
  description: string;
  icon: React.ReactNode;
  linkHref: string;
  linkText: string;
  linkVariant: "primary" | "danger";
  title: string;
};

// Renders the content of a card with an icon, title, description, and a CTA button.
function CardContent({
  description,
  icon,
  linkHref,
  linkText,
  linkVariant,
  title,
}: CardContentProps) {
  return (
    <div className="relative z-10">
      {icon}

      <h3 className="text-lg md:text-2xl font-bold tracking-wide mt-4 mb-2">
        {title}
      </h3>

      <p className="mb-10 md:w-2/3">{description}</p>

      <Button
        as={Link}
        className="rounded-md uppercase"
        color={linkVariant}
        href={linkHref}
        variant="solid"
      >
        {linkText}
      </Button>
    </div>
  );
}

// Renders an overlay with a hover effect
// and a gradient background for the cards.
function Overlay() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-transparent rounded-md transition-opacity duration-300 group-hover:opacity-75">
      {/* Use styling to change overlay appearance */}
    </div>
  );
}

// General styling that applies to all cards
const generalCardStyling = `
    w-full h-[50vh] relative bg-cover bg-center shadow-md rounded-md group 
    px-10 md:px-20 flex items-center
    transition-transform duration-300 scale-[0.98] hover:scale-100
`;

export default function CardsSection() {
  return (
    <section className="flex w-full relative flex-wrap gap-2 text-white">
      {/* Card 1 - Sign Up (50% width) */}
      <div
        className={
          generalCardStyling +
          "bg-[url('/unit-2.jpg')] lg:w-[calc(50%-0.5rem)] "
        }
      >
        <Overlay />

        <CardContent
          description="Wij verheugen ons om onze deuren te openen voor nieuwe patiënten. U kunt zich telefonisch bij ons inschrijven of door middel van het online inschrijfformulier."
          icon={<UserPlus className="text-white" size={40} />}
          linkHref="/inschrijven"
          linkText="Online Inschrijven"
          linkVariant="primary"
          title="Inschrijven"
        />
      </div>

      {/* Card 2 - Call for Appointment (50% width) */}
      <div
        className={
          generalCardStyling +
          "bg-[url('/reception.jpg')] lg:w-[calc(50%-0.5rem)]"
        }
      >
        <Overlay />

        <CardContent
          description="Bel ons gerust om een afspraak te maken. Onze medewerkers staan klaar om u te helpen bij het inplannen van uw volgende bezoek. Wij zijn op maandag, woensdag en donderdag bereikbaar van 08:00 tot 17:00 uur."
          icon={<CalendarCheck className="text-white" size={40} />}
          linkHref="tel:0306049005"
          linkText="Bel Voor Afspraak"
          linkVariant="primary"
          title="Afspraak Maken"
        />
      </div>

      {/* Card 3 - Emergencies (full width) */}
      <div className={generalCardStyling + "bg-[url('/emergency-2.jpeg')]"}>
        <Overlay />

        <CardContent
          description="Bij spoedgevallen gelieve contact op te nemen met Tandartsspoedpraktijk St. Antonius Leidsche Rijn. Ze zijn telefonisch 24/7 bereikbaar (0900 8602)."
          icon={<ShieldAlert className="text-white" size={40} />}
          linkHref="tel:09008602"
          linkText="Bel Spoednummer"
          linkVariant="danger"
          title="Spoedgevallen"
        />
      </div>
    </section>
  );
}
