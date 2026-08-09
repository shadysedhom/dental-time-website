"use client";

import { Phone, Mail, MapPin } from "lucide-react";

import FooterSection from "@/components/footer";
import CustomLink from "@/components/CustomLink";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

const BulletPoint = () => (
  <span className="mr-2 inline-block h-2 w-2 rotate-45 border-2 border-black" />
);

export default function PrivacyverklaringPage() {
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

  // TODO: Wanneer DPA ontvangen en getekend van Formcarry, deze zin toevoegen: Met Formcarry is een verwerkersovereenkomst gesloten conform de AVG.

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
        <h1 className={title()}>Privacyverklaring</h1>
        <h2 className={subtitleStyling}>
          {companyName}, gevestigd aan Waardijnburg 3 te Nieuwegein, is
          verantwoordelijk voor de verwerking van persoonsgegevens zoals
          weergegeven in deze privacyverklaring.
        </h2>

        {/* Privacy Policy Content */}
        <p className={sectionTitleStyling}>Contactgegevens</p>

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

        <p className={sectionTitleStyling}>
          Persoonsgegevens die wij verwerken
        </p>

        <p>
          {companyName} verwerkt uw persoonsgegevens doordat u gebruik maakt van
          onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder
          vindt u een overzicht van de persoonsgegevens die wij verwerken:
          <br /> <br />
          <BulletPoint /> Voor- en achternaam <br />
          <BulletPoint /> Geboortedatum <br />
          <BulletPoint /> Geslacht <br />
          <BulletPoint /> Telefoonnummer <br />
          <BulletPoint /> Adresgegevens <br />
          <BulletPoint /> Naam zorgverzekeraar <br />
          <BulletPoint /> Status tandartsverzekering <br />
          <BulletPoint /> E-mailadres <br />
          <BulletPoint /> IP-adres <br />
          <BulletPoint /> Locatiegegevens <br />
          <BulletPoint /> Gegevens over uw activiteiten op onze website <br />
          <BulletPoint /> Internetbrowser en apparaat type
        </p>

        <p className={sectionTitleStyling}>Online Inschrijfformulier</p>

        <p>
          Wanneer u zich via het online inschrijfformulier aanmeldt, verwerken
          wij de door u ingevulde persoonsgegevens (zoals naam, contactgegevens,
          geboortedatum en – indien ingevuld – BSN-nummer) uitsluitend om uw
          inschrijving af te handelen en uw eerste afspraak in te plannen. De
          gegevens worden versleuteld verzonden en opgeslagen bij Formcarry.{" "}
          <br /> <br />
          Formcarry slaat gegevens op binnen de Europese Economische Ruimte
          (EER). Zij dragen persoonsgegevens in de regel niet over buiten de
          EER. Dit is onderdeel van hun inzet voor privacy en veiligheid:
          gegevens worden opgeslagen in een regio met strenge wet- en
          regelgeving voor gegevensbescherming. Bewaartermijn: de volledige
          inzending blijft maximaal 30 dagen op Formcarry-servers staan en wordt
          daarna automatisch verwijderd. De gegevens die wij nodig hebben voor
          uw patiëntendossier worden vóór die tijd veilig overgezet naar ons
          eigen praktijkmanagementsysteem; overige gegevens worden niet bewaard.{" "}
          <br /> <br />U heeft het recht om uw gegevens in te zien, te
          corrigeren of te laten verwijderen. Stuur hiervoor een e-mail naar
          info@dental-time.nl onder vermelding van “AVG-verzoek”.
        </p>

        <p className={sectionTitleStyling}>
          Bijzondere en/of gevoelige persoonsgegevens die wij verwerken
        </p>

        <p>
          Onze website en/of dienst heeft niet de intentie gegevens te
          verzamelen over websitebezoekers die jonger zijn dan 16 jaar. Tenzij
          ze toestemming hebben van ouders of voogd. We kunnen echter niet
          controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook
          aan betrokken te zijn bij de online activiteiten van hun kinderen, om
          zo te voorkomen dat er gegevens over kinderen verzameld worden zonder
          ouderlijke toestemming. Als u er van overtuigd bent dat wij zonder die
          toestemming persoonlijke gegevens hebben verzameld over een
          minderjarige, neem dan contact met ons op via {companyEmail}, dan
          verwijderen wij deze informatie.
        </p>

        <p className={sectionTitleStyling}>
          Met welk doel en op basis van welke grondslag wij persoonsgegevens
          verwerken
        </p>

        <p>
          {companyName} verwerkt uw persoonsgegevens om u te kunnen bellen of
          e-mailen indien dit nodig is om onze dienstverlening uit te kunnen
          voeren.
        </p>

        <p className={sectionTitleStyling}>Geautomatiseerde besluitvorming</p>

        <p>
          {companyName} neemt niet op basis van geautomatiseerde verwerkingen
          besluiten over zaken die (aanzienlijke) gevolgen kunnen hebben voor
          personen. Het gaat hier om besluiten die worden genomen door
          computerprogramma’s of -systemen, zonder dat daar een mens
          (bijvoorbeeld een medewerker van {companyName}) tussen zit.
        </p>

        <p className={sectionTitleStyling}>
          Hoe lang we persoonsgegevens bewaren
        </p>

        <p>
          {companyName} bewaart uw persoonsgegevens niet langer dan strikt nodig
          is om de doelen te realiseren waarvoor uw gegevens worden verzameld.
          Wij hanteren geen bewaartermijnen voor persoonsgegevens die we
          verzamelen.
        </p>

        <p className={sectionTitleStyling}>
          Delen van persoonsgegevens met derden
        </p>

        <p>
          {companyName} verstrekt uitsluitend aan derden en alleen als dit nodig
          is voor de uitvoering van onze overeenkomst met u of om te voldoen aan
          een wettelijke verplichting.
        </p>

        <p className={sectionTitleStyling}>
          Hoe wij persoonsgegevens beveiligen
        </p>

        <p>
          {companyName} neemt de bescherming van uw gegevens serieus en neemt
          passende maatregelen om misbruik, verlies, onbevoegde toegang,
          ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan.
          Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er
          aanwijzingen zijn van misbruik, neem dan contact op met onze
          klantenservice of via {companyEmail}
        </p>

        <p className={sectionTitleStyling}>
          Cookies, of vergelijkbare technieken, die wij gebruiken
        </p>

        <div className="space-y-4">
          <p>
            {companyName} gebruikt noodzakelijke opslag om de website goed te
            laten werken en om uw cookievoorkeur te onthouden. Hiervoor is geen
            marketingtoestemming nodig.
          </p>
          <p>
            Alleen wanneer u marketingcookies accepteert, laden wij de Meta
            Pixel van Meta Platforms Ireland Limited. Daarmee meten we
            paginaweergaven en registreren we na een succesvol verzonden
            inschrijfformulier een algemene Lead-gebeurtenis. Meta kan hierbij
            onder andere het webadres, verwijzende pagina, browser- en
            apparaatgegevens, het IP-adres en cookie-identificatoren ontvangen.
            Dit gebruiken wij om de prestaties van onze advertenties te meten en
            te verbeteren.
          </p>
          <p>
            Wij sturen geen namen, contactgegevens, BSN-nummers, medische
            antwoorden, gegevens van gezinsleden of andere inhoud uit het
            inschrijfformulier naar Meta. Als u marketingcookies weigert, wordt
            de Meta Pixel niet geladen en kunt u de website normaal blijven
            gebruiken. U kunt uw keuze op ieder moment wijzigen via
            Cookie-instellingen.
          </p>
          <CookieSettingsButton className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-primary transition hover:border-primary hover:bg-slate-50" />
          <p>
            Meer informatie over hoe Meta persoonsgegevens verwerkt, vindt u in
            het&nbsp;
            <CustomLink href="https://www.facebook.com/privacy/policy/">
              privacybeleid van Meta
            </CustomLink>
            .
          </p>
        </div>

        <p className={sectionTitleStyling}>
          Gegevens inzien, aanpassen of verwijderen
        </p>

        <p className="mb-16">
          U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of
          te verwijderen. Daarnaast heeft u het recht om uw eventuele
          toestemming voor de gegevensverwerking in te trekken of bezwaar te
          maken tegen de verwerking van uw persoonsgegevens door {companyName}{" "}
          en heeft u het recht op gegevensoverdraagbaarheid. Dat betekent dat u
          bij ons een verzoek kunt indienen om de persoonsgegevens die wij van u
          beschikken in een computerbestand naar u of een ander, door u genoemde
          organisatie, te sturen.
          <br /> <br />U kunt een verzoek tot inzage, correctie, verwijdering,
          gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking
          van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens
          sturen naar {companyEmail}
          <br /> <br />
          Om er zeker van te zijn dat het verzoek tot inzage door u is gedaan,
          vragen wij u een kopie van uw identiteitsbewijs met het verzoek mee te
          sturen. Maak in deze kopie uw pasfoto, MRZ (machine readable zone, de
          strook met nummers onderaan het paspoort), paspoortnummer en
          Burgerservicenummer (BSN) zwart. Dit ter bescherming van uw privacy.
          We reageren zo snel mogelijk, maar binnen vier weken, op uw verzoek.
          <br /> <br />
          {companyName} wil u er tevens op wijzen dat u de mogelijkheid heeft om
          een klacht in te dienen bij de nationale toezichthouder, de Autoriteit
          Persoonsgegevens. Dat kan via de volgende link: &nbsp;
          <CustomLink href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons">
            autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons
          </CustomLink>
        </p>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
