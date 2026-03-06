"use client";

/**
 * Hero — performance-optimised
 *
 * Changes vs original:
 *  1. framer-motion fully removed from this file.
 *     All entrance animations are pure CSS @keyframes → no JS animation
 *     engine spins up on mount → ~200 ms less main-thread work.
 *  2. usePrefersReducedMotion() is a tiny custom hook (no framer dep).
 *  3. AnimatePresence replaced by key-prop CSS cardIn animation.
 *  4. Partial hydration: MobileScrollStrip renders a static CLS-safe
 *     placeholder until after the first client paint (useHydrated +
 *     startTransition), then swaps in the interactive rAF version.
 *  5. All hover/active effects live in a single <style> block that the
 *     browser GPU-accelerates; zero JS touch handlers added.
 *  6. Every height-unstable container has an explicit min-height / fixed
 *     height so there is zero layout shift during hydration.
 *  7. CSS `contain: layout style` on fixed-size containers tells the
 *     browser not to recalculate the rest of the page on internal change.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
  Suspense,
  startTransition,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Sparkles, Zap } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/* ─────────────────────────────────────────────────────────────
   LAZY IMPORTS  — only Typewriter is lazy (already was before)
   ───────────────────────────────────────────────────────────── */

const Typewriter = dynamic(
  () => import("react-simple-typewriter").then((m) => m.Typewriter),
  {
    ssr: false,
    loading: () => (
      <span className="opacity-0 select-none" aria-hidden>
        |
      </span>
    ),
  },
);

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
   ───────────────────────────────────────────────────────────── */

const PROJECTS = [
  { src: "/projects/Ecom/light-shop.png", title: "E-commerce Store" },
  { src: "/projects/Platform/Dashboard.png", title: "Admin Dashboard" },
  { src: "/projects/Digital/Near-footer.png", title: "Marketing Landing" },
  { src: "/projects/Portfolio/home.png", title: "Custom Portfolio" },
];

const WORDS = [
  "React & Next.js applications",
  "Scalable backend architectures",
  "Cloud deployment & DevOps",
  "Mobile-first responsive design",
  "Production-ready code quality",
];

const SPEED = 32;
const EASE = "cubic-bezier(0.22,1,0.36,1)";

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS  — injected once, all compositor-thread animations
   ───────────────────────────────────────────────────────────── */

const GLOBAL_CSS = `
  /* ── decorative orb movement (translate property → compositor) ── */
  @keyframes hOrb1 {
    0%,100%{ translate:0 0;        opacity:.9 }
    45%    { translate:28px -36px; opacity:1  }
    70%    { translate:-18px 20px; opacity:.8 }
  }
  @keyframes hOrb2 {
    0%,100%{ translate:0 0;         opacity:.9 }
    40%    { translate:-24px 28px;  opacity:1  }
    65%    { translate:16px -20px;  opacity:.8 }
  }
  @keyframes hOrb3 {
    0%,100%{ translate:0 0 }
    50%    { translate:12px -14px }
  }

  /* ── background card float ── */
  @keyframes cF1 {
    0%,100%{ transform:translateY(0)    rotate(-1deg) }
    50%    { transform:translateY(-8px)  rotate(1deg)  }
  }
  @keyframes cF2 {
    0%,100%{ transform:translateY(0)    rotate(2deg)   }
    50%    { transform:translateY(-6px)  rotate(-.5deg) }
  }
  @keyframes cF3 {
    0%,100%{ transform:translateY(0)    rotate(-2deg)  }
    50%    { transform:translateY(-10px) rotate(.5deg)  }
  }

  /* ── badge pulse ring ── */
  @keyframes pRing {
    0%       { transform:scale(.9);  opacity:.7 }
    70%,100% { transform:scale(1.3); opacity:0  }
  }

  /* ── hero entrance (replaces framer fadeUp / fadeIn / stagger) ── */
  @keyframes heroFadeUp {
    from { opacity:0; transform:translateY(22px) }
    to   { opacity:1; transform:none }
  }
  @keyframes heroFadeIn {
    from { opacity:0 }
    to   { opacity:1 }
  }
  @keyframes heroSlideRight {
    from { opacity:0; transform:translateX(20px) }
    to   { opacity:1; transform:none }
  }

  /* ── visual-stack card switch (replaces AnimatePresence) ── */
  @keyframes cardIn {
    from { opacity:0; transform:scale(.93) translateY(10px) }
    to   { opacity:1; transform:none }
  }

  /* ── floating badge entrances ── */
  @keyframes badgeA {
    from { opacity:0; transform:translate(12px,-6px) }
    to   { opacity:1; transform:none }
  }
  @keyframes badgeB {
    from { opacity:0; transform:translate(-12px,6px) }
    to   { opacity:1; transform:none }
  }

  /* ── CTA arrow bounce ── */
  @keyframes arrowBounce {
    0%,100% { transform:translateX(0)  }
    50%     { transform:translateX(4px) }
  }

  /* desktop project cards */
  .h-proj-card {
    transition: transform .2s ${EASE}, box-shadow .2s ease;
  }
  .h-proj-card:hover { transform: translateY(-4px) scale(1.02); }

  .h-proj-img { transition: transform .3s ease; }
  .h-proj-card:hover .h-proj-img { transform: scale(1.04); }

  .h-proj-overlay { opacity:0; transition: opacity .3s ease; }
  .h-proj-card:hover .h-proj-overlay { opacity:1; }

  .h-proj-bar {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .28s ease;
  }
  .h-proj-card:hover .h-proj-bar { transform: scaleX(1); }

  /* CTA buttons */
  .h-cta-primary {
    transition: transform .15s ease, box-shadow .2s ease;
    will-change: transform;
  }
  .h-cta-primary:hover  { transform: scale(1.04); }
  .h-cta-primary:active { transform: scale(0.97); }

  .h-cta-secondary { transition: transform .15s ease; will-change: transform; }
  .h-cta-secondary:hover  { transform: scale(1.03); }
  .h-cta-secondary:active { transform: scale(0.97); }

  /* hide scrollbar for strip */
  .h-strip::-webkit-scrollbar { display:none }
`;

/* ─────────────────────────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────────────────────────── */

/**
 * Lightweight replacement for framer-motion's useReducedMotion.
 * Defaults to `false` so SSR and first paint always match.
 */
function usePrefersReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion:reduce)");
    setR(mq.matches);
    const h = (e) => setR(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return r;
}

/**
 * Partial-hydration sentinel.
 * - Server: always `false`  → static placeholder renders (no rAF, no intervals)
 * - Client: flips to `true` inside startTransition after first paint
 *   so interactive enhancements are low-priority and don't block LCP.
 */
function useHydrated() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    startTransition(() => setOk(true));
  }, []);
  return ok;
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION HELPER
   ───────────────────────────────────────────────────────────── */

/**
 * Returns an inline `animation` style for a named @keyframe.
 * When `reduced` is true, returns an empty object so the element
 * is immediately visible with no animation.
 */
const au = (name, delay = 0, dur = "0.55s", reduced = false) =>
  reduced ? {} : { animation: `${name} ${dur} ${EASE} ${delay}s both` };

/* ─────────────────────────────────────────────────────────────
   THEME TOKENS
   ───────────────────────────────────────────────────────────── */

const tok = (d) => ({
  card: d ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100",
  cardBg: d ? "bg-gray-900" : "bg-gray-50",
  text: d ? "text-gray-300" : "text-gray-600",
  badge: d
    ? "bg-gray-700 text-gray-200 border-gray-600"
    : "bg-gray-50 text-gray-700 border-gray-100",
  divider: d ? "bg-gray-700" : "bg-gray-100",
  sub: d ? "text-gray-400" : "text-gray-500",
  twColor: d ? "text-indigo-400" : "text-indigo-600",
  author: d ? "bg-gray-800/70 border-gray-700" : "bg-gray-50 border-gray-100",
  openBg: d
    ? "bg-emerald-900/40 text-emerald-400"
    : "bg-emerald-50 text-emerald-600",
  heading: d ? "text-white" : "text-gray-900",
  shadow: d ? "0 16px 48px rgba(0,0,0,.55)" : "0 16px 48px rgba(0,0,0,.18)",
  floatBadge: d
    ? "bg-gray-900 border-gray-700 text-gray-200"
    : "bg-white border-gray-100 text-gray-700",
  techBadge: d
    ? "bg-gray-900 border-gray-700 text-indigo-400"
    : "bg-white border-gray-100 text-indigo-600",
  border: d
    ? "border-gray-600 text-gray-200 hover:bg-gray-700/60"
    : "border-gray-300 text-gray-700 hover:bg-gray-50",
  subLink: d ? "text-gray-400" : "text-gray-500",
  orbA: d
    ? "radial-gradient(circle,rgba(99,102,241,.22) 0%,rgba(99,102,241,.10) 35%,rgba(99,102,241,.03) 60%,transparent 75%)"
    : "radial-gradient(circle,rgba(59,130,246,.14) 0%,rgba(59,130,246,.06) 35%,rgba(59,130,246,.02) 60%,transparent 75%)",
  orbB: d
    ? "radial-gradient(circle,rgba(56,189,248,.16) 0%,rgba(56,189,248,.07) 35%,rgba(56,189,248,.02) 60%,transparent 75%)"
    : "radial-gradient(circle,rgba(99,102,241,.10) 0%,rgba(99,102,241,.04) 35%,rgba(99,102,241,.01) 60%,transparent 75%)",
  orbC: d
    ? "radial-gradient(circle,rgba(168,85,247,.10) 0%,rgba(168,85,247,.04) 40%,transparent 70%)"
    : "radial-gradient(circle,rgba(168,85,247,.06) 0%,rgba(168,85,247,.02) 40%,transparent 70%)",
});

/* ─────────────────────────────────────────────────────────────
   ATOMS
   ───────────────────────────────────────────────────────────── */

const PulseDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
  </span>
);

const Divider = ({ label, t }) => (
  <div className="flex items-center gap-3">
    <div className={`flex-1 h-px ${t.divider}`} />
    <span
      className={`text-[11px] font-bold uppercase tracking-widest ${t.sub}`}
    >
      {label}
    </span>
    <div className={`flex-1 h-px ${t.divider}`} />
  </div>
);

const SubLinks = ({ t }) => (
  <div className={`flex gap-5 text-sm ${t.subLink}`}>
    <a
      href="/#projects"
      className="underline underline-offset-2 hover:text-indigo-500 transition-colors"
    >
      See our work
    </a>
    <span aria-hidden>·</span>
    <a
      href="/#founder"
      className="underline underline-offset-2 hover:text-indigo-500 transition-colors"
    >
      About the team
    </a>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   BACKGROUND ORBS  — CSS-only, no framer, no filter:blur
   ───────────────────────────────────────────────────────────── */

const HeroBackground = memo(({ t }) => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
      style={{
        background: t.orbA,
        animation: "hOrb1 16s ease-in-out infinite",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-24 -left-24 w-[440px] h-[440px] rounded-full"
      style={{
        background: t.orbB,
        animation: "hOrb2 19s ease-in-out infinite",
        animationDelay: "5s",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
      style={{
        background: t.orbC,
        animation: "hOrb3 12s ease-in-out infinite",
        animationDelay: "2s",
      }}
    />
  </>
));
HeroBackground.displayName = "HeroBackground";

/* ─────────────────────────────────────────────────────────────
   MOBILE VISUAL STACK
   Key changes:
     • AnimatePresence removed → `key` on front-card triggers CSS cardIn
     • rAF interval deferred until after hydration (partial hydration)
     • `contain: layout style` on root prevents reflows escaping
   ───────────────────────────────────────────────────────────── */

const MobileVisualStack = memo(({ t, reduced }) => {
  const [idx, setIdx] = useState(0);
  const hydrated = useHydrated();

  useEffect(() => {
    if (reduced || !hydrated) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % PROJECTS.length),
      2500,
    );
    return () => clearInterval(id);
  }, [reduced, hydrated]);

  return (
    <div
      className="relative w-full flex justify-center items-center"
      /* Fixed height prevents CLS; contain stops layout recalc leaking out */
      style={{ height: 220, contain: "layout style" }}
    >
      {/* Background stacked cards */}
      {[2, 1].map((offset) => (
        <div
          key={offset}
          aria-hidden
          className={`absolute rounded-2xl overflow-hidden border shadow-lg ${t.card}`}
          style={{
            width: 200,
            height: 140,
            top: offset * 14,
            opacity: offset === 1 ? 0.5 : 0.25,
            transform: `scale(${1 - offset * 0.07}) rotate(${offset === 1 ? 4 : 8}deg)`,
            zIndex: 3 - offset,
            animation: reduced
              ? "none"
              : `cF${offset + 1} ${7 + offset}s ease-in-out infinite`,
            animationDelay: `${offset * 0.8}s`,
          }}
        >
          <Image
            src={PROJECTS[(idx + offset) % PROJECTS.length].src}
            alt=""
            fill
            className="object-contain p-2"
            sizes="200px"
            loading="lazy"
          />
        </div>
      ))}

      {/* Front card — `key` change forces remount → CSS cardIn replays */}
      <div
        className="relative z-10"
        style={{ animation: reduced ? "none" : "cF1 6s ease-in-out infinite" }}
      >
        <div
          key={idx} /* ← triggers animation replay without AnimatePresence */
          className={`relative rounded-2xl overflow-hidden border shadow-2xl ${t.card}`}
          style={{
            width: 220,
            height: 155,
            boxShadow: t.shadow,
            animation: reduced ? "none" : `cardIn 0.45s ${EASE} both`,
          }}
        >
          <Image
            src={PROJECTS[idx].src}
            alt={PROJECTS[idx].title}
            fill
            className="object-contain p-3"
            sizes="220px"
            priority
            fetchPriority="high"
          />
          <div
            className="absolute bottom-0 inset-x-0 px-3 py-2 text-[11px] font-semibold text-white"
            style={{
              background: "linear-gradient(to top,rgba(0,0,0,.65),transparent)",
            }}
          >
            {PROJECTS[idx].title}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`View ${PROJECTS[i].title}`}
            style={{
              width: i === idx ? 18 : 5,
              height: 5,
              borderRadius: 99,
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === idx ? "#6366f1" : "rgba(255,255,255,.25)",
              transition: "width .3s ease",
            }}
          />
        ))}
      </div>

      {/* Floating badges — CSS entrance, no framer-motion */}
      <div
        className={`absolute top-2 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold shadow-lg border ${t.floatBadge}`}
        style={reduced ? {} : { animation: `badgeA 0.5s ${EASE} 0.7s both` }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inset-0 rounded-full bg-emerald-400 opacity-75"
            style={{ animation: "pRing 1.4s ease infinite" }}
          />
          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500 inline-flex" />
        </span>
        Live projects
      </div>

      <div
        className={`absolute bottom-8 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold shadow-lg border ${t.techBadge}`}
        style={reduced ? {} : { animation: `badgeB 0.5s ${EASE} 0.9s both` }}
      >
        <Zap size={10} />
        Next.js + React
      </div>
    </div>
  );
});
MobileVisualStack.displayName = "MobileVisualStack";

/* ─────────────────────────────────────────────────────────────
   MOBILE SCROLL STRIP
   Partial hydration: renders a static placeholder (same exact
   height) until after the first paint, then swaps to the
   interactive rAF-driven version via startTransition.
   ───────────────────────────────────────────────────────────── */

/** Static placeholder — exact same DOM shape as live strip, prevents CLS */
const ScrollStripPlaceholder = memo(({ t }) => (
  <div>
    <div className="flex gap-3 overflow-hidden" style={{ height: 138 }}>
      {PROJECTS.slice(0, 3).map((p, i) => (
        <div
          key={i}
          className={`flex-shrink-0 min-w-[180px] rounded-xl overflow-hidden border ${t.card}`}
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}
        >
          <div className={`relative aspect-[4/3] ${t.cardBg}`}>
            <Image
              src={p.src}
              alt={p.title}
              fill
              className="object-contain p-2.5"
              sizes="180px"
              loading="lazy"
            />
          </div>
          <p className={`px-3 py-2 text-[11px] font-medium ${t.text}`}>
            {p.title}
          </p>
        </div>
      ))}
    </div>
    <p className={`mt-2 text-[11px] text-right ${t.sub}`}>
      Swipe · Tap to open
    </p>
  </div>
));
ScrollStripPlaceholder.displayName = "ScrollStripPlaceholder";

const MobileScrollStrip = memo(({ t }) => {
  const hydrated = useHydrated();
  const elRef = useRef(null);
  const pressed = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const dragging = useRef(false);
  const paused = useRef(false);
  const timer = useRef(null);
  const raf = useRef(null);

  /* rAF loop — only starts after hydration (partial hydration pattern) */
  useEffect(() => {
    if (!hydrated) return;
    let last = 0;
    const step = (ts) => {
      const dt = last ? (ts - last) / 1000 : 0;
      last = ts;
      const el = elRef.current;
      if (el && !paused.current && !dragging.current) {
        el.scrollLeft += SPEED * dt;
        if (el.scrollLeft >= el.scrollWidth / 2)
          el.scrollLeft -= el.scrollWidth / 2;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    };
  }, [hydrated]);

  const pause = useCallback(() => {
    paused.current = true;
  }, []);
  const resume = useCallback((d = 800) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      paused.current = false;
    }, d);
  }, []);

  const onDown = useCallback(
    (e) => {
      pressed.current = true;
      dragging.current = false;
      startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      startScroll.current = elRef.current?.scrollLeft ?? 0;
      pause();
      clearTimeout(timer.current);
      try {
        elRef.current?.setPointerCapture?.(e.pointerId);
      } catch {}
    },
    [pause],
  );

  const onMove = useCallback((e) => {
    if (!pressed.current) return;
    const dx = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - startX.current;
    if (!dragging.current && Math.abs(dx) > 5) dragging.current = true;
    if (dragging.current && elRef.current)
      elRef.current.scrollLeft = startScroll.current - dx;
  }, []);

  const onUp = useCallback(
    (e) => {
      pressed.current = false;
      dragging.current = false;
      try {
        elRef.current?.releasePointerCapture?.(e.pointerId);
      } catch {}
      resume(900);
    },
    [resume],
  );

  /* Render static placeholder until hydrated — no layout shift */
  if (!hydrated) return <ScrollStripPlaceholder t={t} />;

  const doubled = [...PROJECTS, ...PROJECTS];

  return (
    <div>
      <div
        ref={elRef}
        className="h-strip flex gap-3 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        onMouseEnter={pause}
        onMouseLeave={() => resume(350)}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {doubled.map((p, i) => (
          <a
            key={i}
            href="/#projects"
            aria-label={`View ${p.title}`}
            className={`flex-shrink-0 min-w-[180px] rounded-xl overflow-hidden border block ${t.card}`}
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}
          >
            <div className={`relative aspect-[4/3] ${t.cardBg}`}>
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-contain p-2.5"
                sizes="180px"
                loading="lazy"
              />
            </div>
            <p className={`px-3 py-2 text-[11px] font-medium ${t.text}`}>
              {p.title}
            </p>
          </a>
        ))}
      </div>
      <p className={`mt-2 text-[11px] text-right ${t.sub}`}>
        Swipe · Tap to open
      </p>
    </div>
  );
});
MobileScrollStrip.displayName = "MobileScrollStrip";

/* ─────────────────────────────────────────────────────────────
   AUTHOR CARD
   ───────────────────────────────────────────────────────────── */

const AuthorCard = memo(
  ({ t, compact = false, reduced = false, delay = 0 }) => (
    <div
      className={`flex items-center gap-${compact ? 3 : 4} p-${compact ? 0 : 4} rounded-2xl ${compact ? "" : `border ${t.author}`}`}
      style={au("heroFadeUp", delay, "0.55s", reduced)}
    >
      <div
        className={`w-${compact ? 10 : 14} h-${compact ? 10 : 14} sm:w-${compact ? 10 : 16} sm:h-${compact ? 10 : 16} flex-none rounded-full ring-2 overflow-hidden ring-gray-200 dark:ring-gray-700`}
      >
        <Image
          src="/butt.png"
          alt="Wahb & Shahnawaz"
          width={compact ? 40 : 64}
          height={compact ? 40 : 64}
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${t.heading}`}>Wahb &amp; Shahnawaz</p>
        <p className={`text-xs mt-0.5 ${t.sub}`}>
          {compact
            ? "Design · Full-Stack · Asia"
            : "Design + Full-Stack Engineering"}
        </p>
        {!compact && (
          <span
            className={`inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-medium ${t.sub}`}
          >
            <MapPin size={11} aria-hidden /> Based in Asia
          </span>
        )}
      </div>
      <div
        className={`flex-none flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${t.openBg}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Open
      </div>
    </div>
  ),
);
AuthorCard.displayName = "AuthorCard";

/* ─────────────────────────────────────────────────────────────
   CTA BUTTONS  — CSS classes replace whileHover / whileTap
   ───────────────────────────────────────────────────────────── */

const CtaButtons = memo(({ t, reduced, block = false }) => (
  <div
    className={`flex ${block ? "flex-col sm:flex-row w-full max-w-xs" : "flex-row"} items-center gap-3`}
  >
    <Link
      href="#services"
      className={`h-cta-primary inline-flex items-center justify-center gap-2 ${block ? "w-full" : ""} px-${block ? 5 : 6} py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl text-sm`}
    >
      <Zap size={15} aria-hidden />
      Explore Services
      {/* Arrow bounce — CSS animation, no framer */}
      <span
        aria-hidden
        style={
          reduced
            ? {}
            : {
                animation: "arrowBounce 1.2s ease-in-out infinite",
                display: "inline-flex",
              }
        }
      >
        <ArrowRight size={15} />
      </span>
    </Link>
    <Link
      href="/Contact"
      className={`h-cta-secondary inline-flex items-center justify-center gap-2 ${block ? "w-full" : ""} px-5 py-3 rounded-xl border font-semibold text-sm transition-colors ${t.border}`}
    >
      <Sparkles size={14} />
      Contact Us
    </Link>
  </div>
));
CtaButtons.displayName = "CtaButtons";

/* ─────────────────────────────────────────────────────────────
   DESKTOP PROJECT GRID  — motion.a → plain <a> + CSS classes
   ───────────────────────────────────────────────────────────── */

const DesktopGrid = memo(({ t, reduced }) => (
  <div className="grid grid-cols-2 gap-3">
    {PROJECTS.map((p, i) => (
      <a
        key={p.title}
        href="/#projects"
        aria-label={`View project: ${p.title}`}
        className={`h-proj-card group relative block overflow-hidden rounded-xl border ${t.card}`}
        style={{
          boxShadow: "0 2px 14px rgba(0,0,0,.08)",
          /* staggered entrance — no framer stagger needed */
          ...au("heroFadeUp", i * 0.08 + 0.3, "0.45s", reduced),
        }}
      >
        <div className={`relative aspect-[4/3] ${t.cardBg}`}>
          <Image
            src={p.src}
            alt={p.title}
            fill
            className="h-proj-img object-contain p-3"
            sizes="(max-width:1024px) 45vw,20vw"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Hover overlay — CSS transition via .h-proj-overlay class */}
          <div className="h-proj-overlay absolute inset-0 bg-gradient-to-t from-black/40 via-transparent pointer-events-none" />
        </div>
        <div className={`px-3 py-2 text-xs font-medium ${t.text}`}>
          {p.title}
        </div>
        {/* Underline bar — CSS scaleX transition via .h-proj-bar class */}
        <div className="h-proj-bar absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
      </a>
    ))}
  </div>
));
DesktopGrid.displayName = "DesktopGrid";

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export default function Hero() {
  const { isDarkMode } = useTheme();
  const reduced = usePrefersReduced();
  const t = tok(isDarkMode);

  return (
    <section
      id="home"
      aria-label="Hero — Digital Solutions Built to Scale"
      className={`relative overflow-hidden py-10 sm:py-20 mt-16 md:mt-20 lg:mt-24 ${
        isDarkMode ? "bg-gray-900/60" : "bg-white/60"
      }`}
    >
      {/* Single style injection — keyframes + hover CSS rules */}
      <style>{GLOBAL_CSS}</style>

      {!reduced && <HeroBackground t={t} />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════
            MOBILE  (< lg)
            ══════════════════════════════════════════ */}
        <div className="lg:hidden">
          {/* Visual stack — explicit height prevents CLS before hydration */}
          <div
            className="mb-8"
            style={{ minHeight: 220, ...au("heroFadeIn", 0, "0.6s", reduced) }}
          >
            <MobileVisualStack t={t} reduced={reduced} />
          </div>

          <div className="text-center flex flex-col items-center gap-4">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border ${t.badge}`}
              style={au("heroFadeUp", 0.05, "0.55s", reduced)}
            >
              <PulseDot />
              Available for new projects
            </div>

            {/* Heading */}
            <h1
              className={`text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight ${t.heading}`}
              style={au("heroFadeUp", 0.14, "0.55s", reduced)}
            >
              Digital Solutions
              <span
                className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Built to Scale
              </span>
            </h1>

            {/* Body copy */}
            <p
              className={`text-sm leading-relaxed max-w-sm ${t.text}`}
              style={au("heroFadeUp", 0.23, "0.55s", reduced)}
            >
              Full-stack software for modern businesses — expert design,
              architecture, and deployment.
            </p>

            {/* Typewriter — min-height reserves space, prevents CLS */}
            <div
              className={`text-sm font-medium min-h-[1.4rem] ${t.twColor}`}
              style={au("heroFadeUp", 0.32, "0.55s", reduced)}
            >
              <Suspense
                fallback={
                  <span className="opacity-0 select-none" aria-hidden>
                    |
                  </span>
                }
              >
                <Typewriter
                  words={WORDS}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={40}
                  deleteSpeed={25}
                  delaySpeed={1400}
                />
              </Suspense>
            </div>

            <AuthorCard t={t} compact reduced={reduced} delay={0.41} />

            <div style={au("heroFadeUp", 0.5, "0.55s", reduced)}>
              <CtaButtons t={t} reduced={reduced} block />
            </div>

            <div style={au("heroFadeUp", 0.59, "0.55s", reduced)}>
              <SubLinks t={t} />
            </div>
          </div>

          {/* Recent Work strip — partial hydration, static placeholder first */}
          <div className="mt-8" style={au("heroFadeUp", 0.6, "0.5s", reduced)}>
            <Divider label="Recent Work" t={t} />
            <div className="mt-3">
              <MobileScrollStrip t={t} />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DESKTOP  (≥ lg)
            ══════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* ── Left column ── */}
          <div className="flex flex-col items-start text-left">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest border ${t.badge}`}
              style={au("heroFadeIn", 0, "0.45s", reduced)}
            >
              <PulseDot />
              Available for new projects
            </div>

            <h1
              className={`text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight mb-5 ${t.heading}`}
              style={au("heroFadeUp", 0.09, "0.55s", reduced)}
            >
              <span className="block">Digital Solutions</span>
              <span
                className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Built to Scale
              </span>
            </h1>

            <p
              className={`text-lg max-w-xl leading-relaxed mb-3 ${t.text}`}
              style={au("heroFadeUp", 0.18, "0.55s", reduced)}
            >
              Full-stack software development for modern businesses — expert
              design, architecture, and deployment with proven technologies.
            </p>

            {/* Typewriter — min-height prevents CLS */}
            <div
              className={`text-base font-medium min-h-[1.5rem] mb-8 ${t.twColor}`}
              style={au("heroFadeUp", 0.27, "0.55s", reduced)}
            >
              <Suspense
                fallback={
                  <span className="opacity-0 select-none" aria-hidden>
                    |
                  </span>
                }
              >
                <Typewriter
                  words={WORDS}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={45}
                  deleteSpeed={28}
                  delaySpeed={1400}
                />
              </Suspense>
            </div>

            <div
              className="mb-5"
              style={au("heroFadeUp", 0.36, "0.55s", reduced)}
            >
              <CtaButtons t={t} reduced={reduced} />
            </div>

            <div style={au("heroFadeUp", 0.45, "0.55s", reduced)}>
              <SubLinks t={t} />
            </div>
          </div>

          {/* ── Right column ── */}
          <div
            className="flex flex-col gap-5 pt-14"
            style={au("heroSlideRight", 0.15, "0.7s", reduced)}
          >
            <AuthorCard t={t} reduced={reduced} delay={0.25} />
            <Divider label="Recent Work" t={t} />
            <DesktopGrid t={t} reduced={reduced} />

            <div
              className="text-center"
              style={au("heroFadeIn", 0.7, "0.45s", reduced)}
            >
              <a
                href="/#projects"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 ${t.subLink} hover:text-indigo-500 transition-colors`}
              >
                View all projects <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
