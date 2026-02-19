"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Slide = {
  type: "image" | "video";
  src: string;
  altKey: string;
  fallbackImageSrc?: string;
  duration?: number;
  fit?: "cover" | "contain";
  objectPosition?: string;
};

type BannerMedia = {
  videoSrc?: string;
  imageSrc?: string;
  altKey: string;
  duration?: number;
  fit?: "cover" | "contain";
  objectPosition?: string;
};

/* Add / remove media entries here only.
   If `videoSrc` exists, video is used.
   If only `imageSrc` exists, image is used. */
const bannerMedia: BannerMedia[] = [
  {
    imageSrc: "/images/hero.jpg",
    altKey: "hero.alt.homeopathyCare",
    duration: 6000,
    fit: "cover",
    objectPosition: "center center",
  },
  {
    imageSrc: "/images/gallery-4.jpg",
    altKey: "hero.alt.homeopathyCare",
    duration: 6000,
    fit: "cover",
    objectPosition: "center center",
  },
  {
    imageSrc: "/images/gallery-2.jpg",
    altKey: "hero.alt.homeopathyCare",
    duration: 6000,
    fit: "cover",
    objectPosition: "center center",
  },
  {
    imageSrc: "/images/gallery-3.jpg",
    altKey: "hero.alt.naturalHealing",
    duration: 6000,
    fit: "cover",
    objectPosition: "center center",
  },
];

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [videoFailures, setVideoFailures] = useState<Record<number, boolean>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const slides = useMemo<Slide[]>(() => {
    return bannerMedia
      .map((item) => {
        if (item.videoSrc) {
          return {
            type: "video" as const,
            src: item.videoSrc,
            altKey: item.altKey,
            fallbackImageSrc: item.imageSrc,
            fit: item.fit ?? "cover",
            objectPosition: item.objectPosition ?? "center center",
          };
        }
        if (item.imageSrc) {
          return {
            type: "image" as const,
            src: item.imageSrc,
            altKey: item.altKey,
            duration: item.duration ?? 6000,
            fit: item.fit ?? "cover",
            objectPosition: item.objectPosition ?? "center center",
          };
        }
        return null;
      })
      .filter((slide): slide is Slide => slide !== null);
  }, []);

  const goTo = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(index);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const slide = slides[current];

    if (slide.type === "image" || videoFailures[current]) {
      timerRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, slide.duration ?? 6000);
    }

    if (slide.type === "video" && !videoFailures[current]) {
      const video = videoRefs.current[current];
      if (video) {
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            video.onended = () => {
              setCurrent((prev) => (prev + 1) % slides.length);
            };
          })
          .catch(() => {
            setVideoFailures((prev) => ({ ...prev, [current]: true }));
          });
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, slides, videoFailures]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {slides.map((slide, index) => {
        const showFallbackImage =
          slide.type === "video" && videoFailures[index] && slide.fallbackImageSrc;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "image" || showFallbackImage ? (
              <img
                src={showFallbackImage ? slide.fallbackImageSrc : slide.src}
                alt={t(slide.altKey)}
                className={`h-full w-full ${
                  (slide.fit ?? "cover") === "contain" ? "object-contain" : "object-cover"
                }`}
                style={{ objectPosition: slide.objectPosition ?? "center center" }}
                draggable={false}
              />
            ) : (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={slide.src}
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
                onError={() => setVideoFailures((prev) => ({ ...prev, [index]: true }))}
              />
            )}

            <div className="absolute inset-0 bg-black/35" />
          </div>
        );
      })}

      <div className="relative z-20 h-full flex items-center">
        <div className="w-full text-white">
          <div className="max-w-xl w-full text-left flex flex-col items-start ml-auto pr-2 sm:pr-4 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mt-4 text-lg text-white/90 w-full">{t("hero.subtitle")}</p>

            <div className="mt-6 flex gap-4">
              <a href="/book" className="btn-hero-primary">
                {t("hero.book")}
              </a>
              <a href="#why" className="btn-hero-secondary">
                {t("hero.learnMore")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={t("hero.slideLabel", { number: index + 1 })}
          />
        ))}
      </div>
    </section>
  );
}
