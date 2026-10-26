'use client'
import React, { useEffect, useState } from 'react'
import { GameSection } from './Entertainment.view'
import { paths } from '@/utils/Paths'
import { Game } from './static/entertainment.type'
import { container } from '../ui/static/tailwind.classes'

const HomeGamesSection = () => {
  const [topGames, setTopGames] = useState<Game[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/routes/games', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.gamezop_bearer_token}`,
          },
        })
        const result = await res.json()
        const allGames: Game[] = result?.data || []
        setTopGames(allGames.slice(0, 10))
      } catch (error) {
        console.error('Failed to fetch games:', error)
      }
    }

    fetchGames()
  }, [])

  return (
    <div className={container('1306px')+" mt-4"}>
      <GameSection
        title="কাব্যিক | গেইমস"
        games={topGames}
        seeAllHref={paths.entertainment}
        showRanking
        target='_blank'
        gameTarget='_blank'
      />
    </div>
  )
}

export default HomeGamesSection
