import { AudiobookCard } from '@/features/catalog/components/CategoryWiseBooks/AudioBookCard.view';
import CategorySelector from '@/features/catalog/components/CategoryWiseBooks/CategorySelector.view';
import { TCategoryComponent } from '@/features/catalog/components/CategoryWiseBooks/static/category.types';
import ThreeDBanner from '@/features/catalog/components/CategoryWiseBooks/ThreeDBanner.view';
import TopAudioBookSection from '@/features/catalog/components/CategoryWiseBooks/TopAudioBookSection.view';
import { container } from '@/shared/ui/static/tailwind.classes';
import { decodeWord } from '@/helpers/commonFunction';
import { homeCatagoryItems } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import ReferAndEarn from '@/features/catalog/components/CategoryWiseBooks/ReferAndEarn.view';
import PlayListBooks from '@/features/catalog/components/CategoryWiseBooks/PlayListBooks';
import { paths } from '@/utils/Paths';
import Link from 'next/link';
import MyPlayList from '@/svgs/MyPlayList.svg';
import { cookies } from 'next/headers';
import RentBanner from '@/features/catalog/components/CategoryWiseBooks/FixedRentSection.view';

export const metadata = {
  title: "Audiobooks | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

const CategoryPage = async({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ category: string; lang: "en" | "bn" }>;
}) => {
  const { category: categoryName, lang } = await params;
  const sp = await searchParams;
  const cookieStore = await cookies();

  const userId = cookieStore.get("id")?.value;
  const folders = sp.folders;
  const [dict, categoryData]:[any,TCategoryComponent['categoryData']] = await Promise.all([
    getDictionary(lang),
    homeCatagoryItems(categoryName),
  ]);
  //   const dict = await getDictionary(lang) // en
  // let categoryData:TCategoryComponent['categoryData'] = await homeCatagoryItems(categoryName);
  const isPodCast=(decodeWord(categoryName)==='কাব্যিক গ্যালারী') ||(decodeWord(categoryName)==="পডকাস্ট");
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
              <div className="container relative mx-auto px-4 pt-5 pb-5">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="font-bengali text-cn2 sm:text-clg2 md:text-cxl2 font-bold text-white mb-2 leading-tight">
                    {decodeWord(categoryName)}
                  </h1>
                  <p className="font-bengali text-cn2 text-white/90 font-normal leading-relaxed">
                    শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                  </p>
                </div>
                <Link href={paths.myPlayList} className={`${userId && userId!=='2820'?'':'hidden'} absolute flex items-center py-1.5 px-2.5 border rounded-[6px] border-muted2 z-[4] right-0 text-white top-6`}>
                  <span className='inline-block w-4 h-4'><MyPlayList/></span> <span className='hidden sm:block'>প্লেলিস্ট দেখুন</span> 
                </Link>
              </div>
            }
           {folders?
            <PlayListBooks 
              categoryName={categoryName}
              categoryData={categoryData}
              dict={dict}
              isPodCast={isPodCast}
              folders={folders as string}
            />:(
              <>
                <div>
                <TopAudioBookSection
                  category={decodeWord(categoryName)}
                  data={categoryData?.data?.[0]?.data}
                />
              </div>
              <div>
                {categoryData?.data?.[0]?.data?.[11]?
                  <ThreeDBanner dict={dict} book={categoryData?.data?.[0]?.data?.[10]}/>
                :''}
              </div>
              <div className={`${container('1300px')} relative`}>
                
                  <div className="grid mt-10  grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-3 md:gap-4 lg2:gap-6">
                    {categoryData?.data ? categoryData?.data?.[0]?.data.slice(11,21).map((audiobook) => (
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
                    {categoryData?.data ? categoryData?.data?.[0]?.data.slice(21,).map((audiobook) => (
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
           )}
         </div>
       </div>
       <RentBanner categoryData={categoryData} categoryName={categoryName} />
    </div>
  )
}

export default CategoryPage