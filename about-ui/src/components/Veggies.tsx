"use client";
// Floating 3D vegetables across the whole hero ("Our story") section.
//  - every vegetable bobs gently on its own rhythm
//  - parallax: they shift by "depth" as the mouse moves (near ones move more)
//  - the cursor gently pushes nearby ones away
//  - grab one and drop it anywhere: it STAYS there (no snap back) and keeps floating from that spot
// Images: real broccoli photo (supplied by the site owner), cut into separate transparent pieces in /freshforge/img/veggies/ (broccoli-*.webp).
// Static (no motion, no dragging) for people who set "reduce motion".
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const DIR = "../img/veggies/";

type Item = {
  name: string;
  x: number; // centre, % of the field width
  y: number; // centre, % of the field height
  s: number; // size in px (desktop)
  depth: number; // 0..1, bigger = moves more with the mouse
  dur: number;
  delay: number;
  rot: number; // resting tilt in degrees
  flip?: boolean; // mirror the picture to get a second pose from the same photo
};

const ITEMS: Item[] = [
  { name: "broccoli-top", x: 5, y: 15, s: 132, depth: 0.9, dur: 5.2, delay: 0, rot: -10 },
  { name: "broccoli-left", x: 48, y: 52, s: 118, depth: 1, dur: 5.8, delay: 0.3, rot: 8 },
  { name: "broccoli-right", x: 77, y: 91, s: 124, depth: 0.7, dur: 6.1, delay: 0.2, rot: -6 },
  { name: "broccoli-bottom", x: 8, y: 89, s: 132, depth: 0.8, dur: 5.5, delay: 1.2, rot: 12 },
  { name: "broccoli-left", x: 30, y: 92, s: 96, depth: 0.45, dur: 6.6, delay: 0.4, rot: 20, flip: true },
  { name: "broccoli-top", x: 62, y: 8, s: 100, depth: 0.55, dur: 6.3, delay: 1.1, rot: 15, flip: true },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
type MV = ReturnType<typeof useMotionValue<number>>;

function Veggie({
  item,
  px,
  py,
  nx,
  ny,
  field,
  fieldEl,
  k,
}: {
  item: Item;
  px: MV;
  py: MV;
  nx: MV;
  ny: MV;
  field: React.MutableRefObject<{ w: number; h: number }>;
  fieldEl: React.RefObject<HTMLDivElement | null>;
  k: number;
}) {
  const reduce = useReducedMotion();
  const s = item.s * k;
  const R = 160; // how close the cursor must be to nudge it
  // Where the user dropped it (persists: there is no snap-back).
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);

  const push = (axis: "x" | "y") => ([x, y, ox, oy]: number[]) => {
    const { w, h } = field.current;
    const cx = (item.x / 100) * w + ox;
    const cy = (item.y / 100) * h + oy;
    const ddx = cx - x;
    const ddy = cy - y;
    const d = Math.hypot(ddx, ddy);
    if (d >= R || d < s * 0.5) return 0; // far away, or the cursor is on it (so it can be grabbed)
    const strength = (1 - d / R) * 30;
    return ((axis === "x" ? ddx : ddy) / d) * strength;
  };
  const pushX = useTransform([px, py, dx, dy], push("x"));
  const pushY = useTransform([px, py, dx, dy], push("y"));
  const tx = useSpring(useTransform([pushX, nx], ([a, b]: number[]) => a + b * item.depth * 26), { stiffness: 120, damping: 14 });
  const ty = useSpring(useTransform([pushY, ny], ([a, b]: number[]) => a + b * item.depth * 20), { stiffness: 120, damping: 14 });
  const tr = useSpring(useTransform(nx, (v: number) => v * item.depth * 12), { stiffness: 90, damping: 14 });

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: s,
        height: s,
        marginLeft: -s / 2,
        marginTop: -s / 2,
        x: tx,
        y: ty,
        rotate: tr,
      }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -10 * item.depth - 4, 0], rotate: [item.rot, item.rot + 7, item.rot - 5, item.rot] }}
        transition={{ duration: item.dur, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        initial={{ rotate: item.rot }}
        className="h-full w-full"
      >
        <motion.div
          drag={!reduce}
          dragConstraints={fieldEl}
          dragElastic={0.12}
          dragMomentum
          dragTransition={{ power: 0.25, timeConstant: 260 }}
          whileHover={reduce ? undefined : { scale: 1.12 }}
          whileDrag={{ scale: 1.22 }}
          className="h-full w-full pointer-events-auto"
          style={{
            x: dx,
            y: dy,
            cursor: reduce ? "default" : "grab",
            filter: "drop-shadow(0 12px 14px rgba(0,44,31,0.22))",
            touchAction: "none",
          }}
        >
          <img
            src={`${DIR}${item.name}.webp`}
            alt=""
            width={480}
            height={480}
            draggable={false}
            className={`h-full w-full select-none object-contain pointer-events-none ${item.flip ? "-scale-x-100" : ""}`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function VeggieField() {
  const ref = useRef<HTMLDivElement>(null);
  const field = useRef({ w: 1, h: 1 });
  const [k, setK] = useState(1);
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      field.current = { w: r.width, h: r.height };
      setK(r.width < 640 ? 0.7 : 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      px.set(x);
      py.set(y);
      nx.set(clamp(((x - r.width / 2) / r.width) * 2, -1.5, 1.5));
      ny.set(clamp(((y - r.height / 2) / r.height) * 2, -1.5, 1.5));
    };
    const leave = () => {
      px.set(-9999);
      py.set(-9999);
      nx.set(0);
      ny.set(0);
    };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [px, py, nx, ny]);

  return (
    <div ref={ref} className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
      {ITEMS.map((item) => (
        <Veggie key={item.name} item={item} px={px} py={py} nx={nx} ny={ny} field={field} fieldEl={ref} k={k} />
      ))}
    </div>
  );
}
