"use client";
// Source: Aceternity UI "Animated Testimonials" (free component), adapted: brand colors, larger buttons,
// accessible labels, images fit inside the card (the photos are bowl PNGs with transparent padding).
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = { quote: string; name: string; designation: string; src: string };

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-5xl md:px-8">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="relative h-[20rem] w-full md:h-[24rem]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -60, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom overflow-hidden rounded-lg bg-mint shadow-md"
                >
                  <img
                    src={testimonial.src}
                    alt=""
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full object-cover scale-[1.3]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-h4 text-forest">{testimonials[active].name}</h3>
            <p className="text-caption font-semibold uppercase tracking-caps text-ink-muted">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-6 text-body-lg text-ink-soft">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex items-center gap-4 pt-8 md:pt-8">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-[44px] w-[44px] items-center justify-center !rounded-full !p-0 bg-mint hover:bg-mint-300"
            >
              <IconArrowLeft className="h-5 w-5 text-forest transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-[44px] w-[44px] items-center justify-center !rounded-full !p-0 bg-mint hover:bg-mint-300"
            >
              <IconArrowRight className="h-5 w-5 text-forest transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
            <span className="text-body-sm font-semibold text-ink-muted">
              {active + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
