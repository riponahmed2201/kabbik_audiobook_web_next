import React from 'react'

const RewardPoint = () => {
  return (
    <div>
      <div
        className="rounded-2xl p-6"
        style={{
            background:
            "linear-gradient(150.34deg, #162751 22.16%, #985A8D 64.47%)",
        }}
        >
          <div className="flex justify-between mb-6">
              <p className="font-medium text:cn2 md:text-clg">মোঃ সুভন আলী</p>
              <p className="font-semibold text-cn2 md:text-clg2">১১,৮৬০ পয়েন্ট</p>
          </div>
          {/* Progress bar */}
          <p className="text-cs2 md:text-cn2 mb-2">শ্রবণ সূচনা</p>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-2 bg-white/90 w-[85%]" />
          </div>
          <p className="text-cs md:text-cn mt-2 opacity-90">
              পয়েন্ট ব্যবহার করলে লেভেলের অগ্রগতির উপর কোনো প্রভাব পড়বে না
          </p>
      </div>
    </div>
  )
}

export default RewardPoint