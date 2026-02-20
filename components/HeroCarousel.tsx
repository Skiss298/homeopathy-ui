"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
    imageSrc: "/images/banner-1.jpg",
    altKey: "hero.alt.homeopathyCare",
    duration: 6000,
    fit: "cover",
    objectPosition: "center center",
  },
  {
    imageSrc: "/images/banner-2.jpg",
    altKey: "hero.alt.homeopathyCare",
    duration: 6000,
    fit: "cover",
    objectPosition: "center center",
  },
  {
    imageSrc: "/images/banner-3.jpg",
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
    return bannerMedia.reduce<Slide[]>((acc, item) => {
      if (item.videoSrc) {
        acc.push({
          type: "video",
          src: item.videoSrc,
          altKey: item.altKey,
          fallbackImageSrc: item.imageSrc,
          fit: item.fit ?? "cover",
          objectPosition: item.objectPosition ?? "center center",
        });
      } else if (item.imageSrc) {
        acc.push({
          type: "image",
          src: item.imageSrc,
          altKey: item.altKey,
          duration: item.duration ?? 6000,
          fit: item.fit ?? "cover",
          objectPosition: item.objectPosition ?? "center center",
        });
      }
      return acc;
    }, []);
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
    <section className="relative min-h-[560px] h-[74vh] sm:h-[78vh] w-full overflow-hidden">
      {slides.map((slide, index) => {
        const showFallbackImage = Boolean(
          slide.type === "video" && videoFailures[index] && slide.fallbackImageSrc
        );
        const imageSrc = showFallbackImage ? slide.fallbackImageSrc ?? slide.src : slide.src;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "image" || showFallbackImage ? (
              <Image
                src={imageSrc}
                alt={t(slide.altKey)}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`${
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

      <div className="relative z-20 flex h-full items-center">
        <div className="w-full px-4 sm:px-6 md:px-10 text-white">
          <div className="w-full max-w-[560px] text-left flex flex-col items-start ml-0 md:ml-auto md:translate-x-6 lg:translate-x-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 w-full max-w-[470px]">{t("hero.subtitle")}</p>

            <div className="mt-6 flex w-full flex-col sm:w-auto sm:flex-row justify-start gap-3 sm:gap-4">
              <a href="/book" className="btn-hero-primary w-full sm:w-auto text-center">
                {t("hero.book")}
              </a>
              <a href="#why" className="btn-hero-secondary w-full sm:w-auto text-center">
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
