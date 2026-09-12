"use client";

import React, { useState} from "react";
import { ArrowRight, X, Sparkles } from "lucide-react";

export default function Header() {
  const [visible, setVisible] = useState(false);

  const handleDismiss = () => {
    localStorage.setItem("reelo-header-dismissed", "true");
    setVisible(false);
  };


  return (
    <div className="relative w-full bg-slate-950 border-b border-neutral-800/80 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-header-sweep" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-center gap-2 py-2 relative animate-header-slide-in">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-300 pr-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-neutral-300">New from ButtNetworks —</span>
            <span className="font-medium text-neutral-100">Reelo</span>
            <span className="hidden sm:inline text-neutral-300">
              is here, share your story with the world
            </span>
            <a
              href="https://7dish70hhldpcvsw.public.blob.vercel-storage.com/reelo.apk"
              target="_blank"
              download
              className="flex items-center gap-1 font-medium text-purple-400 hover:text-cyan-300 transition-colors ml-1"
            >
              Download
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="absolute right-0 p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes header-slide-in {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes header-sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        .animate-header-slide-in {
          animation: header-slide-in 0.5s ease-out;
        }
        .animate-header-sweep {
          animation: header-sweep 3.5s linear infinite;
        }
      `}</style>
    </div>
  );
}