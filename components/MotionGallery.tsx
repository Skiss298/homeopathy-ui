// components/MotionGallery.tsx
"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  { src: "/images/gallery-1.jpg", alt: "Consultation", caption: "Individualized case-taking" },
  { src: "/images/gallery-2.jpg", alt: "Remedies", caption: "Minimal doses, maximal effect" },
  { src: "/images/gallery-3.jpg", alt: "Wellness", caption: "Holistic improvement over time" },
];

export default function MotionGallery() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax-like transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -15]);

  return (
    <section ref={ref} aria-labelledby="gallery" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="gallery" className="text-2xl font-semibold mb-6">A gentle, nature-inspired approach</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.figure style={{ y: y1 }} className="card overflow-hidden">
            <Image src={items[0].src} alt={items[0].alt} width={640} height={420} className="w-full h-56 object-cover" />
            <figcaption className="p-4 text-sm text-charcoal/80">{items[0].caption}</figcaption>
          </motion.figure>

          <motion.figure style={{ y: y2 }} className="card overflow-hidden">
            <Image src={items[1].src} alt={items[1].alt} width={640} height={420} className="w-full h-56 object-cover" />
            <figcaption className="p-4 text-sm text-charcoal/80">{items[1].caption}</figcaption>
          </motion.figure>

          <motion.figure style={{ y: y3 }} className="card overflow-hidden">
            <Image src={items[2].src} alt={items[2].alt} width={640} height={420} className="w-full h-56 object-cover" />
            <figcaption className="p-4 text-sm text-charcoal/80">{items[2].caption}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
