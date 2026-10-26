export default function BigPlayerCards() {
  const episodes = [
    {
      id: 1,
      title: "শার্লক হোমস: লাল বৃত্ত   পর্ব-১",
      author: "লেখক:স্যার আর্থার কোনান",
      duration: "30:00",
      coverImage: "https://api.builder.io/api/v1/image/assets/TEMP/8b3ada7b4da665ce46d7d514a1b41ae302a3c899?width=108"
    },
    {
      id: 2,
      title: "শার্লক হোমস: লা�� বৃত্ত   পর্ব-  ২",
      author: "লেখক:স্যার আর্থার কোনান",
      duration: "30:00",
      coverImage: "https://api.builder.io/api/v1/image/assets/TEMP/8b3ada7b4da665ce46d7d514a1b41ae302a3c899?width=108"
    },
    {
      id: 3,
      title: "শার্লক হোমস: লাল বৃত্ত   পর্ব-  ৩",
      author: "লেখক:স্যার আর্থার কোনান",
      duration: "30:00",
      coverImage: "https://api.builder.io/api/v1/image/assets/TEMP/8b3ada7b4da665ce46d7d514a1b41ae302a3c899?width=108"
    },
    {
      id: 4,
      title: "শার্লক হোমস: লাল বৃত্ত   পর্ব-১",
      author: "লেখক:স্যার আর্থার কোনান",
      duration: "30:00",
      coverImage: "https://api.builder.io/api/v1/image/assets/TEMP/8b3ada7b4da665ce46d7d514a1b41ae302a3c899?width=108"
    },
    {
      id: 5,
      title: "শার্লক হোমস: লাল বৃত্ত   পর্ব-  ২",
      author: "লেখক:স্যার আর্থার কোনান",
      duration: "30:00",
      coverImage: "https://api.builder.io/api/v1/image/assets/TEMP/8b3ada7b4da665ce46d7d514a1b41ae302a3c899?width=108"
    },
    {
      id: 6,
      title: "শার্লক হোমস: লাল বৃত্ত   পর্ব-  ৩",
      author: "লেখক:স্যার আর্থার কোনান",
      duration: "30:00",
      coverImage: "https://api.builder.io/api/v1/image/assets/TEMP/8b3ada7b4da665ce46d7d514a1b41ae302a3c899?width=108"
    }
  ];

  const PlayIcon = () => (
    <svg 
      width="22" 
      height="23" 
      viewBox="0 0 22 23" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-white"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M10.8153 0.980469C4.8518 0.980469 0 5.83226 0 11.7957C0 17.7592 4.8518 22.611 10.8153 22.611C16.7788 22.611 21.6306 17.7592 21.6306 11.7957C21.6306 5.83226 16.7788 0.980469 10.8153 0.980469ZM14.7033 12.2793L8.75227 15.8743C8.66544 15.9264 8.57141 15.9529 8.47018 15.954C8.36896 15.9551 8.27439 15.9305 8.18646 15.8804C8.09853 15.8302 8.02928 15.7613 7.97869 15.6736C7.9281 15.5859 7.9031 15.4915 7.90369 15.3903V8.20121C7.9031 8.09998 7.9281 8.00553 7.97869 7.91785C8.02927 7.83017 8.09853 7.76124 8.18646 7.71109C8.27439 7.66093 8.36896 7.63639 8.47018 7.63747C8.57141 7.63855 8.66544 7.6651 8.75227 7.71712L14.7033 11.3122C14.8844 11.4225 14.9749 11.5837 14.9749 11.7957C14.9749 12.0078 14.8844 12.169 14.7033 12.2793Z" 
        fill="white"
      />
    </svg>
  );

  const ScrollIndicator = () => (
    <div className="fixed right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-2.5 h-[583px] hidden lg:flex flex-col">
      {/* Background bar */}
      <div className="w-full h-full bg-white rounded-full relative">
        {/* Active portion */}
        <div className="absolute top-[59px] left-0 w-full h-[146px] bg-scroll-gradient rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className=" bg-gray-100 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main container matching the figma design */}
        <div className="relative bg-audiobook-container-bg border border-audiobook-container-border rounded-4xl shadow-audiobook p-8 lg:p-12">
          
          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Episodes list (left column on desktop, full width on mobile) */}
            <div className="lg:col-span-2 space-y-4">
              {episodes.map((episode) => (
                <div 
                  key={episode.id}
                  className="flex items-center bg-episode-gradient rounded-lg p-2 shadow-sm group hover:shadow-md transition-shadow duration-200"
                >
                  {/* Cover image with play button */}
                  <div className="relative flex-shrink-0 w-14 h-[73px] rounded-lg overflow-hidden">
                    <img 
                      loading="lazy"
                      src={episode.coverImage}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-200">
                      <PlayIcon />
                    </div>
                  </div>

                  {/* Episode details */}
                  <div className="flex-1 ml-4 text-white">
                    <h3 className="font-normal text-sm lg:text-base leading-tight mb-1 font-bengali">
                      {episode.title}
                    </h3>
                    <p className="text-xs opacity-90 mb-1 font-bengali">
                      {episode.author}
                    </p>
                    <p className="text-xs opacity-80 font-bengali">
                      {episode.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar (right column on desktop, below episodes on mobile) */}
            <div className="lg:col-span-1">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <h2 className="text-gray-800 font-semibold text-lg mb-4 font-bengali">
                  পরবর্তী এপিসোড
                </h2>
                
                <div className="space-y-3">
                  {episodes.slice(0, 3).map((episode) => (
                    <div 
                      key={`sidebar-${episode.id}`}
                      className="flex items-center bg-episode-gradient rounded-lg p-2 text-white group hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="relative flex-shrink-0 w-12 h-16 rounded overflow-hidden">
                        <img 
                          loading="lazy"
                          src={episode.coverImage}
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-200">
                          <PlayIcon />
                        </div>
                      </div>
                      
                      <div className="flex-1 ml-3">
                        <h4 className="text-sm font-normal leading-tight mb-1 font-bengali">
                          {episode.title}
                        </h4>
                        <p className="text-xs opacity-90 mb-1 font-bengali">
                          {episode.author}
                        </p>
                        <p className="text-xs opacity-80 font-bengali">
                          {episode.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </div>
  );
}
