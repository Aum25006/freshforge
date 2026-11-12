"use client";
// "Our Bowls" like the reference's "Most Popular Food": three cards, the middle one lifted, with dots below.
// Arrow buttons and dots move through the bowls; it also advances by itself (paused on hover, off for reduced motion).
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { BOWLS, IMG, Title, Lead, btnOutline } from "@/components/common";

export function PopularBowls() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = BOWLS.length;
  const at = (k: number) => BOWLS[((k % n) + n) % n];

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => window.clearInterval(t);
  }, [reduce, paused, n]);

  const arrow =
    "flex h-[44px] w-[44px] items-center justify-center !rounded-full !p-0 border border-forest !bg-transparent !text-[color:#002c1f] hover:!bg-mint";

  return (
    <section className="bg-mint-50">
      <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <Title lead="Our" accent="Bowls" />
        <Lead>Fresh, balanced and made every day. Tap a dot or use the arrows to browse.</Lead>

        <div
          className="mt-12 grid items-center gap-6 md:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[-1, 0, 1].map((off) => {
            const b = at(i + off);
            const center = off === 0;
            return (
              <AnimatePresence mode="wait" key={off}>
                <motion.article
                  key={b.name}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: center ? -8 : 0, scale: center ? 1.04 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`overflow-hidden rounded-lg bg-white ${center ? "shadow-md" : "shadow-sm"} ${center ? "" : "hidden md:block"}`}
                >
                  <div className="relative h-[16rem] overflow-hidden bg-mint-100">
                    <img src={IMG + b.img} alt={b.name} className="h-full w-full scale-[1.2] object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-h5 text-forest">{b.name}</h3>
                      <a href="../menu/index.html" className={`${btnOutline} !min-h-[44px] !px-4 !text-body-sm`}>
                        View
                      </a>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      <li className="rounded-full bg-mint-100 px-3 py-1 text-caption font-semibold text-forest-700">{b.kcal} kcal</li>
                      <li className="rounded-full bg-mint-100 px-3 py-1 text-caption font-semibold text-forest-700">{b.protein}g protein</li>
                    </ul>
                    <p className="mt-4 text-body-sm text-ink-soft">{b.desc}</p>
                  </div>
                </motion.article>
              </AnimatePresence>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous bowl" className={arrow} onClick={() => setI((v) => v - 1 + n)}>
            <IconArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <ul className="flex items-center gap-3">
            {BOWLS.map((b, k) => (
              <li key={b.name}>
                <button
                  type="button"
                  aria-label={`Show ${b.name}`}
                  aria-current={k === i % n ? "true" : undefined}
                  onClick={() => setI(k)}
                  className={`block !rounded-full !p-0 transition-all ${
                    k === i % n ? "h-[12px] w-[24px] !bg-ember" : "h-[12px] w-[12px] !bg-mint-300 hover:!bg-forest-700"
                  }`}
                />
              </li>
            ))}
          </ul>
          <button type="button" aria-label="Next bowl" className={arrow} onClick={() => setI((v) => v + 1)}>
            <IconArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
