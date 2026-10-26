import { convertToDhakaTime, formatDateNew, formatKickoff, isTimePassed } from "@/helpers/commonFunction";
import Image from "next/image";


function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80">
      {children}
    </span>
  );
}

export default function QuizCard({ match,handleClick }: { match:any,handleClick:any }) {
  // const status = getQuizStatus(match);
  const getQuizStatus=()=>{
    if( isTimePassed(match.match_starts))return "Quiz Ended";
    if(match?.played===true)return "Submitted"
    else return "Join Quiz Now"
  }

  return (
    <div className="rounded-2xl overflow-hidden relative border border-white/10 bg-[#341939] p-4 shadow-lg shadow-purple-950/40">
      <div className="absolute gradient_rounded top-0 left-0 ">
        <img src="/ellipse63.svg" />
      </div>
      {/* LIVE QUIZ badge */}
      <div className="flex justify-center pb-4 border-b border-b-gray-600">
        <div className="flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/5  px-4 py-.5">
          <span className="text-sm">⚽</span>
          <span className="text-xs font-bold tracking-widest text-white">
            LIVE QUIZ
          </span>
        </div>
      </div>

      {/* Meta pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        <Pill>{formatKickoff(match.match_starts)}</Pill>
        <Pill>{formatDateNew(match.match_starts)}</Pill>
        <Pill>Match {match.matchNo}</Pill>
        <Pill>{match.group_info}</Pill>
      </div>

      {/* Teams */}
      <div className="mt-6 grid grid-cols-3 items-center">
        <div className="flex flex-col items-center gap-2">
          <Flag src={match.flag1} name={match.country1} />
          <span className="text-center  min-h-10 text-sm font-semibold text-white">
            {match.country1}
          </span>
        </div>
        <div className="text-center text-[#BC0974] pb-6 text-3xl font-extrabold italic text-pink-500">
          VS
        </div>
        <div className="flex flex-col items-center gap-2">
          <Flag src={match.flag2} name={match.country2} />
          <span className="text-center  min-h-10 text-sm font-semibold text-white">
            {match.country2}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isTimePassed(match.match_starts)}
        className={
          getQuizStatus()=== "Join Quiz Now"
            ? "mt-6 w-full rounded-xl quiz_btn_gradient py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-110 active:scale-[0.99]"
            : "mt-6 w-full cursor-not-allowed rounded-xl bg-white/10 py-3 text-sm font-semibold text-white/50"
        }
      >
        {getQuizStatus()}
        {/* {buttonLabel} */}
      </button>
    </div>
  );
}


export  function Flag({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <Image
      src={src}
      alt={`${name} flag`}
      width={56}
      height={40}
      className="h-9 w-14 rounded-md object-cover shadow ring-1 ring-white/10"
    />
  );
}

export  function PrevQuizCard({ match }: { match:any }) {
  // const status = getQuizStatus(match);

  const buttonLabel =
   "Show The Winner";

  return (
    <div className="rounded-2xl overflow-hidden relative border border-white/10 bg-[#341939] p-4 shadow-lg shadow-purple-950/40">
      <div className="absolute gradient_rounded top-0 left-0 ">
        <img src="/ellipse63.svg" />
      </div>
      {/* LIVE QUIZ badge */}
      <div className="flex justify-center pb-4 border-b border-b-gray-600">
        <div className="flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/5  px-4 py-.5">
          {/* <span className="text-sm">⚽</span> */}
          <span className="text-xs font-bold tracking-widest text-white">
            {formatDateNew(match.match_starts)} Match
          </span>
        </div>
      </div>

      {/* Meta pills */}
      {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        <Pill>{formatKickoff(match.quiz_starts_at)}</Pill>
        <Pill>{formatDateNew(match.quiz_starts_at)}</Pill>
        <Pill>Match {match.matchNo}</Pill>
        <Pill>{match.group_info}</Pill>
      </div> */}

      {/* Teams */}
      <div className="mt-6 grid grid-cols-3 items-center">
        <div className="flex flex-col items-center gap-2">
          <Flag src={match.flag1} name={match.country1} />
          <span className="text-center min-h-10 text-sm font-semibold text-white">
            {match.country1}
          </span>
        </div>
        <div className="text-center text-[#BC0974] pb-6 text-3xl font-extrabold italic text-pink-500">
          VS
        </div>
        <div className="flex flex-col items-center gap-2">
          <Flag src={match.flag2} name={match.country2} />
          <span className="text-center  min-h-10 text-sm font-semibold text-white">
            {match.country2}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        // disabled={!isLive}
        className={
         "mt-6 w-full cursor-pointer rounded-xl quiz_btn_gradient py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-110 active:scale-[0.99]"
        }
      >
        {buttonLabel}
      </button>
    </div>
  );
}