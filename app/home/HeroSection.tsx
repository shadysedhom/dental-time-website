"use client";
import Image from "next/image";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Phone, UserPlus, MapPin, Clock } from "lucide-react";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import { title, subtitle } from "@/components/primitives";

export default function HeroSection() {
  return (
    <div>
      <section className="flex flex-col justify-center w-screen h-screen gap-6 py-8 lg:py-10 bg-[url('/sitting-smile.jpg')] bg-cover bg-center">
        {/* Content Wrapper */}
        
        <div className="items-left p-10 lg:p-20 lg:ml-40 bg-zinc-100 bg-opacity-70 lg:w-1/3 max-w-full rounded-md transition-all duration-300">
          <div className="inline-block max-w-3xl text-left">
            <div className="flex items-center text-left uppercase ">
              <TextEffect
                as="h1"
                className={title({
                  class:
                    "font-serif font-semibold tracking-wider leading-loose text-black text-4xl",
                })}
                per="word"
                preset="fade-in-blur"
                speedSegment={0.6}
              >
                It&apos;s Dental Time.
              </TextEffect>

              <Image
                priority
                alt="Tooth Clock Icon"
                className="ml-6 w-20 relative animate-blur-in"
                height={100}
                src="/IconGold.svg"
                width={100}
              />
            </div>

            <TextEffect
              className={subtitle({
                class: "mt-4 text-lg md:text-xl text-black",
              })}
              delay={0.3}
              per="word"
              preset="fade-in-blur"
              speedSegment={0.6}
            >
              Bel ons gerust om een afspraak te maken
            </TextEffect>
          </div>

          <div className="mt-6 animate-slide-in-left animate-blur-in uppercase">
            <Button
              as={Link}
              href="tel:0306049005"
              color="default"
              variant="shadow"
              className=" p-6 mr-12 my-6 font-medium animate-blur-in bg-gradient-to-r from-zinc-900 to-gray-700 text-white shadow-lg hover:from-gray-700 hover:to-zinc-900 transition-all duration-300"
              startContent={<Phone className="text-white w-4 h-4" />}
            >
              030 6049005
            </Button>

            <Button
              as={Link}
              href="/inschrijven"
              color="primary"
              variant="solid"
              className="p-6 font-mediumtext-white animate-blur-in bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
              startContent={<UserPlus className="text-white w-4 h-4" />}
            >
              Inschrijven
            </Button>
          </div>

          <TextEffect
            className="pt-6 text-left text-lg text-black"
            delay={0.5}
            per="char"
            preset="fade-in-blur"
            speedSegment={0.6}
          >
            Uw glimlach, onze zorg.
          </TextEffect>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blur-in {
          0% {
            filter: blur(10px);
            opacity: 0;
          }
          100% {
            filter: blur(0);
            opacity: 1;
          }
        }
        .animate-blur-in {
          animation: blur-in 1.8s ease-in-out forwards;
        }

        @keyframes slide-in-left {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
