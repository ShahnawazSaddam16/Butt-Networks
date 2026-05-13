"use client";

/**
 * Chatbot.jsx — Floating chat widget
 *
 * Streaming version:
 * - Browser calls /api/chat
 * - Next.js serverless route proxies to FastAPI
 * - FastAPI returns SSE chunks
 * - UI appends tokens live into the last bot bubble
 */

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Bot,
  User,
  Zap,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "./ThemeProvider"; // adjust path if needed

/* ─────────────────────────────────────────────────────────────
   THEME TOKENS
   ───────────────────────────────────────────────────────────── */

const tok = (d) => ({
  window: d ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
  header: d ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100",
  body: d ? "bg-gray-950" : "bg-gray-50",
  input: d
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-400",
  inputWrap: d ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100",
  userBubble: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
  botBubble: d
    ? "bg-gray-800 border border-gray-700 text-gray-100"
    : "bg-white border border-gray-100 text-gray-800",
  botAvatar: d ? "bg-gray-700" : "bg-indigo-50",
  botAvatarIcon: d ? "text-indigo-400" : "text-indigo-600",
  time: d ? "text-gray-500" : "text-gray-400",
  heading: d ? "text-white" : "text-gray-900",
  sub: d ? "text-gray-400" : "text-gray-500",
  divider: d ? "border-gray-800" : "border-gray-100",
  shadow: d
    ? "0 24px 64px rgba(0,0,0,.65), 0 4px 16px rgba(0,0,0,.4)"
    : "0 24px 64px rgba(0,0,0,.18), 0 4px 16px rgba(0,0,0,.08)",
  sendBtn:
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed",
  closeBtn: d
    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100",
  toggleShadow: d
    ? "0 8px 32px rgba(99,102,241,.45)"
    : "0 8px 32px rgba(99,102,241,.35)",
});

/* ─────────────────────────────────────────────────────────────
   MARKDOWN LITE
   ───────────────────────────────────────────────────────────── */

function renderMarkdown(text) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-black/10 dark:bg-white/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const bold = part.split(/(\*\*[^*]+\*\*)/g).map((s, j) => {
      if (s.startsWith("**") && s.endsWith("**")) {
        return <strong key={j}>{s.slice(2, -2)}</strong>;
      }
      return s;
    });

    return <React.Fragment key={i}>{bold}</React.Fragment>;
  });
}

/* ─────────────────────────────────────────────────────────────
   TYPING INDICATOR
   ───────────────────────────────────────────────────────────── */

const TypingDots = memo(() => (
  <span className="inline-flex items-center gap-1 h-4">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
        style={{
          animation: `typingBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
        }}
      />
    ))}
  </span>
));
TypingDots.displayName = "TypingDots";

/* ─────────────────────────────────────────────────────────────
   MESSAGE BUBBLE
   ───────────────────────────────────────────────────────────── */

const MessageBubble = memo(({ msg, t }) => {
  const isUser = msg.role === "user";
  const time = new Date(msg.ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && (
        <div
          className={`flex-none w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${t.botAvatar}`}
        >
          <Bot size={14} className={t.botAvatarIcon} />
        </div>
      )}

      <div
        className={`flex flex-col gap-1 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? `${t.userBubble} rounded-br-sm`
              : `${t.botBubble} rounded-bl-sm`
          }`}
        >
          {msg.typing ? (
            <TypingDots />
          ) : (
            <span>{renderMarkdown(msg.content)}</span>
          )}
        </div>
        <span className={`text-[10px] px-1 ${t.time}`}>{time}</span>
      </div>

      {isUser && (
        <div className="flex-none w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <User size={13} className="text-white" />
        </div>
      )}
    </motion.div>
  );
});
MessageBubble.displayName = "MessageBubble";

/* ─────────────────────────────────────────────────────────────
   SSE STREAM READER
   ───────────────────────────────────────────────────────────── */

async function streamBotReply({ session_id, message }, onToken, onDone) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session_id, message }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(errText || "Chat request failed");
  }

  const contentType = res.headers.get("content-type") || "";

  // Fallback if proxy/backend returns JSON instead of SSE.
  if (contentType.includes("application/json")) {
    const data = await res.json();
    if (typeof data?.reply === "string") onToken(data.reply);
    onDone?.();
    return;
  }

  if (!res.body) {
    throw new Error("Streaming response body is missing");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const dataLines = [];

      for (const line of lines) {
        if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trimStart());
        }
      }

      const data = dataLines.join("\n").trim();
      if (!data) continue;

      if (data === "[DONE]") {
        onDone?.();
        return;
      }

      try {
        const parsed = JSON.parse(data);
        if (parsed?.type === "token" && typeof parsed.token === "string") {
          onToken(parsed.token);
        } else if (typeof parsed.reply === "string") {
          onToken(parsed.reply);
        }
      } catch {
        onToken(data);
      }
    }
  }

  onDone?.();
}

/* ─────────────────────────────────────────────────────────────
   INITIAL MESSAGES
   ───────────────────────────────────────────────────────────── */

const INITIAL_MESSAGES = [
  {
    id: "welcome",
    role: "bot",
    content: "Hey there 👋 I'm the assistant. How can I help you today?",
    ts: Date.now(),
  },
];

/* ─────────────────────────────────────────────────────────────
   CHAT WINDOW
   ───────────────────────────────────────────────────────────── */

const ChatWindow = memo(({ t, onClose }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    setSessionId(id);
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    let sid = sessionId;
    if (!sid && typeof window !== "undefined") {
      sid = localStorage.getItem("session_id");
      if (!sid) {
        sid = crypto.randomUUID();
        localStorage.setItem("session_id", sid);
      }
      setSessionId(sid);
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      ts: Date.now(),
    };

    const botMsgId = `bot-${Date.now()}`;
    const botPlaceholder = {
      id: botMsgId,
      role: "bot",
      content: "",
      typing: true,
      ts: Date.now(),
    };

    setInput("");
    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    setLoading(true);

    let accumulated = "";

    try {
      await streamBotReply(
        { session_id: sid, message: text },
        (token) => {
          accumulated += token;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? { ...m, typing: false, content: accumulated }
                : m,
            ),
          );
        },
        () => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? {
                    ...m,
                    typing: false,
                    content: accumulated || "…",
                  }
                : m,
            ),
          );
        },
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
                ...m,
                typing: false,
                content: "Sorry, something went wrong. Please try again.",
              }
            : m,
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, sessionId]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    [send],
  );

  const reset = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  }, []);

  return (
    <motion.div
      id="chatbot-window"
      role="dialog"
      aria-modal="true"
      aria-label="Chat assistant"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-24 right-4 sm:right-6 z-[9999] flex flex-col w-[calc(100vw-2rem)] max-w-sm rounded-2xl border overflow-hidden ${t.window}`}
      style={{
        height: "min(600px, calc(100dvh - 120px))",
        boxShadow: t.shadow,
      }}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3.5 border-b flex-shrink-0 ${t.header}`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <Zap size={14} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold leading-none ${t.heading}`}>
            Site Assistant
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500 inline-flex" />
            </span>
            <span className={`text-[10px] font-medium ${t.sub}`}>Online</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={reset}
            aria-label="Reset conversation"
            className={`p-1.5 rounded-lg transition-colors ${t.closeBtn}`}
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className={`p-1.5 rounded-lg transition-colors ${t.closeBtn}`}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 ${t.body}`}
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} t={t} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={`flex-shrink-0 px-3 py-3 border-t ${t.inputWrap}`}>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything…"
            aria-label="Chat message input"
            disabled={loading}
            className={`flex-1 text-sm px-3.5 py-2.5 rounded-xl border outline-none transition-colors ${t.input}`}
          />
          <motion.button
            onClick={send}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`flex-none w-10 h-10 rounded-xl flex items-center justify-center transition-all ${t.sendBtn}`}
          >
            <Send size={15} />
          </motion.button>
        </div>
        <p className={`mt-1.5 text-[10px] text-center ${t.sub}`}>
          Press <kbd className="font-mono">Enter</kbd> to send
        </p>
      </div>
    </motion.div>
  );
});
ChatWindow.displayName = "ChatWindow";

/* ─────────────────────────────────────────────────────────────
   TOGGLE BUTTON
   ───────────────────────────────────────────────────────────── */

const ToggleButton = memo(({ open, onClick, t }) => (
  <motion.button
    onClick={onClick}
    aria-label={open ? "Close chat" : "Open chat"}
    aria-expanded={open}
    aria-controls="chatbot-window"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white"
    style={{ boxShadow: t.toggleShadow }}
  >
    <AnimatePresence mode="wait" initial={false}>
      {open ? (
        <motion.span
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Minimize2 size={20} />
        </motion.span>
      ) : (
        <motion.span
          key="open"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle size={20} />
        </motion.span>
      )}
    </AnimatePresence>

    {!open && (
      <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900 animate-pulse" />
    )}
  </motion.button>
));
ToggleButton.displayName = "ToggleButton";

/* ─────────────────────────────────────────────────────────────
   KEYFRAMES
   ───────────────────────────────────────────────────────────── */

const CHAT_CSS = `
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0);   opacity: .5 }
    30%           { transform: translateY(-5px); opacity: 1 }
  }
`;

/* ─────────────────────────────────────────────────────────────
   ROOT EXPORT
   ───────────────────────────────────────────────────────────── */

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const t = tok(isDarkMode);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <>
      <style>{CHAT_CSS}</style>

      <AnimatePresence>
        {open && <ChatWindow key="chat-window" t={t} onClose={close} />}
      </AnimatePresence>

      <ToggleButton open={open} onClick={toggle} t={t} />
    </>
  );
}
