"use client";

import { openCookieSettings } from "@/lib/metaPixel";

type CookieSettingsButtonProps = {
  className?: string;
};

export default function CookieSettingsButton({
  className,
}: CookieSettingsButtonProps) {
  return (
    <button className={className} type="button" onClick={openCookieSettings}>
      Cookie-instellingen
    </button>
  );
}
