"use client";
import { motion } from "framer-motion";

export default function WhyHomeopathy() {
  const bullets = [
    "Focuses on the root causes, not just symptom relief.",
    "Non-invasive, gentle remedies with minimal side effects.",
    "Personalized remedies matched to your unique pattern of symptoms.",
    "Can work alongside conventional care—always discuss with your doctor.",
  ];
  return (
    <section className="bg-sage/40 py-12">
      <div className="container-max">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          A gentler path to feeling better
        </h2>
        <p className="text-charcoal/80 max-w-3xl">
          Homeopathy aims to stimulate your body’s natural healing response.
          We take time to understand your story, triggers, and patterns, then
          craft a plan that fits your life. Many people choose it for its
          safety profile and individualized approach.
        </p>

        <ul className="mt-6 grid sm:grid-cols-2 gap-3">
          {bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="card p-4"
            >
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
