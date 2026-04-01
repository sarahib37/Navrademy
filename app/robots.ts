import type { MetadataRoute } from "next";

const BASE_URL = "https://navrademy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin", "/affiliate", "/verify"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}