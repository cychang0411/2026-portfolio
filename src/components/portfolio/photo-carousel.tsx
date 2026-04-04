"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Locale, PhotoItem } from "@/data/portfolio-content";

type PhotoCarouselProps = {
  photos: PhotoItem[];
  locale: Locale;
};

export function PhotoCarousel({ photos, locale }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || photos.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % photos.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [paused, photos.length, reducedMotion]);

  const activePhoto = useMemo(() => photos[currentIndex], [currentIndex, photos]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const previous = () => {
    setCurrentIndex((index) => (index - 1 + photos.length) % photos.length);
  };

  const next = () => {
    setCurrentIndex((index) => (index + 1) % photos.length);
  };

  return (
    <div
      className="space-y-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.6)]">
        <div className="aspect-[4/5] overflow-hidden">
          <Image
            key={activePhoto.src}
            src={activePhoto.src}
            alt={activePhoto.alt[locale]}
            width={1200}
            height={1500}
            priority
            className="h-full w-full object-cover transition-transform duration-700 ease-out"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(21,21,21,0.46),transparent)]" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[var(--surface)]">
          <p className="max-w-[28ch] text-sm leading-6">
            {activePhoto.alt[locale]}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previous}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Previous photo"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Next photo"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {photos.map((photo, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-10 bg-[var(--accent)]"
                  : "w-6 bg-[rgba(25,25,25,0.14)] hover:bg-[rgba(25,25,25,0.28)]"
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
