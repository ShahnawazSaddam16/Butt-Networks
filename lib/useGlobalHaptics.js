// /lib/useGlobalHaptics.js
import { useEffect, useRef } from "react";

/**
 * useGlobalHaptics(triggerHaptic, { cooldownMs = 250 })
 * - auto-triggers for interactive controls
 * - supports data-haptic="selection|light|rigid|..." override
 * - supports data-no-haptic to opt-out per element
 * - per-element + small global cooldown using WeakMap (no leaks)
 */
const DEFAULT_SELECTOR = [
  "button:not([disabled]):not([aria-disabled='true'])",
  "a[href]",
  "[role='button']:not([aria-disabled='true'])",
  "input[type='button']:not([disabled])",
  "input[type='submit']:not([disabled])",
  "[data-haptic]",
].join(",");

export default function useGlobalHaptics(triggerHaptic, options = {}) {
  const { cooldownMs = 250 } = options;
  const lastTriggeredRef = useRef(new WeakMap());
  const globalLastRef = useRef(0);

  useEffect(() => {
    if (!triggerHaptic || typeof document === "undefined") return;

    const now = () => Date.now();

    const shouldSkip = (e, el) => {
      if (!el) return true;
      if (e.defaultPrevented) return true;
      if (e instanceof MouseEvent && "button" in e && e.button !== 0)
        return true; // only primary
      if (
        el.hasAttribute("disabled") ||
        el.getAttribute("aria-disabled") === "true"
      )
        return true;
      if (el.getAttribute("aria-hidden") === "true") return true;
      if (el.draggable) return true;
      return false;
    };

    const shouldFire = (el) => {
      const t = lastTriggeredRef.current.get(el) || 0;
      const g = globalLastRef.current || 0;
      const n = now();
      const globalGuard = Math.min(100, Math.floor(cooldownMs / 2));
      if (n - g < globalGuard) return false;
      if (n - t < cooldownMs) return false;
      lastTriggeredRef.current.set(el, n);
      globalLastRef.current = n;
      return true;
    };

    const resolvePattern = (el) => {
      if (!el) return null;
      if (el.hasAttribute("data-no-haptic")) return null;
      const override = el.getAttribute("data-haptic");
      if (override) return override;
      if (el.matches("button, input[type='button'], input[type='submit']"))
        return "rigid";
      if (el.matches("a[href]")) return "soft";
      if (el.getAttribute("role") === "button") return "medium";
      return "light";
    };

    const handleClick = (e) => {
      const el = e.target?.closest?.(DEFAULT_SELECTOR);
      if (!el) return;
      if (shouldSkip(e, el)) return;
      const pattern = resolvePattern(el);
      if (!pattern) return;
      if (!shouldFire(el)) return;
      try {
        triggerHaptic(pattern);
      } catch (_) {}
    };

    const handleKeyDown = (e) => {
      if (!(e.key === "Enter" || e.key === " " || e.key === "Spacebar")) return;
      const active = document.activeElement;
      if (!active || !active.matches?.(DEFAULT_SELECTOR)) return;
      if (e.defaultPrevented) return;
      const pattern = resolvePattern(active);
      if (!pattern) return;
      if (!shouldFire(active)) return;
      try {
        triggerHaptic(pattern);
      } catch (_) {}
    };

    document.addEventListener("click", handleClick, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [triggerHaptic, cooldownMs]);
}
