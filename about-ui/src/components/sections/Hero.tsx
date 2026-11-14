"use client";
// Hero in the reference layout: headline + buttons on the left; on the right a big curved shape with the
// bowl on it and small round dishes.
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HERO_BOWL, btnAccent, btnOutline } from "@/components/common";

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16 });
  const sy = useSpring(my, { stiffness: 60, damping: 16 });
  const px = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const py = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const rot = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  return (
    <section
      className="relative overflow-hidden bg-white"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* the big curved shape (desktop): bleeds off the top and right edges */}
      <svg
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-full w-[58%] text-mint md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M34 0H100V82C84 104 52 98 42 70C36 50 40 18 34 0Z" />
      </svg>

      <div className="relative mx-auto grid max-w-page items-center gap-12 px-4 py-24 md:grid-cols-2 md:px-6 md:py-32 lg:px-8">
        <div>
          <p className="flex items-center gap-3 text-caption font-bold uppercase tracking-caps text-ember-700">
            <span className="block h-[2px] w-6 bg-ember" /> Our story
          </p>
          <h1 className="mt-4 text-h1 text-forest">
            About <span className="text-ember-700">Fresh Forge</span>
          </h1>
          <TextGenerateEffect
            className="mt-6 max-w-xl text-body-lg text-ink-soft"
            words="Where every bowl is crafted with intention, every ingredient chosen with care, and every meal forges a healthier you."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="../subscription/index.html" className={btnAccent}>
              Start a subscription
            </a>
            <a href="../menu/index.html" className={btnOutline}>
              See the menu
            </a>
          </div>
        </div>

        {/* bowl on the shape (mobile gets a rounded mint panel instead of the big shape) */}
        <div className="relative rounded-lg bg-mint px-4 py-8 md:rounded-none md:bg-transparent md:p-0">
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={HERO_BOWL}
              alt="A Fresh Forge bowl"
              className="relative z-10 w-full"
              style={reduce ? undefined : { x: px, y: py, rotate: rot }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
