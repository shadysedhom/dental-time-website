
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

export const siteConfig = {
  name: "Dental Time",
  description: "Tandarts in Nieuwegein",
  navItems: [ // For Desktop
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/#contact",
    },
    {
      label: "Route",
      href: "https://maps.app.goo.gl/k8JoZPNGD9JEsA8r6",
    },
  ],
  navMenuItems: [ // For Mobile
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/#contact",
    },
    {
      label: "Route",
      href: "https://maps.app.goo.gl/k8JoZPNGD9JEsA8r6",
    },
    {
      label: "Inschrijven",
      href: "/inschrijven",
    },
  ],
  openingTimes: [
    {
        day: "Maandag",
        time: "08:00 - 17:00",
    },
    {
        day: "Dinsdag",
        time: "Gesloten",
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
        day: "Vrijdag - Zondag",
        time: "Gesloten",
    }
  ],
  contactMenuItems: [
    {
        icon: "Phone",
        label: "030 604 9005",
        href: "tel:0306049005"
    },
    { 
        icon: "Mail",
        label: "info@dental-time.nl", 
        href: "mailto:info@dental-time.nl"
    },
    { 
        icon: "MapPin",
        label: "Carillonlaan 15, 3438RC Nieuwegein", 
        href: "https://maps.app.goo.gl/k8JoZPNGD9JEsA8r6"
    },
  ],
};
