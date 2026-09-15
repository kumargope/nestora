import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RoomInfo } from '@/types';
import { IconArrowRight } from '@/components/ui/Icons';

interface RoomCardProps {
  room: RoomInfo;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Link
      href={`/room/${room.slug}`}
      className="block relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      {/* Background Image */}
      <Image
        src={room.heroImage}
        alt={room.heroImageAlt || room.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Card Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-300 mb-1">
          Room Inspiration
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
          {room.name}
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-sans line-clamp-2 leading-relaxed mb-4 max-w-md">
          {room.tagline}
        </p>

        {/* CTA button */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-amber-200 transition-colors">
          <span>Discover Ideas</span>
          <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
