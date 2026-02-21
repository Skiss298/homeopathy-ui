"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import { isValidEmail, isValidIndianPhone } from "@/lib/validation";

type SlotStatus = "AVAILABLE" | "BOOKED" | "UNAVAILABLE";

type Slot = {
  startUtc: string;
  endUtc: string;
  label: string;
  status: SlotStatus;
};

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckout = {
  open: () => void;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    name: string;
    email: string;
    phone: string;
  };
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  modal: {
    ondismiss: () => void;
  };
  theme: {
    color: string;
  };
};

type RazorpayOrderResponse = {
  keyId: string;
  amount: number;
  currency: string;
  orderId: string;
  error?: string;
};

type RazorpayVerifyResponse = {
  status: "CONFIRMED";
  error?: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayCheckout;
  }
}

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

export default function BookPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [date, setDate] = useState(getTodayIstDateInputValue);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [payStatus, setPayStatus] = useState<"IDLE" | "SUCCESS" | "FAILED">("IDLE");

  useEffect(() => {
    if (document.getElementById("razorpay-checkout-js")) return;
    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setSelectedSlot(null);
    setPayStatus("IDLE");
  }, [date]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || t("book.errorFetchSlots"));
      setSlots(data.slots ?? []);
    } catch (err: unknown) {
      setError(getErrorMessage(err, t("book.errorFetchSlots")));
    } finally {
      setLoading(false);
    }
  };

  const holdSlot = async (): Promise<{ bookingId: string } | null> => {
    if (!selectedSlot) return null;
    if (new Date(selectedSlot.startUtc) <= new Date()) {
      setError("Selected slot is in the past. Please choose a future slot.");
      return null;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return null;
    }
    if (!isValidIndianPhone(phone)) {
      setError("Please enter a valid mobile number.");
      return null;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
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
      if (!res.ok) throw new Error(data?.error || t("book.errorHoldSlot"));
      setPayStatus("IDLE");
      await fetchAvailability();
      return { bookingId: data.bookingId };
    } catch (err: unknown) {
      setError(getErrorMessage(err, t("book.errorHoldSlot")));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const startPayment = async (bookingId: string) => {
    setPayLoading(true);
    setError("");
    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const orderData = (await orderRes.json()) as RazorpayOrderResponse;
      if (!orderRes.ok) throw new Error(orderData?.error || t("book.errorCreateOrder"));

      if (!window.Razorpay) {
        throw new Error(t("book.errorRazorpayNotLoaded"));
      }

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DSS Homeopathy",
        description: "Appointment Fee",
        order_id: orderData.orderId,
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          name,
          email,
          phone,
        },
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = (await verifyRes.json()) as RazorpayVerifyResponse;
            if (!verifyRes.ok) {
              throw new Error(verifyData?.error || t("book.errorPaymentVerification"));
            }
            setPayStatus("SUCCESS");
            setError("");
            router.push("/book/confirmed");
          } catch (err: unknown) {
            setPayStatus("FAILED");
            setError(getErrorMessage(err, t("book.errorPaymentVerification")));
          }
        },
        modal: {
          ondismiss: () => setPayStatus("FAILED"),
        },
        theme: {
          color: "#2E6B4F",
        },
      });

      rzp.open();
    } catch (err: unknown) {
      setPayStatus("FAILED");
      setError(getErrorMessage(err, t("book.errorPaymentFailed")));
    } finally {
      setPayLoading(false);
    }
  };

  const holdAndStartPayment = async () => {
    const bookedHoldInfo = await holdSlot();
    if (!bookedHoldInfo?.bookingId) return;
    await startPayment(bookedHoldInfo.bookingId);
  };

  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1
          className="text-4xl md:text-5xl font-semibold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("book.title")}
        </h1>
        <p className="mt-3 text-charcoal/80 leading-relaxed">
          {t("book.subtitle")}
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">{t("book.checkAvailability")}</h2>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-col gap-1 text-sm text-charcoal/70">
                {t("book.date")}
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                />
              </label>
              <button
                type="button"
                onClick={fetchAvailability}
                className="btn-primary"
                disabled={loading}
              >
                {loading ? t("book.checking") : t("book.checkAvailabilityButton")}
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
                  {t("book.noSlots")}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">{t("book.yourDetails")}</h2>
            <form
              className="mt-4 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                holdAndStartPayment();
              }}
            >
              <div>
                <label className="text-sm text-charcoal/70">{t("book.fullName")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("book.fullNamePlaceholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("book.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("book.emailPlaceholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("book.phone")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("book.phonePlaceholder")}
                  inputMode="tel"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={!selectedSlot || loading || payLoading}
              >
                {payLoading
                  ? t("book.openingPayment")
                  : selectedSlot
                    ? t("book.payToConfirm")
                    : t("book.selectSlotToContinue")}
              </button>

              {payStatus === "FAILED" && (
                <p className="text-sm text-rose-600">
                  {t("book.paymentFailed")}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
