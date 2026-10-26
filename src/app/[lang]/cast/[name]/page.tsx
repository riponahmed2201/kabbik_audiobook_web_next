import { castDetails, castEpisodes } from "@/utils/apiServices";
import { CastCrewEpisodesInfo, castCrewInfo } from "./cast.type";
import Image from "next/image";
import { container } from "@/shared/ui/static/tailwind.classes";
import { AudiobookCard } from "@/features/catalog/components/CategoryWiseBooks/AudioBookCard.view";

const Cast = async ({
  params,
}: {
  params: Promise<{ name: string; lang: "en" | "bn" }>;
}) => {
  const { name: castName } = await params;
  const castData: {data:castCrewInfo[]} = await castDetails(castName);
  const castEpisodesData: {data:CastCrewEpisodesInfo[]} = await castEpisodes(castName);
  return (
    <>
      <>
            <div>
              <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
                  <section className="max-w-5xl mx-auto px-6 py-16">
                      <div className="flex flex-col md:flex-row items-center gap-8 text-white/90 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                          {/* Writer Image */}
                          <div className="flex-shrink-0">
                          <Image
                              src={castData?.data[0]?.imageUrl||'' } // 👈 replace with actual image
                              alt="Writer"
                              width={160}
                              height={160}
                              className="rounded-full object-cover border-4 border-indigo-500 shadow-md"
                              priority
                          />
                          </div>
      
                          {/* Writer Info */}
                          <div className="flex-1 text-center md:text-left">
                          <h2 className="text-3xl font-bold  mb-3">
                              {castData?.data[0]?.name}
                          </h2>
      
                          <p className="text-justify leading-relaxed">
                              {true
                              ? castData?.data[0]?.description
                              : castData?.data[0]?.description}
                          </p>
      
                          {/* Read More / Less Button */}
                          {/* <button
                              onClick={() => setExpanded(!expanded)}
                              className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                          >
                              {expanded ? "Read less ▲" : "Read more ▼"}
                          </button> */}
                          </div>
                      </div>
                  </section>
                <div >
                   <div>
                        <div className={`${container('1300px')} relative`}>
                            <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
                            <div className="circular_gradient right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div>
                            <div className="mt-10  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-3 md:gap-4 lg2:gap-6">
                              {castEpisodesData?.data ? castEpisodesData?.data?.map((audiobook) => (
                                <AudiobookCard 
                                  key={audiobook.id} 
                                  category={castName}
                                  audiobook={audiobook as any}
                                  className="max-w-sm mx-auto"
                                />
                              )):''}
                            </div>
                        </div>
                   </div>
                 </div>
              </div>
          </>
    </>
  );
};

export default Cast;
