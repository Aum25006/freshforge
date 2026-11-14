"use client";
// "About Us": a bowl on a round plate with a shape behind it on the left, the text and a button on the right.
import { motion, useReducedMotion } from "motion/react";
import { IMG } from "@/components/common";

export function AboutUs() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-mint-50">
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* shape behind the plate: a square with one big rounded corner */}
          <svg aria-hidden="true" className="absolute -left-6 -top-6 h-[70%] w-[70%] text-mint" viewBox="0 0 100 100">
            <path fill="currentColor" d="M0 0H100V100H40C16 100 0 84 0 60Z" />
          </svg>
          <div className="relative aspect-square overflow-hidden rounded-full bg-forest ring-8 ring-white shadow-md">
            <img src={IMG + "6.png"} alt="A Fresh Forge bowl with cucumbers, beetroot and paneer" className="h-full w-full scale-[1.45] object-cover" loading="lazy" />
          </div>
        </motion.div>

        <div>
          <h2 className="text-h2 text-forest">
            About <span className="text-ember-700">Us</span>
          </h2>
          <p className="mt-6 max-w-xl text-body text-ink-soft">
            Fresh Forge is Gandhinagar&rsquo;s first curated healthy bowl subscription service, built for people who
            refuse to compromise on taste or nutrition.
          </p>
          <p className="mt-4 max-w-xl text-body text-ink-soft">
            We craft fresh, balanced bowls every single day and deliver them straight to your door. We do the hard
            part: sourcing premium ingredients, building nutritionally balanced recipes, and delivering them fresh.
            All you have to do is enjoy.
          </p>
        </div>
      </div>
    </section>
  );
}
