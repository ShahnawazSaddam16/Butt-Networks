"use client";

import React, { useState, useEffect, useRef } from "react";
import { SiGithub } from "react-icons/si";
import { HiOutlineClipboardCopy, HiOutlineCheck } from "react-icons/hi";
import { useTheme } from "../components/ThemeProvider";

const CONTACT_EMAILS = [
  "shahnawazsaddamb@gmail.com",
  "wahbamir2010@gmail.com",
  "dev.buttnetworks@gmail.com",
];
const CLIENT_PORTAL = "https://dashboard.wahb.space" || "#";
const CLIENT_QUOTE = `${CLIENT_PORTAL}#request-quote`;

const teamGitHub = [
  { name: "Wahb Amir", url: "https://github.com/wahb-amir" },
  { name: "shahnawaz", url: "https://github.com/ShahanwazSaddam144" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [responseMsg, setResponseMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isBusy = status === "sending";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(
        () => setCopiedEmail((prev) => (prev === email ? null : prev)),
        2200,
      );
    } catch {
      // fallback: open mail client
      window.location.href = `mailto:${email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;
    setStatus("sending");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong 😬");

      setStatus("sent");
      setResponseMsg("✅ Message sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
        setResponseMsg("");
      }, 3000);
    } catch (error) {
      console.error("❌ Error submitting form:", error.message || error);
      setStatus("error");
      setResponseMsg(error.message || "Failed to send message.");
      setTimeout(() => {
        setStatus("idle");
        setResponseMsg("");
      }, 4000);
      alert(error.message || "Failed to send message.");
    }
  };

  /* THEME HELPERS */
  const containerBg = isDarkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-white text-gray-900";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-50";
  const cardText = isDarkMode ? "text-gray-100" : "text-gray-900";
  const subtleText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const inputBorder = isDarkMode ? "border-gray-700" : "border-gray-200";
  const inputFocus = isDarkMode
    ? "focus:border-gray-200 focus:ring-gray-600"
    : "focus:border-gray-900 focus:ring-gray-200";
  const actionBtnClass = isDarkMode
    ? "bg-gradient-to-r from-slate-800 to-black text-white"
    : "bg-gradient-to-r from-gray-800 to-gray-900 text-white";

  return (
    <section
      id="contact"
      className={`contact py-12 px-4 sm:py-16 transition-colors ${containerBg} mt-8`}
    >
      <div className="max-w-2xl mx-auto">
        <h1
          className={`text-2xl sm:text-4xl font-bold text-center mb-6 ${cardText}`}
        >
          Contact Our Team
        </h1>

        {/* Portal card */}
        <div
          className={`rounded-xl p-4 flex flex-col items-center text-center gap-3 mb-6 ${cardBg} ${cardText}`}
          role="note"
          aria-label="Client portal information"
          style={{
            border: `1px solid ${isDarkMode ? "#1f2937" : "#e2e8f0"}`,
            boxShadow: isDarkMode
              ? "0 6px 18px rgba(2,6,23,0.6)"
              : "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <h3 className="text-sm font-semibold">
              Client portal is live — manage projects & request quotes ✨
            </h3>
            <p className={`${subtleText} text-xs mt-2 max-w-lg mx-auto`}>
              If you’re a client, request a quote or open the portal for
              tracking. The form still works for quick messages.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href={CLIENT_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-md font-medium shadow-sm"
              aria-label="Request a quote"
              style={{
                backgroundColor: "#0ea5e9",
                color: isDarkMode ? "#0f172a" : "#fff",
                boxShadow: isDarkMode
                  ? "0 6px 18px rgba(14,165,233,0.16)"
                  : "0 6px 18px rgba(14,165,233,0.2)",
              }}
            >
              Request a quote
            </a>

            <a
              href={CLIENT_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-md font-medium border"
              aria-label="Open client portal"
              style={{
                borderColor: isDarkMode ? "#0f172a" : "#e6eef6",
                backgroundColor: isDarkMode ? "#111827" : "#fff",
                color: isDarkMode ? "#e6eef6" : "#000000",
              }}
            >
              Open portal
            </a>
          </div>
        </div>

        {/* emails + quick actions */}
        <div className="mb-6">
          <p className={`text-sm mb-3 ${subtleText} text-center`}>
            Quick contact emails — click to copy
          </p>

          {/* emails container: mobile-first: horizontally scrollable small devices, wraps on larger */}
          <div className="flex gap-3 overflow-x-auto px-1 py-1 sm:overflow-visible sm:flex-wrap sm:justify-center">
            {CONTACT_EMAILS.map((email) => {
              const isCopied = copiedEmail === email;
              return (
                <button
                  key={email}
                  type="button"
                  onClick={() => copyEmail(email)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      copyEmail(email);
                    }
                  }}
                  aria-label={`Copy email ${email}`}
                  className={`relative flex items-center gap-2 min-w-[160px] max-w-xs sm:max-w-[260px] px-3 py-2 rounded-full border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition
                    ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }
                    ${
                      isCopied
                        ? "ring-2 ring-green-400"
                        : "hover:translate-y-0.5"
                    }
                  `}
                >
                  {/* email text (truncate if too long) */}
                  <span
                    className="truncate min-w-0 font-medium"
                    style={{ direction: "ltr" }}
                  >
                    {email}
                  </span>

                  {/* tiny copy icon */}
                  <span
                    className={`flex items-center gap-1 text-xs ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <HiOutlineCheck className="w-4 h-4" aria-hidden />
                        <span className="sr-only">Copied</span>
                      </>
                    ) : (
                      <>
                        <HiOutlineClipboardCopy
                          className="w-4 h-4"
                          aria-hidden
                        />
                        <span className="sr-only">Copy</span>
                      </>
                    )}
                  </span>

                  {/* Copied badge */}
                  <span
                    className={`absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isCopied
                        ? "bg-emerald-500 text-white shadow-md"
                        : "opacity-0 pointer-events-none"
                    }`}
                    aria-hidden={!isCopied}
                  >
                    ✅
                  </span>
                </button>
              );
            })}
          </div>

          {/* polite live region for screen readers */}
          <div className="sr-only" aria-live="polite">
            {copiedEmail ? `Copied ${copiedEmail}` : ""}
          </div>

          {/* GitHub team dropdown */}
          <div className="mt-4 flex justify-center">
            <div className="relative inline-block text-left" ref={ref}>
              <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className={`inline-flex items-center justify-center px-3 py-2 rounded-full border font-medium shadow-sm transition
                  ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700"
                      : "bg-white border-gray-200 text-gray-900 hover:bg-gray-100"
                  }`}
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls="github-team-menu"
              >
                <SiGithub className="w-5 h-5 mr-2" />
                GitHub Team
              </button>

              {open && (
                <div
                  id="github-team-menu"
                  className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg z-10 transition-colors ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                  role="menu"
                >
                  <div className="py-1">
                    {teamGitHub.map((member) => (
                      <a
                        key={member.name}
                        href={member.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-4 py-2 text-sm transition ${
                          isDarkMode
                            ? "text-gray-100 hover:bg-gray-700"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                        role="menuitem"
                      >
                        <SiGithub className="w-4 h-4 mr-2" />
                        {member.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div>
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              value={formData.name}
              required
              className={`w-full border ${inputBorder} px-3 py-2 rounded-md outline-none transition placeholder:text-sm ${inputFocus} bg-transparent ${cardText}`}
            />
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              onChange={handleChange}
              value={formData.email}
              required
              className={`w-full border ${inputBorder} px-3 py-2 rounded-md outline-none transition placeholder:text-sm ${inputFocus} bg-transparent ${cardText}`}
            />
          </div>

          {/* phone */}
          <div>
            <label htmlFor="phone" className="sr-only">
              Your phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Your Phone"
              onChange={handleChange}
              value={formData.phone}
              required
              className={`w-full border ${inputBorder} px-3 py-2 rounded-md outline-none transition placeholder:text-sm ${inputFocus} bg-transparent ${cardText}`}
            />
          </div>

          {/* message */}
          <div>
            <label htmlFor="message" className="sr-only">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              onChange={handleChange}
              value={formData.message}
              required
              rows="4"
              className={`w-full border ${inputBorder} px-3 py-2 rounded-md outline-none transition resize-none placeholder:text-sm ${inputFocus} bg-transparent ${cardText}`}
            />
          </div>

          <button
            type="submit"
            disabled={isBusy}
            aria-busy={isBusy}
            aria-live="polite"
            className={`
    group relative w-full
    min-h-[48px]
    px-6 py-3
    rounded-xl
    font-semibold
    text-base
    shadow-lg
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    active:scale-[0.98]

    ${actionBtnClass}

    ${
      isBusy
        ? "opacity-70 cursor-not-allowed shadow-md"
        : "hover:shadow-2xl hover:scale-[1.02]"
    }

    ${
      status === "sent"
        ? "bg-emerald-600 hover:bg-emerald-600 focus-visible:ring-emerald-400"
        : status === "error"
          ? "bg-red-600 hover:bg-red-600 focus-visible:ring-red-400"
          : "focus-visible:ring-slate-400"
    }
  `}
          >
            <span className="flex items-center justify-center gap-2">
              {status === "sending" && (
                <span
                  className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                  aria-hidden="true"
                />
              )}

              <span>
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                    ? "Message Sent"
                    : status === "error"
                      ? "Try Again"
                      : "Get Started"}
              </span>
            </span>
          </button>
        </form>

        {responseMsg && (
          <p
            className="mt-4 text-center text-sm font-medium"
            style={{ color: isDarkMode ? "#86efac" : "#059669" }}
            role="status"
            aria-live="polite"
          >
            {responseMsg}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
