"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BirthdayShootMinimal({ auto = true, autoDelay = 700 }) {
  const [stage, setStage] = useState("hidden"); // hidden -> idle -> shooting -> explode -> fireworks -> message -> gone
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const lastTsRef = useRef(0);
  const fpsSamplesRef = useRef([]);
  const dynamicScaleRef = useRef(1);
  const [isReady, setIsReady] = useState(false);

  // Show only between 2 Nov 2025 (00:00) and 3 Nov 2025 (23:59:59) local time
  useEffect(() => {
    const today = new Date();
    const showDate = new Date("2025-11-02T00:00:00");
    const hideDate = new Date("2025-11-03T23:59:59");
    if (today >= showDate && today <= hideDate) {
      setStage("idle");
    } else {
      setStage("hidden");
    }
  }, []);

  const computeTarget = () => {
    if (typeof window === "undefined") return { x: 420, y: -320 };
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
    );
    const x = vw * (vw < 480 ? 0.55 : vw < 900 ? 0.52 : 0.58);
    const y = -vh * (vw < 480 ? 0.58 : vw < 900 ? 0.5 : 0.46);
    return { x, y };
  };
  const target = computeTarget();

  // -------------------------
  // Performance detection
  // -------------------------
  const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  const cores =
    typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
  const mem =
    typeof navigator !== "undefined" ? navigator.deviceMemory || 4 : 4;
  // heuristic: detect integrated GPU strings (not perfect, but helpful)
  const integratedUA =
    /intel|uhd|hd graphics|integrated|mali|powervr|radeon\s?vega/i.test(ua);
  const isLowPower = mem <= 2 || cores <= 2 || integratedUA;

  // -------------------------
  // Tunable settings (adaptive)
  // -------------------------
  const MAX_PARTICLES = isLowPower ? 300 : 600;
  const BASE_PARTICLES_PER_BURST = isLowPower ? 10 : 20;
  const EXPLOSION_PARTS = isLowPower ? 24 : 48;
  const GRAVITY = 220; // px/s^2
  const PALETTE = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C084FC"];

  // Initialize particle pool once
  useEffect(() => {
    const pool = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      pool.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 2,
        life: 0,
        age: 0,
        color: "#fff",
      });
    }
    particlesRef.current = pool;
    setIsReady(true);
    return () => {
      // cleanup on unmount handled elsewhere
    };
  }, [MAX_PARTICLES]);

  // spawn from pool
  function spawnParticle(x, y, angle, speed, size, life, color) {
    const pool = particlesRef.current;
    for (let i = 0; i < pool.length; i++) {
      const p = pool[i];
      if (!p.active) {
        p.active = true;
        p.x = x;
        p.y = y;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.size = size;
        p.life = life;
        p.age = 0;
        p.color = color;
        return p;
      }
    }
    // pool exhausted: reuse random particle (cheap fallback)
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    fallback.active = true;
    fallback.x = x;
    fallback.y = y;
    fallback.vx = Math.cos(angle) * speed;
    fallback.vy = Math.sin(angle) * speed;
    fallback.size = size;
    fallback.life = life;
    fallback.age = 0;
    fallback.color = color;
    return fallback;
  }

  function createExplosion(cx, cy) {
    for (let i = 0; i < EXPLOSION_PARTS; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 140;
      const size = 4 + Math.random() * 10;
      const life = 1.0 + Math.random() * 1.6; // seconds
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      spawnParticle(cx, cy, angle, speed, size, life, color);
    }
  }

  function createFireworkBurst(cx, cy, color) {
    // scale by measured dynamicScale (self-throttles if fps drops)
    const dynamicScale = dynamicScaleRef.current || 1;
    const count = Math.max(
      6,
      Math.floor(BASE_PARTICLES_PER_BURST * dynamicScale),
    );
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const speed =
        (isLowPower ? 60 : 80) + Math.random() * (isLowPower ? 80 : 220);
      const size =
        (isLowPower ? 2.8 : 3) + Math.random() * (isLowPower ? 3.8 : 6);
      const life =
        (isLowPower ? 1.0 : 1.6) + Math.random() * (isLowPower ? 0.6 : 1.4);
      spawnParticle(cx, cy, angle, speed, size, life, color);
    }
  }

  // -------------------------
  // Canvas draw loop
  // -------------------------
  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const usedDpr = isLowPower ? Math.min(dpr, 1.5) : dpr;

    function resize() {
      const w = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );
      const h = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      );
      canvas.width = Math.round(w * usedDpr);
      canvas.height = Math.round(h * usedDpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(usedDpr, 0, 0, usedDpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // cheaper fade alpha and composite choice for integrated GPUs
    const fadeAlpha = isLowPower ? 0.42 : 0.18;
    const compositeOp = isLowPower ? "source-over" : "lighter"; // 'lighter' is prettier but heavier
    ctx.globalCompositeOperation = compositeOp;

    function step(ts) {
      rafRef.current = requestAnimationFrame(step);

      // ---- measure fps for dynamic throttle ----
      const fpsSamples = fpsSamplesRef.current;
      fpsSamples.push(ts);
      if (fpsSamples.length > 20) {
        const delta = fpsSamples[fpsSamples.length - 1] - fpsSamples[0];
        const fps = (fpsSamples.length * 1000) / delta;
        // adjust scale slowly
        if (fps < 45 && dynamicScaleRef.current > 0.4)
          dynamicScaleRef.current *= 0.92;
        if (fps > 58 && dynamicScaleRef.current < 1.05)
          dynamicScaleRef.current *= 1.03;
        // clamp
        dynamicScaleRef.current = Math.max(
          0.4,
          Math.min(1.0, dynamicScaleRef.current),
        );
        fpsSamples.shift();
      }

      if (!lastTsRef.current) {
        lastTsRef.current = ts;
        return;
      }
      let dt = (ts - lastTsRef.current) / 1000;
      if (dt > 0.06) dt = 0.06;
      lastTsRef.current = ts;

      // fade previous frame instead of full clear (cheaper)
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = isLowPower ? 0.35 : 0.22; // fade trails a bit faster on slow GPUs
      ctx.fillRect(0, 0, canvas.width / usedDpr, canvas.height / usedDpr);
      ctx.restore();

      const pool = particlesRef.current;
      for (let i = 0; i < pool.length; i++) {
        const p = pool[i];
        if (!p.active) continue;
        p.age += dt;
        if (p.age >= p.life) {
          p.active = false;
          continue;
        }
        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const t = p.age / p.life;
        const alpha = 1 - t;
        const size = p.size * (1 - t * 0.6);

        // lightweight draw: no shadowBlur on low-power devices
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.globalCompositeOperation = compositeOp;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, Math.max(0.4, size), 0, Math.PI * 2);
        ctx.fill();

        // subtle soft edge for higher-power devices (cheap)
        if (!isLowPower) {
          ctx.globalAlpha = alpha * 0.08;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(2, size * 2.2), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      fpsSamplesRef.current = [];
      dynamicScaleRef.current = 1;
    };
  }, [isReady, isLowPower]);

  // -------------------------
  // Stage scheduling: explosions, fireworks, cleanup

  // -------------------------
  useEffect(() => {
    // clear previous timeouts
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    if (stage === "idle") {
      // clear any active particles
      const pool = particlesRef.current;
      for (let p of pool) p.active = false;
    }

    if (stage === "explode") {
      const canvas = canvasRef.current;
      const w = canvas
        ? canvas.width / (window.devicePixelRatio || 1)
        : window.innerWidth;
      const h = canvas
        ? canvas.height / (window.devicePixelRatio || 1)
        : window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      createExplosion(cx, cy);
      const t = setTimeout(() => setStage("fireworks"), 700);
      timeoutsRef.current.push(t);
    }

    if (stage === "fireworks") {
      const total = 64;
      const groupSize = 4;
      const groupDelay = isLowPower ? 600 : 600;
      const groupCount = Math.ceil(total / groupSize);
      const canvas = canvasRef.current;
      const w = canvas
        ? canvas.width / (window.devicePixelRatio || 1)
        : window.innerWidth;
      const h = canvas
        ? canvas.height / (window.devicePixelRatio || 1)
        : window.innerHeight;
      const baseY = h * 0.38;

      for (let i = 0; i < total; i++) {
        const groupIndex = Math.floor(i / groupSize);
        const idxInGroup = i % groupSize;
        const groupStart = groupIndex * groupDelay;
        const groupCenterX =
          w / 2 +
          (idxInGroup - (groupSize - 1) / 2) * 110 +
          (Math.random() * 40 - 20);
        const delay = groupStart + Math.random() * 300;

        const t = setTimeout(() => {
          const color = PALETTE[(groupIndex + idxInGroup) % PALETTE.length];
          createFireworkBurst(
            groupCenterX,
            baseY + (Math.random() * 40 - 20),
            color,
          );
        }, delay);
        timeoutsRef.current.push(t);
      }

      // Wait for groups + particle life; include buffer
      const approxMaxLife = isLowPower ? 1400 : 2200;
      const totalWait = groupDelay * groupCount + approxMaxLife + 500;
      const t2 = setTimeout(() => setStage("message"), totalWait);
      timeoutsRef.current.push(t2);
    }

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [stage, isLowPower]);

  // auto trigger from idle
  useEffect(() => {
    if (!auto || stage !== "idle") return;
    const t = setTimeout(() => setStage("shooting"), autoDelay);
    timeoutsRef.current.push(t);
    return () => {
      clearTimeout(t);
    };
  }, [auto, autoDelay, stage]);

  // shooting -> explode
  useEffect(() => {
    if (stage === "shooting") {
      const t = setTimeout(() => setStage("explode"), 900);
      timeoutsRef.current.push(t);
      return () => clearTimeout(t);
    }
  }, [stage]);

  // message -> gone
  useEffect(() => {
    if (stage === "message") {
      const t = setTimeout(() => setStage("gone"), 2600);
      timeoutsRef.current.push(t);
      return () => clearTimeout(t);
    }
  }, [stage]);

  // if hidden or gone, don't render canvas
  if (stage === "hidden") return null;

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "gone" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-transparent flex items-center justify-center"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence>
              {stage !== "explode" &&
                stage !== "fireworks" &&
                stage !== "message" && (
                  <motion.div
                    key="num15"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={
                      stage === "shooting" ? { scale: 0.98 } : { scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="select-none pointer-events-none"
                  >
                    <div className="font-bold leading-none text-white text-[clamp(48px,12vw,160px)] md:text-[clamp(72px,14vw,220px)] drop-shadow-2xl">
                      15
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {stage === "message" && (
                <motion.div
                  key="message"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 140, damping: 16 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <motion.div className="text-center">
                    <motion.div
                      className="font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 
                       text-[clamp(28px,8vw,84px)] md:text-[clamp(40px,9vw,110px)] 
                       drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                    >
                      16
                    </motion.div>

                    <motion.div
                      className="font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                       text-[clamp(28px,8vw,84px)] md:text-[clamp(48px,10vw,120px)] 
                       drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    >
                      Happy Birthday!
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      transition={{ delay: 0.3 }}
                      className="mt-2 text-sm text-transparent bg-clip-text 
                       bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 
                       drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    >
                      Wishing you the best 🎉
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {stage === "shooting" && (
              <motion.div
                className="absolute left-6 bottom-6 w-6 h-6 rounded-full shadow-xl"
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={{ x: target.x, y: target.y, scale: 1 }}
                transition={{ duration: 0.95, ease: [0.3, 0.7, 0.25, 1] }}
                style={{ background: "linear-gradient(45deg,#FFD93D,#FF6B6B)" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
