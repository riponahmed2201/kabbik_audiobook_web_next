// components/MobileNavbarContent.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { TCategoryItem } from '@/shared/ui/static/types';
import CommonButton from '@/shared/ui/button';
import { menuItems } from './static/menues';
import { TmobileNavbarProps } from './static/types';
import CrossIcon from '@/svgs/CrossIcon';
import { useAppSelector } from '@/store/store';
import RamadanNavButton from './BlinkingHighlighter.view';



export default function MobileNavbarContent({setMobileMenu,onClose}:TmobileNavbarProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const profile=useAppSelector((store)=>store?.user?.userData);
  const categories=useAppSelector((store)=>store.categories.CategoriesData)
  return (
    <div className="w-100 bg-bg text-white  h-full shadow-lg flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Link href={'/'} >
            <figure className='mr-3'>
                <img loading="lazy" className='max-w-[138px] max-h-[54px] max-sm:max-w-[100px] max-:max-h-[46px]' src={'/assets/logo.png'} alt="Logo" />
            </figure>
        </Link>
        <span
            className='w-8 h-8 cursor-pointer inline-block'
            onClick={()=>{setMobileMenu(false)}}
         >
            <CrossIcon color='white' />
        </span>
      </div>

      <nav className="flex flex-col p-4 gap-2">
        {menuItems.map((item) =>
          item.label==="ক্যাটাগরি" ? (
            <div key={item.label} className="flex flex-col">
              <button
                className="flex justify-between items-center w-full text-left font-medium py-2 px-3 hover:bg-gray-100 hover:text-bg rounded"
                onClick={() =>
                {
                  setOpenSubmenu(openSubmenu === item.label ? null : item.label)
                }
                  
                }
              >
                {item.label}
                <span>{openSubmenu === item.label ? '-' : '+'}</span>
              </button>
              <div
                className={clsx(
                  'ml-4 flex flex-col gap-1 max-h-48 overflow-y-scroll',
                  openSubmenu === item.label ? 'block' : 'hidden'
                )}
              >
                {categories?.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/${sub?.name}`}
                    onClick={onClose}
                    className="text-sm py-1 z-[3] px-3 rounded hover:bg-gray-100 hover:text-bg"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href??''}
              onClick={onClose}
              className="py-2 px-3 rounded hover:bg-gray-100 hover:text-bg"
            >
              {item.label}
            </Link>
          )
        )}
        {/* {console.log(profile?.is_subscribed,"profile?.is_subscribed")} */}
        {!profile?.is_subscribed  ? <Link href="/রমজান%20স্পেশাল">
          <RamadanNavButton/>
        </Link>:''}
        {/* <span>
            <CommonButton
                isLoading={false}
                disabled={false}
            >
                স্টোর
            </CommonButton>
        </span>
        <span>
          {(!profile?.is_subscribed && profile?.id && profile?.id!==2820) ?<CommonButton
              isLoading={false}
              // handleClick={handleLoginClick}
              addiTionalClass='xxs2:hidden'
              disabled={false}
          >
              <Link href={'/subscribe'}>সাবস্ক্রাইব</Link>
          </CommonButton>:''}
        </span> */}
      </nav>
    </div>
  );
}
