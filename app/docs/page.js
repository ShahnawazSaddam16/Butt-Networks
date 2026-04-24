"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Code2,
  Command,
  Copy,
  Flame,
  HelpCircle,
  Keyboard,
  Layers3,
  MoonStar,
  Play,
  Search,
  SunMedium,
  Terminal,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../components/ThemeProvider";

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    description: "What Butt Lang is and why it exists.",
  },
  {
    id: "install",
    title: "Install",
    icon: Terminal,
    description: "Set up the CLI and run your first .butt file.",
  },
  {
    id: "syntax",
    title: "Syntax",
    icon: Code2,
    description: "Learn the core keywords and what they mean.",
  },
  {
    id: "examples",
    title: "Examples",
    icon: Play,
    description: "Copy-paste programs that actually run.",
  },
  {
    id: "cli",
    title: "CLI",
    icon: Command,
    description: "Run Butt Lang from the terminal.",
  },
];

const syntaxRows = [
  { butt: "butt x = 10", meaning: "Creates a variable." },
  { butt: 'clap("hello")', meaning: "Prints to the console." },
  { butt: "vibe (x > 5) { ... } nah { ... }", meaning: "If / else logic." },
  { butt: "cheek add(a, b) { drop a + b }", meaning: "Declares a function and returns a value." },
  { butt: "wiggle (let i = 0; i < 3; i++) { ... }", meaning: "Loop syntax." },
  { butt: "drop x", meaning: "Returns a value from a function." },
];

const examples = [
  { title: "Hello Butt", code: `clap("BUTT LANG IS ALIVE 🍑")` },
  {
    title: "Variables + conditionals",
    code: `butt x = 12\n\nvibe (x > 10) {\n  clap("thicc number")\n} nah {\n  clap("small number")\n}`,
  },
  {
    title: "Function example",
    code: `cheek add(a, b) {\n  drop a + b\n}\n\nclap(add(2, 3))`,
  },
];

const quickLinks = sections.map((s) => ({
  label: s.title,
  href: `#${s.id}`,
  icon: s.icon,
}));

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({ icon: Icon, title, description, isDark }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm backdrop-blur",
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white",
        )}
      >
        <Icon className={cn("h-5 w-5", isDark ? "text-indigo-300" : "text-indigo-600")} />
      </div>

      <div>
        <h2 className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", isDark ? "text-white" : "text-slate-900")}>
          {title}
        </h2>

        <p className={cn("mt-1 max-w-2xl text-sm leading-6 sm:text-base", isDark ? "text-slate-400" : "text-slate-600")}>
          {description}
        </p>
      </div>
    </div>
  );
}

function CodeBlock({ code, isDark }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border shadow-2xl",
        isDark
          ? "border-white/10 bg-slate-950/90 shadow-black/30"
          : "border-slate-200 bg-white shadow-slate-200/60",
      )}
    >
      <div className={cn("flex items-center justify-between border-b px-4 py-3", isDark ? "border-white/10" : "border-slate-200")}>
        <div className={cn("flex items-center gap-2 text-xs", isDark ? "text-slate-400" : "text-slate-500")}>
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-medium">main.butt</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          className={cn(
            "h-8 gap-2 rounded-xl border px-3 text-xs",
            isDark
              ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
          )}
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <pre className={cn("overflow-x-auto px-4 py-4 text-sm leading-7", isDark ? "text-slate-200" : "text-slate-800")}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CommandPalette({ open, onClose, isDark }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return quickLinks;
    return quickLinks.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 py-20 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className={cn(
              "w-full max-w-2xl overflow-hidden rounded-3xl border shadow-[0_30px_80px_rgba(0,0,0,.45)]",
              isDark ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white",
            )}
          >
            <div className={cn("flex items-center gap-3 border-b px-4 py-4", isDark ? "border-white/10" : "border-slate-200")}>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", isDark ? "bg-white/5" : "bg-slate-100")}>
                <Search className={cn("h-4 w-4", isDark ? "text-indigo-300" : "text-indigo-600")} />
              </div>
              <div className="flex-1">
                <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-slate-900")}>Search docs</p>
                <p className={cn("text-xs", isDark ? "text-slate-400" : "text-slate-500")}>Type to jump to a section</p>
              </div>
              <div className={cn("hidden items-center gap-2 rounded-xl border px-2 py-1 text-xs sm:flex", isDark ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-slate-50 text-slate-600")}>
                <Keyboard className="h-3.5 w-3.5" />
                Esc
              </div>
            </div>

            <div className={cn("border-b p-4", isDark ? "border-white/10" : "border-slate-200")}>
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Overview, Syntax, CLI..."
                className={cn(
                  "h-12 rounded-2xl",
                  isDark
                    ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400",
                )}
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto p-3">
              <div className="grid gap-2">
                {filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm transition",
                        isDark
                          ? "text-slate-200 hover:border-white/10 hover:bg-white/5"
                          : "text-slate-700 hover:border-slate-200 hover:bg-slate-50",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-4 w-4", isDark ? "text-indigo-300" : "text-indigo-600")} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={cn("h-4 w-4", isDark ? "text-slate-500" : "text-slate-400")} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition",
        isDarkMode
          ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      )}
    >
      {isDarkMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
}

export default function ButtLangDocsPage() {
  const [openSearch, setOpenSearch] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setOpenSearch(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen",
        isDarkMode
          ? "bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.20),_transparent_34%),linear-gradient(to_bottom,_#020617,_#020617)] text-white"
          : "bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_34%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-900",
      )}
    >
      <CommandPalette open={openSearch} onClose={() => setOpenSearch(false)} isDark={isDarkMode} />

      <div className="mx-auto flex max-w-7xl gap-8 px-4 pt-28 pb-8 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-10">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 lg:block">
          <div
            className={cn(
              "rounded-3xl border p-5 shadow-2xl shadow-black/20 backdrop-blur-xl",
              isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-slate-200/60",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className={cn("text-sm font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>Butt Lang</p>
                <p className={cn("text-xs", isDarkMode ? "text-slate-400" : "text-slate-500")}>Docs for the cheeky language</p>
              </div>
            </div>

            <button
              onClick={() => setOpenSearch(true)}
              className={cn(
                "mt-5 flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
                isDarkMode
                  ? "border-white/10 bg-black/20 text-slate-300 hover:bg-white/5"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white",
              )}
            >
              <Search className={cn("h-4 w-4", isDarkMode ? "text-indigo-300" : "text-indigo-600")} />
              <span className="flex-1">Search docs...</span>
              <span className={cn("rounded-lg border px-2 py-1 text-[10px] font-medium uppercase tracking-widest", isDarkMode ? "border-white/10 bg-white/5 text-slate-400" : "border-slate-200 bg-white text-slate-500")}>
                Ctrl K
              </span>
            </button>

            <nav className="mt-5 grid gap-1.5">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
                      isDarkMode
                        ? "text-slate-300 hover:bg-white/5 hover:text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isDarkMode ? "text-indigo-300" : "text-indigo-600")} />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className={cn("h-4 w-4", isDarkMode ? "text-slate-500" : "text-slate-400")} />
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={cn(
              "relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10",
              isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/75 shadow-slate-200/70",
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                isDarkMode
                  ? "bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.20),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_26%)]"
                  : "bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.10),_transparent_26%)]",
              )}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={cn("rounded-full px-3 py-1", isDarkMode ? "border border-indigo-400/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/10" : "border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-50")}>
                    <Command className="mr-1 h-3.5 w-3.5" />
                    Butt Lang Docs
                  </Badge>
                  <Badge className={cn("rounded-full px-3 py-1", isDarkMode ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/5" : "border border-slate-200 bg-white text-slate-600 hover:bg-white")}>
                    <Layers3 className="mr-1 h-3.5 w-3.5" />
                    .butt files
                  </Badge>
                </div>

                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
                <div>
                  <h1 className={cn("max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl", isDarkMode ? "text-white" : "text-slate-950")}>
                    A modern docs page for a language with zero shame and maximum cheek.
                  </h1>
                  <p className={cn("mt-5 max-w-2xl text-base leading-7 sm:text-lg", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                    Butt Lang is a tiny meme language built to feel like a real dev tool. It has a CLI, a fake terminal moment, playful keywords, and enough structure to make the joke land hard.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      onClick={() => setOpenSearch(true)}
                      className="h-11 rounded-2xl bg-indigo-500 px-5 font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search docs
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        "h-11 rounded-2xl px-5 font-semibold",
                        isDarkMode
                          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      <a href="#install">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Get started
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 space-y-8">
            <section id="overview" className="scroll-mt-32">
              <Card className={cn("p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8", isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-slate-200/70")}>
                <SectionHeader
                  icon={BookOpen}
                  title="Overview"
                  description="Butt Lang is a funny little programming language built around a clean docs experience, a playful CLI, and a syntax that reads like a joke but behaves like code."
                  isDark={isDarkMode}
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card className={cn(isDarkMode ? "border-white/10 bg-black/20" : "border-slate-200 bg-white/70")}>
                    <CardContent className="p-5">
                      <p className={cn("text-xs uppercase tracking-[0.24em]", isDarkMode ? "text-slate-500" : "text-slate-400")}>What it is</p>
                      <p className={cn("mt-3 text-sm leading-7", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                        A tiny language runtime that translates Butt keywords into JavaScript-like behavior.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            </section>

            <section id="install" className="scroll-mt-32">
              <Card className={cn("p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8", isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-slate-200/70")}>
                <SectionHeader
                  icon={Terminal}
                  title="Install"
                  description="Clone the repo, install dependencies, link the CLI, then run a .butt file like a boss."
                  isDark={isDarkMode}
                />
                <div className="grid gap-4 xl:grid-cols-2">
                  <CodeBlock
                    isDark={isDarkMode}
                    code={`git clone https://github.com/wahb-amir/butt-programming-language \ncd butt-programming-language\nnpm install\nnpm link`}
                  />
                  <CodeBlock isDark={isDarkMode} code={`butt main.butt`} />
                </div>
              </Card>
            </section>

            <section id="syntax" className="scroll-mt-32">
              <Card className={cn("p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8", isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-slate-200/70")}>
                <SectionHeader
                  icon={Code2}
                  title="Syntax"
                  description="The keywords are funny, but the mapping is simple. Use these as your core language mental model."
                  isDark={isDarkMode}
                />
                <div className="grid gap-3">
                  {syntaxRows.map((row) => (
                    <div
                      key={row.butt}
                      className={cn(
                        "grid gap-3 rounded-2xl border p-4 lg:grid-cols-[1fr_1.3fr] lg:items-center",
                        isDarkMode ? "border-white/10 bg-black/20" : "border-slate-200 bg-white/70",
                      )}
                    >
                      <div className={cn("rounded-xl border px-4 py-3 font-mono text-sm", isDarkMode ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-700")}>
                        {row.butt}
                      </div>
                      <div className={cn("text-sm leading-6", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                        {row.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="examples" className="scroll-mt-32">
              <Card className={cn("p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8", isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-slate-200/70")}>
                <SectionHeader
                  icon={Play}
                  title="Examples"
                  description="Small examples that show the language flow without making the page feel like a wall of text."
                  isDark={isDarkMode}
                />
                <div className="grid gap-5 lg:grid-cols-3">
                  {examples.map((item) => (
                    <div key={item.title} className="space-y-3">
                      <div className={cn("flex items-center gap-2 text-sm font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                        <Zap className="h-4 w-4 text-indigo-300" />
                        {item.title}
                      </div>
                      <CodeBlock isDark={isDarkMode} code={item.code} />
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section id="cli" className="scroll-mt-32">
              <Card className={cn("p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8", isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-slate-200/70")}>
                <SectionHeader
                  icon={Command}
                  title="CLI"
                  description="The Butt CLI is the easiest part to show off: it looks real, sounds real, and runs the joke from the terminal."
                  isDark={isDarkMode}
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card className={cn(isDarkMode ? "border-white/10 bg-black/20" : "border-slate-200 bg-white/70")}>
                    <CardContent className="p-5">
                      <p className={cn("text-sm font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>Command</p>
                      <p className="mt-2 font-mono text-sm text-emerald-200">butt main.butt</p>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            </section>

            
          </div>
        </main>
      </div>
    </div>
  );
}