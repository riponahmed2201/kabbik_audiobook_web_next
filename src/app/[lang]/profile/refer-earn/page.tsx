import { ReferralData } from '@/components/ReferAndEarn/static/refeAndEarn.type';
import SubscribedHomePage from '@/components/ReferAndEarn/SubscribedHomePage';
import UnSubscribedHomePage from '@/components/ReferAndEarn/UnSubscribedHomePage'
import { fetchReferAndEarn } from '@/utils/apiServices'
import React from 'react'

// app/[lang]/[category]/[id]/page.tsx
export const metadata = {
  title: "My Awesome Page",
  description: "Check out this amazing content!",
  openGraph: {
    title: "My Awesome Page",
    description: "Check out this amazing content!",
    url: "https://your-site.com/my-page",
    images: [
      {
        url: "https://your-site.com/preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  whatsapp: {
    card: "summary_large_image",
    title: "My Awesome Page",
    description: "Check out this amazing content!",
    images: ["https://your-site.com/preview.jpg"],
  },
};


const page = async() => {
    let response:ReferralData= await fetchReferAndEarn();

  return (
    <div>
        <UnSubscribedHomePage data={response}/>
        <SubscribedHomePage data={response}/>
    </div>
  )
}

export default page