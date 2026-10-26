'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import RightAngle from '@/svgs/rightAngle'
import RightArrowIcon from '@/svgs/RightArrowIcon'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
import { Game, GameSectionProps, Props } from './static/entertainment.type'
import { paths } from '@/utils/Paths'
import { useAppSelector } from '@/store/store'
import { gamezop_stat_tracker } from '@/utils/apiServices'

function getGameThumb(game: Game): string {
  return game.images?.square || game.images?.cover || game.images?.wall || game.images?.thumb || game.images?.brick || ''
}


export function GameSection({ title, games, seeAllHref, showRanking, target = "_self",gameTarget = "_self" }: GameSectionProps) {
  const user = useAppSelector((store)=>store.user?.userData)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const handleGamezopStats=async(gameid:string,game_type='gamezop',category='gamezop',game_name='gamezop')=>{
    let payload ={
      game_type:game_type,
      game_category: category,
      game_name: game_name,
      user_id: user?.id || 0
    }

    await gamezop_stat_tracker(payload);
  }

  if (!games?.length) return null

  return (
    <div className="mb-8 md:mb-12 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            target={target ? target : "_self"}
            // target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold bg-[#D9D9D945] shadow-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#D9D9D960] transition-colors"
          >
            সব দেখুন
            <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <span className="w-2.5 h-2.5 inline-block"><RightArrowIcon /></span>
            </span>
          </Link>
        )}
      </div>

      <div className="relative">
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-4 h-16 sm:h-20 rounded-xl flex items-center justify-center btn-gradient-21 hover:brightness-110"
        >
          <span className="w-3 h-3 inline-block"><RightAngle color="white" className="rotate-180" /></span>
        </button>
        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-4 h-16 sm:h-20 rounded-xl flex items-center justify-center btn-gradient-21 hover:brightness-110"
        >
          <span className="w-3 h-3 inline-block"><RightAngle color="white" /></span>
        </button>

        <div className="mx-8 sm:mx-9 md:mx-10 overflow-hidden">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper: any) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
              }
            }}
            breakpoints={showRanking ? {
              0: { slidesPerView: 2.2, slidesPerGroup: 2, spaceBetween: 2 },
              500: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 4 },
              768: { slidesPerView: 4.2, slidesPerGroup: 4, spaceBetween: 4 },
              1024: { slidesPerView: 5.5, slidesPerGroup: 5, spaceBetween: 6 },
              1280: { slidesPerView: 6.5, slidesPerGroup: 6, spaceBetween: 6 },
            } : {
              0: { slidesPerView: 2.5, slidesPerGroup: 2, spaceBetween: 10 },
              500: { slidesPerView: 3.5, slidesPerGroup: 3, spaceBetween: 12 },
              768: { slidesPerView: 5, slidesPerGroup: 4, spaceBetween: 14 },
              1024: { slidesPerView: 6.5, slidesPerGroup: 5, spaceBetween: 16 },
              1280: { slidesPerView: 8, slidesPerGroup: 6, spaceBetween: 16 },
            }}
          >
            {games.map((game, index) => (
              <SwiperSlide key={game.code || index}>
                <Link
                  href={game.url?game.url+`?sub=${user?.id}`: '#'}
                  target={gameTarget}
                  onClick={()=>{handleGamezopStats(game?.code,"game",game.category?.name as string,game?.name)}}
                  rel="noopener noreferrer"
                  className="block"
                >
                  {showRanking ? (
                    <div className="relative" style={{ containerType: 'inline-size' }}>
                      <div
                        className="ml-auto rounded-xl overflow-hidden bg-[#1a1a2e] transition-transform duration-200 hover:scale-105"
                        style={{ width: '65%', aspectRatio: '3/4', position: 'relative', zIndex: 1 }}
                      >
                        <img
                          loading="lazy"
                          src={getGameThumb(game)}
                          alt={game.name}
                          // loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="absolute bottom-0 left-0 font-black select-none pointer-events-none"
                        style={{
                          lineHeight: 0.8,
                          fontSize: index + 1 >= 10 ? '50cqi' : '90cqi',
                          color: 'transparent',
                          WebkitTextStroke: '2px rgba(255,255,255,0.9)',
                          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))',
                          zIndex: 0,
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1a1a2e] transition-transform duration-200 hover:scale-105">
                      <img
                        loading="lazy"
                        src={getGameThumb(game)}
                        alt={game.name}
                        // loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

const Entertainment = ({ games }: Props) => {
  const allGames = games || []

  const topGames = allGames.slice(0, 10)
  const youMayLike = allGames.slice(20, 50)
  const originalGames = allGames.slice(50, 80)

//   const gamezopAllGamesUrl = 'https://www.gamezop.com'

  return (
    <div className="max-w-[1300px] w-[97%] md:w-[90%] mx-auto py-6 md:py-10 overflow-hidden">
      <GameSection
        title="কাব্যিক | গেইমজপ"
        games={topGames}
        seeAllHref={paths.games} 
        showRanking
      />
      <GameSection
        title="আপনার জন্য নির্বাচিত গেইমস"
        games={youMayLike}
        seeAllHref={paths.games}
      /> 
      <GameSection
        title="অরিজিনাল গেইমস"
        games={originalGames}
        seeAllHref={paths.games}
      />
    </div>
  )
}

export default Entertainment
