"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { DISEASES } from "@/lib/diseases";

export default function Navbar() {
  const { language, setLanguage, t, languages } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-black shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="h-8 w-8 shrink-0 rounded-full" style={{ backgroundColor: "#FACC15" }} />
          <span className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">
            Dr. Sai Jagruthi Homeopathy
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          <Link href="/#home" className="text-base text-white/90 hover:underline">
            {t("nav.home")}
          </Link>
          <Link href="/about" className="text-base text-white/90 hover:underline">
            {t("nav.about")}
          </Link>

          <div className="group relative">
            <Link href="/services" className="text-base text-white/90 hover:underline">
              {t("nav.services")}
            </Link>
            <div className="pointer-events-none absolute left-0 top-full w-72 pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="flex max-h-96 flex-col overflow-y-auto rounded-xl border border-sage/60 bg-white p-2 text-sm text-charcoal shadow-soft">
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

          <div className="group relative">
            <Link href="/contact" className="text-base text-white/90 hover:underline">
              {t("nav.contact")}
            </Link>
            <div className="pointer-events-none absolute left-0 top-full w-56 pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="flex flex-col rounded-xl border border-sage/60 bg-white p-2 text-sm text-charcoal shadow-soft">
                <Link href="/book" className="rounded-lg px-3 py-2 hover:bg-sage/40">
                  {t("nav.book")}
                </Link>
                <Link href="/contact" className="rounded-lg px-3 py-2 hover:bg-sage/40">
                  {t("nav.freeConsultation")}
                </Link>
                <Link href="/queries-feedback" className="rounded-lg px-3 py-2 hover:bg-sage/40">
                  {t("nav.queriesFeedback")}
                </Link>
                <Link href="/contact" className="rounded-lg px-3 py-2 hover:bg-sage/40">
                  {t("nav.connect")}
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative">
            <button
              type="button"
              className="text-base text-white/90 hover:underline"
              aria-label={t("nav.selectLanguage")}
            >
              {t("nav.selectLanguage")}
            </button>
            <div className="pointer-events-none absolute right-0 top-full w-44 pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="flex flex-col rounded-xl border border-sage/60 bg-white p-2 text-sm text-charcoal shadow-soft">
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

        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-lg border border-white/30 px-3 py-2 text-sm text-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="border-t border-white/20 bg-black px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-h-[70vh] max-w-6xl flex-col gap-3 overflow-y-auto">
            <Link href="/#home" className="rounded-lg px-2 py-2 text-white/95" onClick={() => setMobileOpen(false)}>
              {t("nav.home")}
            </Link>
            <Link href="/about" className="rounded-lg px-2 py-2 text-white/95" onClick={() => setMobileOpen(false)}>
              {t("nav.about")}
            </Link>
            <Link href="/services" className="rounded-lg px-2 py-2 text-white/95" onClick={() => setMobileOpen(false)}>
              {t("nav.services")}
            </Link>
            <div className="rounded-xl border border-white/20 p-2">
              <p className="px-2 py-1 text-sm text-white/80">Popular Services</p>
              <div className="grid gap-1">
                {DISEASES.slice(0, 8).map((disease) => (
                  <Link
                    key={disease.slug}
                    href={`/services/${disease.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10"
                  >
                    {disease.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/20 p-2">
              <p className="px-2 py-1 text-sm text-white/80">{t("nav.contact")}</p>
              <div className="grid gap-1">
                <Link
                  href="/book"
                  className="rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.book")}
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.freeConsultation")}
                </Link>
                <Link
                  href="/queries-feedback"
                  className="rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.queriesFeedback")}
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.connect")}
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-white/20 p-2">
              <p className="px-2 py-1 text-sm text-white/80">{t("nav.selectLanguage")}</p>
              <div className="grid gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileOpen(false);
                    }}
                    className={`rounded-lg px-2 py-2 text-left text-sm text-white/90 hover:bg-white/10 ${
                      language === lang.code ? "bg-white/15 font-semibold" : ""
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
