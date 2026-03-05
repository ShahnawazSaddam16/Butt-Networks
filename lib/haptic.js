import { useCallback, useRef, useEffect } from "react";

// ── Pattern registry ──────────────────────────────────────────
const PATTERNS = {
  selection: [5],
  light:     [10],
  medium:    [25],
  heavy:     [50],
  rigid:     [20],
  soft:      [8],
  success:   [15, 80, 30],
  warning:   [10, 60, 10, 60, 20],
  error:     [80, 60, 80],
  peek:      [5, 40, 10],
  pop:       [12, 30, 8],
};

// ── iOS detection (no reliance on deprecated APIs) ────────────
const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

// ── Vibration API support ─────────────────────────────────────
const supportsVibration = () =>
  typeof navigator !== "undefined" &&
  typeof navigator.vibrate === "function";

// ── AudioContext silent pulse (iOS PWA taptic unlock) ─────────
let _audioCtx = null;
const getAudioCtx = () => {
  if (_audioCtx) return _audioCtx;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) _audioCtx = new Ctx();
  } catch (_) {}
  return _audioCtx;
};

const silentPulse = (durationMs = 10) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime); // silent
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + durationMs / 1000);
  } catch (_) {}
};

// ── Core fire function ────────────────────────────────────────
export const fireHaptic = (patternOrPreset = "medium") => {
  try {
    const pattern =
      Array.isArray(patternOrPreset)
        ? patternOrPreset
        : (PATTERNS[patternOrPreset] ?? PATTERNS.medium);

    // Android / non-iOS with Vibration API
    if (!isIOS() && supportsVibration()) {
      navigator.vibrate(pattern);
      return;
    }

    // iOS: try AudioContext silent pulse to activate Taptic Engine
    if (isIOS()) {
      const totalDuration = pattern.reduce((a, b) => a + b, 0);
      silentPulse(totalDuration);
      return;
    }
  } catch (_) {
    // Never throw — haptic is always enhancement-only
  }
};

// ── React Hook ────────────────────────────────────────────────
export const useHaptic = () => {
  return useCallback(fireHaptic, []);
};

export { PATTERNS };
export default useHaptic;
