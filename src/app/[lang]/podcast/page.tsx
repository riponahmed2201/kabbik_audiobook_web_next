import { AudiobookCard } from '@/components/CategoryWiseBooks/AudioBookCard.view';
import CategorySelector from '@/components/CategoryWiseBooks/CategorySelector.view';
import PodcastInfo, { TCategoryComponent } from '@/components/CategoryWiseBooks/static/category.types';
import ThreeDBanner from '@/components/CategoryWiseBooks/ThreeDBanner.view';
import TopAudioBookSection from '@/components/CategoryWiseBooks/TopAudioBookSection.view';
import { container } from '@/components/ui/static/tailwind.classes';
import { decodeWord } from '@/helpers/commonFunction';
import { homeCatagoryItems, podcastList } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import ReferAndEarn from '@/components/CategoryWiseBooks/ReferAndEarn.view';
import PlayListBooks from '@/components/CategoryWiseBooks/PlayListBooks';
import { TBooks } from '@/pageTypes/home.types';

export const metadata = {
  title: "Audiobooks | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

const CategoryPage = async ({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: "en" | "bn" }>;
}) => {
  const { lang } = await params;
  const sp = await searchParams;
  const categoryName = "পডকাস্ট";
  const folders = sp.folders;
    // const dict = await getDictionary(lang) // en
    // const categoryData: TBooks[] = await podcastList();
    const [dict, categoryData]:[any,TBooks[]] = await Promise.all([
      getDictionary(lang),
      podcastList(),
    ]);
  const isPodCast=true;
  // //console.log("podcast",categoryData?.data,"podcastData")
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         {isPodCast?(
           <div className='relative'>
              <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[123px] absolute left-0 bottom-[-15px]`}></div>
             <div className="container mx-auto px-4 pt-4 pb-2 ">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-bengali text-cxl2 font-bold text-white mb-1 leading-tight">
                  {decodeWord(categoryName)}
                </h1>
                <p className="font-bengali text-cxl text-white/90 font-normal leading-relaxed">
                  শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                </p>
              </div>
            </div>
           </div>
         ):''}
         <div>
          
           <div>
               <CategorySelector folders={folders as string}/>
           </div>
            {isPodCast?
              <div className='mt-10'/>
            :
              <div className="container mx-auto px-4 pt-5 pb-5">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="font-bengali text-cxl2 font-bold text-white mb-2 leading-tight">
                    {decodeWord(categoryName)}
                  </h1>
                  <p className="font-bengali text-cn2 text-white/90 font-normal leading-relaxed">
                    শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                  </p>
                </div>
              </div>
            }
              <>
                <div>
                <TopAudioBookSection
                  category={decodeWord(categoryName)}
                  data={categoryData}
                />
              </div>
              <div>
                {categoryData?.[11]?
                  <ThreeDBanner dict={dict} book={categoryData?.[11]}/>
                :''}
              </div>
              <div className={`${container('1300px')} relative`}>
                
                  <div className="grid mt-10  grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-3 md:gap-4 lg2:gap-6">
                    {categoryData?.length ? categoryData?.slice(12,22).map((audiobook) => (
                      <AudiobookCard 
                        key={audiobook.id} 
                        category={categoryName}
                        audiobook={audiobook}
                        className="max-w-sm mx-auto"
                      />
                    )):''}
                  </div>
              </div>
              <div className='mt-10 bg-[#09152B] border-[#8D8D8D]'>
                    {isPodCast?"":<ReferAndEarn/>}
              </div>
              <div className={`${container('1300px')} max-md:overflow-hidden relative `}>
                  <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
                  <div className="circular_gradient  right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div>
                  <div className="mt-10  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-3 md:gap-4 lg2:gap-6">
                    {categoryData ? categoryData?.slice(23,).map((audiobook) => (
                      <AudiobookCard 
                        key={audiobook.id} 
                        category={categoryName}
                        audiobook={audiobook}
                        className="max-w-sm mx-auto"
                      />
                    )):''}
                  </div>
              </div>
              </>
         </div>
       </div>
    </div>
  )
}

export default CategoryPage