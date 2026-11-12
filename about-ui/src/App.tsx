import { PinnedStory } from "@/components/PinnedStory";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { Founder } from "@/components/sections/Founder";
import { PopularBowls } from "@/components/sections/PopularBowls";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Team } from "@/components/sections/Team";
import { Customers } from "@/components/sections/Customers";
import { btnAccent, btnOutline } from "@/components/common";

export default function App() {
  return (
    <div className="w-full bg-white font-sans">
      <Hero />
      <AboutUs />

      {/* How Fresh Forge began: pinned, full-screen chapters */}
      <div id="story">
        <PinnedStory />
      </div>

      <Founder />
      <PopularBowls />
      <WhyChoose />
      <Team />
      <Customers />

      {/* CTA: a light band with a clear edge so it never melts into the dark footer below */}
      <section className="border-b border-line bg-mint">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-24 lg:px-8">
          <h2 className="text-h2 text-forest">
            Ready to forge a <span className="text-forest-700">healthier you</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-ink-soft">
            Fresh, balanced bowls, made every day and delivered free to your door in Gandhinagar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="../subscription/index.html" className={btnAccent}>
              Start a subscription
            </a>
            <a href="../menu/index.html" className={btnOutline}>
              See the menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
