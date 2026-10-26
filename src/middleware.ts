import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = [ 'bn','en']
 function getLocale(request: Request) { 
    let headers = { 'accept-language': 'bn,en,en;q=0.5' }
    let languages = new Negotiator({ headers }).languages()
    let defaultLocale = 'bn'
    
    return match(languages, locales, defaultLocale) // -> 'en-US'
  }

const localeFreePaths = '/payment-info'


function withCorsHeaders(response: NextResponse, origin: string = "*") {
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, user-token, oc-status"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
export async function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "*";
  const method = req.method;
  const url = req.nextUrl;
  let source = req.headers.get('source')
    const response = NextResponse.next(); // ✅ create a response object
  const sourceFromParams=url.searchParams.get('source');
      
  let passKey=req.cookies.get("passKey")

  const host = req.headers.get('host');

  // Redirect www.kabbik.com → kabbik.com
  if (host?.includes('www.kabbik.com')) {
    const url = req.nextUrl.clone();
    url.hostname = 'kabbik.com';
    url.protocol = 'https:';
    url.port = '';

    return NextResponse.redirect(url, 301);
  }

  

  // "languages"

   const { pathname } = req.nextUrl
   if (pathname==='/payment-info') {
    return withCorsHeaders(response, origin)
  }
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if(!passKey){
    let result:any = await fetch('https://api.kabbik.com/v1/auth/get-otp-secretkey');
    let data = await result.json();
    response.cookies.set({
      name: "passKey",
      value: data.data?.passKey,
      httpOnly: false,
      secure: true,
      maxAge: 24 * 60 * 60, // 1 day in seconds
      sameSite: "none",
    });
  }
   if(source){
    const oneMonthLater = new Date();
      const threeHourLater = new Date();
      threeHourLater.setUTCHours(threeHourLater.getUTCHours() + 3);

      response.cookies.set({
        name: "source",
        value: source,
        httpOnly: false,
        secure: true,
        expires: threeHourLater,
        sameSite: "none",
      });
    return withCorsHeaders(response, origin);
  }
  if(sourceFromParams){
    //console.log(sourceFromParams,"sourceFromParams")
     const threeHourLater = new Date();
     threeHourLater.setUTCHours(threeHourLater.getUTCHours() + 3);
    response.cookies.set({
      name: "sourceFromParams",
      value: sourceFromParams,
      httpOnly: false,
      secure: true,
      expires: threeHourLater,
      sameSite: "none",
    });
    return withCorsHeaders(response, origin);
  }
 
  if (pathnameHasLocale) return withCorsHeaders(response, origin)
 
  // Redirect if there is no locale
  const locale = getLocale(req)
  req.nextUrl.pathname = `/${locale}${pathname}`
  //console.log(req.nextUrl.pathname);

  // if (method === "OPTIONS") {
  //   const res = new NextResponse(null, { status: 204 });
  //   return withCorsHeaders(res, origin);
  // }
  if(req.nextUrl.pathname.includes("/download-app")){
    const { ua, device, os } = userAgent(req);
      if (os.name?.toLowerCase() === "ios" || os.name?.toLowerCase() === "macos") {
        const res= NextResponse.redirect(
          "https://apps.apple.com/us/app/kabbik-audiobooks-podcast/id6459885875"
          // "https://kabbik.com?" + "device=" + device.type + "&os=" + os.name
        );
        return withCorsHeaders(res, origin);
      } else if (os.name?.toLowerCase() === "android") {
        const res =  NextResponse.redirect(
          "https://play.google.com/store/apps/details?id=com.kabbik.app"
          // "https://kabbik.com?" + "device=" + device.type + "&os=" + os.name
        );
        return withCorsHeaders(res, origin);
      } else {
        const res= NextResponse.redirect(
          "https://play.google.com/store/apps/details?id=com.kabbik.app"
          // "https://kabbik.com?" + "device=" + device.type + "&os=" + os.name
        );
      return withCorsHeaders(res, origin);
    }
  }
  //console.log(passKey,"passKey");
  
  
  return NextResponse.redirect(req.nextUrl)

  
  
}

// export const config = {
//   matcher: "/download-app",
// };




export const config = {
  matcher: [
    '/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.txt|.*\\.json).*)',
    '/payment-info',

    // Explicit route (e.g. for tracking app downloads)
    '/download-app',
  ],
}