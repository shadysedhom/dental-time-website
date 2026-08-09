import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

import CustomLink from "./CustomLink";
import CookieSettingsButton from "./CookieSettingsButton";

import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const iconStyling = "mr-2 h-4 w-4 text-[#d7b45a]";
  const iconMap = {
    Phone: <Phone className={iconStyling} />,
    Mail: <Mail className={iconStyling} />,
    MapPin: <MapPin className={iconStyling} />,
  };

  return (
    <footer className="w-full border-t border-[#d7b45a]/15 bg-[#0c1222] px-4 pb-7 pt-14 text-left text-white md:pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Logo and Description Column */}
          <div className="lg:col-span-2">
            {/* Footer Logo */}
            <Image
              alt="Dental Time Logo"
              className="h-24 w-auto"
              height={100}
              src="/dental-time-gold.svg"
              width={100}
            />

            {/* Mission statement */}
            <p className="mt-5 max-w-sm leading-8 text-white/60">
              Uw glimlach is onze zorg. Bij Dental Time bieden we aandachtige
              tandheelkundige zorg. Samen werken we aan een stralende, gezonde
              lach.
            </p>

            {/* Socials (Optional) */}
            {/* <div className="mt-6 flex space-x-4">
                            <Link href="#" className="text-gray-500 hover:text-gray-600">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-600">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            etc...
                        </div> */}
          </div>

          {/* Openingtimes Column */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#efd897]">
              Openingstijden
            </h3>

            <ul className="mt-4 space-y-3">
              {siteConfig.openingTimes.map((item, index) => (
                <li key={`${item.day}-${index}`}>
                  <div className="flex">
                    <span className="w-24 flex-shrink-0 text-white/55">
                      {item.day}
                    </span>
                    <span className="ml-6 text-white/75">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Menu Column */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#efd897]">
              Menu
            </h3>

            <ul className="mt-4 space-y-3">
              {siteConfig.navMenuItems.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <CustomLink
                    className="!text-white/65 hover:!text-[#efd897]"
                    href={item.href}
                  >
                    {item.label}
                  </CustomLink>
                </li>
              ))}

              <li>
                <CustomLink
                  className="!text-white/65 hover:!text-[#efd897]"
                  href="/algemene-voorwaarden"
                >
                  Algemene voorwaarden
                </CustomLink>
              </li>

              <li>
                <CustomLink
                  className="!text-white/65 hover:!text-[#efd897]"
                  href="/privacyverklaring"
                >
                  Privacyverklaring
                </CustomLink>
              </li>

              <li>
                <CookieSettingsButton className="text-left text-white/65 underline-offset-4 hover:text-[#efd897] hover:underline" />
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#efd897]">
              Contact
            </h3>

            <ul className="mt-4 space-y-3">
              {siteConfig.contactMenuItems.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <CustomLink
                    className="!text-white/65 hover:!text-[#efd897]"
                    href={item.href}
                  >
                    {iconMap[item.icon as keyof typeof iconMap]}
                    {item.label}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-7">
          <p className="text-center text-sm text-white/45">
            © {currentYear} Dental Time B.V. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
