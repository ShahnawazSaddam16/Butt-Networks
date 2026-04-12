"use client";

/**
 * page.jsx — viewport-gated hydration
 *
 * Strategy
 * ─────────
 * • Home_  : ssr:true  → full SSR + immediate hydration (LCP / above-fold)
 * • Rest   : ssr:false → zero SSR HTML, zero JS bundle on initial load.
 *            JS chunk is fetched only when IntersectionObserver fires
 *            (~400 px before the section enters the viewport).
 *
 * Why ssr:false for below-fold sections?
 *   With ssr:true every section's bundle is evaluated during hydration even
 *   though the user may never scroll there.  ssr:false completely removes
 *   those modules from the critical JS path; the browser only requests the
 *   chunk when the observer triggers.
 *
 * CLS prevention
 * ──────────────
 *   Each LazySection renders a placeholder <div> whose min-height matches
 *   the section's approximate rendered height.  The real component swaps in
 *   seamlessly — no paint-time layout shift.
 *
 * Prefetch distance
 * ─────────────────
 *   rootMargin "400px 0px" starts the dynamic import ~400 px before the
 *   placeholder enters the viewport, so the chunk is usually ready before
 *   the user reaches it.
 */

import { useEffect, useRef, useState, memo } from "react";
import dynamic from "next/dynamic";
import useHaptic from "@/lib/haptic";
import useGlobalHaptics from "@/lib/useGlobalHaptics";

/* ─────────────────────────────────────────────────────────────
   IMPORTS
   ───────────────────────────────────────────────────────────── */

/** Above-fold hero — SSR + immediate hydration */
const Home_ = dynamic(() => import("./components/Home"), { ssr: true });

/**
 * Below-fold sections — ssr:false so their JS is excluded from the
 * initial bundle entirely. next/dynamic will code-split each one into
 * its own chunk that is only fetched on demand.
 */
const About = dynamic(() => import("./components/About"), { ssr: false });
const Skills = dynamic(() => import("./components/Skills"), { ssr: false });
const Projects = dynamic(() => import("./components/Projects"), { ssr: false });
const Services = dynamic(() => import("./components/Services"), { ssr: false });
const MakeWeb = dynamic(() => import("./components/MakeWeb"), { ssr: false });
const Team = dynamic(() => import("./components/Team"), { ssr: false });
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
});
const Offer = dynamic(() => import("./components/Offer"), { ssr: false });

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER HEIGHTS
   Approximate rendered heights (px) per section.
   Tune these to match your real section heights so the scroll-
   bar position and sibling layout don't shift on mount.
   ───────────────────────────────────────────────────────────── */

const HEIGHTS = {
  About: 580,
  Skills: 520,
  Projects: 820,
  Services: 700,
  MakeWeb: 480,
  Team: 620,
  Testimonials: 500,
  Offer: 420,
};

/* ─────────────────────────────────────────────────────────────
   LazySection
   ───────────────────────────────────────────────────────────── */

/**
 * Wraps a below-fold section component.
 *
 * Lifecycle:
 *  1. Renders a transparent placeholder div (preserves document height → no CLS).
 *  2. IntersectionObserver fires when the placeholder is ~400 px from
 *     the viewport → sets `visible = true`.
 *  3. React renders the real Component; next/dynamic fetches its chunk
 *     (usually already cached from the prefetch fired at step 2).
 *  4. Observer is disconnected (once:true pattern).
 *
 * @param {React.ComponentType}  Component   - The lazily-loaded section
 * @param {number}               minHeight   - Placeholder height in px
 * @param {string}               id          - HTML id for anchor links
 * @param {object}               props       - Forwarded to Component
 */
const LazySection = memo(function LazySection({
  Component,
  minHeight,
  id,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view on mount (e.g. user jumped via anchor link)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      {
        // Start fetching the chunk 400 px before the section is visible
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id={id}>
      {visible ? (
        <Component {...props} />
      ) : (
        /*
         * Placeholder — same id so anchor links still work, same
         * min-height so sibling positions and scrollbar height are
         * stable before the component mounts.
         */
        <div
          aria-hidden="true"
          style={{ minHeight, contain: "layout style size" }}
        />
      )}
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function Home() {
  const triggerHaptic = useHaptic();
  useGlobalHaptics(triggerHaptic, { cooldownMs: 250 });

  return (
    <>
      <Home_ />

      <LazySection Component={About} minHeight={HEIGHTS.About} id="about" />
      <LazySection Component={Skills} minHeight={HEIGHTS.Skills} id="skills" />
      <LazySection
        Component={Projects}
        minHeight={HEIGHTS.Projects}
        id="projects"
        limit={3}
      />
      <LazySection
        Component={Services}
        minHeight={HEIGHTS.Services}
        id="services"
      />
      <LazySection
        Component={MakeWeb}
        minHeight={HEIGHTS.MakeWeb}
        id="make-web"
      />
      <LazySection Component={Team} minHeight={HEIGHTS.Team} id="team" />
      <LazySection
        Component={Testimonials}
        minHeight={HEIGHTS.Testimonials}
        id="testimonials"
      />
      <LazySection Component={Offer} minHeight={HEIGHTS.Offer} id="offer" />
    </>
  );
}
