"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background image (kept clear/bright) */}
      <Image
        src="/images/hero.jpg"
        alt="Homeopathy consultation"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gentle bottom gradient just for text legibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative h-full container-max flex items-center">
        <div className="max-w-xl bg-cream/85 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-soft border border-sage/60">
          <h1 className="text-4xl md:text-5xl leading-tight font-semibold"
              style={{ fontFamily: "var(--font-playfair)" }}>
            Gentle, Personalized <span className="text-forest">Homeopathy</span> Care
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            Book a secure online consultation with an experienced homeopathy doctor. Holistic treatment, minimal side effects, care that listens.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book" className="btn-primary">Book an Appointment</Link>
            <a href="#why" className="btn-outline">Why Homeopathy?</a>
          </div>
        </div>
      </div>
    </section>
  );
}
