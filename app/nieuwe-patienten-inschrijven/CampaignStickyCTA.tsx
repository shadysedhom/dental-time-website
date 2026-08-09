"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function CampaignStickyCTA() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 420);
    const form = document.getElementById("inschrijven");
    const observer = form
      ? new IntersectionObserver(
          ([entry]) => setIsFormVisible(entry.isIntersecting),
          { threshold: 0.08 },
        )
      : null;

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    if (form && observer) observer.observe(form);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      observer?.disconnect();
    };
  }, []);

  if (!hasScrolled || isFormVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <a
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white"
        href="#inschrijven"
      >
        Start mijn inschrijving
        <ArrowDown aria-hidden="true" className="h-5 w-5" />
      </a>
    </div>
  );
}
