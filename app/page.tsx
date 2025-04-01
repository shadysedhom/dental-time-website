"use client";

import FooterSection from "../components/footer";

import HeroSection from "./home/HeroSection";
import CardsSection from "./home/CardsSection";
import SocialProofSection from "./home/SocialProofSection";
import ContactSection from "./home/ContactSection";
import ServicesSection from "./home/ServicesSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col absolute top-0 left-0 gap-2 items-center justify-center">
        <HeroSection />
        <SocialProofSection />
        <CardsSection />

        <div className="flex flex-col w-full gap-1 shining-gradient">
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
            /* Silver */ #f0f4f8,
            /* Pale gray-blue */ #f9fafb,
            /* Lightest gray */ #8490b3,
            /* Soft lavender-blue */ #c0c0c0
          );
          background-size: 300% 300%;
          animation: gradientShine 12s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
