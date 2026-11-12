"use client";
// Team in the reference style: dark rounded cards with a round photo overlapping the top-left corner,
// name, tag line, short text and a button. The card corners (small top-left, big bottom-right) are the
// decorative signature shape from the reference; everything else uses the design tokens.
import { motion, useReducedMotion } from "motion/react";
import { IMG, Title, Lead, initialsImage } from "@/components/common";

const team = [
  {
    name: "Aayush Rana",
    role: "Founder & CEO",
    tag: "Finance & Strategy",
    bio: "Manages financial planning, budget allocation, and business growth to ensure Fresh Forge delivers maximum quality and value sustainably.",
    src: IMG + "ayush-crop.jpg",
    href: "https://www.instagram.com/ayush18105/",
  },
  {
    name: "Shivangi Gajjar",
    role: "Marketing",
    tag: "Social Media & Marketing",
    bio: "Leads brand storytelling, creative campaigns, and social community engagement to connect Fresh Forge with food lovers across Gandhinagar.",
    src: IMG + "shivangi-crop.jpg",
    href: "https://www.instagram.com/_shivangi_gajjar_/",
  },
  {
    name: "Siddh Prajapati",
    role: "Operations",
    tag: "Operations & Inventory",
    bio: "Oversees daily kitchen workflows, supply chain sourcing, and fresh ingredient inventory to guarantee flawless and timely deliveries.",
    src: initialsImage("SP"),
    href: "https://www.instagram.com/siddhprajapati005/",
  },
];

export function Team() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-mint-50">
      <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <Title lead="Meet our" accent="team" />
        <span aria-hidden="true" className="mx-auto mt-4 block h-[4px] w-12 rounded-full bg-ember" />
        <Lead>A passionate crew working behind the scenes, bringing healthy, fresh, and delicious meals to your doorstep every day.</Lead>

        <ul className="mt-24 grid gap-x-8 gap-y-24 md:grid-cols-3">
          {team.map((p, k) => (
            <motion.li
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: k * 0.1, ease: "easeOut" }}
              whileHover={reduce ? undefined : { y: -8 }}
              className="relative"
            >
              <img
                src={p.src}
                alt={p.name}
                className="absolute -top-16 left-6 z-10 h-[128px] w-[128px] rounded-full bg-forest object-cover object-top ring-8 ring-forest"
                loading="lazy"
              />
              <div className="flex h-full flex-col items-center rounded-tl-[64px] rounded-br-[96px] bg-forest px-6 pb-12 pt-24 text-center text-white shadow-md">
                <h3 className="text-h5 uppercase tracking-caps text-white">{p.name}</h3>
                <p className="mt-1 text-caption font-semibold uppercase tracking-caps text-mint-300">{p.role}</p>
                <p className="mt-6 max-w-xs text-body-sm text-white/85">{p.bio}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-[44px] items-center rounded-md bg-white px-6 text-caption font-bold uppercase tracking-caps text-forest transition-colors hover:bg-mint"
                >
                  Instagram
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
