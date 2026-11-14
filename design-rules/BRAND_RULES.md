# Fresh Forge: Brand and Design Rules

The home page is the benchmark. Every other page must look like it was built by the same hand. This file says what "the same hand" means, and `DESIGN_SYSTEM.md` holds the full token reference. If the two disagree, fix this file first.

---

## 1. Brand in one paragraph

Fresh Forge is calm, confident and fresh. Deep forest green carries the page, mint lifts it, and a single ember-orange accent points at the one action that matters. Type is bold, geometric and tightly set. Space is generous. Corners are soft. Nothing shouts twice.

**Six principles**

1. **Forest first.** `#002c1f` is text, primary buttons and dark sections. Not black.
2. **Mint lifts.** `#d5edc4` and its tints are for highlight panels and secondary actions.
3. **One accent.** Ember `#ff6b3d` marks the single main action per screen. Never decoration.
4. **One typeface.** League Spartan, four weights.
5. **Breathe.** Big, even section spacing. Tight, even spacing inside a block.
6. **Soft and flat.** Rounded corners, hairline borders, whisper-light shadows.

---

## 2. Colour

| Role | Token | Hex | Where |
|---|---|---|---|
| Brand | `--ff-brand-900` | `#002c1f` | Headings, body on light, primary button, footer, dark bands |
| Brand mint | `--ff-brand-200` | `#d5edc4` | Highlight panels, secondary button, text on dark |
| Mint tint | `--ff-brand-50` | `#f3faec` | Alternate section background |
| Accent | `--ff-accent-500` | `#ff6b3d` | Main CTA, badges. Hover `#e5532a` |
| Body text | `--ff-text-secondary` | `#3d5a4f` | Paragraphs on light |
| Muted text | `--ff-text-muted` | `#5b7268` | Captions only |
| Border | `--ff-border` | `#d9e5d0` | Dividers, card outlines |
| Status | success / warning / error / info | see `DESIGN_SYSTEM.md` | Messages only |

**Proportion on any page:** about 60% white and mint tint, 30% forest, 10% mint and accent.
**Alternate** section backgrounds (white, tint, forest). Never two identical bands in a row.
**Contrast:** body text 4.5:1 or better. Ember is never text on white; put forest text on an ember fill.
**Allowed outside the palette:** the WhatsApp green on the WhatsApp button, nothing else.

---

## 3. Typography

One family, **League Spartan**, weights 400, 500, 600, 700 only. Sizes are fluid (`clamp`), never `vw`. Sentence case everywhere, no ALL CAPS headings.

| Style | Desktop / Mobile | Weight | Line | Tracking | Use |
|---|---|---|---|---|---|
| H1 | 72 / 40 | 700 | 1.05 | -0.02em | Page title, one per page |
| H2 | 52 / 32 | 700 | 1.1 | -0.015em | Section title (this is the home page's section heading) |
| H3 | 36 / 24 | 600 | 1.15 | -0.01em | Sub-section, dish and plan names |
| H4 | 26 / 20 | 600 | 1.25 | 0 | Card titles |
| Body | 17 | 400 | 1.6 | 0 | Paragraphs, `#3d5a4f`, max 65 characters wide |
| Small | 15 | 400 | 1.5 | 0 | Secondary text |
| Caption | 13 | 500 | 1.4 | 0.02em | Labels, meta. This is the minimum size |
| Button | 17 | 600 | 1 | 0 | All buttons |

**Rules**
- The tag decides the style. An `h2` always looks like H2, on every page.
- Never skip a level. One `h1` per page. Cart currently has none.
- Heading colour is forest on light, white on dark. Body on dark is mint.

---

## 4. Spacing and layout

8px grid. Only these values: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128.**

| Use | Value |
|---|---|
| Icon to label, label to field | 8 |
| Between elements (default) | 16 |
| Between related blocks, card padding | 24 |
| Section title to its content | 48 |
| Section padding (top and bottom of every section) | **64** phone / **96** from 768px. Hero bands: 96 / 128. Gap between two sections = 2 x this, on every page and in both modes |
| Page gutter | 16 mobile, 24 tablet, 32 desktop |
| Content width | **1200px** centred. Narrow text 768px. Forms 640px |
| Grid gap | 24 mobile, 32 desktop |

**Never** use `vh`, `vw` or `calc(100vw * x)` for padding or margin. Never full-bleed hacks (`width:100vw`) except background media.

---

## 5. Shape, depth and motion

- **Radius:** 8 (inputs), 12 (buttons), 20 (cards, images), full (chips, icon buttons). Nothing else.
- **Borders:** 1px `--ff-border`. Focus ring is 2px forest, offset 2px.
- **Shadows:** one of four brand-green tints (`--ff-shadow-xs` to `-lg`). No black, no coloured glows, no offset blocks.
- **Motion:** 200ms ease on colour, border, shadow, transform. Respect reduced-motion.

---

## 6. Components

**Buttons.** League Spartan 600, 12px radius, one style family.

| Size | Height | Padding x | Text |
|---|---|---|---|
| Small | 36 | 16 | 15 |
| Medium (default) | 44 | 24 | 17 |
| Large | 56 | 32 | 20 |

Primary = forest fill. Accent = ember fill with forest text (one per view). Secondary = mint fill. Outline and Ghost for quiet actions. Danger only for removing things. Hover is one step darker. Disabled is 45% opacity.

**Cards.** White, 1px border, 20px radius, 24px padding, soft shadow. On hover: slightly stronger shadow and a 2px lift. Image on top at a fixed aspect ratio, never a fixed pixel height.

**Forms.** Visible label above the field (14px, 600). Field is 48px tall, 8px radius, 16px side padding. Focus: forest border and a mint ring. Error: red border, message below with an icon.

**Icons.** One set only: **Lucide** outline. Sizes **16 / 20 / 24**, stroke 1.5 (2 at 16), colour is the text colour. Icon inside a button follows the button size. Feature icons: 24px icon in a 48px mint circle. Icon-only buttons need a label.

---

## 7. Responsive and ergonomics

- **Breakpoints:** 768, 1024, 1280. Nothing else.
- **No sideways scrolling** at any width from 320 up.
- **Touch targets:** 44 x 44 minimum, 8px between neighbours.
- **Type scales down smoothly**; a heading must never be taller than the screen is wide allows (no 64px H1 on a 375px phone).
- **Stack on mobile:** columns become one, images keep their ratio, buttons go full width when there are two or more.
- **Reading:** body at least 17px on phones, line length at most 65 characters, line height at least 1.5.
- **Keyboard and screen readers:** visible focus on everything, real headings and landmarks, `alt` on images, a meaningful `title` per page.

---

## 8. Page recipe

Header (sticky, 72px) → Hero (H1, one lead line, one main and one quiet button) → content sections (H2 + content, alternating backgrounds) → proof or stats → CTA band (forest) → Footer (forest).

---

## 9. Never

1. A colour, size, radius or shadow that is not a token.
2. Inline `style=""` or a page-level `<style>` block.
3. A second typeface, or weights 800 and 900.
4. ALL CAPS or all-lowercase headings.
5. Two accents, or ember as text or icon on white.
6. A new button, card or input style. Extend this file instead.
7. Mixed icon sets, icon fonts, emoji as icons.
8. Text under 13px, tap targets under 44px, or removed focus outlines.
9. Breakpoints other than 768 / 1024 / 1280.
10. A page without exactly one `h1` and its own title.

---

## 10. Where the site breaks these rules today

Measured in the browser at 1440px and 375px, home as the benchmark.

| Area | Home (good) | Elsewhere |
|---|---|---|
| **H1** | Display font 242px, uppercase, sage | About 84px / weight 900 / white. Subscription 64px / 900 and **stays 64px on a phone**. Menu 242px, Terms 160px. **Cart has no H1** |
| **Section titles** | 52px / 700 / -0.8 tracking | Cart 36px with 105px line height, uppercase. Subscription plan names 28px / 800 / uppercase. Terms headings switch between 400 and 700 |
| **Body** | 17px / 25px / `#3d5a4f` | About 17/30.6 and 13/21. Menu and Terms 17/27. Subscription 15/24 bold and 19/30 |
| **Weights in use** | 400, 500, 600, 700 | 800 and 900 on About and Subscription |
| **Buttons** | 12px radius, 68px tall | Subscription pill (200px radius), 39px tall, weight 800. Cart WhatsApp 30px tall, 16px text |
| **Icons** | Font Awesome, 14 to 32px | Heart 20px, flame 11x15, bolt 7x15, social 12 / 18 / 28px. No shared size |
| **Section padding** | 128 desktop, 96 mobile | About 96 / 64. Terms 142 / 37. Menu, Subscription, Cart set it per element |
| **Page titles** | "Welcome to Fresh Forge" | **Subscription is titled "Our Menu"** |
| **Phone layout** | No sideways scroll | Menu card images run past the edge (up to 474px on a 375px screen). Home and Terms have blocks 8 to 16px too wide. Every page has 8 to 18 touch targets under 40px |

---

## 11. Decisions applied (change here first if you disagree)

1. **Hero font.** Every inner page title (About, Menu, Subscription, Cart, Terms) now uses H1 in League Spartan 700. The giant sage "welcome" wordmark on the home page is the single display exception and was not touched. Apollonia Pro is still in the home hero and should be replaced or licensed before launch.
2. **Button shape.** 12px corners everywhere. The pill buttons on Subscription and Cart were changed.
3. **Button size.** Medium (44px) on the inner pages. Home CTAs stay at their current 68px.
4. **Icons.** Font Awesome stays for now but every content icon is a 20px box and header and footer icons are 24px. Swapping to Lucide is a later step.
5. **Cart title.** The cart is a utility page, so its H1 sits at H2 size inside the card.
6. **Page titles.** Format is `Page - Fresh Forge`.
7. **Mobile header.** "Our Menu" link is 17px / 600 with a 44px target. The menu button is a 44px forest circle with a 24px three-bar icon (Lucide "menu" shape, X when open). The full-screen menu uses League Spartan 700, sentence case, H3 size.
8. **Hero sub-headline** ("Forging Your Health.") is 40px on phones, scaling to 52px on desktop.
9. **Phone rhythm.** The home hero gap is 32px and key bands use the standard 64px section padding on phones (not 96).
10. **Salient buttons** (`.nectar-button`): one line, 56px tall, 12px corners, 17px text, 32px side padding, 20px arrow icon with an 8px gap.

11. **Section rhythm.** One system for all pages: --ff-sec-y (64 phone / 96 desktop) for every section, --ff-sec-y-lg (96 / 128) for hero bands, 48px from a section title to its content. This replaces the 64/96 section padding and the per-page px, vh and vw paddings. It is defined at the end of rand-consistency.css.

12. **Equal spacing around blocks.** The first block under the header and the last block above the footer are one section value away (--ff-sec-y: 64 phone / 96 desktop). A title block that stands alone (title, or title and button) has the same space below it as above it (also one section value). A title or eyebrow label directly above the content it introduces keeps 48px. Space between repeated cards is 48px. Measured on every page: Home, About, Menu, Subscription, Cart and Terms.
13. **Icons inside buttons** are drawn to the size of their visible shape (8x14 chevron, 14x12 arrow), sit on the label's centre line, and the label and icon group has equal padding on both sides.
