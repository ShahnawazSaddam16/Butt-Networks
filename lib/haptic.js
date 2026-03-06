// /lib/haptic.js
import { useCallback, useRef, useEffect } from "react";

/* Pattern registry */
export const PATTERNS = {
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

/* Platform helpers */
const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};
const supportsVibration = () =>
  typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

/* AudioContext helpers */
let _audioCtx = null;
const getAudioCtx = () => {
  if (_audioCtx) return _audioCtx;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) _audioCtx = new Ctx();
  } catch (_) {
    _audioCtx = null;
  }
  return _audioCtx;
};
const silentPulse = (durationMs = 10) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return false;
    if (ctx.state === "suspended" && typeof ctx.resume === "function") {
      ctx.resume().catch(() => {});
    }
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + durationMs / 1000);
    return true;
  } catch (_) {
    return false;
  }
};

/* Hidden label trick for some iOS variants */
const createHiddenLabelTrigger = () => {
  if (typeof document === "undefined") return null;
  const id = "__web_haptic_input";
  if (document.getElementById(id)) {
    const label = document.querySelector(`label[for="${id}"]`);
    return { trigger: () => label && label.click(), dispose: () => {} };
  }

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = id;
  input.style.position = "fixed";
  input.style.left = "-9999px";
  input.style.width = "1px";
  input.style.height = "1px";
  input.style.opacity = "0";
  input.style.pointerEvents = "none";

  const label = document.createElement("label");
  label.htmlFor = id;
  label.style.position = "fixed";
  label.style.left = "-9999px";
  label.style.width = "1px";
  label.style.height = "1px";
  label.style.opacity = "0";
  label.style.pointerEvents = "none";

  document.body.appendChild(input);
  document.body.appendChild(label);

  return {
    trigger: () => {
      try {
        label.click();
      } catch (_) {
        try {
          input.click();
        } catch (_) {}
      }
    },
    dispose: () => {
      try {
        input.remove();
        label.remove();
      } catch (_) {}
    },
  };
};

/* Core fire function */
export const fireHaptic = (patternOrPreset = "medium", opts = {}) => {
  try {
    const pattern = Array.isArray(patternOrPreset)
      ? patternOrPreset
      : PATTERNS[patternOrPreset] ?? PATTERNS.medium;

    // Fast path: vibration (Android / supporting browsers)
    if (supportsVibration()) {
      navigator.vibrate(pattern);
      return true;
    }

    // iOS: try label trigger (if provided) then silent audio pulse
    if (opts.labelTrigger && typeof opts.labelTrigger === "function") {
      try {
        opts.labelTrigger();
        return true;
      } catch (_) {}
    }

    // Fallback: silent pulse; cap duration to avoid long audio ops
    const total = Array.isArray(pattern) ? pattern.reduce((a, b) => a + b, 0) : 10;
    const cap = Math.min(60, Math.max(10, total));
    return !!silentPulse(cap);
  } catch (_) {
    return false;
  }
};

/* Hook */
export default function useHaptic() {
  const labelTriggerRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    labelTriggerRef.current = createHiddenLabelTrigger();

    const resumeAudio = () => {
      const ctx = getAudioCtx();
      if (ctx && ctx.state === "suspended" && typeof ctx.resume === "function") {
        ctx.resume().catch(() => {});
      }
      window.removeEventListener("pointerdown", resumeAudio, true);
      window.removeEventListener("touchstart", resumeAudio, true);
      window.removeEventListener("click", resumeAudio, true);
    };

    window.addEventListener("pointerdown", resumeAudio, true);
    window.addEventListener("touchstart", resumeAudio, true);
    window.addEventListener("click", resumeAudio, true);

    return () => {
      try {
        if (labelTriggerRef.current && labelTriggerRef.current.dispose) {
          labelTriggerRef.current.dispose();
        }
      } catch (_) {}
      window.removeEventListener("pointerdown", resumeAudio, true);
      window.removeEventListener("touchstart", resumeAudio, true);
      window.removeEventListener("click", resumeAudio, true);
    };
  }, []);

  return useCallback((patternOrPreset = "medium") => {
    return fireHaptic(patternOrPreset, { labelTrigger: labelTriggerRef.current?.trigger });
  }, []);
}