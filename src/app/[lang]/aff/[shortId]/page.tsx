import { redirect } from 'next/navigation'
import React from 'react'
import { apiEndPoints } from '@/utils/apiEndpoints'

const page = async ({
  params,
}: {
  params: Promise<{ shortId: string; lang: "en" | "bn" }>;
}) => {
    const { shortId } = await params;   
    //console.log(shortId);
     
  const res = await fetch(apiEndPoints.affliate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      shortCode:shortId
    }),
    // Important for SSR fetch
    cache: 'no-store',
    redirect:'manual'
  })

  

//  //console.log("Response status:", res.status);
//   //console.log("Headers:", Object.fromEntries(res.headers.entries()));

  const location = res.headers.get("location");
  //console.log("Location header:", location);
//   try{
       
//   }catch(e){
//     //console.log(e);
//   }
   if(location){
        redirect(location)
    }
  

  // Return the HTML directly so the browser executes the form
  return <div>Loading...</div>;
}

export default page