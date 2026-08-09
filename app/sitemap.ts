import type { MetadataRoute } from "next";

import { businessConfig } from "@/config/site";
import { treatments } from "@/config/treatments";

const lastModified = new Date("2026-08-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const treatmentPages: MetadataRoute.Sitemap = treatments.map((treatment) => ({
    url: `${businessConfig.url}/behandelingen/${treatment.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  return [
    {
      url: businessConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${businessConfig.url}/behandelingen`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...treatmentPages,
    {
      url: `${businessConfig.url}/nieuwe-patienten-inschrijven`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${businessConfig.url}/over-ons`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${businessConfig.url}/privacyverklaring`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${businessConfig.url}/algemene-voorwaarden`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
