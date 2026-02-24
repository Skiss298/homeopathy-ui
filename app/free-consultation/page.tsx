"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { isValidEmail, isValidIndianPhone } from "@/lib/validation";

type SlotStatus = "AVAILABLE" | "BOOKED" | "UNAVAILABLE";

type Slot = {
  startUtc: string;
  endUtc: string;
  label: string;
  status: SlotStatus;
};

function getTodayIstDateInputValue() {
  const now = new Date();
  const istNow = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const year = istNow.getUTCFullYear();
  const month = String(istNow.getUTCMonth() + 1).padStart(2, "0");
  const day = String(istNow.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export default function FreeConsultationPage() {
  const router = useRouter();
  const [date, setDate] = useState(getTodayIstDateInputValue);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedSlot(null);
  }, [date]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch slots");
      setSlots(data.slots ?? []);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to fetch slots"));
    } finally {
      setLoading(false);
    }
  };

  const bookFreeConsultation = async () => {
    if (!selectedSlot) return;
    if (new Date(selectedSlot.startUtc) <= new Date()) {
      setError("Selected slot is in the past. Please choose a future slot.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidIndianPhone(phone)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          startUtc: selectedSlot.startUtc,
          name,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to book free consultation");
      const params = new URLSearchParams();
      if (data?.confirmation?.bookingId) {
        params.set("bookingId", data.confirmation.bookingId);
      }
      if (data?.confirmation?.appointmentLabel) {
        params.set("appointment", data.confirmation.appointmentLabel);
      }
      if (data?.confirmation?.googleMeetLink) {
        params.set("meet", data.confirmation.googleMeetLink);
      }
      router.push(`/free-consultation/confirmed${params.toString() ? `?${params.toString()}` : ""}`);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to book free consultation"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
          Free Consultation
        </h1>
        <p className="mt-3 text-charcoal/80 leading-relaxed">
          We are committed to serving people in need, especially those who cannot afford treatment. If you need
          support, request a free consultation below.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Check Availability</h2>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-col gap-1 text-sm text-charcoal/70">
                Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                />
              </label>
              <button type="button" onClick={fetchAvailability} className="btn-primary" disabled={loading}>
                {loading ? "Checking..." : "Check Availability"}
              </button>
            </div>

            {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {slots.map((slot) => {
                const isSelected = selectedSlot?.startUtc === slot.startUtc;
                const isAvailable = slot.status === "AVAILABLE";
                return (
                  <button
                    key={slot.startUtc}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => isAvailable && setSelectedSlot(slot)}
                    className={[
                      "rounded-xl border px-3 py-2 text-sm font-medium transition",
                      isAvailable
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        : "border-rose-300 bg-rose-50 text-rose-700",
                      isSelected ? "ring-2 ring-emerald-400" : "",
                    ].join(" ")}
                  >
                    {slot.label}
                  </button>
                );
              })}
              {slots.length === 0 && (
                <p className="col-span-2 text-sm text-charcoal/70 sm:col-span-3">
                  Pick a date and click &quot;Check Availability&quot; to see slots.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Your Details</h2>
            <form
              className="mt-4 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                bookFreeConsultation();
              }}
            >
              <div>
                <label className="text-sm text-charcoal/70">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder="+91 8712385456"
                  inputMode="tel"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={!selectedSlot || submitting || loading}
              >
                {submitting
                  ? "Booking..."
                  : selectedSlot
                    ? "Book Free Consultation"
                    : "Select a Slot to Continue"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
