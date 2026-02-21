import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeopathy Services",
  description:
    "Explore conditions commonly supported at Sai Jagruthi Homeopathy Clinic, including allergies, skin concerns, respiratory issues, thyroid support, and more.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
