"use client";
// "How Fresh Forge began" as pinned, full-screen chapters (scrollytelling).
// The section locks to the screen; scrolling changes the chapter. Each chapter fades/slides in,
// the background and text colors blend from one chapter to the next, a giant outlined numeral drifts
// behind, the picture reveals from a small frame, and a progress rail at the bottom is clickable.
// With "reduce motion" it falls back to plain stacked chapters (no pinning).
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const IMG = "../img/";

type Chapter = {
  label: string;
  title: string;
  body: React.ReactNode;
  image: string;
  alt: string;
  frame: string; // frame background behind the photo (tailwind class)
  fit: "photo" | "bowl";
};

const U = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold underline decoration-ember decoration-[3px] underline-offset-4">{children}</span>
);

const CHAPTERS: Chapter[] = [
  {
    label: "The frustration",
    title: "A healthy meal was almost impossible to find.",
    body: (
      <p>
        Finding a <U>healthy, tasty meal</U> in Gandhinagar felt almost impossible.
      </p>
    ),
    image: IMG + "6.png",
    alt: "A fresh bowl of vegetables and paneer",
    frame: "bg-mint",
    fit: "bowl",
  },
  {
    label: "The idea",
    title: "So Aayush filled the gap.",
    body: (
      <p>
        People wanted to eat better. There was just <U>no convenient, affordable way</U> to do it. Aayush saw that
        gap, and took the idea of a <U>daily healthy bowl subscription</U> and brought it to life.
      </p>
    ),
    image: IMG + "5.png",
    alt: "A Fresh Forge bowl with quinoa, paneer and cucumber",
    frame: "bg-forest",
    fit: "bowl",
  },
  {
    label: "Fresh Forge today",
    title: "A bowl, every single day.",
    body: (
      <>
        <p>
          Gandhinagar&rsquo;s <U>first curated healthy bowl subscription service</U>: fresh, balanced bowls made
          every single day and delivered to your door.
        </p>
        <p className="mt-6 border-l-4 border-ember pl-4 text-body-sm opacity-90 max-md:hidden [@media(max-height:800px)]:hidden">
          &ldquo;I did not start Fresh Forge to sell salads. I started it because I wanted to change how
          Gandhinagar eats: one bowl, one day, one person at a time.&rdquo;
          <span className="mt-2 block text-caption font-semibold uppercase tracking-caps">
            Aayush Rana, Founder &amp; CEO
          </span>
        </p>
      </>
    ),
    image: IMG + "ayush.png",
    alt: "Aayush Rana, founder of Fresh Forge",
    frame: "bg-forest",
    fit: "photo",
  },
];

const BG = ["#002c1f", "#d5edc4", "#17543d"]; // forest, mint, forest-700
const FG = ["#d5edc4", "#002c1f", "#ffffff"];
const KICK = ["#b6dca0", "#c43e17", "#b6dca0"];
const N = CHAPTERS.length;

// stops that hold each chapter's value, then blend quickly around each boundary
const stops = () => {
  const s: number[] = [0];
  for (let i = 1; i < N; i++) s.push(i / N - 0.03, i / N + 0.03);
  s.push(1);
  return s;
};
const blend = (vals: string[]) => {
  const out: string[] = [vals[0]];
  for (let i = 1; i < N; i++) out.push(vals[i - 1], vals[i]);
  out.push(vals[N - 1]);
  return out;
};

function ChapterView({
  c,
  i,
  progress,
  headerH,
}: {
  c: Chapter;
  i: number;
  progress: MotionValue<number>;
  headerH: number;
}) {
  const a = i / N;
  const b = (i + 1) / N;
  const first = i === 0;
  const last = i === N - 1;
  // One chapter fades out completely before the next fades in; the background colour blends in the gap.
  const inA = a + 0.012;
  const inB = a + 0.065;
  const outA = b - 0.065;
  const outB = b - 0.012;
  const opacityStops = first ? [0, 0.001, outA, outB] : last ? [inA, inB, 0.999, 1] : [inA, inB, outA, outB];
  const opacity = useTransform(progress, opacityStops, first ? [1, 1, 1, 0] : last ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, opacityStops, first ? [0, 0, 0, -70] : last ? [70, 0, 0, 0] : [70, 0, 0, -70]);
  const local = useTransform(progress, [a, b], [0, 1], { clamp: true });
  const numY = useTransform(local, [0, 1], [60, -60]);
  const imgScale = useTransform(local, [0, 0.5, 1], [1.12, 1.04, 1]);
  const imgY = useTransform(local, [0, 1], [24, -24]);
  const clip = useTransform(
    progress,
    first ? [0, 0.08] : [a + 0.012, a + 0.14],
    first ? [0.02, 0] : [0.18, 0]
  );
  const clipPath = useTransform(clip, (v: number) => `inset(${v * 100}% ${v * 100}% ${v * 100}% ${v * 100}% round 20px)`);

  return (
    <motion.div
      style={{ opacity, y, paddingTop: headerH, paddingBottom: 96 }}
      className="absolute inset-0 flex items-center"
      aria-hidden={undefined}
    >
      {/* giant outlined numeral drifting behind */}
      <motion.div
        aria-hidden="true"
        style={{ y: numY, WebkitTextStroke: "2px currentColor", color: "transparent", opacity: 0.22 }}
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none text-[clamp(9rem,26vw,22rem)] font-bold leading-none md:left-8"
      >
        0{i + 1}
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-page items-center gap-6 px-4 md:grid-cols-2 md:gap-12 md:px-6 lg:px-8">
        <div className="relative z-10">
          <p className="text-caption font-bold uppercase tracking-caps" style={{ color: KICK[i] }}>
            Chapter 0{i + 1} / 0{N} &middot; {c.label}
          </p>
          <h3 className="mt-2 text-h2 md:mt-3 md:text-h1 md:[@media(max-height:820px)]:text-h2 text-current">{c.title}</h3>
          <div className="mt-4 max-w-xl text-body-lg md:mt-6">{c.body}</div>
        </div>

        <motion.div
          style={{ clipPath }}
          className={`relative h-[26vh] overflow-hidden rounded-lg shadow-lg md:h-[min(62vh,34rem)] ${c.frame}`}
        >
          <motion.img
            src={c.image}
            alt={c.alt}
            style={{ scale: imgScale, y: imgY }}
            className={`h-full w-full ${c.fit === "photo" ? "object-cover object-top" : "object-cover scale-125"}`}
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function PinnedStory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [headerH, setHeaderH] = useState(100);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      const h = document.getElementById("header-outer");
      const t = h ? Math.round(h.getBoundingClientRect().bottom) : 100;
      setHeaderH(t > 40 && t < 220 ? t : 100);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Driven through a spring: JS-computed (the browser's native scroll timeline would use a different range)
  // and it makes the chapter changes glide.
  const scrollYProgress = useSpring(rawProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  useMotionValueEvent(rawProgress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N)))));

  const bg = useTransform(scrollYProgress, stops(), blend(BG));
  const fg = useTransform(scrollYProgress, stops(), blend(FG));
  // floating 3D vegetables that drift as you scroll (depth)
  const d1 = useTransform(scrollYProgress, [0, 1], [40, -260]);
  const d2 = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const d3 = useTransform(scrollYProgress, [0, 1], [-20, -340]);
  const r1 = useTransform(scrollYProgress, [0, 1], [-10, 60]);
  const r2 = useTransform(scrollYProgress, [0, 1], [10, -70]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const dist = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i === 0 ? 0 : i / N + 0.08) * dist, behavior: reduce ? "auto" : "smooth" });
  };

  if (reduce) {
    // No pinning/animation: plain stacked chapters.
    return (
      <div className="bg-white text-forest">
        <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <h2 className="text-h2">How Fresh Forge began</h2>
          {CHAPTERS.map((c, i) => (
            <div key={c.label} className="mt-12">
              <p className="text-caption font-bold uppercase tracking-caps text-ember-700">
                Chapter 0{i + 1} / 0{N} &middot; {c.label}
              </p>
              <h3 className="mt-2 text-h3">{c.title}</h3>
              <div className="mt-4 max-w-xl text-body-lg text-ink-soft">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${N * 100}vh` }} className="relative">
      <motion.div
        style={{ backgroundColor: bg, color: fg }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* depth: 3D veggies drifting with the scroll */}
        <motion.img
          src={IMG + "veggies/tomato.png"}
          alt=""
          aria-hidden="true"
          style={{ y: d1, rotate: r1, filter: "drop-shadow(0 12px 12px rgba(0,44,31,.45))" }}
          className="pointer-events-none absolute right-[6%] top-[62%] z-0 hidden h-[84px] w-[84px] md:block md:h-[110px] md:w-[110px]"
        />
        <motion.img
          src={IMG + "veggies/leafy_green.png"}
          alt=""
          aria-hidden="true"
          style={{ y: d2, rotate: r2, filter: "drop-shadow(0 12px 12px rgba(0,44,31,.45))" }}
          className="pointer-events-none absolute left-[3%] top-[78%] z-0 hidden h-[84px] w-[84px] md:block md:h-[100px] md:w-[100px]"
        />
        <motion.img
          src={IMG + "veggies/carrot.png"}
          alt=""
          aria-hidden="true"
          style={{ y: d3, rotate: r1, filter: "drop-shadow(0 12px 12px rgba(0,44,31,.45))" }}
          className="pointer-events-none absolute left-[46%] top-[90%] z-0 hidden h-[84px] w-[84px] md:block"
        />

        <div
          className="absolute left-0 right-0 z-30 flex items-center justify-between px-4 md:px-6 lg:px-8"
          style={{ top: 0, paddingTop: headerH + 8 }}
        >
          <p className="text-h4 font-bold">How Fresh Forge began</p>
          <p className="text-h5 font-bold">
            0{active + 1} / 0{N}
          </p>
        </div>

        {CHAPTERS.map((c, i) => (
          <ChapterView key={c.label} c={c} i={i} progress={scrollYProgress} headerH={headerH + 64} />
        ))}

        {/* clickable progress rail */}
        <ul className="absolute bottom-6 left-0 right-0 z-30 mx-auto flex max-w-page gap-3 px-4 md:gap-6 md:px-6 lg:px-8">
          {CHAPTERS.map((c, i) => (
            <li key={c.label} className="flex-1">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to chapter ${i + 1}: ${c.label}`}
                aria-current={active === i ? "step" : undefined}
                className="group block w-full !rounded-none !border-0 !bg-transparent !p-0 !shadow-none !text-[color:inherit] text-left"
              >
                <span
                  className="hidden text-body-sm font-bold uppercase tracking-caps md:block"
                  style={{ opacity: active === i ? 1 : 0.55 }}
                >
                  0{i + 1} {c.label}
                </span>
                <span className="relative mt-2 block h-[4px] w-full overflow-hidden rounded-full">
                  <span className="absolute inset-0 bg-current opacity-25" />
                  <Fill progress={scrollYProgress} i={i} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function Fill({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const w = useTransform(progress, [i / N, (i + 1) / N], ["0%", "100%"], { clamp: true });
  return <motion.span style={{ width: w, background: "#ff6b3d" }} className="absolute left-0 top-0 block h-full rounded-full" />;
}
