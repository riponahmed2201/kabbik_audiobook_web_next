export default function WarningModal() {
  return (
    <div className="bg-dark_bg flex items-center justify-center bg-warning-bg m-2">
      <div className="w-full mx-auto">
        <div className="flex flex-col items-center gap-4 md:gap-8 lg:gap-10 p-4 py-8 rounded-xl md:rounded-[8px] border border-warning-border bg-warning-bg">
          {/* Warning Icon */}
          <div className="flex justify-center items-center relative">
            <img loading="lazy"
              src="https://api.builder.io/api/v1/image/assets/TEMP/05f9628b03d01f56b993872bc5bd2eed4052fc8c?width=316" 
              alt="Warning Icon"
              className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0"
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 w-full">
            {/* Warning Title */}
            <h1 className="text-warning-text text-white text-center font-inter font-semibold leading-tight text-2xl md:text-cxl2">
              সতর্ক বার্তা
            </h1>
            
            {/* Warning Message */}
            <p className="text-warning-text text-white text-center font-inter font-normal leading-relaxed text-sm md:text-lg lg:text-clg">
              আপনার প্লেলিস্ট সর্বোচ্চ সীমায় পৌঁছেছে নতুন অডিওবুক যোগ করতে হলে একটি অডিওবুক মুছে ফেলুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
