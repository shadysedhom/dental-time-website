export const META_PIXEL_ID = "1576861984117423";
export const COOKIE_SETTINGS_EVENT = "dental-time:open-cookie-settings";

const CONSENT_STORAGE_KEY = "dental-time-cookie-consent";
const CONSENT_VERSION = 1;

export type MarketingConsent = "accepted" | "rejected";

type StoredConsent = {
  marketing: boolean;
  savedAt: string;
  version: number;
};

type MetaPixelFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    _fbq?: MetaPixelFunction;
    fbq?: MetaPixelFunction;
  }
}

let inMemoryConsent: MarketingConsent | null = null;

export function readMarketingConsent(): MarketingConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!value) return inMemoryConsent;

    const stored = JSON.parse(value) as Partial<StoredConsent>;

    if (
      stored.version !== CONSENT_VERSION ||
      typeof stored.marketing !== "boolean"
    ) {
      return inMemoryConsent;
    }

    inMemoryConsent = stored.marketing ? "accepted" : "rejected";

    return inMemoryConsent;
  } catch {
    return inMemoryConsent;
  }
}

export function saveMarketingConsent(consent: MarketingConsent) {
  if (typeof window === "undefined") return;

  inMemoryConsent = consent;

  const stored: StoredConsent = {
    marketing: consent === "accepted",
    savedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // The current page can still respect the choice when storage is blocked.
  }
}

export function clearMetaCookies() {
  if (typeof document === "undefined") return;

  const hostname = window.location.hostname.replace(/^www\./, "");
  const domains = [undefined, hostname, `.${hostname}`];

  for (const cookieName of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie = [
        `${cookieName}=`,
        "Max-Age=0",
        "Path=/",
        "SameSite=Lax",
        domain ? `Domain=${domain}` : "",
      ]
        .filter(Boolean)
        .join("; ");
    }
  }
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export function trackMetaPageView() {
  if (
    typeof window === "undefined" ||
    readMarketingConsent() !== "accepted" ||
    typeof window.fbq !== "function"
  ) {
    return false;
  }

  window.fbq("track", "PageView");

  return true;
}

export function trackMetaLead() {
  if (
    typeof window === "undefined" ||
    readMarketingConsent() !== "accepted" ||
    typeof window.fbq !== "function"
  ) {
    return;
  }

  // Never attach registration or medical form data to this event.
  window.fbq("track", "Lead");
}
