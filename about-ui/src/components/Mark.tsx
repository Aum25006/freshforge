"use client";
// A phrase that gets "highlighted" with a mint marker stroke when it scrolls into view.
import { motion, useReducedMotion } from "motion/react";
import React from "react";

export const Mark = ({ children }: { children: React.ReactNode }) => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={{ backgroundSize: reduce ? "100% 42%" : "0% 42%" }}
      whileInView={{ backgroundSize: "100% 42%" }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      style={{
        backgroundImage: "linear-gradient(#b6dca0, #b6dca0)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 90%",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
        padding: "0 4px",
        margin: "0 -4px",
      }}
      className="font-semibold text-forest"
    >
      {children}
    </motion.span>
  );
};
