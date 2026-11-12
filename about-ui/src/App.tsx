import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PinnedStory } from "@/components/PinnedStory";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FocusCards } from "@/components/ui/focus-cards";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { VeggieField } from "@/components/Veggies";
import quotes from "./testimonials.json";

// Paths are relative to the page (/freshforge/about-preview/ or /freshforge/about/), so ../ is /freshforge/.
const IMG = "../img/";
const HERO_BOWL = IMG + "ChatGPT%20Image%20Jun%2029,%202026,%2012_12_24%20AM.png";

const initialsImage = (letters: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'>` +
      `<rect width='600' height='700' fill='#17543d'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='League Spartan, Arial, sans-serif' font-size='200' font-weight='700' fill='#d5edc4'>${letters}</text></svg>`
  );

// Buttons: 44px high, 12px radius, 600 weight, 17px text (DESIGN_SYSTEM.md).
const btn =
  "inline-flex items-center justify-center min-h-[44px] rounded-md px-6 text-body font-semibold transition-colors";

const Kicker = ({ children, dark = false }: { children: string; dark?: boolean }) => (
  <p className={`text-caption font-bold uppercase tracking-caps ${dark ? "text-mint-300" : "text-ember-700"}`}>
    {children}
  </p>
);

const promises = [
  {
    title: "Fresh, every day",
    description: "We craft fresh, balanced bowls every single day, made with 100% fresh ingredients.",
    link: "../menu/index.html",
  },
  {
    title: "No preservatives",
    description: "Zero preservatives and zero junk. Just real ingredients in every bowl.",
    link: "../menu/index.html",
  },
  {
    title: "Chef curated",
    description: "Every recipe is curated by a chef and built to be nutritionally balanced.",
    link: "../menu/index.html",
  },
  {
    title: "Free delivery",
    description: "Free home delivery, straight to your door, with every subscription.",
    link: "../subscription/index.html",
  },
];

const team = [
  {
    title: "Aayush Rana",
    role: "Founder & CEO · Finance & Strategy",
    bio: "Manages financial planning, budget allocation, and business growth to ensure Fresh Forge delivers maximum quality and value sustainably.",
    src: IMG + "ayush.png",
    href: "https://www.instagram.com/ayush18105/",
  },
  {
    title: "Shivangi Gajjar",
    role: "Social Media & Marketing",
    bio: "Leads brand storytelling, creative campaigns, and social community engagement to connect Fresh Forge with food lovers across Gandhinagar.",
    src: IMG + "shivangi.jpeg",
    href: "https://www.instagram.com/_shivangi_gajjar_/",
  },
  {
    title: "Siddh Prajapati",
    role: "Operations & Inventory",
    bio: "Oversees daily kitchen workflows, supply chain sourcing, and fresh ingredient inventory to guarantee flawless and timely deliveries.",
    src: initialsImage("SP"),
    href: "https://www.instagram.com/siddhprajapati005/",
  },
];

// Real customer quotes already on the home page; high-resolution bowl photos (1080px) stand in for portraits.
const bowlPhotos = ["6.png", "8.png", "5.png", "1.png", "2.png", "3.png"];
const testimonials = quotes.slice(0, bowlPhotos.length).map((q, i) => ({
  quote: q.quote,
  name: q.name,
  designation: "Fresh Forge customer",
  src: IMG + bowlPhotos[i],
}));

function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16 });
  const sy = useSpring(my, { stiffness: 60, damping: 16 });
  const px = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const py = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const rot = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  return (
    <section
      className="relative bg-forest text-white overflow-hidden"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-24 md:grid-cols-2 md:px-6 md:py-32 lg:px-8">
        <div>
          <Kicker dark>Our story</Kicker>
          <h1 className="mt-4 text-h1 text-white">
            About <span className="text-mint">Fresh Forge</span>
          </h1>
          <TextGenerateEffect
            className="mt-6 max-w-xl text-body-lg text-mint"
            words="Where every bowl is crafted with intention, every ingredient chosen with care, and every meal forges a healthier you."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="../subscription/index.html" className={`${btn} bg-ember text-forest hover:bg-ember-600`}>
              Start a subscription
            </a>
            <a href="../menu/index.html" className={`${btn} border border-white text-white hover:bg-white/10`}>
              See the menu
            </a>
          </div>
          <p className="mt-6 text-caption text-mint-300">Tip: grab a vegetable and drop it anywhere. It floats where you leave it.</p>
        </div>
        <div className="relative">
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={HERO_BOWL}
              alt="A Fresh Forge bowl"
              className="w-full rounded-lg"
              style={reduce ? undefined : { x: px, y: py, rotate: rot }}
            />
          </motion.div>
        </div>
      </div>
      {/* Floating 3D vegetables over the whole hero: they react to the mouse and stay where you drop them */}
      <VeggieField />
    </section>
  );
}

export default function App() {
  return (
    <div className="w-full bg-white font-sans">
      <Hero />

      {/* How Fresh Forge began: pinned, full-screen chapters */}
      <PinnedStory />

      {/* What we stand for */}
      <section className="bg-mint-50">
        <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <Kicker>What you can count on</Kicker>
          <h2 className="mt-3 text-h2 text-forest">What we stand for</h2>
          <p className="mt-4 max-w-xl text-body-lg text-ink-soft">
            Four things we do in every bowl, every day. Built for people who refuse to compromise on taste or
            nutrition.
          </p>
          <HoverEffect items={promises} className="mt-8 -mx-2" />
        </div>
      </section>

      {/* Team */}
      <section className="bg-white">
        <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <Kicker>The people</Kicker>
          <h2 className="mt-3 text-h2 text-forest">Meet our team</h2>
          <p className="mb-12 mt-4 max-w-xl text-body-lg text-ink-soft">
            A passionate crew working behind the scenes, dedicated to bringing healthy, fresh, and delicious meals
            to your doorstep every day.
          </p>
          <FocusCards cards={team} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-mint-50">
        <div className="mx-auto max-w-page px-4 pt-16 md:px-6 md:pt-24 lg:px-8">
          <Kicker>Customer love</Kicker>
          <h2 className="mt-3 text-h2 text-forest">What people say</h2>
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay />
        <div className="pb-16 md:pb-24" />
      </section>

      {/* CTA: light band with a clear edge so it never melts into the dark footer below */}
      <section className="bg-mint border-b border-line">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-24 lg:px-8">
          <h2 className="text-h2 text-forest">
            Ready to forge a <span className="text-forest-700">healthier you</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-ink-soft">
            Fresh, balanced bowls, made every day and delivered free to your door in Gandhinagar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="../subscription/index.html" className={`${btn} bg-ember text-forest hover:bg-ember-600`}>
              Start a subscription
            </a>
            <a href="../menu/index.html" className={`${btn} border border-forest text-forest hover:bg-white/60`}>
              See the menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
