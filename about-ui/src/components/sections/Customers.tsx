"use client";
// "Customers Say" like the reference: a big quote on the left with arrows and a row of round thumbnails,
// and a plate on a curved shape on the right. Real quotes from the home page (no invented ratings).
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IMG, Title } from "@/components/common";
import quotes from "@/testimonials.json";

const photos = ["6.png", "8.png", "5.png", "1.png", "2.png", "3.png"];
const items = quotes.slice(0, photos.length).map((q, k) => ({ quote: q.quote, name: q.name, src: IMG + photos[k] }));

export function Customers() {
  const reduce = useReducedMotion();
  const [a, setA] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setA((v) => (v + 1) % n), 6500);
    return () => window.clearInterval(t);
  }, [reduce, paused, n]);

  const arrow =
    "flex h-[44px] w-[44px] items-center justify-center !rounded-full !p-0 border border-forest !bg-transparent !text-[color:#002c1f] hover:!bg-mint";
  const cur = items[a];

  return (
    <section className="bg-mint-50">
      <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <Title lead="Customers" accent="Say" />

        <div
          className="mt-12 grid items-center gap-12 md:grid-cols-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={a}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4">
                  <span className="block h-[56px] w-[56px] shrink-0 overflow-hidden rounded-full bg-mint ring-2 ring-mint-300">
                    <img src={cur.src} alt="" className="h-full w-full scale-[1.5] object-cover" />
                  </span>
                  <h3 className="text-h4 text-forest">{cur.name}</h3>
                </div>
                <p className="mt-6 max-w-xl text-body-lg text-ink-soft">&ldquo;{cur.quote}&rdquo;</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" aria-label="Previous testimonial" className={arrow} onClick={() => setA((v) => (v - 1 + n) % n)}>
                <IconArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <ul className="flex items-center gap-3">
                {items.map((it, k) => (
                  <li key={k}>
                    <button
                      type="button"
                      aria-label={`Show testimonial ${k + 1}`}
                      aria-current={k === a ? "true" : undefined}
                      onClick={() => setA(k)}
                      className={`block h-[44px] w-[44px] overflow-hidden !rounded-full !p-0 !bg-mint transition-all ${
                        k === a ? "ring-4 ring-ember" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={it.src} alt="" className="pointer-events-none h-full w-full scale-[1.5] object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" aria-label="Next testimonial" className={arrow} onClick={() => setA((v) => (v + 1) % n)}>
                <IconArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* plate on a curved shape (like the reference) */}
          <div className="relative mx-auto w-full max-w-md">
            <svg aria-hidden="true" className="absolute right-0 -top-6 h-[70%] w-[70%] text-mint md:-right-6" viewBox="0 0 100 100">
              <path fill="currentColor" d="M0 0H100V100H40C16 100 0 84 0 60Z" transform="scale(-1,1) translate(-100,0)" />
            </svg>
            <div className="relative aspect-square overflow-hidden rounded-full bg-forest ring-8 ring-white shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={a}
                  src={cur.src}
                  alt=""
                  initial={reduce ? false : { opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
