'use client';

import { X, Timer, CalendarDays, Bell } from 'lucide-react';

interface QuizTimeExpiredProps {
  onClose?: () => void;
  onReturnHome?: () => void;
}

export default function QuizTimeExpired({ onClose, onReturnHome }: QuizTimeExpiredProps) {
  return (
    <div  className="relative bg-[100%] bg-[url('/gallery.png')] min-w-[500px] flex flex-col items-center w-full px-5 pt-10 pb-8">

      {/* ── Close button ──────────────────────────────────── */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 flex items-center justify-center rounded-full transition-colors hover:bg-white/10 active:bg-white/20"
        style={{
          width: 40,
          height: 40,
          background: 'rgba(255,255,255,0.12)',
          border: '1.5px solid rgba(255,255,255,0.30)',
        }}
      >
        <X size={17} strokeWidth={2.5} color="white" />
      </button>

      {/* ── Stopwatch icon ────────────────────────────────── */}
      <div className="relative flex items-center justify-center" style={{ marginBottom: 22 }}>

        {/* Sparkle dots */}
        <Sparkles />

        {/* Stopwatch body */}
        <div
          className="relative flex items-center justify-center rounded-full z-10"
          style={{
            width: 100,
            height: 100,
            background: 'linear-gradient(145deg, #7c3aed, #5b21b6)',
            border: '4px solid #6d28d9',
            boxShadow: '0 8px 32px rgba(109,40,217,0.55), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          {/* Crown/button on top */}
          <div
            className="absolute rounded-sm"
            style={{
              top: -13,
              width: 18,
              height: 10,
              background: 'linear-gradient(180deg, #7c3aed, #5b21b6)',
              border: '3px solid #6d28d9',
              borderRadius: 4,
            }}
          />
          {/* Side button */}
          <div
            className="absolute rounded-full"
            style={{
              top: 14,
              right: -10,
              width: 10,
              height: 16,
              background: 'linear-gradient(180deg, #7c3aed, #5b21b6)',
              border: '2px solid #6d28d9',
              borderRadius: 5,
            }}
          />

          {/* Clock face */}
          <div
            className="flex items-center justify-center rounded-full relative"
            style={{
              width: 76,
              height: 76,
              background: 'linear-gradient(145deg, #6d28d9, #4c1d95)',
              border: '3px solid #7c3aed',
            }}
          >
            <Timer size={34} strokeWidth={1.8} color="white" />
          </div>

          {/* Red X badge */}
          <div
            className="absolute flex items-center justify-center rounded-full"
            style={{
              bottom: -4,
              right: -4,
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              border: '3px solid #0b1230',
              boxShadow: '0 2px 8px rgba(239,68,68,0.5)',
            }}
          >
            <X size={14} strokeWidth={3} color="white" />
          </div>
        </div>
      </div>

      {/* ── Heading ───────────────────────────────────────── */}
      <div className="text-center" style={{ marginBottom: 14 }}>
        <h1
          className="font-black leading-tight"
          style={{ fontSize: 32, color: 'white', letterSpacing: '-0.01em' }}
        >
          কুইজে অংশগ্রহণের
        </h1>
        <h1
          className="font-black leading-tight"
          style={{
            fontSize: 32,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(90deg, #ff6b35, #f0186a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          সময় শেষ!
        </h1>
      </div>

      {/* ── Subtitle ──────────────────────────────────────── */}
      <p
        className="text-center leading-relaxed"
        style={{
          fontSize: 13.5,
          color: 'rgba(255,255,255,0.72)',
          maxWidth: 340,
          marginBottom: 20,
        }}
      >
        এই ম্যাচের কুইজ শুধুমাত্র ম্যাচ শুরু হওয়ার আগে খেলা যাবে।
        <br />
        ম্যাচ শুরু হয়ে যাওয়ায় এখন আর এই কুইজে অংশগ্রহণ করা যাবে না।
      </p>

      {/* ── Divider with ball ─────────────────────────────── */}
      <div className="flex items-center w-full" style={{ gap: 10, marginBottom: 20, maxWidth: 340 }}>
        <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.18)' }} />
        <span style={{ fontSize: 18 }}>⚽</span>
        <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.18)' }} />
      </div>

      {/* ── Info card ─────────────────────────────────────── */}
      <button
        onClick={onReturnHome}
        className="flex items-center w-full text-left transition-colors hover:bg-white/10 active:bg-white/15"
        style={{
          maxWidth: 340,
          gap: 14,
          padding: '14px 16px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        {/* Calendar + bell stack */}
        <div className="relative flex-shrink-0" style={{ width: 42, height: 42 }}>
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 38,
              height: 38,
              background: 'rgba(255,255,255,0.10)',
            }}
          >
            <CalendarDays size={22} strokeWidth={1.8} color="white" />
          </div>
          {/* Bell badge */}
          <div
            className="absolute flex items-center justify-center rounded-full"
            style={{
              bottom: -2,
              right: -2,
              width: 18,
              height: 18,
              background: '#f5c518',
              border: '2px solid #0b1230',
            }}
          >
            <Bell size={9} strokeWidth={2.5} color="#1a0a00" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col" style={{ gap: 3 }}>
          <span className="text-white font-medium leading-snug" style={{ fontSize: 13.5 }}>
            পরবর্তী ম্যাচের কুইজে অংশ নিতে
          </span>
          <span className="font-semibold" style={{ fontSize: 13.5, color: '#22c55e' }}>
            সময়মতো ফিরে আসুন।
          </span>
        </div>
      </button>
    </div>
  );
}

/* ── Sparkle decoration ───────────────────────────────────────── */

function Sparkles() {
  // Positions: [top, left, size, opacity]
  const dots: [number, number, number, number][] = [
    [-10, 14,  6, 0.9],
    [-18, 38,  4, 0.7],
    [  6, -4,  5, 0.8],
    [ 30, -8,  4, 0.6],
    [-12, 68,  5, 0.7],
    [  8, 80,  4, 0.5],
    [ 28, 76,  3, 0.6],
    [-20, 52,  3, 0.5],
  ];

  return (
    <>
      {dots.map(([top, left, size, opacity], i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top,
            left,
            width: size,
            height: size,
            background: 'white',
            opacity,
          }}
        />
      ))}
      {/* Cross sparkles */}
      {[
        { top: -16, left: 8,  rotate: 0   },
        { top: -8,  left: 60, rotate: 45  },
        { top: 10,  left: -6, rotate: 30  },
      ].map((s, i) => (
        <span
          key={`cross-${i}`}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: 10,
            height: 10,
            transform: `rotate(${s.rotate}deg)`,
            opacity: 0.85,
          }}
        >
          <svg viewBox="0 0 10 10" width="10" height="10">
            <line x1="5" y1="0" x2="5" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="5" x2="10" y2="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </>
  );
}