"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { isValidEmail, isValidIndianPhone } from "@/lib/validation";

type InquiryType = "QUERY" | "FEEDBACK";

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export default function QueriesFeedbackPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [type, setType] = useState<InquiryType>("QUERY");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError("Please fill all required fields.");
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
    if (!consent) {
      setError("Please provide consent to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/queries-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name,
          email,
          phone,
          message,
          consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to submit. Please try again.");

      router.push(`/queries-feedback/confirmed?type=${type.toLowerCase()}`);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Unable to submit. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container-max py-16">
        <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
          {t("queries.title")}
        </h1>
        <p className="mt-4 text-charcoal/80 leading-relaxed">{t("queries.subtitle")}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">{t("queries.yourDetails")}</h2>
            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-sm text-charcoal/70">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as InquiryType)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                >
                  <option value="QUERY">Query</option>
                  <option value="FEEDBACK">Feedback</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-charcoal/70">{t("contact.fullName")}</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.fullNamePlaceholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("contact.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.emailPlaceholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("contact.phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.phonePlaceholder")}
                  inputMode="tel"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("queries.queryLabel")}</label>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("queries.queryPlaceholder")}
                  required
                />
              </div>
              <label className="flex items-start gap-2 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>{t("contact.consent")}</span>
              </label>
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? "Submitting..." : t("queries.submit")}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold">{t("queries.contactDetails")}</h2>
              <div className="mt-3 text-charcoal/80">
                <p>{t("contact.phoneLine")}</p>
                <p>{t("contact.emailLine")}</p>
                <p>{t("contact.hoursLine")}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold">{t("queries.whatToExpect")}</h2>
              <p className="mt-2 text-charcoal/80">{t("queries.whatToExpectBody")}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
