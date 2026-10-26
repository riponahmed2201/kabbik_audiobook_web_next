"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "@/features/layoutShell/components/RedirectComponent/static/Redirecting.module.css";
import { postFacebookLogin, postGoogleLogin } from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import DeviceLimitModal from "@/features/auth/components/Login/DeviceLimitModal";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import Image from "next/image";
import { toast } from "react-toastify";

interface PageProps {
  session: any;
  redirectRoute: string;
}

const cookieOptions = {
  expires: 365,
  secure: true,
  sameSite: "None" as const,
};

export default function RedirectComponent({
  session,
  redirectRoute,
}: PageProps) {

  const navigate = useRouter();
const sessionData = session;
const [deviceLimitExceed, setDeviceLimitExceed] = useState(false);
const [loginError, setLoginError] = useState<string | null>(null);

const finishLogin = useCallback(
  async (token: string, user: any, exceeded: boolean,deviceId?: string) => {
    if (exceeded) {
      setDeviceLimitExceed(true);
      return;
    }

    if (!token || token === "undefined") {
      setLoginError("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
      return;
    }

    if (deviceId && deviceId !== "undefined") {
      Cookies.set("device_id", deviceId, cookieOptions);
    }

    Cookies.set("token", token, cookieOptions);
    Cookies.set("id", user?.id, cookieOptions);
    Cookies.set("msisdn", user?.phone_no, cookieOptions);
    Cookies.set("isLogin", "true", cookieOptions);

    if (
      Cookies.get("token") === "undefined" ||
      Cookies.get("token") === "" ||
      Cookies.get("token") == null
    ) {
      setLoginError("Could not save login session. Please try again.");
      toast.error("Could not save login session. Please try again.");
      return;
    }

    console.log("rendered replacing url");
    window.location.replace(`${redirectRoute}`);
  },
  [redirectRoute]
);

const socialLogin = useCallback(async () => {
  console.log(sessionData, "sessionData");

  

  // Facebook — call backend here (same pattern as Google)
  if (sessionData?.facebookAuth) {
    const fbData = await postFacebookLogin(sessionData.facebookAuth);
    await finishLogin(
      fbData?.token,
      fbData?.user,
      fbData?.deviceLimitExceed === true,
      fbData?.deviceId
    );
    return;
  }

  // Legacy path if fbResData was already stored in session
  if (sessionData?.fbResData) {
    const { token, user, deviceLimitExceed, deviceId } = sessionData.fbResData;
    await finishLogin(token, user, deviceLimitExceed === true, deviceId);
    return;
  }

  // Google — same as before
  if (sessionData?.id_token) {
    console.log("=== Google flow ===");

    const gData = await postGoogleLogin(sessionData.id_token);
    console.log(gData);

    await finishLogin(
      gData?.token,
      gData?.user,
      gData?.deviceLimitExceed === true
    );
    return;
  }

  console.log("=== No provider matched ===", sessionData);
  setLoginError("Social login could not be completed. Please try again.");
  toast.error("Social login could not be completed. Please try again.");
}, [sessionData, finishLogin]);

useEffect(() => {
  if (session) {
    console.log(session, "session");
    socialLogin();
  }
}, [session]);
  // const navigate = useRouter();
  // const sessionData = session;
  // const [deviceLimitExceed,setDeviceLimitExceed]=useState(false);


  // const googleApi = useCallback(async () => {
  //   console.log(sessionData,"sessionData")
  //   const gData = await postGoogleLogin(sessionData?.id_token);
  //   console.log(gData)

  //   Cookies.set("token", gData.token,{
  //     expires: 365,secure: true,          
  //     sameSite: 'None',      
  //   });

  //   if(gData?.deviceLimitExceed===true){
  //     setDeviceLimitExceed(true);
  //     return ;
  //   }
    
  //   Cookies.set("id", gData.user?.id,{
  //     expires: 365,secure: true,          
  //     sameSite: 'None',
  //   });
  //   Cookies.set("msisdn", gData.user?.phone_no,{
  //     expires: 365,secure: true,          
  //     sameSite: 'None',
  //   });
  //   Cookies.set("isLogin", "true",{
  //   });
  //   if (
  //     Cookies.get("token") === "undefined" ||
  //     Cookies.get("token") === "" ||
  //     Cookies.get("token") === null
  //   ){
  //     return true;
  //   }else{
  //     console.log("renderd replacing url")
  //     window.location.replace(`${redirectRoute}`);
  //   }
  //   // navigate.push("/");
  // }, [sessionData?.id_token, redirectRoute]);

  // useEffect(() => {
  //   // googleApi();
  //   if (session) {
  //     googleApi();
  //   } else {
  //     // navigate.push("/");
  //     // window.location.replace(`${redirectRoute}`);
  //   }
  // }, [ session]);

  /*-----------------GOOGLE AUTH LOGIN------------------*/

  return (
    <div className={`h-100 ${styles.redirectingPage}`}>
      <div className="d-flex justify-content-center align-items-center">
        <Image
          src="/loading-gif.gif"
          alt=""
          width={128}
          height={128}
          priority
          loading="lazy"
          className="max-w-full max-h-full"
          unoptimized
        />
      </div>
      {loginError ? (
        <p className="text-white text-center mt-4 px-4">{loginError}</p>
      ) : null}
      {deviceLimitExceed ? (
        <CommonModal
          isOpen={deviceLimitExceed}
          onClose={() => {
            setDeviceLimitExceed(false);
            console.log("working");
          }}
        >
          <DeviceLimitModal />
        </CommonModal>
      ) : (
        ""
      )}
    </div>
  );
}
// anujprokashon@gmail.com
// onuj123@O