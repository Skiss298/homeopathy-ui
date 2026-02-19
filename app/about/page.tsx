"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="container-max py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h1
              className="text-4xl md:text-5xl font-semibold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("about.title")}
            </h1>

            <div className="mt-6 space-y-6 text-charcoal/80 leading-relaxed text-lg">
            <p>
              {t("about.p1")}
            </p>
            <p>
              {t("about.p2")}
            </p>
            <p>
              {t("about.p3")}
            </p>

            <div className="pt-6">
              <p className="handwrite text-2xl md:text-3xl text-[#4E6F75]" style={{ fontFamily: "var(--font-marker)" }}>
                {t("about.thankYou")}
              </p>
              <p
                className="handwrite handwrite-delay text-3xl md:text-4xl text-[#4E6F75] mt-2"
                style={{ fontFamily: "var(--font-marker)" }}
              >
                Dr. Sai Jagruthi
              </p>
            </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="w-full max-w-sm md:max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-soft border border-sage/60">
              <img
                src="/images/dr-jagruthi.jpg"
                alt={t("about.imageAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
