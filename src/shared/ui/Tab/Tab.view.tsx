// components/Tabs.tsx
"use client";
import { useState } from "react";

interface Tab {
  name: string;
  component: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  showShadow?: boolean;
}

export default function Tabs({ tabs, showShadow = true }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex gap-2 md:gap-4 flex-wrap">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`max-xxs2:h-[50px]
              w-[31%] md:h-[46px] rounded-[12px] max-xxs2:text-cs2 text-cn max-xxs2:py-[10px] py-[12px] flex items-center justify-center
               font-medium transition-all duration-200
              ${activeIndex === index
                ? "text-white shadow-md bg-gradient-to-r from-[#BF3D71] to-[#9E2A6C]"
                : "bg-white shadow-md text-black"
              }
            `}
            style={{
              boxShadow: showShadow ? "0px 1px 4px 1px #00000040" : "none",
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeIndex].component}
      </div>
    </div>
  );
}
