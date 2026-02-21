import type { MetadataRoute } from "next";
import { DISEASES } from "@/lib/diseases";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/book",
    "/free-consultation",
    "/contact",
    "/queries-feedback",
    "/queries-feedback/confirmed",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: (path === "/" ? "weekly" : "monthly") as ChangeFrequency,
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceRoutes = DISEASES.map((disease) => ({
    url: `${siteUrl}/services/${disease.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as ChangeFrequency,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
