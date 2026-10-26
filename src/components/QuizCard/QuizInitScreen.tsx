'use client';

import { CircleQuestionMark, ClockIcon, GiftIcon } from "lucide-react";

/* ─── Helpers ──────────────────────────────────────────────── */

function formatBDTime(utcStr:any) {
  if (!utcStr) return '';
  const t = new Date(utcStr).toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `BD ${t}`;
}

function formatMatchDate(dateStr:any) {
  if (!dateStr) return '';
  let date =dateStr.split(" ")
  const [y, m, d] = date[0]?.split('-');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${d} ${months[+m - 1]} ${y}`;
}

function formatDuration(seconds:any) {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')} Min`;
}


export default function MatchQuizCard({ data = {}, matchNo = 1, onStart }:any) {
  const { match = {}, match_date, questions = [] } = data;
  const { country1 = 'Haiti', country2 = 'Scotland',
          flag1, flag2, group_info = 'Group A',
          quiz_starts_at, quiz_duration } = match;

  const pills = [
    formatBDTime(data?.match?.match_starts),
    formatMatchDate(data?.match?.match_starts),
    `Match ${data?.match?.matchNo}`,
    group_info,
  ].filter(Boolean);
  console.log(pills,matchNo,data);

  const meta = [
    { icon: <ClockIcon />,    text: formatDuration(quiz_duration) },
    { icon: <CircleQuestionMark />, text: `${questions.length} Questions` },
    { icon: <GiftIcon />,     text: 'Exciting Gifts' },
  ];

  return (
    <div className="relative z-10 flex flex-col md:min-w-[600px] min-h-[40%] rrounded-[8px]" 
        style={{ padding: '20px 18px 22px',borderRadius:'8px', gap: 0,background:'url(/worldCup.png)', backgroundSize:'100%'}}
    >

      {/* ── Title ──────────────────────────────────────────── */}
      <p
        className="text-white font-black leading-none mt-8"
        style={{ fontSize: '27px', letterSpacing: '0.025em', marginBottom: '10px' }}
      >
        FIFA WORLD CUP 2026
      </p>

      {/* ── Teams ──────────────────────────────────────────── */}
      <div className="flex items-center" style={{ gap: '7px', marginBottom: '11px' }}>
        {flag1
          ? <img src={flag1} alt={country1} style={{ width: 26, height: 17, borderRadius: 3, objectFit: 'cover', flexShrink: 0 }} />
          : <span style={{ fontSize: 18, lineHeight: 1 }}>🏳️</span>
        }
        <span className="text-white font-semibold" style={{ fontSize: '15px' }}>{country1}</span>

        <span
          className="font-extrabold"
          style={{ fontSize: '14px', color: '#f0186a', letterSpacing: '0.06em', margin: '0 1px' }}
        >
          VS
        </span>

        {flag2
          ? <img src={flag2} alt={country2} style={{ width: 26, height: 17, borderRadius: 3, objectFit: 'cover', flexShrink: 0 }} />
          : <span style={{ fontSize: 18, lineHeight: 1 }}>🏳️</span>
        }
        <span className="text-white font-semibold" style={{ fontSize: '15px' }}>{country2}</span>
      </div>

      {/* ── Separator ──────────────────────────────────────── */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', marginBottom: '11px' }} />

      {/* ── Pills ──────────────────────────────────────────── */}
      <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '13px' }}>
        {pills.map((label) => (
          <span
            key={label}
            className="text-white"
            style={{
              fontSize: '12px',
              fontWeight: 400,
              padding: '5px 13px',
              borderRadius: '7px',
              border: '1px solid rgba(255,255,255,0.26)',
              background: 'rgba(255,255,255,0.07)',
              letterSpacing: '0.01em',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* ── Meta ───────────────────────────────────────────── */}
      <div className="flex items-center" style={{ gap: '18px', marginBottom: '18px', color: 'rgba(200,208,230,0.85)' }}>
        {meta.map(({ icon, text }) => (
          <div key={text} className="flex items-center" style={{ gap: '5px', fontSize: '12.5px' }}>
            {icon}
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* ── Button ─────────────────────────────────────────── */}
      <button
        onClick={onStart}
        className="flex items-center self-start text-white font-bold transition-opacity hover:opacity-90 active:opacity-75"
        // disabled={}
        style={{
          fontSize: '14px',
          padding: '12px 22px',
          borderRadius: '10px',
          background: '#b5006a',
          gap: '8px',
          letterSpacing: '0.01em',
          boxShadow: '0 0 0 0 transparent',
        }}
      >
        Start Quiz Now
        <svg viewBox="0 0 14 14" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" />
        </svg>
      </button>
    </div>
  );
}

