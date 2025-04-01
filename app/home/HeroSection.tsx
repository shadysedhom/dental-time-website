"use client";
import Image from "next/image";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Phone } from "lucide-react";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import { title, subtitle } from "@/components/primitives";

export default function HeroSection() {
  return (
    <div>
      <section className="flex flex-col justify-center w-screen h-screen gap-6 py-8 md:py-10 bg-[url('/sitting-smile.jpg')] bg-cover bg-center">
        {/* Content Wrapper */}
        <div className=" items-center md:ml-40 md:items-left p-10 md:p-20 bg-zinc-100 bg-opacity-70 w-fit rounded-md">
          <div className="inline-block max-w-3xl text-left">
            <div className="flex items-center text-left md:text-center uppercase ">
              <TextEffect
                as="h1"
                className={title({
                  class:
                    "font-[NotoSerif] font-normal tracking-wider leading-loose text-black text-4xl md:text-7xl",
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
                src="/IconBlack.svg"
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

          <div className="flex gap-4 mt-6 animate-slide-in-left animate-blur-in">
            <Button
              as={Link}
              className="rounded-md uppercase animate-blur-in"
              color="primary"
              href="tel:0306049005"
              variant="shadow"
            >
              <Phone className="mr-2" size={20} />
              030 6049005
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
