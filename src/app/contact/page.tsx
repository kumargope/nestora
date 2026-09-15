'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { IconCheck } from '@/components/ui/Icons';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Editorial Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <Breadcrumbs items={[{ name: 'Contact' }]} />

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl font-semibold text-[#1A1A18]">
          Contact Nestora Editorial Team
        </h1>
        <p className="text-sm text-stone-600 font-sans">
          Have a press inquiry, brand feature request, or editorial feedback? We’d love to hear from you.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-[#FFFDF9] rounded-2xl border border-emerald-700/40 text-center max-w-lg mx-auto space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <IconCheck size={24} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#1A1A18]">
            Message Received
          </h2>
          <p className="text-sm text-stone-600 font-sans">
            Thank you for reaching out to Nestora. Our editorial team reviews messages within 1-2 business days.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#FFFDF9] p-8 rounded-2xl border border-[#E6E0D4] shadow-xs space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E6E0D4] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#2D392F]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E6E0D4] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#2D392F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
              Topic / Inquiry Type
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E6E0D4] rounded-xl text-sm text-stone-800 focus:outline-none focus:border-[#2D392F]"
            >
              <option value="Editorial Inquiry">Editorial & Content Feature</option>
              <option value="Press & Media">Press & Media Inquiry</option>
              <option value="Affiliate & Advertising">Affiliate & Advertising Partnership</option>
              <option value="General Feedback">General Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
              Your Message *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your inquiry or message here..."
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E6E0D4] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#2D392F]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#2D392F] hover:bg-[#1F2720] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-colors shadow-md"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="text-center text-xs text-stone-500 max-w-md mx-auto pt-4">
        Send us a message using the form above and our team will get back to you promptly.
      </div>
    </div>
  );
}
