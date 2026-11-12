"use client";
// Source: Aceternity UI "Focus Cards" (free component), adapted: role, bio and link on each card,
// design-system sizes/radii, details always visible below md (touch screens), keyboard-focusable.
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Person = { title: string; role: string; bio: string; src: string; href?: string };

const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Person;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-forest overflow-hidden h-[26rem] md:h-[30rem] w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img src={card.src} alt={card.title} className="absolute inset-0 h-full w-full object-cover object-top" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-transparent flex items-end p-6 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-100 md:opacity-0"
        )}
      >
        <div className="w-full">
          <div className="text-h4 text-white">{card.title}</div>
          <div className="mt-1 text-caption font-semibold uppercase tracking-caps text-mint-300">{card.role}</div>
          <p className="mt-3 text-body-sm text-white/85">{card.bio}</p>
          {card.href && (
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center min-h-[44px] rounded-md bg-mint px-4 text-body-sm font-semibold text-forest hover:bg-mint-300"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  )
);
Card.displayName = "Card";

export function FocusCards({ cards }: { cards: Person[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-page mx-auto w-full">
      {cards.map((card, index) => (
        <Card key={card.title} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}
