import Entertainment from '@/components/Entertainment/Entertainment.view';
import { getGames } from '@/utils/gamezop';
import React from 'react'

export const metadata = {
  title: "Entertainment | Kabbik",
  description: "Learn more about Kabbik and our story.",
};


const page = async() => {
  const gamesData = await getGames();
   
  return (
    <div>
        <Entertainment games={gamesData.data} />
    </div>
  )
}

export default page