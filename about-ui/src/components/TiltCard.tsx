"use client";
// A card that tilts in 3D toward the mouse (disabled for reduced-motion users; flat on touch screens).
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import React from "react";

export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 });

  return (
    <motion.div
      className={className}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
