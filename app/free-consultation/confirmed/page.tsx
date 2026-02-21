import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FreeConsultationConfirmedPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-emerald-900" style={{ fontFamily: "var(--font-playfair)" }}>
            Free Consultation Request Confirmed
          </h1>
          <p className="mt-4 text-emerald-900/80">
            Thank you. Your free consultation slot has been confirmed. You will receive the consultation details on
            your registered mobile number and email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
