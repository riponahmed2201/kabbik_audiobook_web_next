// Handles form submissions to https://kabbik.com/
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData.entries());
  // const formObj = Object.fromEntries(formData.entries());
  const transactionId = formData.get('transactionId')?.toString() || 'unknown';
  const transactionStatus:number|string = formData.get('txnStatus')?.toString() || '0';
  
  let redirectUrl =  "https://api.kabbik.com/v4/city-pay/redirect-payment"
  let response = await fetch(
    redirectUrl,{
      method:'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(formObj), 
    }
  )
  let data=await response.json()

 
  const url = request.nextUrl.clone();
  // url.pathname = 'https://kabbik.com/payment-status-city-bank';
  let newUrl= "https://kabbik.com/payment-status?reference=" +
          transactionId +
          "&paymentType=city_touch" +
          "&message=" +
          "city_touch_payment" +
          `&status=${data?"SUCCESSFULL":"FAILED"}`;

  //console.log("found",formObj,newUrl)
  
  return NextResponse.redirect(new URL(newUrl), { status: 303 });
}
