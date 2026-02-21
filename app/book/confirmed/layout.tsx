import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Appointment booking confirmation page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookConfirmedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
