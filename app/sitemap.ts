import type { MetadataRoute } from "next";
import { DISEASES } from "@/lib/diseases";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/book",
    "/contact",
    "/queries-feedback",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : ("monthly" as const),
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceRoutes = DISEASES.map((disease) => ({
    url: `${siteUrl}/services/${disease.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
