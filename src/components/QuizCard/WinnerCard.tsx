"use client";

import { siteConfig } from "@/config/config";

interface Winner {
  quiz_result_id: number;
  user_id: number;
  result: number;
  total_question: number;
  match_id: number;
  time_used_sec_to_submit: number;
  submitted_at: string;
  country1: string;
  country2: string;
  flag1: string;
  flag2: string;
  group_info: string;
  matchNo: number;
  match_ends: string;
  quiz_starts_at: string;
  full_name: string;
  image_url: string;
  rn: number;
}

interface WinnerModalProps {
  winner: Winner;
//   onClose: () => void;
}

export function WinnerModal({ winner }: WinnerModalProps) {
  const matchDate = new Date(winner.quiz_starts_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="">
      <div className="relative radial_gradient_quiz w-full max-w-[460px] rounded-[20px] bg-[#1e0f35] px-5 py-6">

        {/* Close */}
       

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Match Quiz Winner</h2>
          <p className="mt-1.5 text-[12px] text-white/45">
            {matchDate} Match &bull; {winner.country1} vs {winner.country2}
          </p>
        </div>

        {/* Badge */}
        <div className="mt-3.5 flex justify-center">
          <span className="rounded-full border border-[#F70C848C] text-[#FF4DA1] px-[18px] py-1.5 text-[11px] font-bold tracking-[0.12em] text-pink-400">
            🏆 WINNER ANNOUNCED
          </span>
        </div>

        {/* Winner card */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-[#3b2c0a] to-[#2e2208] p-4 overflow-hidden">

          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={winner.image_url??siteConfig?.defaultProfilePic}
              alt={winner.full_name}
              className="h-16 w-16 rounded-full object-cover border-2 border-yellow-500/50"
            />
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[15px] font-bold text-white">
              {winner.full_name}
            </span>
            <span className="mt-0.5 text-[11px] text-white/45">
              {winner.country1} vs {winner.country2}
            </span>
            <span className="mt-1 text-[13px] font-bold text-yellow-400">
              {winner.result}/{winner.total_question} Correct
            </span>
            <span className="mt-2 inline-flex w-fit bg-[#8A7C12B8] rounded-full border border-yellow-600/50  px-3 py-1 text-[11px] font-semibold text-yellow-500">
                Least Time Completion
            </span>
          </div>

          {/* Trophy */}
          <div className="">
            <div className="flex flex-col">
                <img
                src="/quizWinner.png"
                alt="Quiz Winner"
                className="h-[88px] w-[88px] object-contain"
                />
                
            </div>
            
          </div>
          
        </div>

      </div>
    </div>
  );
}