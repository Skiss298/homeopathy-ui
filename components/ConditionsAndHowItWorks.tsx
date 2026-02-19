// components/ConditionsAndHowItWorks.tsx
"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function ConditionsAndHowItWorks() {
  const { t } = useLanguage();
  return (
    <section className="container-max py-20">
      {/* CONDITIONS */}
      <h2 className="text-3xl font-semibold mb-8">
        {t("conditions.title")}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
        {[
          { title: t("conditions.allergies") },
          { title: t("conditions.skin") },
          { title: t("conditions.digestive") },
          { title: t("conditions.respiratory") },
          { title: t("conditions.womens") },
          { title: t("conditions.stress") },
        ].map((item) => (
          <div key={item.title} className="card p-6">
            <h3 className="text-lg font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-charcoal/70">
              {t("conditions.cardBody")}
            </p>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <h2 className="text-3xl font-semibold mb-8">
        {t("how.title")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">
            {t("how.step1Title")}
          </h3>
          <p className="text-charcoal/70">
            {t("how.step1Body")}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">
            {t("how.step2Title")}
          </h3>
          <p className="text-charcoal/70">
            {t("how.step2Body")}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">
            {t("how.step3Title")}
          </h3>
          <p className="text-charcoal/70">
            {t("how.step3Body")}
          </p>
        </div>
      </div>
    </section>
  );
}
