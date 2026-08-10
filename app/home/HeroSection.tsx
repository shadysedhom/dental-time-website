"use client";
import Image from "next/image";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { MapPin, Phone, UserPlus } from "lucide-react";

import { title, subtitle } from "@/components/primitives";

export default function HeroSection() {
  return (
    <section className="relative flex h-[100svh] min-h-[42rem] w-full flex-col justify-end overflow-hidden bg-[#11182b] px-4 pb-5 pt-28 sm:justify-center sm:px-8 sm:py-8 lg:min-h-[46rem] lg:px-0 lg:py-10">
      <Image
        fill
        preload
        alt="De receptie van Dental Time in Nieuwegein"
        className="object-cover"
        quality={88}
        sizes="(max-width: 639px) 150vh, 100vw"
        src="/hero-img-upscaled.png"
        style={{ objectPosition: "54% center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#11182b]/25 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#11182b]/25 to-transparent sm:hidden" />

      <div className="relative z-10 w-full self-center rounded-2xl border border-white/70 bg-[#fbfaf7]/95 p-5 shadow-[0_20px_60px_rgba(17,24,43,0.2)] backdrop-blur-md sm:max-w-2xl sm:p-10 lg:ml-40 lg:mr-0 lg:w-1/3 lg:max-w-none lg:self-auto lg:rounded-[1.75rem] lg:border-white/50 lg:bg-[#fbfaf7]/88 lg:p-14 lg:shadow-[0_28px_90px_rgba(17,24,43,0.18)] lg:backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#8d6a25] sm:text-xs">
          <span className="h-px w-8 bg-[#b88e32]" />
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            Muntplein, Nieuwegein
          </span>
        </div>

        <div className="block max-w-3xl text-left">
          <div className="min-w-0 text-left">
            <h1
              className={title({
                class:
                  "block min-w-0 font-serif text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#11182b] sm:text-4xl sm:leading-tight lg:text-[3.25rem]",
              })}
            >
              Tandarts in Nieuwegein
            </h1>
          </div>

          <p
            className={subtitle({
              class:
                "mb-0 mt-3 max-w-[30rem] text-base leading-7 text-slate-700 sm:mt-4 sm:text-lg md:text-xl",
            })}
          >
            Persoonlijke tandheelkundige zorg voor u en uw gezin. Nieuwe
            patiënten zijn welkom bij Dental Time.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 uppercase sm:mt-7 sm:flex-row sm:flex-wrap">
          <Button
            as={Link}
            className="order-2 min-h-12 w-full rounded-xl border border-[#11182b] bg-[#11182b] px-5 py-3 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-[#26304a] sm:order-1 sm:w-auto"
            color="default"
            href="tel:0306049005"
            startContent={<Phone className="h-4 w-4 text-[#d7b45a]" />}
            variant="shadow"
          >
            030 6049005
          </Button>

          <Button
            as={Link}
            className="order-1 min-h-12 w-full rounded-xl border border-[#b88e32] bg-[#d7b45a] px-5 py-3 font-bold text-[#11182b] shadow-[0_10px_24px_rgba(177,138,54,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e2c269] sm:order-2 sm:w-auto motion-reduce:transform-none"
            color="primary"
            href="/nieuwe-patienten-inschrijven"
            startContent={<UserPlus className="h-4 w-4 text-[#11182b]" />}
            variant="solid"
          >
            Inschrijven
          </Button>
        </div>

        <div className="mt-6 hidden items-center gap-3 border-t border-[#b88e32]/30 pt-5 text-left text-sm font-medium text-[#4b5563] sm:flex">
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-[#b88e32]" />
          Nieuwe patiënten zijn van harte welkom
        </div>
      </div>
    </section>
  );
}
