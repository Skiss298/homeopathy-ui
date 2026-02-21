import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for Sai Jagruthi Homeopathy Clinic covering website use, medical disclaimer, appointment booking, payment, and user responsibilities.",
  alternates: {
    canonical: "/legal/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
          Terms and Conditions
        </h1>
        <p className="mt-3 text-sm text-charcoal/70">Effective Date: February 21, 2026</p>
        <p className="text-sm text-charcoal/70">Last Updated: February 21, 2026</p>

        <div className="mt-6 space-y-6 rounded-2xl border border-sage/60 bg-white p-6 text-charcoal/80 shadow-soft">
          <p>
            Welcome to Sai Jagruthi Homeopathy Clinic. By accessing and using this website, you agree to comply with
            and be bound by these Terms and Conditions, together with our Privacy Policy.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">1. Definitions</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                &quot;Clinic&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot; refers to Sai Jagruthi Homeopathy Clinic and its authorized team.
              </li>
              <li>&quot;You&quot; or &quot;User&quot; refers to any visitor, patient, or person using this website and services.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">2. Acceptance by User</h2>
            <p>
              By using this website, you confirm that you have read and understood these Terms and Conditions, the
              Privacy Policy, and our medical disclaimer. If you do not agree, please do not use this website.
            </p>
            <p>
              If you are below 18 years of age or otherwise not legally competent to contract, usage must be through a
              parent or legal guardian.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">3. Website Use</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Website content is for general information and service facilitation purposes.</li>
              <li>You agree to provide true, complete, and accurate information in forms and consultations.</li>
              <li>Misuse, fraudulent use, or unauthorized access attempts are prohibited.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">4. Medical Disclaimer</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>The website content does not replace direct professional medical examination or emergency care.</li>
              <li>Advice and remedy planning depend on the details and records provided by you.</li>
              <li>You are responsible for sharing complete and accurate health information.</li>
              <li>Do not begin, stop, or modify any ongoing treatment without consulting your physician.</li>
              <li>
                We do not guarantee cure for any condition. Treatment plans are individualized and based on clinical
                assessment.
              </li>
              <li>
                <strong>Results may vary from person to person</strong> depending on medical history, lifestyle,
                adherence, and overall body response.
              </li>
              <li>
                References such as &quot;curable&quot; or &quot;improvement&quot; are used in accordance with accepted medical practice
                and do not imply 100% guaranteed outcomes.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">5. Appointments and Payments</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Appointment slots are subject to availability and confirmation.</li>
              <li>Bookings are confirmed only after successful payment verification where applicable.</li>
              <li>You are responsible for entering correct contact details for consultation coordination.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">6. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, the Clinic shall not be liable for indirect, incidental, or consequential
              loss arising from website use, delays, third-party service interruptions, or incomplete information
              provided by the User.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">7. Third-Party Services</h2>
            <p>
              This website may rely on third-party providers (such as payment, hosting, communication, or analytics
              services). Their platforms are governed by their own terms and privacy practices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">8. User Consent</h2>
            <p>
              By continuing to use this website, you acknowledge that you are acting voluntarily, understand the
              limitations of online health information, and consent to these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">9. Updates to Terms</h2>
            <p>
              We may revise these Terms and Conditions at any time. Updated versions will be posted on this page with
              a revised &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">10. Contact</h2>
            <p>Sai Jagruthi Homeopathy Clinic</p>
            <p>Website: https://saijagruthihomeopathy.com</p>
            <p>Phone: +91 8712385456</p>
            <p>
              Email:{" "}
              <a className="underline" href="mailto:doctorjagruthi@gmail.com">
                doctorjagruthi@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
