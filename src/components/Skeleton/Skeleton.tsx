import React from "react";

interface SkeletonProps {
  height?: string;  // Tailwind height classes (e.g. "h-4")
  width?: string;   // Tailwind width classes (e.g. "w-full", "w-1/2")
  count?: number;   // Number of skeleton lines
  className?: string; // Extra classes if needed
}

export default function Skeleton({
  height = "h-4",
  width = "w-full",
  count = 1,
  className = "",
}: SkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} ${width} bg-gray-200 rounded animate-pulse ${className}`}
        />
      ))}
    </div>
  );
}
