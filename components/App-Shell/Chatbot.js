"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Sora, Inter } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
const MAX_INPUT_LENGTH = 500;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm ButtNetworks Assistant. Ask me about our services, projects, or how to get started." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_INPUT_LENGTH || loading) return;

    const newMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_ORIGIN}/chatbot`, {
        method: 'POST',
          credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: newMessages.slice(-10),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.error || "Something went wrong. Please try again." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Unable to reach the server. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`${inter.className} fixed bottom-6 right-6 z-50`}>
      {isOpen && (
        <div className='mb-4 w-[90vw] max-w-sm h-[500px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-cyan-600/10 flex flex-col overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-cyan-600/10 border border-cyan-600/40 flex items-center justify-center'>
                <Bot size={16} className='text-cyan-400' />
              </div>
              <span className={`${sora.className} text-white text-sm font-bold`}>ButtNetworks Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='text-slate-400 hover:text-cyan-400 transition-colors duration-200'
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className='flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-slate-800 border border-slate-700'
                      : 'bg-cyan-600/10 border border-cyan-600/40'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User size={14} className='text-slate-300' />
                  ) : (
                    <Bot size={14} className='text-cyan-400' />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className='flex items-start gap-2'>
                <div className='w-7 h-7 shrink-0 rounded-full bg-cyan-600/10 border border-cyan-600/40 flex items-center justify-center'>
                  <Bot size={14} className='text-cyan-400' />
                </div>
                <div className='px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 rounded-tl-none flex gap-1 items-center'>
                  <span className='w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                  <span className='w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                  <span className='w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce'></span>
                </div>
              </div>
            )}
          </div>

          <div className='border-t border-slate-800 px-3 py-3 bg-slate-900/80'>
            <div className='flex items-end gap-2'>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder='Ask about our services...'
                className='flex-1 resize-none bg-slate-800 border border-slate-700 focus:border-cyan-600/60 outline-none text-slate-200 placeholder-slate-500 text-sm rounded-md px-3 py-2 max-h-24'
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className='shrink-0 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-md p-2.5 transition-all duration-200'
              >
                <Send size={16} />
              </button>
            </div>
            <div className='flex justify-end mt-1'>
              <span className='text-[11px] text-slate-500'>{input.length}/{MAX_INPUT_LENGTH}</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-600/30 transition-all duration-200 hover:scale-105'
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}