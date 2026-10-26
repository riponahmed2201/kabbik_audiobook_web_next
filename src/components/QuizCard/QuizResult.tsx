'use client';

import { useRouter } from "next/navigation";
import { QuizData } from "./Quiz";
import { paths } from "@/utils/Paths";

// import { QuizData } from './QuizScreen';

/* ─── Types ────────────────────────────────────────────────────── */

export interface QuizResult {
  points: number;
  result: number;
  total_question: number;
}

interface QuizResultScreenProps {
  data: QuizData;
  result: QuizResult;
  matchNo?: number;
  onBackToHome?: () => void;
  onStartNextQuiz?: () => void;
}

/* ─── Helpers ──────────────────────────────────────────────────── */

function formatBDTime(utcStr: string): string {
  return (
    'BD ' +
    new Date(utcStr).toLocaleTimeString('en-US', {
      timeZone: 'Asia/Dhaka',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  );
}

function formatMatchDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${d} ${months[Number(m) - 1]} ${y}`;
}

/* ─── Score Card ───────────────────────────────────────────────── */

interface ScoreCardProps {
  value: number;
  label: string;
  color: string;       // e.g. '#22c55e'
  glowColor: string;   // rgba for box-shadow
  borderColor: string;
  bgColor: string;
}

function ScoreCard({ value, label, color, glowColor, borderColor, bgColor }: ScoreCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 rounded-xl"
      style={{
        padding: '28px 16px 24px',
        background: bgColor,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 18px 2px ${glowColor}, inset 0 0 24px ${glowColor}`,
      }}
    >
      <span
        className="font-black leading-none"
        style={{ fontSize: 72, color, marginBottom: 10 }}
      >
        {value}
      </span>
      <span
        className="font-bold tracking-wide"
        style={{ fontSize: 15, color }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── QuizResultScreen ─────────────────────────────────────────── */

export default function QuizResultScreen({
  data,
  result,
  matchNo = 1,
  onBackToHome,
  onStartNextQuiz,
}: QuizResultScreenProps) {
  const { match, match_date } = data;
  const { points, result:correct, total_question } = result;
  const router = useRouter();

  const pills = [
    formatBDTime(match.quiz_starts_at),
    formatMatchDate(match_date),
    `Match ${matchNo}`,
    match.group_info,
  ].filter(Boolean);

  return (
    <div className="flex flex-col  w-full rounded-[12px]" style={{ background: '#0b1230' }}>
        {/* {console.log(result,"resulttttteeeeeeee")} */}

      {/* ══════════ HEADER ══════════ */}
      <div
        className="flex flex-col items-center rounded-[12px] px-[40px]"
        style={{
          background: '#0e1438',
          padding: '22px 20px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.09)',
        }}
      >
        {/* Title */}
        <h1
          className="text-white font-black text-center leading-none"
          style={{ fontSize: 26, letterSpacing: '0.03em', marginBottom: 12 }}
        >
          FIFA WORLD CUP 2026
        </h1>

        {/* Teams */}
        <div className="flex items-center justify-center" style={{ gap: 8, marginBottom: 14 }}>
          {match.flag1 ? (
            <img
              src={match.flag1}
              alt={match.country1}
              className="flex-shrink-0 object-cover"
              style={{ width: 26, height: 17, borderRadius: 3 }}
            />
          ) : (
            <span style={{ fontSize: 18 }}>🏳️</span>
          )}
          <span className="text-white font-semibold" style={{ fontSize: 15 }}>
            {match.country1}
          </span>
          <span
            className="font-extrabold"
            style={{ fontSize: 13, color: '#f0186a', letterSpacing: '0.06em' }}
          >
            VS
          </span>
          {match.flag2 ? (
            <img
              src={match.flag2}
              alt={match.country2}
              className="flex-shrink-0 object-cover"
              style={{ width: 26, height: 17, borderRadius: 3 }}
            />
          ) : (
            <span style={{ fontSize: 18 }}>🏳️</span>
          )}
          <span className="text-white font-semibold" style={{ fontSize: 15 }}>
            {match.country2}
          </span>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center" style={{ gap: 8 }}>
          {pills.map(label => (
            <span
              key={label}
              className="text-white"
              style={{
                fontSize: 12,
                padding: '5px 14px',
                borderRadius: 7,
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.06)',
                letterSpacing: '0.01em',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ RESULT BODY ══════════ */}
      <div className="flex flex-col flex-1" style={{ padding: '28px 16px 24px' }}>

        {/* Points headline */}
        {/* <p
          className="text-white font-bold text-center leading-snug"
          style={{ fontSize: 18, marginBottom: 28 }}
        >
          You earning{' '}
          <span style={{ color: '#f5c518' }}>{points} Points</span>
          {' '}for this quiz!
        </p> */}

        {/* Score cards */}
        <div className="flex gap-4" style={{ marginBottom: 32 }}>
          <ScoreCard
            value={correct}
            label="Correct Answer"
            color="#22c55e"
            borderColor="#16a34a"
            bgColor="rgba(22,163,74,0.08)"
            glowColor="rgba(34,197,94,0.12)"
          />
          <ScoreCard
            value={total_question-correct}
            label="Wrong Answer"
            color="#ef4444"
            borderColor="#dc2626"
            bgColor="rgba(220,38,38,0.08)"
            glowColor="rgba(239,68,68,0.12)"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {/* Back to home */}
          <button
            onClick={onBackToHome}
            className="flex-1 text-white font-semibold rounded transition-colors hover:bg-white/10 active:bg-white/20"
            style={{
              fontSize: 14,
              padding: '7px 6px',
              border: '1.5px solid rgba(255,255,255,0.35)',
              background: 'transparent',
              letterSpacing: '0.01em',
            }}
          >
            Back to home
          </button>

          {/* Start next quiz */}
          <button
            onClick={()=>{router?.push(paths.quiz);onStartNextQuiz?.();}}
            className="flex-1 gradient_quiz_btn text-white font-bold rounded transition-opacity hover:opacity-90 active:opacity-75"
            style={{
              fontSize: 14,
              padding: '7px 6px',
              background: '#b5006a',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 20px rgba(181,0,106,0.40)',
            }}
          >
            Play More Quiz
          </button>
        </div>
      </div>
    </div>
  );
}