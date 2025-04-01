import { title } from "@/components/primitives";
import AboutSection from "@/app/about/AboutSection";
import FooterSection from "@/components/footer";

export default function AboutPage() {
  const bgImageUrl = "/about-us-bg.jpeg";

  return (
    <div
      className="flex flex-col absolute top-0 left-0 w-full items-center justify-center gap-2 bg-slate-50 bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('${bgImageUrl}')`,
      }}
    >
      {/* Spacer to push the content down */}
      <div className="mt-20 md:mt-32" />

      {/* Title & Subtitle */}
      <div className="text-center pt-10 px-10 md:px-20">
        <h1 className={title()}>About Us</h1>

        <h2 className="text-2xl mt-4 font-semibold text-slate-800">
          Uw Mondgezondheid Is In Goede Handen Bij Ons
        </h2>
      </div>

      <AboutSection
        altTag="About Us - Image 1"
        descriptionOne="Welkom bij Dental Time! Wij zijn een kleinschalig en gepassioneerd praktijk. We heten u graag welkom voor al uw tandheelkundige behoeften. Onze praktijk is uitgerust met de nieuwste technologieën en biedt een breed scala aan diensten, van routineonderhoud tot uitgebreide behandelingen. We werken samen met u aan uw gezondere en mooiere lach."
        imagePosition="right"
        imageSrc="/about-us-1.webp"
        title="Voor een stralende lach"
      />

      <AboutSection
        altTag="About Us - Image 2"
        descriptionOne="Wij zijn toegewijd aan het bieden van patiëntgerichte zorg, waarbij uw comfort en welzijn voorop staan. De tandarts neemt de tijd om uw specifieke behoeften te begrijpen en zorgt ervoor dat u altijd op de hoogte bent van uw behandelingsopties en de verwachte resultaten."
        descriptionTwo="Maak gerust een afspraak en ontdek hoe we u kunnen helpen bij het netjes behouden van uw tanden en gebit."
        imagePosition="left"
        imageSrc="/about-us-2.webp"
        title="Persoonlijke aandacht & uitstekende zorg"
      />

      {/* Spacer for breathing */}
      <div className="mb-10" />

      <FooterSection />
    </div>
  );
}
