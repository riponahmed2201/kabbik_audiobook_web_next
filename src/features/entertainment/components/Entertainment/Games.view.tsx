import React from 'react'
import Link from 'next/link'
import { Game } from './static/entertainment.type'

function getGameCover(game: Game): string {
  return game.images?.cover || game.images?.wall || game.images?.square || game.images?.thumb || game.images?.brick || ''
}

type GamesProps = {
  games: Game[]
}

const Games = ({ games }: GamesProps) => {
  const allGames = games || []

  return (
    <div className="min-h-screen bg-[#0b0b1a]">
      <div className="max-w-[1300px] w-[95%] md:w-[90%] mx-auto py-8 md:py-12">
        <h1 className="text-cn2 sm:text-clg2 md:text-cxl font-bold mb-6 md:mb-10">
          <span className="text-white">কাব্যিক</span>
          <span className="text-white/60"> | </span>
          <span className="text-white">গেইমজপ</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {allGames.map((game) => (
            <Link
              key={game.code}
              href={game.url || '#'}
              // target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1a1a2e] transition-transform duration-200 group-hover:scale-[1.03]">
                <img
                  src={getGameCover(game)}
                  alt={game.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Games
