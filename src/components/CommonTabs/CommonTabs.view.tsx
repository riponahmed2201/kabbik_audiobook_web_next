"use client";
import { useState } from "react";

interface Tab {
  title: string;
  component: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function CommonTabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="w-full  text-white"
    >
      {/* Tab Header */}
      <div className="max-w-full">
        <div 
        // className="flex items-center  justify-around border-b border-white/20"
        className="
          flex items-center gap-6 border-b border-white/20
          overflow-x-auto scroll-smooth
          whitespace-nowrap
          overflow-y-hidden
        "

        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#7F1867 #050f1e",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative py-3 text-sm font-medium transition-all duration-300 `}
          >
            {tab.title}
            {activeIndex === index && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
      </div>

      {/* Active Tab Content */}
      <div className="py-3 flex items-center justify-center">{tabs[activeIndex]?.component}</div>
    </div>
  );
}
