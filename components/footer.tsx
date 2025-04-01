"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

import CustomLink from "./CustomLink";

import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const iconStyling = "h-4 w-4 text-gray-500 mr-2";
  const iconMap = {
    Phone: <Phone className={iconStyling} />,
    Mail: <Mail className={iconStyling} />,
    MapPin: <MapPin className={iconStyling} />,
  };

  return (
    <footer className="w-full border-t bg-white px-4 pt-12 pb-6 md:pt-16 text-left">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Logo and Description Column */}
          <div className="lg:col-span-2">
            {/* Footer Logo */}
            <Image
              alt="Dental Time Logo"
              className="h-12 w-auto"
              height={100}
              src="/dental-time-black.svg"
              width={100}
            />

            {/* Mission statement */}
            <p className="mt-4 max-w-xs text-gray-600 leading-loose">
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
            <h3 className="text-lg font-semibold text-navy-900 uppercase">
              Openingstijden
            </h3>

            <ul className="mt-4 space-y-3">
              {siteConfig.openingTimes.map((item, index) => (
                <li key={`${item.day}-${index}`}>
                  <p className="text-gray-600 ">
                    {item.day}: {item.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Menu Column */}
          <div>
            <h3 className="text-lg font-semibold text-navy-900 uppercase">
              Menu
            </h3>

            <ul className="mt-4 space-y-3">
              {siteConfig.navMenuItems.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <CustomLink href={item.href}>{item.label}</CustomLink>
                </li>
              ))}

              <li>
                <CustomLink href="/privacyverklaring">
                  Privacyverklaring
                </CustomLink>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-navy-900 uppercase">
              Contact
            </h3>

            <ul className="mt-4 space-y-3">
              {siteConfig.contactMenuItems.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <CustomLink href={item.href}>
                    {iconMap[item.icon as keyof typeof iconMap]}
                    {item.label}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} Dental Time B.V. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
