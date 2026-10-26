import { useState } from "react";
import { cn } from "@/lib/utils";
import { ClockIcon, SliderHandle } from "@/svgs/ClockIcon.svg";
import { speedOption, timerOptions } from "./static/audioPlayer.utils";


export default function AudioSpeed({handleChange,value=1}:{handleChange: (value: number) => void,value:number}) {
  const [selectedTimer, setSelectedTimer] = useState(value*100/4);
  // sliderValue is percent (0..100) mapped from selectedTimer (0..50)
  const [sliderValue, setSliderValue] = useState(50);
  const handleTimerSelect = (value: number) => {
    const clamped = Math.max(0, value*100/4);
    setSelectedTimer(clamped);
    setSliderValue(clamped === 0 ? 0 : (clamped / 50) * 100);
    handleChange(value)
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // slider steps are 0,20,40,60,80,100 -> corresponding to 0,10,20,30,40,50 minutes
  const value = parseFloat(e.target.value);
  // snap just in case and compute minutes
  const snapped = Math.round(value / 20) * 20;
  setSliderValue(snapped);
  handleChange( snapped *2/100); // convert to minutes
  const minutes = Math.round((snapped / 100) * 50);
  setSelectedTimer(minutes);
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto h-auto flex-col items-start gap-2 rounded-xl bg-[#06152B] p-6 lg:p-11">
      <div className="flex w-full flex-col items-center gap-3">
        <div className="w-full text-center text-white font-inter text-cn sm:text-xl md:text-2xl font-semibold leading-normal">
          প্লেয়ার স্পিড
        </div>

        <div className="flex flex-col items-center gap-12 lg:gap-20 w-full">
          <div className="h-13 w-full relative max-w-4xl">
            {/* base track */}
            <div className="w-full h-3.5 rounded-full bg-white absolute top-5"></div>
            {/* filled gradient to left of handle */}
            <div
              className="absolute top-5 h-3.5 rounded-l-full"
              style={{
                width: `${sliderValue}%`,
                background: 'linear-gradient(90deg, #A41580 0%, #DC0277 100%)',
                transition: 'width 200ms ease-in-out',
              }}
            />
            {/* handle */}
            <div
              className="absolute top-3.5  transition-all duration-300 ease-in-out"
              style={{ left: `${sliderValue-2.5}%`, transform: "translateX(-50%)" }}
            >
              <SliderHandle />
            </div>
            {/* invisible range input that snaps to discrete steps (0..100 step 20) */}
            <input
              type="range"
              min="0"
              max="100"
              step={1}
              value={sliderValue}
              onChange={handleSliderChange}
              className="absolute top-5 w-full h-3.5 opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-3 w-full max-w-4xl">
            {speedOption.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTimerSelect(option.value)}
                className={cn(
                  "flex  py-1 px-1 w-14 rounded-[8px] justify-center items-center gap-1 transition-all duration-200",
                  selectedTimer === (option.value*100/4)
                    ? "bg-[#FF0404] text-white"
                    : "bg-white text-[#06152B]"
                )}
              >
                <span className="font-inter text-[14px] lg:text-[16px] font-normal">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
