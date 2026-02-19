"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="container-max py-16">
        <h1
          className="text-4xl md:text-5xl font-semibold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("contact.title")}
        </h1>
        <p className="mt-4 text-charcoal/80 leading-relaxed">
          {t("contact.subtitle")}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold">{t("contact.clinicContact")}</h2>
              <div className="mt-3 text-charcoal/80">
                <p>{t("contact.phoneLine")}</p>
                <p>{t("contact.emailLine")}</p>
                <p>{t("contact.hoursLine")}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold">{t("contact.connectWithUs")}</h2>
              <p className="mt-2 text-charcoal/80">
                {t("contact.connectBody")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">{t("contact.requestConsultation")}</h2>
            <form className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-charcoal/70">{t("contact.fullName")}</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.fullNamePlaceholder")}
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("contact.email")}</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("contact.phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.phonePlaceholder")}
                />
              </div>
              <div>
                <label className="text-sm text-charcoal/70">{t("contact.message")}</label>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>
              <label className="flex items-start gap-2 text-sm text-charcoal/70">
                <input type="checkbox" className="mt-1" />
                <span>{t("contact.consent")}</span>
              </label>
              <button type="submit" className="btn-primary w-full">
                {t("contact.submitRequest")}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
