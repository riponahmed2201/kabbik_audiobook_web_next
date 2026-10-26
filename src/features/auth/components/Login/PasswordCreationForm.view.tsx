import React, { useState } from 'react';
import { EyeOff } from 'lucide-react';
import { setPasswordApi } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import Spinner from '@/shared/ui/Spinner.view';

export function PasswordCreationForm({closeModal}:{closeModal:()=>void}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader,setLoader]=useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password!==confirmPassword){
      setError('Password not matched')
      return;
    }
    if(password.length<8){
      setError('Passwod Must Contain at least 8 charecter')
      return;
    }
    setLoader(true);
    let result:any= await setPasswordApi(password);
    if(result.success===true){
      toast.success("Your password has been set successfully.")
      closeModal();
    }else{
      toast.error("Something Went Wrong")
    }
    setLoader(false);
    // Handle form submission
    //console.log('Password creation submitted');
  };

  return (
    <div className="bg-background flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card border transparent_border rounded-2xl shadow-2xl p-8 md:p-8">
          <form onSubmit={handleSubmit} className="">
            {/* Title */}
            <h1 className="text-white text-xl font-bold">
              পাসওয়ার্ড তৈরি করুন
            </h1>

            {/* Form Fields */}
            <div className="mb-5">
              {/* Password Field */}
              <div className="">
                <div className="mt-4">
                  <label className="block text-sm text-white font-bold">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative mt-3">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                    //   type="text"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে"
                      className="w-full py-2 px-6 md:px-8 bg-transparent border transparent_border rounded-[4px] shadow-lg placeholder:text-white/40 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#565454] hover:text-[#404040] transition-colors"
                    >
                      <EyeOff size={21} />
                    </button>
                  </div>
                </div>
                <p className="text-red-400 text-[13px] pt-0 mt-0">
                 {error}
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className=" mt-6">
                <label className="block text-sm text-white font-bold">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative mt-3">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    // type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে"
                    className="w-full py-2 px-6 md:px-8 bg-transparent border transparent_border rounded-[4px] shadow-lg placeholder:text-white/40 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#565454] hover:text-[#404040] transition-colors"
                  >
                    <EyeOff size={21} />
                  </button>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loader}
              className="w-full py-2 rounded-[4px] bg-[#DF1E1E] text-white text-lg font-medium shadow-lg hover:bg-[#c41a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#DF1E1E] focus:ring-offset-2 focus:ring-offset-background"
            >
              {loader?<Spinner size='w-6 h-6'/>:''}
              কন্টিনিউ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
