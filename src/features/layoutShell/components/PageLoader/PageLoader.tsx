// Loader.tsx
'use client'
import React, { useEffect } from "react";

const Loader: React.FC = () => {
    
  // Always scroll to top when loader shows
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4">
        {/* Outer gradient ring */}
        <div className="h-16 w-16 rounded-full border-4 border-transparent animate-spin bg-gradient-to-tr from-[#E319BC] to-[#A36AE9] p-[2px]">
          {/* Inner circle with muted gradient */}
          <div className="h-full w-full rounded-full bg-gradient-to-br from-[#6B4CE6] to-[#3C2A80]"></div>
        </div>

        {/* Gentle text */}
        <p className="text-sm font-medium text-gray-200 opacity-80">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
