"use client";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Phone, UserPlus } from "lucide-react";

import { title, subtitle } from "@/components/primitives";

export default function HeroSection() {
  return (
    <div>
      <section className="relative flex h-[100svh] w-full flex-col justify-end overflow-hidden bg-[url('/sitting-smile.jpg')] bg-cover bg-[position:62%_center] px-4 pb-5 pt-28 sm:justify-center sm:bg-center sm:px-8 sm:py-8 lg:h-screen lg:w-screen lg:px-0 lg:py-10">
        {/* Content Wrapper */}

        <div className="relative z-10 w-full self-center rounded-2xl border border-white/70 bg-[#fbfaf7]/95 p-5 shadow-[0_20px_60px_rgba(17,24,43,0.2)] backdrop-blur-md transition-all duration-300 sm:max-w-2xl sm:p-10 lg:ml-40 lg:mr-0 lg:w-1/3 lg:max-w-none lg:self-auto lg:rounded-xl lg:border-0 lg:bg-zinc-100/75 lg:p-16 lg:shadow-none lg:backdrop-blur-sm">
          <div className="block max-w-3xl text-left">
            <div className="min-w-0 text-left lg:uppercase">
              <h1
                className={title({
                  class:
                    "block min-w-0 font-serif text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#11182b] sm:text-4xl sm:leading-tight sm:tracking-wide",
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

          <div className="mt-5 flex flex-col gap-3 uppercase sm:mt-6 sm:flex-row sm:flex-wrap">
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
              className="order-1 min-h-12 w-full rounded-xl border border-[#b88e32] bg-[#d7b45a] px-5 py-3 font-bold text-[#11182b] shadow-[0_10px_24px_rgba(177,138,54,0.28)] transition-colors duration-300 hover:bg-[#c9a24d] sm:order-2 sm:w-auto"
              color="primary"
              href="/nieuwe-patienten-inschrijven"
              startContent={<UserPlus className="h-4 w-4 text-[#11182b]" />}
              variant="solid"
            >
              Inschrijven
            </Button>
          </div>

          <p className="hidden pt-6 text-left text-lg text-black sm:block">
            Uw glimlach, onze zorg.
          </p>
        </div>
      </section>
    </div>
  );
}
