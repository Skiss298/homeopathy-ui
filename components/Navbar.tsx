// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { DISEASES } from "@/lib/diseases";

export default function Navbar() {
  const { language, setLanguage, t, languages } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-sage/60 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <div className="max-w-6xl mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/about" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#4E6F75" }} />
          <span className="font-semibold tracking-wide text-charcoal">Dr. Sai Jagruthi Homeopathy</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/#home" className="hover:underline text-charcoal/80">{t("nav.home")}</Link>
          <Link href="/about" className="hover:underline text-charcoal/80">{t("nav.about")}</Link>
          <div className="relative group">
            <Link href="/services" className="hover:underline text-charcoal/80">{t("nav.services")}</Link>
            <div className="absolute left-0 top-full w-72 pt-2 opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto">
              <div className="rounded-xl border border-sage/60 bg-white shadow-soft flex flex-col p-2 text-sm text-charcoal max-h-96 overflow-y-auto">
                {DISEASES.map((disease) => (
                  <Link
                    key={disease.slug}
                    href={`/services/${disease.slug}`}
                    className="rounded-lg px-3 py-2 hover:bg-sage/40"
                  >
                    {disease.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <Link href="/contact" className="hover:underline text-charcoal/80">{t("nav.contact")}</Link>
            <div className="absolute left-0 top-full w-56 pt-2 opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto">
              <div className="rounded-xl border border-sage/60 bg-white shadow-soft flex flex-col p-2 text-sm text-charcoal">
                <Link href="/book" className="rounded-lg px-3 py-2 hover:bg-sage/40">{t("nav.book")}</Link>
                <Link href="/contact" className="rounded-lg px-3 py-2 hover:bg-sage/40">{t("nav.freeConsultation")}</Link>
                <Link href="/queries-feedback" className="rounded-lg px-3 py-2 hover:bg-sage/40">{t("nav.queriesFeedback")}</Link>
                <Link href="/contact" className="rounded-lg px-3 py-2 hover:bg-sage/40">{t("nav.connect")}</Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button
              type="button"
              className="text-sm text-charcoal/80 hover:underline"
              aria-label={t("nav.selectLanguage")}
            >
              {t("nav.selectLanguage")}
            </button>
            <div className="absolute right-0 top-full w-44 pt-2 opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
              <div className="rounded-xl border border-sage/60 bg-white shadow-soft flex flex-col p-2 text-sm text-charcoal">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`rounded-lg px-3 py-2 text-left hover:bg-sage/40 ${
                      language === lang.code ? "bg-sage/30 font-semibold" : ""
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
