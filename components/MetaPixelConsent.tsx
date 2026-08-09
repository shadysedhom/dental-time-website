"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";

import {
  clearMetaCookies,
  COOKIE_SETTINGS_EVENT,
  META_PIXEL_ID,
  MarketingConsent,
  readMarketingConsent,
  saveMarketingConsent,
  trackMetaPageView,
} from "@/lib/metaPixel";

const META_PIXEL_BOOTSTRAP = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${META_PIXEL_ID}');
  fbq('track', 'PageView');
`;

export default function MetaPixelConsentManager() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const [consent, setConsent] = useState<MarketingConsent | null | undefined>(
    undefined,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readMarketingConsent());

    const handleOpenSettings = () => setSettingsOpen(true);

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);

    return () =>
      window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") {
      lastTrackedPath.current = null;

      return;
    }

    const currentPath = window.location.pathname;

    if (lastTrackedPath.current === null) {
      // The bootstrap script sends the first PageView.
      lastTrackedPath.current = currentPath;

      return;
    }

    if (lastTrackedPath.current !== currentPath && trackMetaPageView()) {
      lastTrackedPath.current = currentPath;
    }
  }, [consent, pathname]);

  const handleConsentChoice = (choice: MarketingConsent) => {
    const isWithdrawingConsent =
      consent === "accepted" && choice === "rejected";

    saveMarketingConsent(choice);

    if (choice === "rejected") clearMetaCookies();

    setConsent(choice);
    setSettingsOpen(false);

    if (isWithdrawingConsent) window.location.reload();
  };

  const showSettings =
    consent !== undefined && (consent === null || settingsOpen);

  return (
    <>
      {consent === "accepted" && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {META_PIXEL_BOOTSTRAP}
        </Script>
      )}

      {showSettings && (
        <section
          aria-label="Cookie-instellingen"
          className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-[#d8d1c4] bg-white p-5 text-left shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:bottom-5 sm:p-6"
          role="dialog"
        >
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xl font-semibold text-[#11182b]">
                Uw privacykeuze
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Met uw toestemming gebruiken we cookies om onze website te
                verbeteren.
              </p>
              <Link
                className="mt-2 inline-flex text-sm font-medium text-primary underline underline-offset-4"
                href="/privacyverklaring"
              >
                Lees onze privacyverklaring
              </Link>
            </div>

            {consent !== null && (
              <Button
                isIconOnly
                aria-label="Cookie-instellingen sluiten"
                className="shrink-0"
                type="button"
                variant="light"
                onPress={() => setSettingsOpen(false)}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              className="min-h-12 w-full bg-[#11182b] font-semibold text-white shadow-sm"
              type="button"
              variant="solid"
              onPress={() => handleConsentChoice("rejected")}
            >
              Cookies weigeren
            </Button>
            <Button
              className="min-h-12 w-full bg-[#c9a24d] font-semibold text-[#11182b] shadow-sm"
              type="button"
              variant="solid"
              onPress={() => handleConsentChoice("accepted")}
            >
              Cookies accepteren
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
