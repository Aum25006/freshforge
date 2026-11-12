"use client";
// "Why choose our Food": four columns with an icon each; a card lifts on hover or keyboard focus (like the middle card in the reference).
import { motion, useReducedMotion } from "motion/react";
import { IconChefHat, IconLeaf, IconShieldCheck, IconTruckDelivery } from "@tabler/icons-react";
import { Title, Lead } from "@/components/common";

const items = [
  { Icon: IconLeaf, title: "Fresh, every day", text: "We craft fresh, balanced bowls every single day, made with 100% fresh ingredients.", href: "../menu/index.html" },
  { Icon: IconShieldCheck, title: "No preservatives", text: "Zero preservatives and zero junk. Just real ingredients in every bowl.", href: "../menu/index.html" },
  { Icon: IconChefHat, title: "Chef curated", text: "Every recipe is curated by a chef and built to be nutritionally balanced.", href: "../menu/index.html" },
  { Icon: IconTruckDelivery, title: "Free delivery", text: "Free home delivery, straight to your door, with every subscription.", href: "../subscription/index.html" },
];

export function WhyChoose() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-mint-50">
      <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <Title lead="Why choose our" accent="Food" />
        <Lead>Four things we do in every bowl, every day.</Lead>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, text, href }, k) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: k * 0.08, ease: "easeOut" }}
            >
              <a
                href={href}
                className="group block h-full rounded-lg bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-md focus-visible:-translate-y-2 focus-visible:shadow-md"
              >
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-mint text-forest transition-colors group-hover:bg-ember">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-h5 text-forest">{title}</h3>
                <p className="mt-3 text-body text-ink-soft">{text}</p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
