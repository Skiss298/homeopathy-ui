import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DISEASES, DISEASE_BY_SLUG } from "@/lib/diseases";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return DISEASES.map((disease) => ({ slug: disease.slug }));
}

export default async function ServiceDiseasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const disease = DISEASE_BY_SLUG[slug];

  if (!disease) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
          {disease.name}
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="card p-6">
            <h2 className="text-xl font-semibold">What is this disease?</h2>
            <p className="mt-3 text-charcoal/80 leading-relaxed">{disease.whatIs}</p>
          </section>

          <section className="card p-6">
            <h2 className="text-xl font-semibold">Common symptoms</h2>
            <ul className="mt-3 space-y-2 text-charcoal/80">
              {disease.symptoms.map((symptom) => (
                <li key={symptom}>• {symptom}</li>
              ))}
            </ul>
          </section>

          <section className="card p-6 md:col-span-2">
            <h2 className="text-xl font-semibold">Common causes</h2>
            <ul className="mt-3 grid gap-2 md:grid-cols-2 text-charcoal/80">
              {disease.causes.map((cause) => (
                <li key={cause}>• {cause}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-sage/60 bg-[#EEF6F3] p-6">
          <h2 className="text-xl font-semibold">Our approach</h2>
          <p className="mt-3 text-charcoal/80 leading-relaxed">
            We provide the best suitable homeopathic medicine based on your individual health
            condition, symptom pattern, and overall history. Each treatment plan is personalized
            and reviewed with follow-up guidance.
          </p>
          <div className="mt-5 flex justify-end">
            <Link href="/book" className="btn-primary">
              Book Appointment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
