import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Sai Jagruthi Homeopathy Clinic covering website usage, bookings, consultations, data handling, and contact rights.",
  alternates: {
    canonical: "/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
          Privacy Policy (Sai Jagruthi Homeopathy Clinic)
        </h1>
        <p className="mt-3 text-sm text-charcoal/70">Effective Date: February 21, 2026</p>
        <p className="text-sm text-charcoal/70">Last Updated: February 21, 2026</p>

        <div className="mt-6 space-y-6 rounded-2xl border border-sage/60 bg-white p-6 text-charcoal/80 shadow-soft">
          <p>
            At Sai Jagruthi Homeopathy Clinic (&quot;Clinic&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we are committed to protecting your
            privacy when you use our website and services, including phone, email, website forms, online appointment
            booking, and consultation support.
          </p>

          <p>By using our website and services, you agree to this Privacy Policy.</p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">1. Who We Are</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Clinic Name: Sai Jagruthi Homeopathy Clinic</li>
              <li>Doctor: Dr. Sai Jagruthi</li>
              <li>Website: https://saijagruthihomeopathy.com</li>
              <li>Helpline: +91 8712385456</li>
              <li>Email: doctorjagruthi@gmail.com</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">2. Information We Collect</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Name, phone number, email, and appointment details.</li>
              <li>
                Health-related details you provide (symptoms, history, updates, reports, prescriptions, images).
              </li>
              <li>Payment and transaction information required for booking confirmation via secure providers.</li>
              <li>Device/browser/IP and basic usage logs.</li>
              <li>Messages, emails, call details, form submissions, feedback, and support queries.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">3. How We Collect Information</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Directly from you through booking forms, contact forms, calls, and follow-ups.</li>
              <li>Automatically through standard website technologies such as cookies/logging/analytics.</li>
              <li>From a parent/guardian/caregiver where information is shared on your behalf.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">4. How We Use Information</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Provide consultation and treatment support.</li>
              <li>Manage appointments, confirmations, reminders, and follow-ups.</li>
              <li>Process payments and maintain booking records.</li>
              <li>Respond to your questions and support requests.</li>
              <li>Improve website, service quality, and patient experience.</li>
              <li>Send important service updates and optional communications with opt-out.</li>
              <li>Comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">5. Cookies</h2>
            <p>
              We may use cookies and similar technologies to improve website experience, remember preferences, and
              understand usage patterns. You can disable cookies in browser settings, but some features may not work
              properly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">6. Sharing of Information</h2>
            <p>We may share information only when necessary with:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Authorized clinic personnel.</li>
              <li>Trusted service providers (hosting, messaging, payment, analytics, technical support).</li>
              <li>Legal/regulatory authorities when required by law.</li>
              <li>Successor entities in merger/restructuring situations with applicable safeguards.</li>
            </ul>
            <p>We do not sell personal health information.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">7. Data Security</h2>
            <p>
              We use reasonable technical and organizational safeguards to protect your personal and health information
              from unauthorized access, disclosure, alteration, or misuse. No internet-based system is 100% risk-free.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">8. Data Retention</h2>
            <p>
              We retain personal data only as long as needed for consultation support, operations, legal compliance,
              dispute handling, and record-keeping obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">9. Your Rights</h2>
            <p>Subject to applicable law, you may request to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>access your personal data;</li>
              <li>correct inaccurate data;</li>
              <li>withdraw consent where applicable;</li>
              <li>request deletion where legally permissible;</li>
              <li>opt out of promotional communication.</li>
            </ul>
            <p>
              For requests, contact us at{" "}
              <a className="underline" href="mailto:doctorjagruthi@gmail.com">
                doctorjagruthi@gmail.com
              </a>{" "}
              or +91 8712385456.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">10. Children&apos;s Privacy</h2>
            <p>
              Services are intended for adults or minors represented by a parent/legal guardian. We do not knowingly
              collect unauthorized personal data of children.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">11. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites/services. We are not responsible for their privacy
              practices or content.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">12. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-charcoal">13. Contact</h2>
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
