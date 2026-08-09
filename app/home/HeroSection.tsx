"use client";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Phone, UserPlus } from "lucide-react";

import { title, subtitle } from "@/components/primitives";

export default function HeroSection() {
  return (
    <div>
      <section className="flex h-screen w-screen flex-col justify-center gap-6 bg-[url('/sitting-smile.jpg')] bg-cover bg-[position:62%_center] py-8 sm:bg-center lg:py-10">
        {/* Content Wrapper */}

        <div className="w-[calc(100%_-_2rem)] self-center rounded-xl bg-zinc-100/75 p-6 backdrop-blur-sm transition-all duration-300 sm:w-[calc(100%_-_4rem)] sm:p-10 lg:ml-40 lg:mr-0 lg:w-1/3 lg:self-auto lg:p-16">
          <div className="block max-w-3xl text-left">
            <div className="min-w-0 text-left uppercase">
              <h1
                className={title({
                  class:
                    "block min-w-0 font-serif text-3xl font-semibold leading-tight tracking-wide text-black sm:text-4xl",
                })}
              >
                Tandarts in Nieuwegein
              </h1>
            </div>

            <p
              className={subtitle({
                class: "mt-4 text-lg md:text-xl text-black",
              })}
            >
              Persoonlijke tandheelkundige zorg voor u en uw gezin. Nieuwe
              patiënten zijn welkom bij Dental Time.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 uppercase sm:flex-row sm:flex-wrap">
            <Button
              as={Link}
              className="min-h-12 w-full bg-gradient-to-r from-zinc-900 to-gray-700 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-gray-700 hover:to-zinc-900 sm:w-auto"
              color="default"
              href="tel:0306049005"
              startContent={<Phone className="text-white w-4 h-4" />}
              variant="shadow"
            >
              030 6049005
            </Button>

            <Button
              as={Link}
              className="min-h-12 w-full bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500 sm:w-auto"
              color="primary"
              href="/nieuwe-patienten-inschrijven"
              startContent={<UserPlus className="text-white w-4 h-4" />}
              variant="solid"
            >
              Inschrijven
            </Button>
          </div>

          <p className="pt-6 text-left text-lg text-black">
            Uw glimlach, onze zorg.
          </p>
        </div>
      </section>
    </div>
  );
}
