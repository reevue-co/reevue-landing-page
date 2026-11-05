import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [
    {
      url: `${siteUrl}/pt-br`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/es`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
