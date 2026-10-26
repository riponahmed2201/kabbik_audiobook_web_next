'use client'
import Loader from '@/features/layoutShell/components/PageLoader/PageLoader';
import { ReferralData } from '@/features/referEarn/components/ReferAndEarn/static/refeAndEarn.type';
import { replacePlaceholder } from '@/helpers/commonFunction';
import { fetchReferAndEarn } from '@/utils/apiServices';
import PageLoader from 'next/dist/client/page-loader';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Refer_code_Share = () => {
     const params = useParams<{ refer_code: string }>();

  const refer_code = params.refer_code;
    const [referJSON,setReferJSON]=useState<ReferralData|null>(null);
    
    const getJSON=async()=>{
      let result = await fetchReferAndEarn();
      setReferJSON(result);
    }

    useEffect(()=>{
      // getReferHistory()
    //   getTotalEarn()
      getJSON()
    },[])
  return (
    referJSON?.sharable_image_url?(
        <div className='max-w-[600px] mx-auto p-4 mt-7'>
        <figure>
            <Image
                src={referJSON?.sharable_image_url||''}
                alt='refer and earn'
                width={400}
                height={400}
                className='w-full'
            />
        </figure>
        <div className='text-white text-justify mt-7'>
            {replacePlaceholder(referJSON?.sharable_content||'',refer_code||'')}
        </div>
    </div>
    ):<div ><Loader/> </div>
  )
}

export default Refer_code_Share