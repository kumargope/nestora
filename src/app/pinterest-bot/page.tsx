'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { 
  IconPinterest, 
  IconSparkles, 
  IconShoppingBag, 
  IconExternalLink, 
  IconCheck 
} from '@/components/ui/Icons';

interface PinItem {
  id: string;
  slug: string;
  clean_title: string;
  title: string;
  description: string;
  image_url: string;
  destination_url: string;
  article_url: string;
  category: string;
  one_click_url: string;
  status?: string;
  pin_url?: string;
}

export default function PinterestBotPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [botData, setBotData] = useState<{
    today?: { pins?: PinItem[]; date?: string; total_posted_all_time?: number };
    total_catalog?: number;
    total_posted?: number;
    affiliate_tag?: string;
    has_api_token?: boolean;
  }>({});
  const [msg, setMsg] = useState('');

  const fetchBotStatus = async () => {
    try {
      setFetching(true);
      const res = await fetch('/api/pinterest');
      const data = await res.json();
      if (data.success) {
        setBotData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBotStatus();
  }, []);

  const handleRunBot = async () => {
    try {
      setLoading(true);
      setMsg('');
      const res = await fetch('/api/pinterest', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setMsg('🎉 5 fresh pins successfully generated and prepared for today!');
        fetchBotStatus();
      } else {
        setMsg('❌ Error: ' + (data.error || 'Could not run bot'));
      }
    } catch (e: any) {
      setMsg('❌ Error running bot: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const pins = botData.today?.pins || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Pinterest Auto-Pin Bot' }]} />

      {/* HEADER */}
      <div className="bg-[#FFFDF9] border border-[#E6E0D4] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold uppercase tracking-wider">
            <IconPinterest size={16} />
            <span>Automated Pinterest Growth Bot</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A18] tracking-tight">
            Daily Pinterest Auto-Pin Engine
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Automatically saves 5 curated high-resolution photos every day to Pinterest with optimized titles, viral hashtags, and your direct Amazon affiliate link (<code className="font-mono font-bold text-[#2D392F]">{botData.affiliate_tag || 'amzfinds063-20'}</code>).
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleRunBot}
              disabled={loading}
              className="px-6 py-3.5 bg-[#E60023] hover:bg-[#b8001c] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <IconPinterest size={18} />
              <span>{loading ? 'Selecting & Preparing 5 Pins...' : '🚀 Run Bot Now (Process 5 Pins)'}</span>
            </button>

            <button
              type="button"
              onClick={fetchBotStatus}
              disabled={fetching}
              className="px-5 py-3.5 bg-[#F4F0E8] hover:bg-[#EAE5D9] text-stone-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all border border-[#E6E0D4] cursor-pointer"
            >
              🔄 Refresh Status
            </button>
          </div>

          {msg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
              {msg}
            </div>
          )}
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold block mb-1">
            Daily Pin Target
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A18] font-serif">
            5 Pins / Day
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">● Active schedule</span>
        </div>

        <div className="p-5 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold block mb-1">
            Total Pins Processed
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A18] font-serif">
            {botData.total_posted || 0}
          </div>
          <span className="text-[11px] text-stone-500">Unique items pinned</span>
        </div>

        <div className="p-5 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold block mb-1">
            Photo Catalog Reserve
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A18] font-serif">
            {botData.total_catalog || 1769}
          </div>
          <span className="text-[11px] text-stone-500">Ready for automatic rotation</span>
        </div>

        <div className="p-5 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold block mb-1">
            Affiliate Tracking ID
          </span>
          <div className="text-xl sm:text-2xl font-bold text-[#2D392F] font-mono">
            {botData.affiliate_tag || 'amzfinds063-20'}
          </div>
          <span className="text-[11px] text-stone-500">Attached to every pin</span>
        </div>
      </div>

      {/* TODAY'S 5 PINS SECTION */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E0D4] pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A18]">
              Today&apos;s 5 Selected Pinterest Pins
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Click &ldquo;Pin to Pinterest&rdquo; on any card to save it instantly to your board with pre-filled hashtags & Amazon link.
            </p>
          </div>
          <span className="text-xs font-mono bg-stone-100 text-stone-700 px-3 py-1 rounded-full border border-stone-200">
            Batch Date: {botData.today?.date || 'Today'}
          </span>
        </div>

        {pins.length === 0 ? (
          <div className="text-center py-12 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl p-6">
            <p className="text-stone-600 mb-4">No batch generated yet for today.</p>
            <button
              onClick={handleRunBot}
              disabled={loading}
              className="px-6 py-2.5 bg-[#E60023] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#b8001c] transition-colors cursor-pointer"
            >
              Generate First 5 Pins
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pins.map((pin, idx) => (
              <div 
                key={pin.id || idx} 
                className="bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={pin.image_url}
                      alt={pin.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#FFFDF9]/90 backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full text-stone-800 shadow-xs">
                      Pin #{idx + 1} • {pin.category}
                    </div>
                  </div>

                  {/* Metadata Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-base font-semibold text-[#1A1A18] line-clamp-2 leading-tight">
                      {pin.clean_title}
                    </h3>
                    
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-sans bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      {pin.description}
                    </p>

                    <div className="text-[11px] text-stone-500 flex items-center space-x-1 font-mono truncate">
                      <span className="font-semibold text-stone-700">Tag:</span>
                      <span className="truncate">amzfinds063-20</span>
                    </div>
                  </div>
                </div>

                {/* Pin Action Button */}
                <div className="p-5 pt-0 space-y-2">
                  <a
                    href={pin.one_click_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#E60023] hover:bg-[#b8001c] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 group/pin cursor-pointer"
                  >
                    <IconPinterest size={16} className="transition-transform group-hover/pin:scale-110" />
                    <span>Pin to Pinterest (1-Click)</span>
                    <IconExternalLink size={13} className="opacity-80" />
                  </a>

                  <a
                    href={pin.destination_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 text-center text-[11px] text-emerald-700 hover:text-emerald-900 font-medium transition-colors block underline"
                  >
                    🌐 Opens Nestora First ➔ Then Amazon
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* AUTOMATION & CRON SETUP INSTRUCTIONS */}
      <section className="bg-[#F4F0E8]/50 border border-[#E6E0D4] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#2D392F]">
          <IconSparkles size={16} />
          <span>Full Auto-Pilot Options</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1A1A18]">
          How to Run This Bot Completely on Autopilot:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E6E0D4] space-y-3">
            <h4 className="font-serif text-lg font-semibold text-stone-900 flex items-center gap-2">
              <span>Method 1: Windows 1-Click Background Batch</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              A pre-configured Windows script is ready in your project directory at:
              <br />
              <code className="font-mono bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px] block mt-1">
                nestora/scripts/run_daily_pinterest_bot.bat
              </code>
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Double-click it anytime, or add it to <strong>Windows Task Scheduler</strong> to run automatically at your chosen time every day (e.g. 10:00 AM).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E0D4] space-y-3">
            <h4 className="font-serif text-lg font-semibold text-stone-900 flex items-center gap-2">
              <span>Method 2: Pinterest API v5 (Direct Auto-Posting)</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              If you want the bot to post directly to your Pinterest boards without opening a browser window, generate an Access Token at <a href="https://developers.pinterest.com/apps/" target="_blank" rel="noopener noreferrer" className="text-[#E60023] underline font-semibold">Pinterest Developers</a> and add to <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">.env.local</code>:
            </p>
            <pre className="bg-stone-900 text-emerald-400 p-3 rounded-xl text-[11px] overflow-x-auto font-mono">
PINTEREST_ACCESS_TOKEN=pina_...
PINTEREST_BOARD_ID=1234567890
            </pre>
          </div>
        </div>
      </section>

    </div>
  );
}
