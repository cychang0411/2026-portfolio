"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale, PhotoItem } from "@/data/portfolio-content";

type PhotoCarouselProps = {
  photos: PhotoItem[];
  locale: Locale;
  fillContainer?: boolean;
  framed?: boolean;
  showIndicators?: boolean;
  showControls?: boolean;
};

const CAROUSEL_AUTOPLAY_MS = 7800;
const CAROUSEL_FADE_MS = 2200;
const CAROUSEL_KEN_BURNS_MS = 8200;
const CAROUSEL_REDUCED_MOTION_MS = 120;

export function PhotoCarousel({
  photos,
  locale,
  fillContainer = false,
  framed = true,
  showIndicators = true,
  showControls = true,
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loadedSources, setLoadedSources] = useState<Set<string>>(() => new Set());
  const pendingIndexRef = useRef<number | null>(null);

  useEffect(() => {
    pendingIndexRef.current = pendingIndex;
  }, [pendingIndex]);

  const handleImageLoaded = useCallback((src: string, index?: number) => {
    setLoadedSources((previous) => {
      if (previous.has(src)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(src);
      return next;
    });

    const pending = pendingIndexRef.current;

    if (pending === null) {
      return;
    }

    if (index === pending || photos[pending]?.src === src) {
      setCurrentIndex(pending);
      setPendingIndex(null);
    }
  }, [photos]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (photos.length === 0) {
      return;
    }

    let cancelled = false;
    const indicesToPreload = Array.from(
      new Set([
        currentIndex,
        (currentIndex + 1) % photos.length,
        (currentIndex - 1 + photos.length) % photos.length,
      ]),
    );

    indicesToPreload.forEach((index) => {
      const photo = photos[index];

      if (!photo || loadedSources.has(photo.src)) {
        return;
      }

      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        if (!cancelled) {
          handleImageLoaded(photo.src, index);
        }
      };
      image.src = photo.src;
    });

    return () => {
      cancelled = true;
    };
  }, [currentIndex, handleImageLoaded, loadedSources, photos]);

  const requestSlide = useCallback((index: number) => {
    const nextPhoto = photos[index];

    if (!nextPhoto || index === currentIndex) {
      return;
    }

    if (loadedSources.has(nextPhoto.src)) {
      setCurrentIndex(index);
      setPendingIndex(null);
      return;
    }

    setPendingIndex(index);
  }, [currentIndex, loadedSources, photos]);

  useEffect(() => {
    if (paused || reducedMotion || photos.length <= 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      requestSlide((currentIndex + 1) % photos.length);
    }, CAROUSEL_AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [currentIndex, paused, photos.length, reducedMotion, requestSlide]);

  const goTo = (index: number) => {
    requestSlide(index);
  };

  const previous = () => {
    requestSlide((currentIndex - 1 + photos.length) % photos.length);
  };

  const next = () => {
    requestSlide((currentIndex + 1) % photos.length);
  };

  const getKenBurnsTransform = (index: number, isActive: boolean) => {
    const variants = [
      {
        idle: "translate3d(-0.65%, -0.4%, 0) scale(1.075)",
        active: "translate3d(0.32%, 0.18%, 0) scale(1.045)",
      },
      {
        idle: "translate3d(0.7%, -0.3%, 0) scale(1.08)",
        active: "translate3d(-0.26%, 0.14%, 0) scale(1.046)",
      },
      {
        idle: "translate3d(-0.42%, 0.52%, 0) scale(1.072)",
        active: "translate3d(0.2%, -0.2%, 0) scale(1.043)",
      },
      {
        idle: "translate3d(0.56%, 0.32%, 0) scale(1.078)",
        active: "translate3d(-0.22%, -0.12%, 0) scale(1.044)",
      },
    ] as const;

    const variant = variants[index % variants.length];

    return isActive ? variant.active : variant.idle;
  };

  return (
    <div
      className={fillContainer ? "h-full" : "space-y-5"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={`relative overflow-hidden ${
          fillContainer ? "h-full" : ""
        } ${framed ? "rounded-[2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.6)]" : ""}`}
      >
        <div className={fillContainer ? "h-full overflow-hidden" : "aspect-[4/5] overflow-hidden"}>
          <div className="relative h-full w-full bg-[#f7f0ea]">
            {photos.map((photo, index) => {
              const isActive = index === currentIndex;
              const isPriorityImage = index === 0 && !fillContainer;

              return (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt[locale]}
                  fill
                  sizes={fillContainer ? "(max-width: 1024px) 100vw, 20vw" : "100vw"}
                  priority={isPriorityImage}
                  loading={isPriorityImage ? undefined : isActive ? "eager" : "lazy"}
                  onLoad={() => handleImageLoaded(photo.src, index)}
                  className={`object-cover will-change-transform transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: reducedMotion
                      ? "translate3d(0, 0, 0) scale(1)"
                      : getKenBurnsTransform(index, isActive),
                    transitionDuration: reducedMotion
                      ? `${CAROUSEL_REDUCED_MOTION_MS}ms`
                      : `${CAROUSEL_FADE_MS}ms, ${CAROUSEL_KEN_BURNS_MS}ms`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {showControls ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(21,21,21,0.46),transparent)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-4 p-5 text-[var(--surface)]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previous}
                  className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17120f]"
                  aria-label="Previous photo"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17120f]"
                  aria-label="Next photo"
                >
                  →
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {showIndicators ? (
        <div className="flex flex-wrap items-center gap-2">
          {photos.map((photo, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isActive
                    ? "w-10 bg-[var(--accent)]"
                    : "w-6 bg-[rgba(25,25,25,0.14)] hover:bg-[rgba(25,25,25,0.28)]"
                }`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to photo ${index + 1}`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
