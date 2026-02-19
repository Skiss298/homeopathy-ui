"use client";
import { motion } from "framer-motion";

const items = [
  {
    title: "Whole-person care",
    desc: "Treatment considers your physical, emotional, and lifestyle context for a truly individualized plan.",
    icon: "🌿",
  },
  {
    title: "Minimal side effects",
    desc: "Remedies are typically well-tolerated and gentle—suitable for long-term care in many cases.",
    icon: "💧",
  },
  {
    title: "Supports chronic & acute",
    desc: "From allergies and skin to sleep and stress—homeopathy can complement your ongoing care.",
    icon: "🕊️",
  },
  {
    title: "Convenient & secure",
    desc: "Video consultations from home with encrypted records and downloadable prescriptions.",
    icon: "🔒",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="container-max py-12">
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Why consider Homeopathy?
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="card p-5"
          >
            <div className="text-3xl">{it.icon}</div>
            <p className="mt-3 font-medium">{it.title}</p>
            <p className="text-sm text-charcoal/70 mt-1">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
