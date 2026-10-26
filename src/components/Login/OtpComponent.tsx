import React, { useState, useEffect } from 'react';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
// import { Button } from '@/components/ui/button';
import styles from './static/otp.module.css'
import OTPInput from 'react-otp-input';
import { WarningIcon } from '@/svgs/WarningIcon.svg';
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { postLoginApi, postSendOtp, postVerifyOtp } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import CommonButton from '../ui/button';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/slicers/userSlice';
import CommonModal from '../ui/CommonModal/CommonModal.view';
import DeviceLimitModal from './DeviceLimitModal';


const OTPVerification = ({closeModal,handleShowPasswordModal}:{closeModal:()=>void,handleShowPasswordModal:()=>void}) => {
  const router = usePathname();
    const navigate = useRouter();
    const [loader,setLoader]=useState(false);
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const dispatch=useAppDispatch();
      const [deviceLimitExceed,setDeviceLimitExceed]=useState(false);

    
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
  
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [seconds, minutes]);
  
    const otpHandler = (event: any) => {
      setOtp(event);
    };
  
    const submitOTP = async (event: any) => {
      event.preventDefault();
      setLoader(true);
      const loginData = await postVerifyOtp(otp);
        // const loginData = await postLoginApi();
        if (loginData?.token) {
          // dispatch(setUser(loginData?.user))
          
          Cookies.set("token", loginData.token, {
            expires: 365,secure: true,          
            sameSite: 'None',
          });

          if(loginData?.deviceLimitExceed){
            setDeviceLimitExceed(true);
            return;
          }
         

           Cookies.set("isLogin", "true", {
            expires: 365,secure: true,          
            sameSite: 'None',
          });

          Cookies.set("id", loginData.user.id,{
            expires: 365,secure: true,          
            sameSite: 'None',
          });
  
          toast.success("Login Successful!", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
          closeModal()
          handleShowPasswordModal()
          // window.location.replace(`${router}`);
          // navigate.push(`${router}`);
          // window.location.reload();
        }
      
      setLoader(false);
    };
  
    const resendOTP = async () => {
      const reSentOtp = Cookies.get("msisdn");
      const data = await postSendOtp(reSentOtp);
      if(data?.remainingTime && data?.created!=true){
        setMinutes(Math.floor(data?.remainingTime/60))
        setSeconds(data?.remainingTime%60);
      }else{
        setMinutes(1);
        setSeconds(30);
      }
      
    };
  



  return (
    <div className=" bg-otp-bg flex items-center justify-center p-2 md:p-4 font-inter">
      <div className="w-[95%] max-w-[932px] bg-otp-card/30 border border-gray-200/30 rounded-2xl max-md:pl-3 max-md:pr-5 md:p-8 shadow-otp-card backdrop-blur-sm">
        <div className="flex flex-col gap-5">
          {/* Header Section */}
          <div className="flex flex-col gap-1">
            {/* Title and Description */}
            <div className="flex flex-col gap-2 max-w-[445px]">
              <h1 className="text-white font-bold text-cn md:text-clg2 leading-normal">
                ৬ সংখ্যার কোড
              </h1>
              <p className="text-white text-cxs md:text-xs leading-normal max-w-[573px]">
                আপনার নম্বরে পাঠানো কোডটি লিখুন। 
                কিছু অঞ্চলে এটি পৌঁছতে ২-৩ মিনিট সময় লাগতে পারে।
              </p>
            </div>

            {/* OTP Input Section */}
            <div className="flex flex-col mt-3 md:mt-8 "> 
              <h2 className="text-white text-cn md:text-lg leading-normal">
                ওটিপি লিখুন
              </h2>
              
              <div className="flex flex-col gap-4 md:gap-8">
                {/* OTP Input Boxes */}
                <div className="flex items-center mt-3 w-full">
                  <OTPInput
                    value={otp}
                    onChange={otpHandler}
                    numInputs={6}
                    renderSeparator={<span className="mx-1 md:mx-1.5"></span>}
                    inputType="tel"
                    inputStyle={styles.otpInputField}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                />
                </div>

                {/* Error Message */}
                {/* {showResendError && ( */}
                  <div className="flex items-center gap-2 md:gap-4">
                    <span className='w-4 py-0 h-4 inline-block'>
                        <WarningIcon />
                    </span>
                    <p className="text-otp-error text-cxs md:text-xs text-red-600">
                        
                      ওটিপি ইতিমধ্যেই পাঠানো হয়েছে। পুনরায় পাঠাতে দয়া করে কিছুক্ষন অপেক্ষা করুন।
                    </p>
                  </div>
                {/* )} */}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="">
            {/* Verify Button */}
            <div className="d-flex j align-items-center mt-3 ">
              <CommonButton
                // type="submit"
                isLoading={loader}
                handleClick={submitOTP}
                className={`btn w-full bg-red-600 text-white flex items-center justify-center ${styles.otp_btn}`}
              >
                ভেরিফাই করুন
              </CommonButton>
            </div>

            {/* Countdown Text */}
            {(minutes+seconds)<=0?(
              <>
                <p className="text-center mt-3 text-sm rext-red-600 leading-normal cursor-pointer">
                <span className="text-white">কোড পাননি? </span>
                <span className="text-red-600" onClick={resendOTP}> পুনরায় পাঠান।</span>
                {/* <span className="text-white"></span> */}
              </p>
              </>
            ):(
              <>
                  <p className="text-center mt-3 text-cs md:text-sm rext-red-600 leading-normal">
                <span className="text-white">কোড পুনরায় পাঠানো </span>
                <span 
                  onClick={resendOTP}
                  className="text-red-600"
                >যাবে {minutes} মিনিট {seconds} সেকেন্ড পর ।</span>
                {/* <span className="text-white"></span> */}
              </p>
              </>
            )}
          </div>
        </div>
      </div>
      {deviceLimitExceed?<CommonModal
          isOpen={deviceLimitExceed}
          onClose={()=>{setDeviceLimitExceed(false);console.log("working")}}
      >
          <DeviceLimitModal />
      </CommonModal>:''}
    </div>
  );
};

export default OTPVerification;
