'use client';

import React, { useEffect, useState } from 'react';

interface RedirectClientProps {
  destinationUrl: string;
}

export default function RedirectClient({ destinationUrl }: RedirectClientProps) {
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = destinationUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [destinationUrl]);

  return (
    <div className="w-full bg-[#FBF9F5] border border-[#E6E0D4] rounded-xl p-4 my-2 flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2 text-xs font-medium text-stone-700">
        <span className="inline-block w-4 h-4 border-2 border-[#2D392F] border-t-transparent rounded-full animate-spin" />
        <span>Redirecting you to Amazon in <strong className="text-[#2D392F] font-mono text-sm">{countdown}s</strong>...</span>
      </div>
      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-[#2D392F] h-full transition-all duration-1000 ease-linear"
          style={{ width: `${((3 - countdown) / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}
