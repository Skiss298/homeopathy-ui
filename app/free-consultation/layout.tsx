import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Consultation",
  description:
    "Request a free homeopathy consultation slot. We are committed to supporting patients in need who cannot afford treatment.",
  alternates: {
    canonical: "/free-consultation",
  },
};

export default function FreeConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
