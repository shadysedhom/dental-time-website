"use client";

import { title } from "@/components/primitives";

import RegistrationForm from "./RegistrationForm";
import FooterSection from "@/components/footer";

export default function InschrijvenPage() {
    const bgImageUrl = "/about-us-bg.jpeg";
    const headerStyling = "text-2xl py-4 font-semibold text-slate-800";

    return (
        <div
            className="flex flex-col absolute top-0 left-0 w-full items-center justify-center gap-2 bg-slate-50 bg-cover"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${bgImageUrl}')`,
            }}
        >
            <div className="mt-20 md:mt-32"></div>

            <div className="text-center px-20 py-10">
                <h1 className={title()}>Inschrijven</h1>
                <h2 className={headerStyling}>Inschrijven Als Nieuwe Patiënt</h2>
            </div>

            <RegistrationForm headerStyling={headerStyling} />

            <FooterSection />
        </div>
    );
}