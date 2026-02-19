import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BookingConfirmedPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-soft">
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900" style={{ fontFamily: "var(--font-playfair)" }}>
            Thank You
          </h1>
          <p className="mt-4 text-lg text-emerald-900/90">
            Your appointment is confirmed.
          </p>
          <p className="mt-2 text-charcoal/80 leading-relaxed">
            You will receive the consultation video link on your mobile number and email shortly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">Go To Home</Link>
            <Link href="/contact" className="btn-outline">Contact Clinic</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
