"use client";

import { Phone, Mail, MapPin } from "lucide-react";

import FooterSection from "@/components/footer";
import CustomLink from "@/components/CustomLink";
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

const BulletPoint = () => (
  <span className="mr-2 inline-block h-2 w-2 rotate-45 border-2 border-black" />
);

export default function AlgemeneVoorwaardenPage() {
  const bgImageUrl = "/about-us-bg.jpeg";
  const subtitleStyling = "text-lg w-5/6 py-4 font-semibold text-slate-800";
  const sectionTitleStyling = "font-bold mt-5";

  const companyName = "Dental Time";
  const companyEmail = "info@dental-time.nl";

  const iconStyling = "h-4 w-4 text-gray-500 mr-2";
  const iconMap = {
    Phone: <Phone className={iconStyling} />,
    Mail: <Mail className={iconStyling} />,
    MapPin: <MapPin className={iconStyling} />,
  };

  return (
    <div
      className="flex flex-col absolute top-0 left-0 w-full items-center justify-center gap-2 bg-slate-50 bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${bgImageUrl}')`,
      }}
    >
      {/* Spacer */}
      <div className="mt-24 md:mt-32" />

      <div className="flex flex-col w-5/6 text-left md:px-20 py-10 gap-2 leading-relaxed">
        {/* Title & Subtitle */}
        <h1 className={title() + " leading-relaxed "}>Algemene voorwaarden - Dental Time</h1>


        {/* Contact Section (if wanted) */}
        {/* <p className={sectionTitleStyling}>Contactgegevens</p>

        <ul className="mt-4 space-y-3">
          {siteConfig.contactMenuItems.map((item, index) => (
            <li key={`${item}-${index}`}>
              <CustomLink href={item.href}>
                {iconMap[item.icon as keyof typeof iconMap]}
                {item.label}
              </CustomLink>
            </li>
          ))}
        </ul> */}

        {/* <p className="flex flex-col justify-center space-y-2">
                    {[ 
                        { Icon: Globe, text: "www.dental-time.nl" },
                        { Icon: MapPin, text: "Carillonlaan 15, 3438RC Nieuwegein" },
                        { Icon: Phone, text: "030 604 9005" }
                    ].map(({ Icon, text }, idx) => (
                        <span key={idx} className="flex items-center">
                            <Icon className="inline-block align-middle mr-2 w-4" /> {text}
                        </span>
                    ))}
         </p> */}

        {/* Spacer */}
        <div className="mt-6 md:mt-10" />

        {/* Algemene Voorwaarden Content */}
        <p className={sectionTitleStyling}>
          1. Algemeen
        </p>

        <p>
            Deze algemene voorwaarden zijn van toepassing op alle behandelingen, afspraken en dienstverlening van tandartspraktijk Dental Time.
            Door het maken van een afspraak gaat u akkoord met deze voorwaarden.
        </p>

        <p className={sectionTitleStyling}>
          2. Facturatie & Betaling
        </p>

        <p>
            Dental Time is verantwoordelijk voor facturering van de diensten. Na uw behandeling ontvangt u een factuur van ons, 
            welke binnen de gestelde termijn dient te worden voldaan. Voor vragen over betalingen of facturen kunt u rechtstreeks 
            contact opnemen met ons via <CustomLink href="mailto:info@dental-time.nl"> info@dental-time.nl </CustomLink> of <CustomLink href="tel:0306049005"> 030 604 9005</CustomLink>.
        </p>

        <p className={sectionTitleStyling}>
          3. Tarieven
        </p>

        <p>
            De tarieven voor behandelingen binnen Dental Time zijn vastgesteld volgens de richtlijnen van de Nederlandse Zorgautoriteit (NZa). 
        </p>

        <p className={sectionTitleStyling}>
          4. Afspraken & Annulering
        </p>

        <p>
            Afspraken dienen uiterlijk 24 uur van tevoren te worden geannuleerd. Dit kan telefonisch of per e-mail.
            Indien een afspraak niet tijdig wordt geannuleerd, behouden wij ons het recht voor om kosten in rekening te 
            brengen volgens de C90-code (niet nagekomen afspraak).
        </p>

        <p className={sectionTitleStyling}>
          5. Herinnering van Afspraken
        </p>

        <p>
            Als service sturen wij een herinnering per e-mail voorafgaand aan uw afspraak. Het ontvangen van een herinnering is 
            echter geen garantie en hier kunnen geen rechten aan worden ontleend. Het blijft te allen tijde uw eigen verantwoordelijkheid 
            om de afspraak na te komen of tijdig te annuleren.
        </p>

        <p className={sectionTitleStyling}>
          6. Niet Nagekomen Afspraken
        </p>

        <p>
            Indien u niet op uw afspraak verschijnt zonder tijdige annulering, ontvangt u een schriftelijke bevestiging 
            van de niet nagekomen afspraak. In dit geval kunnen de kosten voor de niet nagekomen afspraak aan u worden doorberekend 
            conform de geldende C90-code. De hoogte van deze kosten wordt bepaald aan de hand van de gereserveerde tijd en kan variëren.
        </p>

        <p className={sectionTitleStyling}>
          7. Betalingsvoorwaarden
        </p>

        <p>
            Indien u de factuur niet binnen de gestelde betalingstermijn voldoet, kan Dental Time (of eventueel een door hen ingeschakelde partij) 
            incassomaatregelen treffen. Eventuele incassokosten die voortvloeien uit een te late betaling zijn voor rekening van de patiënt.
        </p>

        <p className={sectionTitleStyling}>
          8. Aansprakelijkheid
        </p>

        <p>
            Tandartspraktijk Dental Time is niet aansprakelijk voor schade, van welke aard dan ook, ontstaan doordat wij zijn uitgegaan van 
            door of namens de patiënt verstrekte onjuiste en/of onvolledige gegevens.
        </p>

        <p className={sectionTitleStyling}>
          9. Privacy & Verwerking Persoonsgegevens
        </p>

        <p>
            Wij respecteren de privacy van onze patiënten en dragen zorg voor de vertrouwelijkheid van uw persoonlijke gegevens.
            Wij verwerken uw persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG). U vind meer informatie 
            hierover in onze <CustomLink href="/privacyverklaring">privacyverklaring</CustomLink>.
        </p>

        <p className={sectionTitleStyling}>
          10. Klachtenregeling
        </p>

        <p>
            Mocht u onverhoopt een klacht hebben over de geleverde zorg of dienstverlening, dan verzoeken wij u contact met ons op te nemen. 
            Dental Time is aangesloten bij een erkende klachtenregeling conform de Wet kwaliteit, klachten en geschillen zorg (Wkkgz).
        </p>

      </div>

      {/* Spacer */}
      <div className="mt-24 md:mt-32" />


      {/* Footer */}
      <FooterSection />
    </div>
  );
}
