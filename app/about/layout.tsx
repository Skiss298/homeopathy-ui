import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Sai Jagruthi",
  description:
    "Learn about Dr. Sai Jagruthi's homeopathy approach, experience, and commitment to personalized and ethical patient care.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
