import React from 'react'
import Image from 'next/image'
import { container } from '@/shared/ui/static/tailwind.classes'
import Link from 'next/link'
import { paths } from '@/utils/Paths'

const banners = [
  { src: 'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/gamezop.png', alt: 'Gamezop', href: '#' },
//   { src: 'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/criczop.png', alt: 'Criczop', href: '#' },
//   { src: 'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/quizzop.png', alt: 'Quizzop', href: '#' },
//   { src: 'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/astrozop.png', alt: 'Astrozop', href: '#' },
]

const GamezopBanner = () => {
  return (
    <div className={'px-4'}>
      <h2 className="text-white text-lg md:text-xl font-semibold mb-3">
        কাব্যিক গেইমস
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {banners.map((banner) => (
          <Link
            key={banner.alt}
            href={paths.entertainment}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full aspect-[3.5/1] rounded-lg overflow-hidden block"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover rounded-[5px]"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GamezopBanner