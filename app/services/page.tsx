import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DISEASES } from "@/lib/diseases";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-12">
        <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
          Services We Offer
        </h1>
        <p className="mt-3 text-charcoal/80 leading-relaxed">
          Explore common conditions for which patients often seek homeopathic support.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISEASES.map((disease) => (
            <Link
              key={disease.slug}
              href={`/services/${disease.slug}`}
              className="card p-5 hover:bg-sage/20 transition"
            >
              <h2 className="text-lg font-semibold">{disease.name}</h2>
              <p className="mt-2 text-sm text-charcoal/75">{disease.whatIs}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
