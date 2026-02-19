// components/Footer.tsx
"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-sage/60">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-charcoal/70 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        <div className="flex items-center gap-4">
          <a href="/legal/privacy" className="hover:underline">{t("footer.privacy")}</a>
          <a href="/legal/terms" className="hover:underline">{t("footer.terms")}</a>
          <a href="/contact" className="hover:underline">{t("footer.contact")}</a>
        </div>
      </div>
    </footer>
  );
}
