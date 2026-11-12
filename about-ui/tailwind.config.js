/** Scoped so it cannot restyle the rest of the website:
 *  - every utility is prefixed with the #about-root selector (important strategy)
 *  - preflight (Tailwind's global CSS reset) is OFF
 *  - dark mode is class-based and never switched on, so `dark:` classes never apply
 *
 *  Sizes, spacing, radii and shadows follow /DESIGN_SYSTEM.md. Spacing and radius are REPLACED (not extended)
 *  so only design-system values exist: an off-scale class simply produces nothing. */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  important: "#about-root",
  darkMode: "class",
  corePlugins: { preflight: false },
  theme: {
    // 4/8px scale: 4 8 12 16 24 32 48 64 96 128
    spacing: {
      0: "0px",
      px: "1px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      6: "24px",
      8: "32px",
      12: "48px",
      16: "64px",
      24: "96px",
      32: "128px",
    },
    borderRadius: { none: "0", sm: "8px", DEFAULT: "8px", md: "12px", lg: "20px", full: "9999px" },
    boxShadow: {
      none: "none",
      xs: "0 1px 2px rgba(0,44,31,.06)",
      sm: "0 2px 8px rgba(0,44,31,.08)",
      md: "0 8px 24px rgba(0,44,31,.10)",
      lg: "0 16px 40px rgba(0,44,31,.12)",
    },
    extend: {
      colors: {
        forest: { DEFAULT: "#002c1f", 800: "#0a3d2c", 700: "#17543d" },
        mint: { DEFAULT: "#d5edc4", 300: "#b6dca0", 100: "#e6f4da", 50: "#f3faec" },
        ember: { DEFAULT: "#ff6b3d", 600: "#e5532a", 700: "#c43e17" },
        ink: { DEFAULT: "#002c1f", soft: "#3d5a4f", muted: "#5b7268" },
        line: "#d9e5d0",
      },
      fontFamily: {
        sans: ["'League Spartan'", "system-ui", "-apple-system", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      // Type scale from DESIGN_SYSTEM.md
      fontSize: {
        h1: ["clamp(2.5rem, 1.9rem + 3vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["clamp(2rem, 1.6rem + 2vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["clamp(1.5rem, 1.3rem + 1vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4: ["clamp(1.25rem, 1.15rem + 0.5vw, 1.625rem)", { lineHeight: "1.25", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.3", letterSpacing: "0.005em", fontWeight: "600" }],
        "body-lg": ["1.25rem", { lineHeight: "1.55" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.5", letterSpacing: "0.005em" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      letterSpacing: { caps: "0.08em" },
      maxWidth: { page: "1200px" },
    },
  },
  plugins: [],
};
