'use client'
import { PrevQuizCard } from '@/features/quiz/components/QuizCard/QuizCard';
import { WinnerModal } from '@/features/quiz/components/QuizCard/WinnerCard';
import CommonModal from '@/shared/ui/CommonModal/CommonModal.view';
import { container } from '@/shared/ui/static/tailwind.classes';
import { groupByDayDhaka } from '@/helpers/commonFunction';
import { getWinners } from '@/utils/apiServices';
import { MoveUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [winnerData,setWinnerData]=useState([]);
    const [showWinners,setShowWinners]=useState<any>(false);

    const getPrevWinnersQuizesData = async () => {
        const res = await getWinners();
        setWinnerData(res.winners);
    }
    useEffect(() => {
        getPrevWinnersQuizesData();
        getPrevWinnersQuizesData();
    }, []);

    const handleShowWinners=(winners:any)=>{
      setShowWinners(winners);
    }
  return (
    <div className={container("1306px")}>
        {/* {console.log(groupByDayDhaka(winnerData))} */}
        {groupByDayDhaka(winnerData)?.map((item:any)=>(
            <div key={item?.id} className="mx-auto max-w-7xl mt-12">
            <div className='flex justify-between'>
                <h1 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">
                {item?.date} Match Winner
                </h1>
            </div>
    
            {item?.records?.length === 0 ? (
            <p className="text-white/60">No quizzes available right now.</p>
            ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {item?.records?.map((match:any) => (
                <span key={match.id} onClick={()=>setShowWinners(match)}>
                    <PrevQuizCard  key={match.id} match={match} />
                </span>
                ))}
            </div>
            )}
        </div>
        ))}
        <CommonModal
        isOpen={showWinners}
        onClose={()=>setShowWinners(false)}
      >
        <WinnerModal winner={showWinners}/>
      </CommonModal>
    </div>
  )
}

export default Page