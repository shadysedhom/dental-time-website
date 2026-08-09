export type NavItem = {
  label: string;
  href: string;
};

export type OpeningTime = {
  day: string;
  time: string;
};

export type ContactMenuItem = {
  icon: string;
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavItem[];
  openingTimes: OpeningTime[];
  contactMenuItems: ContactMenuItem[];
};

export const businessConfig = {
  url: "https://www.dental-time.nl",
  name: "Dental Time",
  legalName: "Dental Time B.V.",
  description:
    "Uw tandarts in Nieuwegein voor persoonlijke, moderne mondzorg. Nieuwe patiënten zijn welkom bij onze praktijk op het Muntplein.",
  phone: "030 604 9005",
  phoneInternational: "+31306049005",
  email: "info@dental-time.nl",
  address: {
    streetAddress: "Waardijnburg 3",
    postalCode: "3437 AR",
    addressLocality: "Nieuwegein",
    addressCountry: "NL",
  },
  mapsUrl: "https://maps.app.goo.gl/x1usR2bYpxEx1ebV8",
} as const;

export const siteConfig = {
  name: "Dental Time",
  description: businessConfig.description,
  navItems: [
    // -------------- For Desktop --------------
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Over ons",
      href: "/over-ons",
    },
    {
      label: "Behandelingen",
      href: "/behandelingen",
    },
    {
      label: "Contact",
      href: "/#contact",
    },
    {
      label: "Route",
      href: "https://maps.app.goo.gl/x1usR2bYpxEx1ebV8",
    },
  ],
  navMenuItems: [
    // -------------- For Mobile --------------
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Over ons",
      href: "/over-ons",
    },
    {
      label: "Behandelingen",
      href: "/behandelingen",
    },
    {
      label: "Contact",
      href: "/#contact",
    },
    {
      label: "Route",
      href: "https://maps.app.goo.gl/x1usR2bYpxEx1ebV8",
    },
    {
      label: "Inschrijven",
      href: "/nieuwe-patienten-inschrijven",
    },
  ],
  openingTimes: [
    {
      day: "Maandag",
      time: "08:00 - 17:00",
    },
    {
      day: "Dinsdag",
      time: "08:00 - 17:00",
    },
    {
      day: "Woensdag",
      time: "08:00 - 17:00",
    },
    {
      day: "Donderdag",
      time: "08:00 - 17:00",
    },
    {
      day: "Vrijdag",
      time: "08:00 - 12:00",
    },
    {
      day: "Zaterdag",
      time: "Gesloten",
    },
    {
      day: "Zondag",
      time: "Gesloten",
    },
  ],
  contactMenuItems: [
    {
      icon: "Phone",
      label: "030 604 9005",
      href: "tel:0306049005",
    },
    {
      icon: "Mail",
      label: "info@dental-time.nl",
      href: "mailto:info@dental-time.nl",
    },
    {
      icon: "MapPin",
      label: "Waardijnburg 3, 3437 AR Nieuwegein",
      href: "https://maps.app.goo.gl/x1usR2bYpxEx1ebV8",
    },
  ],
};
