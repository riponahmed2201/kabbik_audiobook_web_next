import React from "react";

export type RatingProps = {
  value: number; // current rating value (can be fractional)
  max?: number; // default 5
  min?: number; // default 1
  fullIcon: (args: { className?: string }) => React.ReactNode;
  halfIcon?: (args: { className?: string }) => React.ReactNode; // optional icon for fraction
  sizeClasses?: string;
  fillClassName?: string;
  emptyClassName?: string;
  className?: string;
};

export default function Rating({
  value,
  max = 5,
  min = 1,
  fullIcon,
  halfIcon,
  sizeClasses = "w-6 h-6",
  fillClassName = "text-yellow-500",
  emptyClassName = "text-gray-300 dark:text-gray-600",
  className = "",
}: RatingProps) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        if (index <= Math.floor(value)) {
          // Full star
          return (
            <span key={i} className={`${sizeClasses} ${fillClassName}`}>
              {fullIcon({ className: "w-full h-full" })}
            </span>
          );
        } else if (halfIcon && value >= index - 0.5 && value < index) {
          // Half star if available
          return (
            <span key={i} className={`${sizeClasses} ${fillClassName}`}>
              {halfIcon({ className: "w-full h-full" })}
            </span>
          );
        } 
        else {
          // Empty star
          return (
            <></>
            // <span key={i} className={`${sizeClasses} ${emptyClassName}`}>
            //   {fullIcon({ className: "w-full h-full" })}
            // </span>
          );
        }
      })}
    </div>
  );
}

/* ----------------- Example usage -----------------

import { Star, StarHalf } from "lucide-react";

export default function Demo() {
  return (
    <div className="p-6 space-y-4">
      <Rating
        value={3.5}
        max={5}
        fullIcon={({ className }) => <Star className={className} />}
        halfIcon={({ className }) => <StarHalf className={className} />}
        sizeClasses="w-7 h-7"
        fillClassName="text-amber-500"
        emptyClassName="text-gray-300 dark:text-gray-700"
      />
    </div>
  );
}

Notes:
- Supports fractional rating using a `halfIcon`.
- If `halfIcon` is not provided, fractions will render as empty icons.
*/
