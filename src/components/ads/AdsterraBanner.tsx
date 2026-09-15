'use client';

import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  adKey?: string;
  format?: '728x90' | '300x250' | '160x600' | '468x60' | '320x50';
  className?: string;
}

export default function AdsterraBanner({
  adKey,
  format = '728x90',
  className = '',
}: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensions = {
    '728x90': { width: 728, height: 90 },
    '300x250': { width: 300, height: 250 },
    '160x600': { width: 160, height: 600 },
    '468x60': { width: 468, height: 60 },
    '320x50': { width: 320, height: 50 },
  }[format];

  // Resolve key from props or environment variables
  const resolvedKey =
    adKey ||
    (format === '728x90'
      ? process.env.NEXT_PUBLIC_ADSTERRA_728X90_KEY || '6617028750a20d781eda27e867bd94f0'
      : format === '300x250'
      ? process.env.NEXT_PUBLIC_ADSTERRA_300X250_KEY
      : format === '160x600'
      ? process.env.NEXT_PUBLIC_ADSTERRA_160X600_KEY
      : format === '468x60'
      ? process.env.NEXT_PUBLIC_ADSTERRA_468X60_KEY
      : process.env.NEXT_PUBLIC_ADSTERRA_320X50_KEY);

  useEffect(() => {
    if (!resolvedKey || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = `${dimensions.width}`;
    iframe.height = `${dimensions.height}`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';

    containerRef.current.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '${resolvedKey}',
                'format' : 'iframe',
                'height' : ${dimensions.height},
                'width' : ${dimensions.width},
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/${resolvedKey}/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [resolvedKey, dimensions.width, dimensions.height]);

  if (!resolvedKey) {
    return (
      <div className={`p-4 bg-[#F4F0E8]/50 border border-dashed border-[#E6E0D4] rounded-lg text-center flex flex-col items-center justify-center min-h-[70px] text-stone-400 select-none ${className}`}>
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-500">
          Adsterra {format} Ad Placement
        </span>
        <span className="text-[11px] text-stone-400 font-mono mt-0.5">
          Zone Key: NEXT_PUBLIC_ADSTERRA_${format.replace('x', 'X')}_KEY
        </span>
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center my-4 overflow-hidden ${className}`}>
      <div ref={containerRef} style={{ width: dimensions.width, height: dimensions.height, maxWidth: '100%' }} />
    </div>
  );
}
