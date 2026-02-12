"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type Slide = {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  thumbUrl?: string | null;
  ctaText: string;
  ctaHref: string;
};

const AUTO_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;

export default function NewsSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  // autoplay state
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // swipe state
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const hasSlides = slides.length > 0;

  const next = useMemo(
    () => () => {
      if (!hasSlides) return;
      setActive((prev) => (prev + 1) % slides.length);
    },
    [hasSlides, slides.length]
  );

  const prev = useMemo(
    () => () => {
      if (!hasSlides) return;
      setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    },
    [hasSlides, slides.length]
  );

  const resetAutoplay = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!isPaused && slides.length > 1) {
      intervalRef.current = window.setInterval(() => {
        next();
      }, AUTO_MS);
    }
  };

  // keep active index valid when slides length changes
  useEffect(() => {
    if (!slides.length) return;
    if (active > slides.length - 1) setActive(0);
  }, [slides.length, active]);

  // autoplay lifecycle
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, slides.length, next]);

  // timer reset on manual navigation
  const goNextManual = () => {
    next();
    resetAutoplay();
  };
  const goPrevManual = () => {
    prev();
    resetAutoplay();
  };
  const goToManual = (i: number) => {
    setActive(i);
    resetAutoplay();
  };

  // touch handlers (mobile swipe)
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (slides.length <= 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartXRef.current == null) return;
    const currentX = e.touches[0].clientX;
    touchDeltaXRef.current = currentX - touchStartXRef.current;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    const dx = touchDeltaXRef.current;

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;

    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;

    if (dx < 0) goNextManual();
    else goPrevManual();
  };

  if (!slides.length) return null;

  const slide = slides[active];

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* SLIDE */}
      <div className="relative h-[420px]">
        <Image
          key={slide.id}
          src={slide.imageUrl}
          alt={slide.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-3xl px-6 md:px-10 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="mb-6 text-base md:text-lg">{slide.desc}</p>
            <Link
              href={slide.ctaHref}
              className="inline-block bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded font-semibold"
            >
              {slide.ctaText}
            </Link>
          </div>
        </div>

        {/* ARROWS */}
        <button
          onClick={goPrevManual}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={goNextManual}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToManual(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === active ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="flex justify-center gap-4 md:gap-6 mt-4 px-4 flex-wrap">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToManual(i)}
            className={`flex flex-col items-center text-sm transition ${
              i === active ? "text-green-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {s.thumbUrl && <Image src={s.thumbUrl} alt={s.title} width={40} height={40} />}
            <span className="mt-1">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
