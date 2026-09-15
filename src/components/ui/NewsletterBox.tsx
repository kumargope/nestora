'use client';

import React, { useState } from 'react';
import { IconCheck, IconSparkles } from '@/components/ui/Icons';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="bg-[#2D392F] text-white rounded-2xl p-8 sm:p-12 my-12 relative overflow-hidden shadow-xl">
      {/* Decorative accent background circles */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-emerald-900/40 text-emerald-200 text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full mb-4">
          <IconSparkles size={14} />
          <span>Weekly Architectural Digest</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-4 text-white">
          Receive Timeless Interior Inspiration Direct to Your Inbox
        </h2>

        <p className="text-sm sm:text-base text-stone-300 font-sans mb-8 leading-relaxed">
          Join 45,000+ homeowners and interior designers. Get our curated room guides, Japandi trends, and luxury decor lookbooks delivered once a week. No spam. No account required.
        </p>

        {subscribed ? (
          <div className="p-4 bg-emerald-950/80 border border-emerald-700/50 rounded-xl text-emerald-200 text-sm font-medium flex items-center justify-center space-x-2">
            <IconCheck size={18} />
            <span>Thank you for subscribing! Check your inbox for our latest interior lookbook.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full sm:flex-1 px-5 py-3.5 bg-stone-950/40 border border-stone-700 text-white placeholder-stone-400 rounded-xl focus:outline-none focus:border-white text-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FFFDF9] text-[#1A1A18] hover:bg-stone-200 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400 mt-4">
          We respect your privacy. You can unsubscribe at any time with a single click. No user registration or password required.
        </p>
      </div>
    </div>
  );
}
