"use client";
// Hero in the reference layout: headline + buttons on the left; on the right a big curved shape with the
// bowl on it and small round dishes. The 3D vegetables float over the whole hero and can be dragged.
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { VeggieField } from "@/components/Veggies";
import { HERO_BOWL, IMG, btnAccent, btnOutline } from "@/components/common";

const Dish = ({ src, className }: { src: string; className: string }) => (
  <div className={`absolute overflow-hidden rounded-full bg-forest ring-4 ring-white shadow-md ${className}`}>
    <img src={IMG + src} alt="" className="h-full w-full scale-[1.45] object-cover" loading="lazy" />
  </div>
);

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
          <p className="mt-6 text-caption text-ink-muted">Tip: grab a vegetable and drop it anywhere. It floats where you leave it.</p>
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
          <Dish src="1.png" className="right-0 top-0 z-10 h-[96px] w-[96px] md:-right-4 md:top-4 md:h-[128px] md:w-[128px]" />
          <Dish src="2.png" className="bottom-12 right-3 z-10 h-[64px] w-[64px] md:-right-8 md:bottom-24 md:h-[96px] md:w-[96px]" />
          <Dish src="3.png" className="bottom-0 left-4 z-10 hidden h-[64px] w-[64px] md:block" />
        </div>
      </div>

      {/* Floating, draggable 3D vegetables over the whole hero */}
      <VeggieField />
    </section>
  );
}
