import { getApprovedBlogs } from '@/utils/server-api';
import Link from 'next/link'
import React from 'react'
import styles from '@/components/Home/static/blogs.module.css'
import CalenderIcon from '@/svgs/calenderIcon';
import { formatDate } from '@/helpers/commonFunction';
import RightArrow from '@/svgs/RightArrow';
import UserIcon from '@/svgs/UserIcon';
import { BlogInfo, TBlogsProps } from '@/utils/types';
import { container } from '@/components/ui/static/tailwind.classes';

const page = async() => {
    const blogs:TBlogsProps['blogs'] = await getApprovedBlogs();
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
          <div >
            {/* {isPodCast?( */}
            <div className='relative '>
                <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[123px] absolute left-0 bottom-[-15px]`}></div>
                <div className="container mx-auto px-4 pt-4 pb-2 ">
                <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-bengali text-cxl2 font-bold text-white mb-1 leading-tight">
                    {/* {decodeWord(categoryName)} */}
                    ব্লগস
                </h1>
                <p className="font-bengali text-cxl text-white/90 font-normal leading-relaxed">
                    শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                </p>
                </div>
            </div>
            </div>
            {/* ):''} */}
            <div className={`${container('1300px')} mt-8`}>
                
                <div
                    className={`${styles.blogsContainer}  `}
                    style={{ color: "white" }}
                >
                    {blogs?.list?.length ? (
                    <div className={`${styles.blogsWrapper}`}>
                        {blogs.list?.map((blog) => (
                            <div key={blog.id} className="blog">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <div className={`${styles.blogWrapper} rounded`}>
                                    <div className={styles.featureImageContainer}>
                                        <img
                                            loading="lazy"
                                            src={blog.featured_image}
                                            alt={blog.alter_text_for_featured_image}
                                        />
                                    </div>
                                    <div className='flex items-center justify-between px-2.5 mt-3'>
                                        <div className='flex items-center  '>
                                            <span className='w-6 h-6 inline-block'>
                                                <CalenderIcon />
                                            </span>
                                            <p className='max-lg:text-cs'>{formatDate(blog?.publish_date,'bn')}</p>
                                        </div>
                                        <div className='flex items-center px-3 '>
                                            <span className='w-4 h-4 inline-block'>
                                                <UserIcon />
                                            </span>
                                            <p className='max-lg:text-cs'>{blog?.author}</p>
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        <h1 className={styles.title}>{blog.title}</h1>
                                        {/* <p className={styles.excerpt}>{blog.excerpt}</p> */}
                                        <div className='btn-gradient-2 w-[150px] py-2 rounded-[3px] text-center text-[13px]'>
                                            বিস্তারিত পড়ুন
                                            <span className='w-10 h-2 inline-block '>
                                                <RightArrow color={'white'}/>
                                            </span>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        
                    </div>
                    ) : (
                    <div style={{ marginTop: "300px", textAlign: "center" }}>
                        No blogs posted yet
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default page