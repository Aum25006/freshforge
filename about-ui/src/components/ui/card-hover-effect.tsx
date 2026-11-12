// Source: Aceternity UI "Card Hover Effect" (free component), adapted: brand colors, numbered cards,
// design-system sizes/radii, keyboard focus shows the same highlight as hover.
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: { title: string; description: string; link: string }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, idx) => (
        <a
          href={item.link}
          key={item.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onFocus={() => setHoveredIndex(idx)}
          onBlur={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-mint-300 block rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <span className="text-caption font-bold tracking-caps text-ember">0{idx + 1}</span>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "rounded-lg h-full w-full p-4 overflow-hidden bg-forest border border-transparent relative z-20",
      className
    )}
  >
    <div className="relative z-50">
      <div className="p-4 flex flex-col">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h4 className={cn("text-h4 text-mint mt-4", className)}>{children}</h4>
);

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={cn("mt-4 text-body text-white/80", className)}>{children}</p>
);
