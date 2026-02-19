"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  src: string;          // "/images/gallery-1.jpg"
  title: string;        // Section title
  body: string;         // Paragraph text
  reverse?: boolean;    // image on right when true
};

export default function ScrollGallery({ src, title, body, reverse }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // when section enters/leaves viewport
  });
  // Move image upward on scroll
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="w-full py-16 px-0">
      <div
        className={`grid md:grid-cols-12 gap-8 items-center ${
          reverse ? "md:[&>div:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          style={{ y }}
          className="relative h-[380px] md:h-[460px] md:col-span-7 rounded-2xl overflow-hidden shadow-soft border border-sage/60"
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </motion.div>

        <div className="card p-6 md:p-8 md:col-span-5 md:min-h-[360px] flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </h3>
          <p className="mt-3 text-charcoal/80 leading-relaxed">{body}</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            <li>• {t("scroll.bullet1")}</li>
            <li>• {t("scroll.bullet2")}</li>
            <li>• {t("scroll.bullet3")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
