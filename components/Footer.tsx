// components/Footer.tsx
"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-white/20 bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/85 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        <div className="flex items-center gap-4">
          <a href="/legal/privacy" className="hover:underline text-white/90">{t("footer.privacy")}</a>
          <a href="/legal/terms" className="hover:underline text-white/90">{t("footer.terms")}</a>
          <a href="/contact" className="hover:underline text-white/90">{t("footer.contact")}</a>
        </div>
      </div>
    </footer>
  );
}
