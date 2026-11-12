import React from "react";

// Paths are relative to the page (/freshforge/about/ or /freshforge/about-preview/), so ../ is /freshforge/.
export const IMG = "../img/";
export const HERO_BOWL = IMG + "ChatGPT%20Image%20Jun%2029,%202026,%2012_12_24%20AM.png";

// Buttons (DESIGN_SYSTEM.md): 44px high, 12px radius, 600 weight, 17px text.
export const btn =
  "inline-flex items-center justify-center gap-2 min-h-[44px] rounded-md px-6 text-body font-semibold transition-colors";
export const btnAccent = `${btn} bg-ember text-forest hover:bg-ember-600`;
export const btnPrimary = `${btn} bg-forest text-white hover:bg-forest-800`;
export const btnOutline = `${btn} border border-forest text-forest hover:bg-mint-100`;

/** Section title in the reference style: a dark lead and a coloured last word, centred. */
export const Title = ({
  lead,
  accent,
  align = "center",
  dark = false,
}: {
  lead: string;
  accent: string;
  align?: "center" | "left";
  dark?: boolean;
}) => (
  <h2 className={`text-h2 ${align === "center" ? "text-center" : ""} ${dark ? "text-white" : "text-forest"}`}>
    {lead} <span className={dark ? "text-mint" : "text-ember-700"}>{accent}</span>
  </h2>
);

export const Lead = ({ children, center = true }: { children: React.ReactNode; center?: boolean }) => (
  <p className={`mt-4 max-w-xl text-body-lg text-ink-soft ${center ? "mx-auto text-center" : ""}`}>{children}</p>
);

/** Letter initials as a picture (used when a person has no photo yet). */
export const initialsImage = (letters: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'>` +
      `<rect width='600' height='700' fill='#17543d'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='League Spartan, Arial, sans-serif' font-size='200' font-weight='700' fill='#d5edc4'>${letters}</text></svg>`
  );
