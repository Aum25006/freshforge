# Fresh Forge Design System

Single source of truth for designers and developers. If a page needs something that is not here, **add it here first**, then use it.

- **Status:** v1.0 (spec). Tokens are wired into code in Step 3 (`freshforge/assets/css/tokens.css`).
- **Strategy:** tokens and `ff-*` classes are layered on top of the Salient theme. Pages migrate gradually; Salient is stripped out per page as it is migrated.
- **Locked brand decisions:** `#002c1f` (Forest), `#d5edc4` (Mint), `#ff6b3d` (Ember, the single accent).

---

## 1. Design Tokens

Naming: `--ff-{category}-{name}`. Utility classes mirror them (`.ff-text-muted`, `.ff-bg-surface`).

### 1.1 Colors

#### Brand (Forest and Mint)

| Token | Hex | RGB | HSL | Use |
|---|---|---|---|---|
| `--ff-brand-900` | `#002c1f` | 0 44 31 | 163 100% 9% | **Brand.** Primary buttons, headings, footer, dark sections |
| `--ff-brand-800` | `#0a3d2c` | 10 61 44 | 160 72% 14% | Primary hover |
| `--ff-brand-700` | `#17543d` | 23 84 61 | 159 57% 21% | Primary active / pressed |
| `--ff-brand-300` | `#b6dca0` | 182 220 160 | 100 41% 76% | Mint hover, dividers on dark |
| `--ff-brand-200` | `#d5edc4` | 213 237 196 | 98 52% 85% | **Brand mint.** Highlight sections, chips, secondary buttons |
| `--ff-brand-100` | `#e6f4da` | 230 244 218 | 98 52% 89% | Mint tint, hover on light |
| `--ff-brand-50` | `#f3faec` | 243 250 236 | 98 60% 95% | Subtle section backgrounds |

#### Accent (Ember). One accent only.

| Token | Hex | RGB | HSL | Use |
|---|---|---|---|---|
| `--ff-accent-600` | `#e5532a` | 229 83 42 | 12 77% 52% | Accent hover |
| `--ff-accent-500` | `#ff6b3d` | 255 107 61 | 14 100% 62% | **Accent.** Primary CTA, badges, key highlights |
| `--ff-accent-700` | `#c43e17` | 196 62 23 | 14 79% 43% | Accent active; accent as *text* on light backgrounds |
| `--ff-accent-100` | `#ffe3da` | 255 227 218 | 14 100% 93% | Accent tint backgrounds |

> Contrast: `#ff6b3d` on white is about 2.9:1, so **never use it as text or icon color on light backgrounds**. Use `accent-700` for text, or put `brand-900` text on an accent fill (about 5.6:1).

#### Neutrals

| Token | Hex | Use |
|---|---|---|
| `--ff-bg` | `#ffffff` | Page background |
| `--ff-surface` | `#f3faec` (= `brand-50`) | Alternate section / card tint |
| `--ff-surface-raised` | `#ffffff` | Cards on tinted backgrounds |
| `--ff-surface-inverse` | `#002c1f` (= `brand-900`) | Dark sections, footer |
| `--ff-border` | `#d9e5d0` | Default borders and dividers |
| `--ff-border-strong` | `#aebfa4` | Input borders, emphasized dividers |
| `--ff-text` | `#002c1f` | Primary text (about 15:1 on white) |
| `--ff-text-secondary` | `#3d5a4f` | Secondary text (about 7.5:1) |
| `--ff-text-muted` | `#5b7268` | Captions, placeholders (about 5:1, minimum allowed) |
| `--ff-text-inverse` | `#ffffff` | Text on dark surfaces |
| `--ff-text-inverse-muted` | `#d5edc4` | Secondary text on dark surfaces |

#### Status

| State | Fg / solid | Tint bg | Border | Tokens |
|---|---|---|---|---|
| Success | `#15803d` | `#e8f6ec` | `#a7d9b6` | `--ff-success`, `--ff-success-bg`, `--ff-success-border` |
| Warning | `#9a6700` | `#fff6d6` | `#ffce59` | `--ff-warning`, `--ff-warning-bg`, `--ff-warning-border` |
| Error | `#c62828` | `#fdecec` | `#f2b4b4` | `--ff-error`, `--ff-error-bg`, `--ff-error-border` |
| Info | `#0b5cad` | `#e7f1fb` | `#a9cdee` | `--ff-info`, `--ff-info-bg`, `--ff-info-border` |

Interaction states are always derived from the scale (hover = one step darker, active = two steps darker). Never hand-pick a hover hex.

**Retired colors.** Remove on sight: `#46af4e`, `#a3e635`, `#f0fdf4` (use `brand-50`), `#ffce59` as a fill (only `warning-border`), `#fdd79a`, `#fafae1`, `#039`, `#313131`, `#f4f4f4`, `#eee`, `#ddd`, all `--wp--preset--color--*`, and bare `#fff`/`#000`/`white`/`black`.

### 1.2 Typography

**One family.** Display and body are both **League Spartan** (Google Fonts, weights 400, 500, 600, 700). Open Sans, Apollonia Pro, Caveat/Dancing Script/Brush Script are retired. Only the weights listed above are loaded, with `display=swap`.

```
--ff-font-sans: 'League Spartan', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
--ff-font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

Sizes are fluid via `clamp()` (min at 360px viewport, max at 1280px). **Never use bare `vw` units for type.**

| Style | Token / class | Size (min → max) | Weight | Line-height | Letter-spacing | Notes |
|---|---|---|---|---|---|---|
| H1 | `.ff-h1` | `clamp(2.5rem, 1.9rem + 3vw, 4.5rem)` (40 → 72px) | 700 | 1.05 | -0.02em | One per page |
| H2 | `.ff-h2` | `clamp(2rem, 1.6rem + 2vw, 3.25rem)` (32 → 52px) | 700 | 1.1 | -0.015em | Section titles |
| H3 | `.ff-h3` | `clamp(1.5rem, 1.3rem + 1vw, 2.25rem)` (24 → 36px) | 600 | 1.15 | -0.01em | Sub-sections |
| H4 | `.ff-h4` | `clamp(1.25rem, 1.15rem + 0.5vw, 1.625rem)` (20 → 26px) | 600 | 1.25 | 0 | Card titles |
| H5 | `.ff-h5` | `1.125rem` (18px) | 600 | 1.3 | 0.005em | Minor titles |
| Body-Large | `.ff-body-lg` | `1.25rem` (20px) | 400 | 1.55 | 0 | Hero lead-ins |
| Body-Base | `.ff-body` | `1.0625rem` (17px) | 400 | 1.6 | 0 | Default text |
| Body-Small | `.ff-body-sm` | `0.9375rem` (15px) | 400 | 1.5 | 0.005em | Secondary text |
| Caption | `.ff-caption` | `0.8125rem` (13px) | 500 | 1.4 | 0.02em | Labels, meta. Optional uppercase with `0.08em` |
| Code | `.ff-code` | `0.875rem` (14px) | 400 | 1.5 | 0 | `--ff-font-mono` |

Rules:
- Heading hierarchy is semantic. Never skip a level (`h1` then `h2` then `h3`), and the visual style must match the tag unless a `.ff-hN` class is explicitly applied to a different tag.
- Heading case: **Sentence case** everywhere ("Our menu", not "OUR MENU" or "welcome").
- Measure: body copy `max-width: 65ch`.
- Headings color `--ff-text`; on dark surfaces `--ff-text-inverse`.

### 1.3 Spacing and Layout Grid

**Base unit 4px, working grid 8px.** Only these values exist.

| Token | px | rem | Typical use |
|---|---|---|---|
| `--ff-space-1` | 4 | 0.25 | Icon-to-text gap |
| `--ff-space-2` | 8 | 0.5 | Tight gaps (label to input) |
| `--ff-space-3` | 12 | 0.75 | Button padding-y, chip padding |
| `--ff-space-4` | 16 | 1 | **Default gap between elements**, page gutter (mobile) |
| `--ff-space-5` | 24 | 1.5 | Card padding, gap between related blocks |
| `--ff-space-6` | 32 | 2 | Gap between groups, page gutter (desktop) |
| `--ff-space-7` | 48 | 3 | Heading-to-content in a section |
| `--ff-space-8` | 64 | 4 | Large block separation |
| `--ff-space-9` | 96 | 6 | Section padding (desktop standard) |
| `--ff-space-10` | 128 | 8 | Hero / feature section padding (desktop) |

**Containers** (`.ff-container`, centered, `padding-inline: var(--ff-gutter)`):

| Name | Max width | Use |
|---|---|---|
| `sm` | 640px | Forms, legal text, narrow copy |
| `md` | 768px | Article / centered text sections |
| `lg` | 1024px | Default content |
| `xl` | 1200px | **Standard page width** |
| `2xl` | 1400px | Full-bleed grids, hero |

**Gutter:** `--ff-gutter: 16px` (<768px), `24px` (768-1199px), `32px` (≥1200px).

**Section vertical padding** (`.ff-section`, applied as `padding-block`):

| Class | Mobile | ≥768px | Use |
|---|---|---|---|
| `.ff-section--sm` | 48px (`space-7`) | 64px (`space-8`) | Dense bands: stats, logos, banners |
| `.ff-section` (default) | 64px (`space-8`) | 96px (`space-9`) | Most sections |
| `.ff-section--lg` | 96px (`space-9`) | 128px (`space-10`) | Hero, key feature |

Sections **never** use `vh`/`vw`-based padding.

**Breakpoints** (min-width, mobile first). Only three: `--ff-bp-md: 768px`, `--ff-bp-lg: 1024px`, `--ff-bp-xl: 1280px`. The old 690/767/999/1000/1921 values are retired.

**Grid:** 4 columns <768px, 8 at ≥768px, 12 at ≥1024px, `gap: var(--ff-space-5)` (24px) mobile and `--ff-space-6` (32px) desktop.

### 1.4 Elevation, Borders and Radius

**Borders:** `--ff-border-width: 1px` (default), `2px` (focus ring, selected state). Color `--ff-border`.

**Radius**

| Token | Value | Use |
|---|---|---|
| `--ff-radius-sm` | 8px | Inputs, chips, small elements |
| `--ff-radius-md` | 12px | Buttons, small cards |
| `--ff-radius-lg` | 20px | Cards, panels, media |
| `--ff-radius-full` | 9999px | Pills, avatars, icon buttons |

The 5/10/24/25/30/50/100/150/200px and `50%` one-offs are retired (use `radius-full` for circles).

**Shadows.** Low-opacity, tinted with brand green, never pure black, never colored glows.

| Token | Value | Use |
|---|---|---|
| `--ff-shadow-xs` | `0 1px 2px rgba(0,44,31,.06)` | Resting inputs, buttons |
| `--ff-shadow-sm` | `0 2px 8px rgba(0,44,31,.08)` | Resting cards |
| `--ff-shadow-md` | `0 8px 24px rgba(0,44,31,.10)` | Card hover, dropdowns |
| `--ff-shadow-lg` | `0 16px 40px rgba(0,44,31,.12)` | Modals, drawers (max) |

Retired: `0 15px 28px #000`, `0 18px 50px #ff6b3d`, `inset 0 0 0 5px #46af4e`.

**Motion:** `--ff-ease: cubic-bezier(.2,.6,.2,1)`; durations `--ff-dur-fast: 120ms`, `--ff-dur: 200ms`. Only animate `color, background-color, border-color, box-shadow, transform, opacity`. Respect `prefers-reduced-motion`.

**Focus ring (global):** `outline: 2px solid var(--ff-brand-900); outline-offset: 2px;` (use `--ff-brand-200` on dark surfaces). Never `outline: none` without a replacement.

---

## 2. Core Component Specs

### 2.1 Buttons

Base `.ff-btn`: League Spartan 600, `line-height: 1`, `border-radius: var(--ff-radius-md)`, `border: 1px solid transparent`, `gap: var(--ff-space-2)`, inline-flex centered, `transition` on color/bg/border/shadow/transform at `--ff-dur`. Minimum tap target 44×44px.

| Size | Class | Height | Padding-x | Font size |
|---|---|---|---|---|
| sm | `.ff-btn--sm` | 36px | 16px | 15px |
| md (default) | `.ff-btn` | 44px | 24px | 17px |
| lg | `.ff-btn--lg` | 56px | 32px | 20px |

| Variant | Rest | Hover | Active | Notes |
|---|---|---|---|---|
| **Primary** `.ff-btn--primary` | bg `brand-900`, text white | bg `brand-800` | bg `brand-700`, `translateY(1px)` | Default CTA |
| **Accent** `.ff-btn--accent` | bg `accent-500`, text `brand-900` | bg `accent-600` | bg `accent-700`, text white | One per view, the "order/subscribe" action |
| **Secondary** `.ff-btn--secondary` | bg `brand-200`, text `brand-900` | bg `brand-300` | bg `brand-300`, `translateY(1px)` | |
| **Outline** `.ff-btn--outline` | transparent, 1px `brand-900` border, text `brand-900` | bg `brand-50` | bg `brand-100` | |
| **Ghost** `.ff-btn--ghost` | transparent, text `brand-900` | bg `brand-50` | bg `brand-100` | Inline / tertiary |
| **Danger** `.ff-btn--danger` | bg `error`, text white | bg `#a82020` | bg `#8c1a1a` | Destructive only (e.g. remove from cart) |

- **Focus-visible:** global focus ring (§1.4); never on `:focus` mouse clicks.
- **Disabled:** `opacity: .45; cursor: not-allowed; box-shadow: none; pointer-events: none` (use the `disabled` attribute or `aria-disabled="true"`).
- **Loading:** `aria-busy="true"`, label stays, spinner replaces the leading icon.
- **Icon-only:** `.ff-btn--icon`, square (36/44/56px), `radius-full`, requires `aria-label`.
- Replaces: `nectar-button`, `icon-btn`, `btn-sub-action`, `whatsapp-btn`, `remove-btn`, `search-box__button`, `cart-qty-btn` styling. (Behavior hooks/JS class names may stay; only the visual styling moves.)

### 2.2 Cards and Containers

`.ff-card`: bg `--ff-surface-raised`, `1px solid --ff-border`, `radius-lg`, padding `--ff-space-5` (24px; `--ff-space-6` for large cards), `box-shadow: --ff-shadow-sm`.
- Interactive cards (`a.ff-card`, `.ff-card--interactive`): on hover `box-shadow: --ff-shadow-md`, `transform: translateY(-2px)`, border `--ff-border-strong`; focus-visible uses the focus ring.
- Variants: `.ff-card--tinted` (bg `brand-50`, no shadow), `.ff-card--inverse` (bg `brand-900`, text inverse).
- Inner rhythm: media, then `space-4`, then title (`.ff-h4`), then `space-2`, then body (`.ff-body-sm`), then `space-5`, then action.
- Media inside cards uses `radius-lg` clipped by the card (`overflow: hidden`) and `aspect-ratio` (4/3 or 1/1), never fixed pixel heights.

### 2.3 Form Elements

- **Label** `.ff-label`: Caption-sized but 600 weight (14px), `--ff-text`, `margin-bottom: space-2`. Always visible (placeholders are not labels).
- **Input / Select / Textarea** `.ff-input`: height 48px (textarea min-height 120px), padding-x 16px, font Body-Base, bg white, `1px solid --ff-border-strong`, `radius-sm`, `shadow-xs`. Placeholder `--ff-text-muted`.
  - Hover: border `--ff-text-secondary`.
  - Focus: border `--ff-brand-900` plus `0 0 0 3px rgba(213,237,196,.9)` ring.
  - Error: border `--ff-error`, ring `rgba(198,40,40,.18)`, `aria-invalid="true"`.
  - Disabled: bg `--ff-surface`, text `--ff-text-muted`, `cursor: not-allowed`.
- **Select:** same box as input, custom chevron (Lucide `chevron-down`, 20px) via background image or wrapper; native appearance removed.
- **Checkbox / Radio** `.ff-check`: 20×20px box, `radius: 6px` (radio: full), 1px `--ff-border-strong`; checked = bg `brand-900` with white Lucide `check` (or inner dot); label gap `space-3`; focus ring as global.
- **Error / helper text** `.ff-field-error` / `.ff-field-help`: Body-Small (15px). Error color `--ff-error` with a 16px `circle-alert` icon, `margin-top: space-2`, linked with `aria-describedby`. Help text `--ff-text-muted`.
- **Field spacing:** `space-5` (24px) between fields; label and control are one unit.
- Gravity Forms output must be skinned with these classes/tokens; its own theme CSS is overridden, not extended.

### 2.4 Iconography Standard

- **Set:** **Lucide** only, as inline SVG (or a single `<svg><use>` sprite). Font Awesome 4, Salient icomoon, and Gravity Forms icon fonts are retired for visible UI. Social brand icons (Instagram, Facebook) also use Lucide's outline versions so they match the set; no filled brand logos.
- **Stroke:** `stroke-width: 1.5` at 16/20px sizes → use `2` only at 16px for legibility; `1.5` at 24px. `stroke-linecap: round; stroke-linejoin: round; fill: none; stroke: currentColor`.
- **Sizes (bounding box = size, keyline padding 2px inside):**

| Token | Size | Use |
|---|---|---|
| `--ff-icon-sm` | 16px | Inline with Body-Small / Caption, form errors |
| `--ff-icon-md` | 20px | Inline with Body-Base, buttons (md), inputs |
| `--ff-icon-lg` | 24px | Nav, feature icons, buttons (lg) |

- Icons inherit `currentColor` and are never colored with arbitrary hexes. Decorative icons get `aria-hidden="true"`; meaningful ones get a label.
- In buttons, the icon size equals the button size rule: sm=16, md=20, lg=24; gap `space-2`.
- Feature icons (24px) sit in a 48px `radius-full` container, bg `brand-200`, icon `brand-900`.
- Icon mapping from legacy: `fa-times` → `x`; `fa-check-circle` → `circle-check`; `fa-shopping-cart` → `shopping-cart`; `fa-heart-o` → `heart`; `fa-fire` → `flame`; `fa-bolt` → `zap`; `fa-arrow-right/left` → `arrow-right/left`; `fa-clone` → `copy`.

---

## 3. Page Composition and Rules

### 3.1 Standard section hierarchy

Pages are a stack of `.ff-section` bands inside `.ff-container`. Alternate backgrounds (`--ff-bg`, `--ff-surface`, `--ff-surface-inverse`) to create rhythm; never two identical tints back to back.

1. **Header:** sticky, 72px, bg white, bottom border `--ff-border`. Logo, nav (Body-Small 600), cart icon button, one Accent CTA.
2. **Hero** (`.ff-section--lg`, container `2xl`): Caption eyebrow, then `h1`, then Body-Large lead (`max 55ch`), then 1 Accent/Primary + 1 Outline/Ghost button. Hero media uses `radius-lg`.
3. **Feature grid** (`.ff-section`, container `xl`): `h2` + intro, then 3 or 4 `.ff-card`s with 24px icon containers.
4. **Social proof / Stats:** `.ff-section--sm` on `brand-50` or `brand-900`. Reviews as cards; stats as `.ff-h2` numerals with Caption labels.
5. **CTA band** (`.ff-section`, bg `brand-900`, text inverse): `h2`, one sentence, one Accent button, centered in container `md`.
6. **Footer:** bg `brand-900`, Body-Small, `--ff-text-inverse-muted` links, `.ff-section--sm` padding, 4-col grid desktop, 1-col mobile.

Every page: exactly one `h1`, semantic landmarks (`header`, `main`, `footer`), and a defined `title` and meta description.

### 3.2 Whitespace rules

> When in doubt, use **`--ff-space-4` (16px)** between elements, **`--ff-space-5` (24px)** between related blocks, **`--ff-space-7` (48px)** between a section heading and its content, and **`--ff-space-9` (96px)** (`.ff-section`) between sections.

| Relationship | Token |
|---|---|
| Icon to its label | `space-2` |
| Label to control | `space-2` |
| Heading to its paragraph | `space-3` (H1-H3: `space-4`) |
| Paragraph to paragraph | `space-4` |
| Button to button | `space-3` |
| Card to card (grid gap) | `space-5` mobile / `space-6` desktop |
| Section heading block to content | `space-7` |
| Section to section | section padding (`space-8`/`space-9`/`space-10`) |

Spacing is applied with `gap` and `padding`; avoid margin-collapse tricks, and prefer a vertical-stack utility (`.ff-stack > * + * { margin-top: var(--ff-stack, var(--ff-space-4)) }`).

### 3.3 Anti-patterns checklist (never do)

- ❌ **No arbitrary hex/rgb/hsl** in pages, inline styles or page `<style>` blocks. Use `var(--ff-*)` only.
- ❌ **No ad-hoc pixel values** for spacing, radius or font-size. Pick from the scale.
- ❌ **No inline `style=""`** attributes (except dynamic values like a background image URL).
- ❌ **No page-level `<style>` blocks** or per-page `wp-custom-css`. Shared CSS lives in `assets/css/`.
- ❌ **No `vw`/`vh` for type, padding or margins**, and no `calc(100vw * x)`.
- ❌ **No `!important`**, except in the single Salient-override layer.
- ❌ **No second font family**, and no faux-bold/italic or text over images without a scrim for contrast.
- ❌ **No multiple accents**: orange `#ff6b3d` is the only accent; greens/yellows/blues are for status only.
- ❌ **No colored or heavy shadows** (`0 15px 28px #000`, orange glows, thick inset rings).
- ❌ **No new button/card/input styles.** Compose the `ff-*` components; if none fits, extend this document.
- ❌ **No mixed icon sets or icon fonts**; no emoji as icons; no icon without an accessible name when it is the only content.
- ❌ **No skipped heading levels, multiple `h1`s, or ALL-CAPS/lowercase headings** ("OUR MENU", "welcome").
- ❌ **No removing focus outlines**, no hover-only affordances, no tap targets under 44px, no text below 13px, no body-text contrast under 4.5:1.
- ❌ **No fixed pixel widths/heights on containers or media**; use `max-width`, `aspect-ratio`, and the container classes.
- ❌ **No breakpoints** other than 768 / 1024 / 1280.
- ❌ **No empty or broken pages** (`contact-us/` is currently 0 bytes) in the sitemap.

### 3.4 Definition of done for a page

- [ ] Only `ff-*` classes and `var(--ff-*)` tokens; zero inline styles / page `<style>`
- [ ] One `h1`, ordered headings, sentence case
- [ ] Sections use `.ff-section` variants with alternating backgrounds
- [ ] Buttons, cards, forms and icons per §2; Lucide icons only
- [ ] Verified at 360, 768, 1024, 1440px; keyboard-tab walk-through with visible focus
- [ ] Contrast checked (AA); images have `alt`, `width`/`height`, and `loading="lazy"` below the fold

---

## 4. Migration Notes (informational)

Legacy to token mapping used during gradual migration:

| Legacy | Replace with |
|---|---|
| `#002c1f` | `--ff-brand-900` / `--ff-text` |
| `#d5edc4` | `--ff-brand-200` |
| `#ff6b3d` | `--ff-accent-500` |
| `#15803d` | `--ff-success` (status only) |
| `#46af4e`, `#a3e635`, `#f0fdf4` | `--ff-brand-300`/`--ff-brand-200`, `--ff-brand-200`, `--ff-brand-50` (pick by role) |
| `#fff` / `#ffffff` | `--ff-bg` / `--ff-text-inverse` |
| `border-radius: 5-10px` / `20-30px` / `50px+` | `radius-sm` or `md` / `radius-lg` / `radius-full` |
| `padding-top: 10vh` etc. | `.ff-section` |
| `font-size: 3vw` etc. | nearest `.ff-hN` / `.ff-body*` style |

Order of migration: shared header and footer, then home, menu, subscription, about, cart, terms-conditions, then contact-us (to be built). Remove Open Sans from the Google Fonts request as soon as the first migrated page ships.
