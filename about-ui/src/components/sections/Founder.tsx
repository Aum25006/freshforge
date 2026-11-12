"use client";
// Founder card in the reference style: a framed portrait on a coloured circle on the left,
// name, role and an italic quote on the right.
import { motion, useReducedMotion } from "motion/react";
import { IMG, Title } from "@/components/common";

export function Founder() {
  const reduce = useReducedMotion();
  return (
    <section id="founder" className="scroll-mt-24 bg-mint-50">
      <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <Title lead="Meet the" accent="founder" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 grid items-center gap-12 rounded-lg bg-white p-6 shadow-md md:grid-cols-[20rem_1fr] md:p-12"
        >
          {/* portrait: ember circle behind, forest frame offset, photo on top */}
          <div className="relative mx-auto w-full max-w-[20rem] pb-4 pl-4">
            <span aria-hidden="true" className="absolute -left-2 -top-6 block h-[14rem] w-[14rem] rounded-full bg-ember" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 block h-[90%] w-[90%] bg-forest" />
            <img
              src={IMG + "ayush.png"}
              alt="Aayush Rana, founder of Fresh Forge"
              className="relative ml-4 aspect-[4/5] w-[calc(100%-1rem)] object-cover object-top"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-h3 text-forest">Aayush Rana</h3>
            <p className="mt-1 text-caption font-semibold uppercase tracking-caps text-ink-muted">Founder &amp; CEO</p>
            <blockquote className="mt-6 max-w-xl text-body-lg italic text-ink-soft">
              &ldquo;I did not start Fresh Forge to sell salads. I started it because I wanted to change how
              Gandhinagar eats: one bowl, one day, one person at a time.&rdquo;
            </blockquote>
            <p className="mt-4 max-w-xl text-body text-ink-soft">
              With a passion for nutrition and an obsession for quality, Aayush took the idea of a daily healthy bowl
              subscription and brought it to life.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
