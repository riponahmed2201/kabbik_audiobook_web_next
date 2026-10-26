'use client'
import CategorySelector from '@/components/CategoryWiseBooks/CategorySelector.view';
import {  fetchDataFromJson, upcomingList } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import { UpComingInfo } from '@/utils/types';
import { staticTextSlice } from '@/components/ui/static/types';
import Link from 'next/link';
import { paths } from '@/utils/Paths';
import { useAppSelector } from '@/store/store';
import Image from 'next/image';
import CategoriesList from '@/components/category/CategoriesList.view';

// export const metadata = {
//   title: "Popular Categories | Kabbik",
//   description: "Learn more about Kabbik and our story.",
// };

const CategoryPage = () => {
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         <div>
           <div>
               <CategorySelector/>
           </div>
            <CategoriesList/>
         </div>
       </div>
    </div>
  )
}

export default CategoryPage