import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sai Jagruthi Homeopathy",
  description:
    "Contact Sai Jagruthi Homeopathy Clinic for appointments, consultation support, and treatment-related queries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
