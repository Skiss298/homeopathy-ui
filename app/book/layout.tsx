import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Homeopathy Appointment",
  description:
    "Check slot availability and book your online homeopathy appointment with secure payment confirmation.",
  alternates: {
    canonical: "/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
