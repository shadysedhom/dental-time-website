import type { MetadataRoute } from "next";

import { businessConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${businessConfig.url}/sitemap.xml`,
    host: businessConfig.url,
  };
}
