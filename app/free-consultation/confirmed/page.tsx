import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  buildClinicWhatsappMessage,
  getClinicWhatsappUrl,
  getGoogleMeetLink,
} from "@/lib/consultation";

type ConfirmedPageProps = {
  searchParams?: {
    bookingId?: string;
    appointment?: string;
    meet?: string;
  };
};

export default function FreeConsultationConfirmedPage({ searchParams }: ConfirmedPageProps) {
  const bookingId = searchParams?.bookingId?.trim() || "";
  const appointmentLabel = searchParams?.appointment?.trim() || "";
  const meetLink = searchParams?.meet?.trim() || getGoogleMeetLink() || "";
  const whatsappLink = getClinicWhatsappUrl(
    buildClinicWhatsappMessage({
      bookingId,
      appointmentLabel,
    })
  );

  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-emerald-900" style={{ fontFamily: "var(--font-playfair)" }}>
            Free Consultation Request Confirmed
          </h1>
          <p className="mt-4 text-emerald-900/80">
            Thank you. Your free consultation slot has been confirmed.
          </p>
          <p className="mt-2 text-charcoal/80 leading-relaxed">
            Your consultation will happen on Google Meet.
          </p>
          {appointmentLabel && (
            <p className="mt-2 text-charcoal/80 leading-relaxed">
              Appointment: {appointmentLabel} IST
            </p>
          )}
          {bookingId && (
            <p className="mt-1 text-charcoal/70 leading-relaxed">
              Booking ID: {bookingId}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {meetLink && (
              <a href={meetLink} target="_blank" rel="noreferrer" className="btn-primary">
                Join on Google Meet
              </a>
            )}
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-outline">
                Confirm via WhatsApp
              </a>
            )}
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
