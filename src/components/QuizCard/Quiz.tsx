'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Clock } from 'lucide-react';
import { submit_quizes } from '@/utils/apiServices';

/* ─── Types ────────────────────────────────────────────────────── */

interface Match {
  id: number;
  country1: string;
  country2: string;
  flag1: string;
  flag2: string;
  group_info: string;
  quiz_starts_at: string;
  quiz_duration: number;
  match_starts: string;
  match_ends: string;
  isActive: number;
  created_at: string;
  updated_at: string;
}

interface Question {
  id: number;
  match_id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface QuizData {
  match: Match;
  match_date: string;
  questions: Question[];
}

interface SubmitPayload {
  user_id: number;
  match_id: number;
  timezone: string;
  time_used_sec_to_submit: number;
  answers: { question_id: number; selected_option: number }[];
}

interface QuizScreenProps {
  data: QuizData;
  matchNo?: number;
  userId: number;
  submitUrl?: string;
  onClose?: () => void;
  onComplete?: (result: unknown) => void;
}

type Answers = Record<number, number>; // questionId → selectedOption (1-4)

/* ─── Helpers ──────────────────────────────────────────────────── */

function formatBDTime(utcStr: string): string {
  return 'BD ' + new Date(utcStr).toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatMatchDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${d} ${months[Number(m) - 1]} ${y}`;
}

function formatTimer(secs: number): string {
  const s = Math.max(0, secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const OPTION_KEYS = ['option_1', 'option_2', 'option_3', 'option_4'] as const;

/* ─── OptionCard ───────────────────────────────────────────────── */

interface OptionCardProps {
  index: number;
  text: string;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

function OptionCard({ index, text, selected, disabled, onSelect }: OptionCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className="flex items-center gap-3 w-full text-left rounded-xl transition-all duration-150 active:scale-[0.97] disabled:cursor-default"
      style={{
        padding: '12px 14px',
        background: selected ? 'rgba(194,0,104,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${selected ? '#c20068' : 'rgba(255,255,255,0.18)'}`,
      }}
    >
      {/* Radio */}
      <span
        className="flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-150"
        style={{
          width: 20,
          height: 20,
          border: `2px solid ${selected ? '#c20068' : 'rgba(255,255,255,0.35)'}`,
          background: selected ? '#c20068' : 'transparent',
        }}
      >
        {selected && (
          <span className="block rounded-full" style={{ width: 7, height: 7, background: '#fff' }} />
        )}
      </span>
      {/* Label */}
      <span
        className="text-white leading-snug"
        style={{ fontSize: 13, fontWeight: selected ? 600 : 400 }}
      >
        {index + 1}) {text}
      </span>
    </button>
  );
}

/* ─── QuizScreen ───────────────────────────────────────────────── */

export default function QuizScreen({
  data,
  matchNo = 1,
  userId,
  submitUrl = '/api/quiz/submit',
  onClose,
  onComplete,
}: QuizScreenProps) {
  const { match, match_date, questions } = data;
  const total = questions.length;

  const [currentIdx, setCurrentIdx]   = useState(0);
  const [answers, setAnswers]         = useState<Answers>({});
  const [timeLeft, setTimeLeft]       = useState(match.quiz_duration);
  const [submitted, setSubmitted]     = useState(false);
  const [advancing, setAdvancing]     = useState(false);

  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  /* ── Submit ──────────────────────────────────────────────────── */
  const handleSubmit = useCallback(async (finalAnswers?: Answers) => {
    if (submitted) return;
    setSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const used    = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const ans     = finalAnswers ?? answers;
    const payload: SubmitPayload = {
      user_id: userId,
      match_id: match.id,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      time_used_sec_to_submit: used,
      answers: Object.entries(ans).map(([qId, opt]) => ({
        question_id: Number(qId),
        selected_option: opt,
      })),
    };

    try {
      const res = await submit_quizes(payload);
      console.log(res,"finalResult");
      onComplete?.(res);
    } catch (err) {
      console.error('Quiz submit failed:', err);
      onComplete?.(null);
    }
  }, [submitted, answers, match.id, userId, onComplete]);

  /* ── Countdown ───────────────────────────────────────────────── */
  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [submitted, handleSubmit]);

  /* ── Select answer & auto-advance ────────────────────────────── */
  const handleSelect = (questionId: number, optionNum: number) => {
    if (advancing || submitted) return;

    const newAnswers = { ...answers, [questionId]: optionNum };
    setAnswers(newAnswers);

    if (currentIdx < total - 1) {
      setAdvancing(true);
      setTimeout(() => {
        setCurrentIdx(i => i + 1);
        setAdvancing(false);
      }, 400);
    } else {
      // Last question → submit
      setTimeout(() => handleSubmit(newAnswers), 500);
    }
  };

  /* ── Derived ─────────────────────────────────────────────────── */
  const currentQ      = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isUrgent      = timeLeft <= 30;

  const pills = [
    formatBDTime(match.quiz_starts_at),
    formatMatchDate(match_date),
    `Match ${matchNo}`,
    match.group_info,
  ].filter(Boolean);

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <div className="flex rounded-[8px] flex-col w-full " style={{ background: '#0b1230' }}>

      {/* ══════════ HEADER ══════════ */}
      <div
        className="relative flex flex-col items-center rounded-[8px]"
        style={{
          background: '#0e1438',
          padding: '18px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.09)',
        }}
      >
        {/* Close button */}
      

        {/* Title */}
        <h1
          className="text-white font-black text-center leading-none"
          style={{ fontSize: 24, letterSpacing: '0.03em', marginBottom: 10 }}
        >
          FIFA WORLD CUP 2026
        </h1>

        {/* Teams row */}
        <div className="flex items-center justify-center" style={{ gap: 8, marginBottom: 12 }}>
          {match.flag1 ? (
            <img
              src={match.flag1} alt={match.country1}
              className="flex-shrink-0 object-cover"
              style={{ width: 26, height: 17, borderRadius: 3 }}
            />
          ) : <span style={{ fontSize: 18 }}>🏳️</span>}

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
              src={match.flag2} alt={match.country2}
              className="flex-shrink-0 object-cover"
              style={{ width: 26, height: 17, borderRadius: 3 }}
            />
          ) : <span style={{ fontSize: 18 }}>🏳️</span>}

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

      {/* ══════════ QUESTION AREA ══════════ */}
      <div className="flex flex-col flex-1" style={{ padding: '18px 16px 0' }}>

        {/* Row: counter / timer */}
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>

          {/* Left */}
          <div className="flex items-center" style={{ gap: 8 }}>
            <span className="text-white font-semibold" style={{ fontSize: 14 }}>
              Question {currentIdx + 1}/{total}
            </span>
            {answeredCount > 0 && (
              <span
                className="text-white font-medium"
                style={{
                  fontSize: 11,
                  padding: '2px 9px',
                  borderRadius: 20,
                  background: '#b5006a',
                }}
              >
                {answeredCount} answered
              </span>
            )}
          </div>

          {/* Timer pill */}
          <div
            className="flex items-center"
            style={{
              gap: 5,
              padding: '5px 12px',
              borderRadius: 20,
              border: `1.5px solid ${isUrgent ? '#ef4444' : '#c20068'}`,
              background: isUrgent ? 'rgba(239,68,68,0.10)' : 'rgba(194,0,104,0.10)',
            }}
          >
            <Clock
              size={13}
              strokeWidth={2}
              color={isUrgent ? '#ef4444' : '#e01878'}
            />
            <span
              className="font-bold tabular-nums"
              style={{ fontSize: 14, color: isUrgent ? '#ef4444' : 'white', lineHeight: 1 }}
            >
              {formatTimer(timeLeft)}
            </span>
          </div>
        </div>

        {/* Question text */}
        {currentQ && (
          <>
            <p
              className="text-white font-bold leading-snug"
              style={{ fontSize: 15, marginBottom: 18 }}
            >
              {currentQ.question}
            </p>

            {/* Options grid — 2 col on mobile, 4 col on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {OPTION_KEYS.map((key, i) => {
                const text = currentQ[key];
                if (!text) return null;
                return (
                  <OptionCard
                    key={key}
                    index={i}
                    text={text}
                    selected={answers[currentQ.id] === i + 1}
                    disabled={advancing || submitted}
                    onSelect={() => handleSelect(currentQ.id, i + 1)}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Progress dots */}
        <div
        className="flex quiz_warning items-center justify-center text-center mt-4 mb-5 rounded-[4px]"
        style={{ background: '#f5c518', padding: '13px 10px', minHeight: 48 }}
      >
        <p
          className="font-medium leading-snug"
          style={{ fontSize: 12.5, color: '#1a0a00', maxWidth: 500 }}
        >
          Winners are chosen based on the highest number of correct answers &amp; Less time.
        </p>
      </div>
      </div>

      {/* ══════════ BOTTOM BANNER ══════════ */}
     
    </div>
  );
}