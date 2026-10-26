interface ContentCardProps {
  src: string;
  alt: string;
  className?: string;
  height?: "small" | "medium" | "large" | "full";
}

export default function ContentCard({ 
  src, 
  alt, 
  className = "", 
  height = "medium" 
}: ContentCardProps) {
  const heightClasses = {
    small: "h-[47px] md:h-[60px] lg:h-[96px]",
    medium: "h-[67px] md:h-[100px] lg:h-[157px]",
    large: "h-[100px] md:h-[133px] lg:h-[200px]",
    full: "h-[67px] md:h-[100px] lg:h-[157px]"
  };

  return (
    <div className={`relative ${className}`}>
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={`w-full ${heightClasses[height]} object-cover rounded-sm border border-gray-400/70 transition-all duration-300 hover:shadow-sm hover:border-gray-500`}
      />
      {/* Optional overlay for future text content */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 rounded-sm" />
    </div>
  );
}
