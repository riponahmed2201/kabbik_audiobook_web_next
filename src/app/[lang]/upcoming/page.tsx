import { AudiobookCard } from '@/features/catalog/components/CategoryWiseBooks/AudioBookCard.view';
import CategorySelector from '@/features/catalog/components/CategoryWiseBooks/CategorySelector.view';
import { TCategoryComponent } from '@/features/catalog/components/CategoryWiseBooks/static/category.types';
import ThreeDBanner from '@/features/catalog/components/CategoryWiseBooks/ThreeDBanner.view';
import TopAudioBookSection from '@/features/catalog/components/CategoryWiseBooks/TopAudioBookSection.view';
import { container } from '@/shared/ui/static/tailwind.classes';
import { decodeWord } from '@/helpers/commonFunction';
import { homeCatagoryItems, upcomingList } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import ReferAndEarn from '@/features/catalog/components/CategoryWiseBooks/ReferAndEarn.view';
import { UpComingInfo } from '@/utils/types';
import { BookCard } from '@/features/catalog/components/CategoryWiseBooks/Upcoming.view';

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ lang: "en" | "bn" }>;
  searchParams: Promise<{ id?: string }>;
}) => {
    const { lang } = await params;
    const sp = await searchParams;
    // const dict = await getDictionary(lang) // en
    // const upcomingData: UpComingInfo = await upcomingList();
    const [dict, upcomingData]:[any,UpComingInfo] = await Promise.all([
      getDictionary(lang),
      upcomingList(),
    ]);
    const id = sp.id; 
    let rest = upcomingData?.data?.filter((item)=>item?.id!=Number(id||0))
    const selectedItem=upcomingData?.data?.find((item)=>item?.id===Number(id||0))
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         <div>
           <div>
               <CategorySelector/>
           </div>
           <div className={container('1300px')}>
                <div className=" bg-navy-dark">
      {/* Header Section */}
                    <div className="pt-4 pb-8 lg:pb-6 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-white font-bengali font-bold text-cxl2 mb-1 leading-tight">
                            শীঘ্রই আসছে 
                        </h1>
                        <p className="text-white font-bengali text-lg sm:text-cxl font-normal leading-tight lg:leading-[50.4px]">
                            আপনার পছন্দের নতুন অডিওবুক—শীঘ্রই এক ক্লিকে শুনতে পারবেন।
                        </p>
                        </div>
                    </div>

        {/* Books Grid */}
                    <div className="px-4 pb-16">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
                                {selectedItem?(
                                  <BookCard
                                        // key={index}
                                        title={selectedItem?.name}
                                        author={selectedItem?.author}
                                        description={selectedItem?.description}
                                        imageUrl={selectedItem?.thumbPath}
                                        slug={selectedItem?.id?.toString()}
                                    />
                                ):''}
                                {upcomingData?.data?rest?.map((book, index) => (
                                    <BookCard
                                        key={index}
                                        title={book.name}
                                        author={book.author}
                                        description={book.description}
                                        imageUrl={book.thumbPath}
                                        slug={book.id?.toString()}
                                    />
                                )):''}
                            </div>
                            </div>
                    </div>
                </div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default CategoryPage