"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollGallery from "@/components/ScrollGallery";
import ConditionsAndHowItWorks from "@/components/ConditionsAndHowItWorks";
import { useLanguage } from "@/components/LanguageProvider";

export default function Page() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <HeroCarousel />
        </section>

        <section id="about" className="container-max py-14">
          <h2
            className="text-3xl font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("home.about.title")}
          </h2>
          <p className="mt-4 text-charcoal/80 leading-relaxed">
            {t("home.about.body")}
          </p>
        </section>

        <section id="services" className="container-max py-14">
          <h2
            className="text-3xl font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("home.services.title")}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold">{t("home.services.initialTitle")}</h3>
              <p className="mt-2 text-charcoal/75">
                {t("home.services.initialBody")}
              </p>
            </div>
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold">{t("home.services.followupTitle")}</h3>
              <p className="mt-2 text-charcoal/75">
                {t("home.services.followupBody")}
              </p>
            </div>
            <div className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold">{t("home.services.onlineTitle")}</h3>
              <p className="mt-2 text-charcoal/75">
                {t("home.services.onlineBody")}
              </p>
            </div>
          </div>
        </section>

        {/* WHY section (anchor for the hero button) */}
        <section id="why" className="container-max py-14">
          <h2
            className="text-3xl font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("home.why.title")}
          </h2>
          <p className="mt-4 text-charcoal/80 leading-relaxed">
            {t("home.why.body")}
          </p>
        </section>

        {/* Scroll-motion image + text sections */}
        <ScrollGallery
          src="/images/gallery-4.jpg"
          title={t("scroll.holisticTitle")}
          body={t("scroll.holisticBody")}
        />
        <ScrollGallery
          src="/images/gallery-5.jpg"
          title={t("scroll.minSideEffectsTitle")}
          body={t("scroll.minSideEffectsBody")}
          reverse
        />
        <ScrollGallery
          src="/images/gallery-6.jpg"
          title={t("scroll.clearGuidanceTitle")}
          body={t("scroll.clearGuidanceBody")}
        />

        {/* ✅ NEW SECTION */}
        <ConditionsAndHowItWorks />

        <section id="contact" className="container-max py-14">
          <h2
            className="text-3xl font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("home.contact.title")}
          </h2>
          <p className="mt-4 text-charcoal/80 leading-relaxed">
            {t("home.contact.body")}
          </p>
          <div className="mt-4 text-charcoal/70">
            <p>{t("home.contact.phone")}</p>
            <p>{t("home.contact.email")}</p>
            <p>{t("home.contact.hours")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
