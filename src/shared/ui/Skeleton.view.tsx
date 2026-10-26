import React from "react";

interface SkeletonProps {
  width?: string | number;      // e.g., "w-32" or 128
  height?: string | number;     // e.g., "h-6" or 24
  rounded?: "none" | "sm" | "md" | "lg" | "full"; // Tailwind rounding
  className?: string;           // extra classes
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-6",
  rounded = "md",
  className = "",
}) => {
  // Convert numeric values to tailwind style using inline style
  const style =
    typeof width === "number" || typeof height === "number"
      ? { width: typeof width === "number" ? width : undefined, height: typeof height === "number" ? height : undefined }
      : {};

  const borderRadius = rounded === "full" ? "rounded-full" : `rounded-${rounded}`;

  return (
    <div
      className={`bg-gray-300 animate-pulse ${borderRadius} ${typeof width === "string" ? width : ""} ${typeof height === "string" ? height : ""} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
