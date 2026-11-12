"use client";
// Source: Aceternity UI "Timeline" (free component), heavily adapted for Fresh Forge:
// brand colors, design-system sizes, steps that reveal on scroll, an active step that grows and glows,
// a pulsing marker, "Step 1 / 3" labels, and a clickable step navigator (desktop).
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  title,
  description,
}: {
  data: TimelineEntry[];
  title: string;
  description: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  // Height of the line follows the real content height (images load late, window resizes).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Which step is in the middle of the screen right now.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = stepRefs.current.indexOf(e.target as HTMLDivElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [data.length]);

  const goTo = (i: number) =>
    stepRefs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div className="max-w-page mx-auto pt-24 pb-6 px-4 md:px-6 lg:px-8">
        <h2 className="text-h2 text-forest max-w-3xl">{title}</h2>
        <p className="text-body-lg text-ink-soft max-w-xl mt-4">{description}</p>
      </div>

      <div ref={ref} className="relative max-w-page mx-auto pb-24 px-0 md:px-6 lg:px-8">
        {data.map((item, index) => {
          const isActive = active === index;
          return (
            <div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="flex justify-start pt-12 md:pt-32 md:gap-8 lg:pr-32"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-[40px] w-[40px] absolute left-3 md:left-3 rounded-full bg-white flex items-center justify-center">
                  <motion.div
                    animate={reduce ? undefined : isActive ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                    transition={isActive ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                    className={`h-4 w-4 rounded-full border ${
                      isActive ? "bg-ember border-ember-700" : "bg-mint-300 border-line"
                    }`}
                  />
                </div>
                <div className="hidden md:block md:pl-24">
                  <p className="text-caption font-bold uppercase tracking-caps text-ember-700">
                    Step {index + 1} / {data.length}
                  </p>
                  <motion.h3
                    animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.45 }}
                    transition={{ duration: 0.35 }}
                    className="text-h2 text-forest-700 origin-left mt-2"
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative pl-24 pr-4 md:pl-4 w-full"
              >
                <p className="md:hidden text-caption font-bold uppercase tracking-caps text-ember-700">
                  Step {index + 1} / {data.length}
                </p>
                <h3 className="md:hidden block text-h3 mb-4 mt-1 text-left text-forest-700">{item.title}</h3>
                {item.content}
              </motion.div>
            </div>
          );
        })}

        {/* Clickable step navigator (desktop) */}
        <div className="hidden lg:block absolute right-8 top-0 h-full">
          <div className="sticky" style={{ top: "40vh" }}>
            <ul className="flex flex-col gap-4">
              {data.map((item, i) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to step ${i + 1}: ${item.title}`}
                    aria-current={active === i ? "step" : undefined}
                    className="group flex items-center gap-3 text-left"
                  >
                    <span
                      className={`block h-[4px] rounded-full transition-all duration-300 ${
                        active === i ? "w-12 bg-ember" : "w-6 bg-line group-hover:w-8 group-hover:bg-mint-300"
                      }`}
                    />
                    <span
                      className={`text-caption font-bold uppercase tracking-caps transition-colors ${
                        active === i ? "text-forest" : "text-ink-muted group-hover:text-forest"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-line to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-ember via-forest-700 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
