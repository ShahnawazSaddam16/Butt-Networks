"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

/* ─── Utility ─────────────────────────────────────── */
const css = (...parts) => parts.filter(Boolean).join(" ");

/* ─── Animated number counter ────────────────────── */
const AnimatedPrice = ({ value, formatter }) => {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 90, damping: 18 });
  const [display, setDisplay] = useState(formatter.format(0));

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) =>
      setDisplay(formatter.format(Math.round(v))),
    );
    return unsub;
  }, [spring, formatter]);

  return <span>{display}</span>;
};

/* ─── Sparkle burst on selection ─────────────────── */
const Spark = ({ x, y, color }) => (
  <motion.span
    className="pointer-events-none absolute rounded-full"
    style={{ left: x, top: y, width: 6, height: 6, backgroundColor: color }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{
      scale: [0, 1.4, 0],
      opacity: [1, 1, 0],
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
    }}
    transition={{ duration: 0.55, ease: "easeOut" }}
  />
);

/* ─── Traffic Light ───────────────────────────────── */
const TrafficLight = ({ variant = "neutral", activeLabel }) => {
  const dots = [
    { key: "success", color: "#059669", pulse: variant === "success" },
    { key: "mid", color: "#d97706", pulse: variant === "mid" },
    { key: "warn", color: "#e11d48", pulse: variant === "warn" },
  ];

  return (
    <span
      className="inline-flex items-center gap-1.5"
      title={activeLabel}
      aria-hidden="true"
    >
      {dots.map((d) => (
        <span key={d.key} className="relative inline-block w-3 h-3">
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: d.pulse ? d.color : "#d1d5db" }}
            animate={
              d.pulse
                ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                : { scale: 1 }
            }
            transition={
              d.pulse
                ? { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
                : {}
            }
          />
          {d.pulse && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: d.color }}
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
            />
          )}
        </span>
      ))}
    </span>
  );
};

/* ─── Option Button ───────────────────────────────── */
const OptionButton = ({
  id,
  label,
  subtitle,
  selected,
  onSelect,
  variant = "neutral",
  isDarkMode,
}) => {
  const [sparks, setSparks] = useState([]);

  const palettes = {
    neutral: {
      bg: isDarkMode ? "#1f2937" : "#f9fafb",
      border: isDarkMode ? "#374151" : "#e5e7eb",
      text: isDarkMode ? "#f3f4f6" : "#111827",
      selectedBg: isDarkMode ? "#374151" : "#111827",
      selectedText: "#ffffff",
      sparkColor: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    success: {
      bg: isDarkMode ? "rgba(5,150,105,0.15)" : "#d1fae5",
      border: "#059669",
      text: isDarkMode ? "#6ee7b7" : "#065f46",
      selectedBg: "#059669",
      selectedText: "#ffffff",
      sparkColor: "#34d399",
    },
    mid: {
      bg: isDarkMode ? "rgba(217,119,6,0.15)" : "#fef3c7",
      border: "#d97706",
      text: isDarkMode ? "#fcd34d" : "#78350f",
      selectedBg: "#d97706",
      selectedText: "#ffffff",
      sparkColor: "#fbbf24",
    },
    warn: {
      bg: isDarkMode ? "rgba(225,29,72,0.15)" : "#ffe4e6",
      border: "#e11d48",
      text: isDarkMode ? "#fda4af" : "#881337",
      selectedBg: "#e11d48",
      selectedText: "#ffffff",
      sparkColor: "#f43f5e",
    },
  };

  const p = palettes[variant] || palettes.neutral;

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const newSparks = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: cx,
      y: cy,
      color: p.sparkColor,
    }));
    setSparks((s) => [...s, ...newSparks]);
    setTimeout(() => setSparks([]), 600);
    onSelect(id);
  };

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={handleClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="relative w-full text-left p-3 rounded-xl border flex flex-col gap-1 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: selected ? p.selectedBg : p.bg,
        borderColor: selected ? p.selectedBg : p.border,
        color: selected ? p.selectedText : p.text,
        boxShadow: selected
          ? `0 0 0 3px ${p.sparkColor}55, 0 4px 16px ${p.sparkColor}33`
          : undefined,
      }}
    >
      {/* Shine sweep on select */}
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 55%, transparent 70%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {sparks.map((s) => (
        <Spark key={s.id} x={s.x} y={s.y} color={s.color} />
      ))}

      <span className="font-bold text-sm leading-tight capitalize relative z-10">
        {label}
      </span>
      {subtitle && (
        <small className="text-xs opacity-75 relative z-10">{subtitle}</small>
      )}

      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute top-2 right-2 text-xs font-bold"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

/* ─── Section Wrapper with stagger ───────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

/* ─── Main Component ─────────────────────────────── */
const MakeWeb = () => {
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [delivery, setDelivery] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasQuoted, setHasQuoted] = useState(false);

  const theme = typeof useTheme === "function" ? useTheme() : undefined;
  const isDarkMode = theme?.isDarkMode ?? false;

  const PROJECTS = useMemo(
    () => ({
      website: {
        label: "Website",
        base: 145,
        hint: "Marketing or business site",
        icon: "🌐",
      },
      reactnative: {
        label: "React Native",
        base: 270,
        hint: "Cross-platform mobile app",
        icon: "📱",
      },
      ecommerce: {
        label: "E-commerce",
        base: 215,
        hint: "Online store with products",
        icon: "🛒",
      },
      portfolio: {
        label: "Portfolio",
        base: 70,
        hint: "Simple personal site",
        icon: "🎨",
      },
      api: {
        label: "API + Backend",
        base: 125,
        hint: "Server / API work",
        icon: "⚙️",
      },
    }),
    [],
  );

  const BUDGET_OPTIONS = [
    {
      value: "low",
      label: "Low",
      add: 0,
      variant: "success",
      hint: "Cost-conscious",
    },
    {
      value: "medium",
      label: "Medium",
      add: 50,
      variant: "mid",
      hint: "Good balance",
    },
    {
      value: "high",
      label: "High",
      add: 100,
      variant: "warn",
      hint: "Premium build",
    },
  ];

  const DELIVERY_OPTIONS = [
    { value: "normal", label: "Normal", add: 0, hint: "7–10 days", icon: "🐢" },
    { value: "fast", label: "Fast", add: 75, hint: "3–5 days", icon: "🚀" },
    {
      value: "superfast",
      label: "Super Fast",
      add: 150,
      hint: "24–48 hrs",
      icon: "⚡",
    },
  ];

  const priceBreakdown = useMemo(() => {
    const project = PROJECTS[projectType];
    if (!project)
      return { total: 0, base: 0, budgetAdd: 0, deliveryAdd: 0, valid: false };
    const base = project.base;
    const budgetAdd = BUDGET_OPTIONS.find((b) => b.value === budget)?.add ?? 0;
    const deliveryAdd =
      DELIVERY_OPTIONS.find((d) => d.value === delivery)?.add ?? 0;
    return {
      total: base + budgetAdd + deliveryAdd,
      base,
      budgetAdd,
      deliveryAdd,
      valid: true,
    };
  }, [projectType, budget, delivery, PROJECTS]);

  const priceStatus = useMemo(() => {
    if (!priceBreakdown.valid) return { label: "—", variant: "neutral" };
    const { base, total } = priceBreakdown;
    if (total <= base * 1.4)
      return { label: "Budget-Friendly", variant: "success", emoji: "🟢" };
    if (total <= base * 1.8)
      return { label: "Mid-Range", variant: "mid", emoji: "🟡" };
    return { label: "Premium", variant: "warn", emoji: "🔴" };
  }, [priceBreakdown]);

  const gradientMap = {
    success: "from-emerald-500 to-teal-600",
    mid: "from-amber-500 to-orange-500",
    warn: "from-rose-500 to-pink-600",
    neutral: isDarkMode
      ? "from-gray-800 to-gray-900"
      : "from-gray-100 to-gray-200",
  };
  const currentGradient = gradientMap[priceStatus.variant];

  const currency = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const resetAll = () => {
    setProjectType("");
    setBudget("");
    setDelivery("");
    setHasQuoted(false);
  };

  const handleCopy = () => {
    const parts = [
      projectType && PROJECTS[projectType].label,
      budget && `Budget: ${budget}`,
      delivery && `Delivery: ${delivery}`,
      `Estimate: ${currency.format(priceBreakdown.total)}`,
    ].filter(Boolean);
    navigator?.clipboard?.writeText?.(
      `Project Estimate — ${parts.join(" • ")}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressSteps = [!!projectType, !!budget, !!delivery];
  const progressCount = progressSteps.filter(Boolean).length;

  return (
    <section
      aria-labelledby="make-project-title"
      className={css(
        "max-w-4xl mx-auto mt-16 p-5 sm:p-8",
        isDarkMode ? "text-gray-100" : "text-gray-900",
      )}
    >
      {/* ── Header ── */}
      <motion.header
        className="text-center mb-8"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          id="make-project-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
        >
          Build Your Project Budget
        </h1>
        <p
          className={css(
            "mt-2 max-w-xl mx-auto text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500",
          )}
        >
          Three quick choices. Instant transparent estimate. No forms, no fluff.
        </p>

        {/* Progress bar */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {["Project", "Budget", "Delivery"].map((step, i) => (
            <React.Fragment key={step}>
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 * i }}
              >
                <motion.span
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                  animate={{
                    backgroundColor: progressSteps[i]
                      ? "#059669"
                      : isDarkMode
                        ? "#374151"
                        : "#e5e7eb",
                    color: progressSteps[i]
                      ? "#fff"
                      : isDarkMode
                        ? "#9ca3af"
                        : "#6b7280",
                    scale: progressSteps[i] ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {progressSteps[i] ? "✓" : i + 1}
                </motion.span>
                <span
                  className={css(
                    "text-xs font-medium hidden sm:block",
                    isDarkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  {step}
                </span>
              </motion.div>
              {i < 2 && (
                <div
                  className="flex-1 max-w-[3rem] h-0.5 rounded-full overflow-hidden"
                  style={{
                    backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
                  }}
                >
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    animate={{ scaleX: progressSteps[i] ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.header>

      {/* ── Main Grid ── */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── LEFT PANEL ── */}
        <motion.div
          className={css(
            "lg:col-span-2 border rounded-2xl p-6 space-y-7 shadow-sm",
            isDarkMode
              ? "bg-gray-800/80 border-gray-700"
              : "bg-white/80 border-gray-200 backdrop-blur-sm",
          )}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Project Type */}
          <fieldset className="space-y-3">
            <legend
              className={css(
                "text-xs uppercase tracking-widest font-semibold",
                isDarkMode ? "text-gray-400" : "text-gray-400",
              )}
            >
              01 · Project Type
            </legend>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {Object.entries(PROJECTS).map(([key, { label, hint, icon }]) => (
                <motion.div key={key} variants={itemVariants}>
                  <OptionButton
                    id={key}
                    label={`${icon} ${label}`}
                    subtitle={hint}
                    selected={projectType === key}
                    onSelect={setProjectType}
                    variant="neutral"
                    isDarkMode={isDarkMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          </fieldset>

          {/* Budget Range */}
          <fieldset className="space-y-3">
            <legend
              className={css(
                "text-xs uppercase tracking-widest font-semibold",
                isDarkMode ? "text-gray-400" : "text-gray-400",
              )}
            >
              02 · Budget Range
            </legend>
            <motion.div
              className="grid grid-cols-3 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <motion.div key={opt.value} variants={itemVariants}>
                  <OptionButton
                    id={opt.value}
                    label={opt.label}
                    subtitle={opt.hint}
                    selected={budget === opt.value}
                    onSelect={setBudget}
                    variant={opt.variant}
                    isDarkMode={isDarkMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          </fieldset>

          {/* Delivery */}
          <fieldset className="space-y-3">
            <legend
              className={css(
                "text-xs uppercase tracking-widest font-semibold",
                isDarkMode ? "text-gray-400" : "text-gray-400",
              )}
            >
              03 · Delivery Speed
            </legend>
            <motion.div
              className="grid grid-cols-3 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {DELIVERY_OPTIONS.map((opt) => (
                <motion.div key={opt.value} variants={itemVariants}>
                  <OptionButton
                    id={opt.value}
                    label={`${opt.icon} ${opt.label}`}
                    subtitle={opt.hint}
                    selected={delivery === opt.value}
                    onSelect={setDelivery}
                    variant="neutral"
                    isDarkMode={isDarkMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          </fieldset>

          {/* Reset */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              type="button"
              onClick={resetAll}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={css(
                "py-2 px-4 rounded-lg text-xs font-semibold border transition-colors",
                isDarkMode
                  ? "border-gray-600 text-gray-400 hover:text-gray-200 hover:border-gray-400"
                  : "border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400",
              )}
            >
              ↺ Reset
            </motion.button>

            {/* Mini completion badge */}
            <AnimatePresence>
              {progressCount === 3 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="text-xs font-semibold text-emerald-500 flex items-center gap-1"
                >
                  <motion.span
                    animate={{ rotate: [0, 20, -10, 0] }}
                    transition={{ delay: 0.1 }}
                  >
                    🎉
                  </motion.span>
                  All set!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── RIGHT PANEL: ESTIMATE CARD ── */}
        <motion.aside
          className={css(
            "rounded-2xl p-6 shadow-2xl flex flex-col gap-5 justify-between overflow-hidden relative",
            `bg-gradient-to-br ${currentGradient}`,
          )}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          aria-live="polite"
        >
          {/* Animated blob background */}
          <motion.div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ backgroundColor: "white" }}
            animate={{ scale: [1, 1.2, 1], x: [0, 8, 0], y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-10 pointer-events-none"
            style={{ backgroundColor: "white" }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/70">
              Estimated Price
            </h2>

            <AnimatePresence mode="wait">
              {!priceBreakdown.valid ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-3"
                >
                  <p className="text-white/60 text-sm mt-2">
                    ← Pick a project type to start
                  </p>
                  <div className="mt-4 space-y-2">
                    {[80, 60, 70].map((w, i) => (
                      <motion.div
                        key={i}
                        className="h-3 rounded-full bg-white/10"
                        style={{ width: `${w}%` }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="price"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <p className="mt-2 text-4xl font-extrabold text-white tracking-tight">
                    <AnimatedPrice
                      value={priceBreakdown.total}
                      formatter={currency}
                    />
                  </p>

                  {/* Breakdown rows */}
                  <div className="mt-4 bg-black/15 rounded-xl p-3.5 space-y-2 text-sm text-white/90">
                    {[
                      {
                        label: `${PROJECTS[projectType]?.icon} ${PROJECTS[projectType]?.label}`,
                        val: priceBreakdown.base,
                      },
                      { label: "Budget tier", val: priceBreakdown.budgetAdd },
                      {
                        label: "Delivery speed",
                        val: priceBreakdown.deliveryAdd,
                      },
                    ].map((row, i) => (
                      <motion.div
                        key={row.label}
                        className="flex justify-between items-center"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <span className="opacity-80">{row.label}</span>
                        <span className="font-semibold tabular-nums">
                          {currency.format(row.val)}
                        </span>
                      </motion.div>
                    ))}
                    <div className="border-t border-white/20 my-1" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{currency.format(priceBreakdown.total)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status row */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white/70 font-medium text-xs uppercase tracking-wide">
                  Status
                </span>
                <TrafficLight
                  variant={priceStatus.variant}
                  activeLabel={priceStatus.label}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={priceStatus.label}
                  className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 px-2.5 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {priceStatus.label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={() => {
                  setHasQuoted(true);
                  window?.open?.("/Contact", "_blank");
                }}
                disabled={!priceBreakdown.valid}
                whileHover={priceBreakdown.valid ? { scale: 1.03, y: -1 } : {}}
                whileTap={priceBreakdown.valid ? { scale: 0.97 } : {}}
                className={css(
                  "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none focus-visible:ring-2",
                  priceBreakdown.valid
                    ? "bg-white text-gray-900 shadow-lg"
                    : "bg-white/20 text-white/40 cursor-not-allowed",
                )}
              >
                {hasQuoted ? "✓ Requested" : "Get a Quote →"}
              </motion.button>

              <div className="relative">
                <motion.button
                  type="button"
                  onClick={handleCopy}
                  disabled={!priceBreakdown.valid}
                  whileHover={priceBreakdown.valid ? { scale: 1.05 } : {}}
                  whileTap={priceBreakdown.valid ? { scale: 0.95 } : {}}
                  className={css(
                    "py-2.5 px-3 rounded-xl text-sm font-semibold border border-white/30 bg-white/10 text-white backdrop-blur transition",
                    !priceBreakdown.valid && "opacity-40 cursor-not-allowed",
                  )}
                >
                  {copied ? "✓" : "Copy"}
                </motion.button>

                <AnimatePresence>
                  {copied && (
                    <motion.span
                      className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 shadow-xl"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                    >
                      Copied! 🎉
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.aside>
      </main>

      <motion.footer
        className={css(
          "mt-6 text-center text-xs",
          isDarkMode ? "text-gray-600" : "text-gray-400",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        * Estimates only — final pricing depends on scope, integrations &amp;
        features. Contact us for a firm quote.
      </motion.footer>
    </section>
  );
};

export default MakeWeb;
