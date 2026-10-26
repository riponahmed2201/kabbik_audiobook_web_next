import { paths } from "@/utils/Paths";
import Link from "next/link";

const ImageCard = ({
  src = "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/newBanner3333.jpeg",
  alt = "Mountain landscape",
  href = paths.quiz
}) => {
  return (
    <div className="flex items-center justify-center">
      <Link
        href={href}
        className="group max-w-[800px] max-h-[400px]  relative block overflow-hidden rounded-[8px] shadow-2xl"
      >
        {/* Desktop image */}
        <img
          // loading="lazy"
          src={src}
          alt={alt}
          draggable={false}
          loading="lazy"
          className="w-full max-sm:hidden h-full object-cover"
        />

        {/* Mobile image */}
        <img
          src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/newBanner3333.jpeg"
          alt={alt}
          draggable={false}
          loading="lazy"
          className="sm:hidden w-full h-full object-cover"
        />

        {/* Overlay — fades in on hover */}
        {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
      </Link>
    </div>
  );
};

export default ImageCard;