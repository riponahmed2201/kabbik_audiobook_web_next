import styles from "./static/aboutCard.module.css"

interface TeamMemberCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function TeamMemberCard({ name, title, description, imageUrl }: TeamMemberCardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className={"relative  rounded-[18px] "+styles.bg_gradient}>
        {/* Gradient background card */}
          <div className="flex flex-col md:flex-row  overflow-y-hidden">
            {/* Profile Image Section */}
            <div className="w-[60%] sm:w-[30%] bg-[#1A237E0D]">
              <div className="flex justify-center items-center h-full py-3">
                <div className="relative flex  items-center justify-center">
                  <div className="w-[80%] h-[80%]  border-[3px] border-gray-400 rounded-[20%] shadow-lg overflow-hidden bg-gray-800">
                    <img 
                      
                      src={imageUrl} 
                      alt={name}
                      className="max-w-full max-h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[63%] flex items-center p-2 md:p-4 text-white">
              <div className=" ">
                {/* Header */}
                <div className="">
                  <h2 className="text-clg md:text-cxl font-bold font-poppins leading-tight mb-2">
                    {name}
                  </h2>
                  <p className="text-cn2 md:text-clg font-poppins font-normal mb-4">
                    {title}
                  </p>
                  <div className="w-[94px] h-[6px] bg-white rounded-full"></div>
                  <div className="mt-5">
                    <p className="text-cn text-justify font-inter leading-relaxed">
                        {description}
                    </p>
                    </div>
                </div>

                {/* Description */}
                
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
