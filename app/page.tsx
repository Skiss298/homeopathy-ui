import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Sai Jagruthi Homeopathy Clinic",
  description:
    "Online homeopathy consultations with Dr. Sai Jagruthi for allergies, skin concerns, respiratory conditions, thyroid support, and women's health.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sai Jagruthi Homeopathy Clinic",
    description:
      "Book personalized homeopathy consultations online with secure appointment booking and follow-up support.",
    url: "/",
    images: ["/images/hero.jpg"],
  },
};

export default function Page() {
  return <HomePageContent />;
}
