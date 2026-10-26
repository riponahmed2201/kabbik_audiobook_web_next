import React from 'react'

const MsisdnTracker = (props:any) => {
  const {value,onChange,isMsisdnValid,isNextButtonPressed,handleNext,errorMessage,className,inputBoxClass,label,BtnBoxClass}=props;
  return (
    <>
      <div
  className={"flex justify-center mx-auto items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black " + className}
  // style={{ width: "400px" }}
>
  <div
    style={{ width: "250px" }}
    className="text-white flex flex-col gap-4 p-6 rounded-2xl shadow-lg bg-gray-900/60 backdrop-blur"
  >
    <label htmlFor="msisdn" className="form-label text-sm font-medium">
      <div className="text-center mb-3 text-lg font-semibold tracking-wide text-gray-200">
        {label}
      </div>
      <input
        type="text"
        className={`mt-2 w-full text-center px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 ${inputBoxClass}`}
        placeholder="Type a number"
        value={value}
        onChange={onChange}
      />
      {!isMsisdnValid && isNextButtonPressed ? (
        <div className="text-red-400 mt-2 text-sm">
          {errorMessage}
        </div>
      ) : null}
    </label>
    <button
      className={
        "w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-all duration-200 font-medium shadow-md " +
        BtnBoxClass
      }
      onClick={handleNext}
    >
      Next
    </button>
  </div>
</div>
    </>
  )
}

export default MsisdnTracker