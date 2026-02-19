// components/BookingWidget.tsx
"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function BookingWidget() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <div className="card p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{t("book.widgetTitle")}</h3>
      <p className="text-sm text-charcoal/70">
        {t("book.widgetBody")}
      </p>
      <button onClick={() => router.push("/book")} className="btn-primary self-start">
        {t("book.checkAvailabilityButton")}
      </button>
      <p className="text-xs text-charcoal/60">
        {t("book.widgetFooter")}
      </p>
    </div>
  );
}
