import FooterSection from "../components/footer";

import HeroSection from "./home/HeroSection";
import CardsSection from "./home/CardsSection";
import SocialProofSection from "./home/SocialProofSection";
import ContactSection from "./home/ContactSection";
import ServicesSection from "./home/ServicesSection";

export default function HomePageClient() {
  return (
    <div className="relative left-1/2 -mt-16 flex min-h-screen w-screen -translate-x-1/2 flex-col overflow-x-clip bg-[#fbfaf7] text-[#11182b]">
      <main>
        <HeroSection />
        <SocialProofSection />
        <CardsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
