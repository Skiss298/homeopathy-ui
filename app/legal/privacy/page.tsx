import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Sai Jagruthi Homeopathy Clinic website and consultation booking flow.",
  alternates: {
    canonical: "/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
          Privacy Policy
        </h1>
        <div className="mt-6 space-y-5 rounded-2xl border border-sage/60 bg-white p-6 text-charcoal/80 shadow-soft">
          <p>
            We collect basic details you submit in booking and contact forms such as your name, email address, phone
            number, preferred slot, and message content.
          </p>
          <p>
            This information is used only for appointment coordination, payment verification, consultation follow-up,
            and support communications related to your request.
          </p>
          <p>
            We do not sell your personal information. Access is limited to authorized clinic and support systems
            needed to provide services.
          </p>
          <p>
            For privacy requests or corrections, contact us at <a className="underline" href="mailto:doctorjagruthi@gmail.com">doctorjagruthi@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
