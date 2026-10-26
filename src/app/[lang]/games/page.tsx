import Games from '@/components/Entertainment/Games.view'
import { getGames } from '@/utils/gamezop'
import React from 'react'

export const metadata = {
  title: "Games | Kabbik",
  description: "Play free online games on Kabbik powered by Gamezop.",
};

const page = async () => {
  const gamesData = await getGames();

  return (
    <div>
      <Games games={gamesData.data} />
    </div>
  )
}

export default page
