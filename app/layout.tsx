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

export const metadata: Metadata = {
  title: "Sai Jagruthi Homeopathy Clinic",
  description: "Compassionate homeopathy teleconsultations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${cormorant.variable} ${marker.variable} antialiased`}>
        <LanguageProvider>
          {children}
          <CursorBubbles />
        </LanguageProvider>
      </body>
    </html>
  );
}
