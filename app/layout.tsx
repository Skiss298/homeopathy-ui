import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3, Permanent_Marker } from "next/font/google";
import "./globals.css";
import CursorBubbles from "@/components/CursorBubbles"; // NEW
import { LanguageProvider } from "@/components/LanguageProvider";

const sourceSans = Source_Sans_3({ variable: "--font-body", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
const metadataBase = new URL(siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Sai Jagruthi Homeopathy Clinic",
    template: "%s | Sai Jagruthi Homeopathy Clinic",
  },
  description:
    "Book trusted homeopathy teleconsultations with Dr. Sai Jagruthi for allergies, skin concerns, respiratory conditions, women's health, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Sai Jagruthi Homeopathy Clinic",
    title: "Sai Jagruthi Homeopathy Clinic",
    description:
      "Compassionate, personalized homeopathy care with secure online booking and follow-up support.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sai Jagruthi Homeopathy Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Jagruthi Homeopathy Clinic",
    description:
      "Compassionate, personalized homeopathy care with secure online booking and follow-up support.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Sai Jagruthi Homeopathy Clinic",
    url: siteUrl,
    medicalSpecialty: "Homeopathic",
    telephone: "+91-949-481-9479",
    email: "doctorjagruthi@gmail.com",
    image: `${siteUrl}/images/hero.jpg`,
    description:
      "Personalized homeopathy consultations for chronic and acute concerns with online booking support.",
    areaServed: "India",
    availableLanguage: ["English", "Telugu", "Hindi", "Tamil", "Malayalam", "Marathi", "Bengali"],
  };

  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${cormorant.variable} ${marker.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
        <LanguageProvider>
          {children}
          <CursorBubbles />
        </LanguageProvider>
      </body>
    </html>
  );
}
