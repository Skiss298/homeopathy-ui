import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using Sai Jagruthi Homeopathy Clinic website and booking services.",
  alternates: {
    canonical: "/legal/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
          Terms and Conditions
        </h1>
        <div className="mt-6 space-y-5 rounded-2xl border border-sage/60 bg-white p-6 text-charcoal/80 shadow-soft">
          <p>
            By using this website, you agree to provide accurate information during booking, contact, and payment
            flows. Appointment availability is subject to confirmation.
          </p>
          <p>
            Consultation guidance is provided for informational and treatment-support purposes. For emergencies, please
            contact local emergency services immediately.
          </p>
          <p>
            Fees and slot confirmation are handled through secure payment flow. A booking is confirmed only after
            successful payment verification.
          </p>
          <p>
            We may update these terms periodically. Continued use of the website after updates constitutes acceptance
            of the revised terms.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
