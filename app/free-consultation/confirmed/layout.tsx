import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Consultation Confirmed",
  description: "Free consultation booking confirmation page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FreeConsultationConfirmedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
