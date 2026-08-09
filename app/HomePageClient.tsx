"use client";

import FooterSection from "../components/footer";

import HeroSection from "./home/HeroSection";
import CardsSection from "./home/CardsSection";
import SocialProofSection from "./home/SocialProofSection";
import ContactSection from "./home/ContactSection";
import ServicesSection from "./home/ServicesSection";

export default function HomePageClient() {
  return (
    <>
      <div className="absolute left-0 top-0 flex flex-col items-center justify-center gap-2">
        <HeroSection />
        <SocialProofSection />
        <CardsSection />

        <div className="shining-gradient flex w-full flex-col gap-1">
          <ServicesSection />
          <ContactSection />
          <FooterSection />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShine {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 50% 100%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .shining-gradient {
          background: linear-gradient(
            120deg,
            #c0c0c0,
            #f0f4f8,
            #f9fafb,
            #8490b3,
            #c0c0c0
          );
          background-size: 300% 300%;
          animation: gradientShine 12s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
