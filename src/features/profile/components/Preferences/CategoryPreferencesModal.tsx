import { useAppDispatch, useAppSelector } from '@/store/store'
import CircleTik from '@/svgs/CircleTik'
import React, { useState } from 'react'
import Spinner from '@/shared/ui/Spinner.view'
import { create_preference, getPreferenceData } from '@/utils/apiServices'
import { toast } from 'react-toastify'
import { setuserPreference } from '@/features/profile/store/userPreferenceSlice'
import GreenTik from '@/svgs/GreenTik.svg'

const CategoryPreferencesModal = ({closeModal}:{closeModal:()=>void}) => {
    const categories=useAppSelector(store=>store.categories?.CategoriesData)
    const [selectedCats,setSelectedCats]=useState<(string|number)[]>([]);
    const [minimum,setMinimum]=useState(3)
    const user=useAppSelector((store)=>store.user.userData)
    const [loading,setLoading]=useState(false);
    const dispatch=useAppDispatch();

    const handleSelect=(id:string|number)=>{
        if(selectedCats.includes(id)){
            setSelectedCats(selectedCats.filter((item)=>item!==id))
        }else{
            setSelectedCats([...selectedCats,id])
        }
    }

    const handleSubmit=async()=>{
        setLoading(true)
        let payload={user_id:user?.id, categories:selectedCats}
        let result = await create_preference(payload);
        getPreference()
        closeModal()
        toast.success("আপনার পছন্দের ক্যাটাগরি সেভ করা হয়েছে!");
        setLoading(false)
    }

    const getPreference=async()=>{
      if(user?.id){
        let data=await getPreferenceData(user.id as number);
        // alert(JSON.stringify(data.data))
        if(data && data.data.length===0){
        //   setShowPreferenceCatModal(true);
        }else{
          dispatch(setuserPreference({id:data?.data[0].id,authors:JSON.parse(data?.data[0].authors),categories:JSON.parse(data?.data[0].categories)}))
        }
      }
    }

  return (
    <div  >
        <div className='text-white text-center relative rounded-[6px]'>
            {/* <h2 className='text-2xl  text-white mb-3'>তোমার শব্দ, তোমার জগৎ</h2>
            <p className='text-xs text-c_gray'>তোমার ভাবনার ছোঁয়ায় নির্বাচিত নতুন কিছু</p> */}
            <h6 className='my-3'>আপনার পছন্দের ক্যাটাগরি বেছে নিন</h6>
            <p className='text-xs mb-3'>(সর্বনিম্ন ৩টা ক্যাটাগরি নির্বাচন করতে পারেন)</p>
        </div>
        {/* <div className='max-h-[60vh] overflow-y-auto pr-4'>
            <div className='grid grid-cols-2 gap-2'>
                {categories?.length && categories.map((category)=>(
                    <div key={category.id} className='border text-white border-gray-600 p-2 rounded'>
                        <p className='font-medium'>{category.name}</p>
                    </div>
                ))}
            </div>
        </div> */}
        <div className='max-h-[60vh] overflow-y-auto pr-4'>
            <div className='grid grid-cols-2 gap-2 z-10 relative'>
                {categories?.length && categories.map((category)=>(
                    <div onClick={()=>{
                            handleSelect(category.id)
                        }} 
                        key={category.id} 
                        className=' text-white p-1 rounded relative cursor-pointer'
                    >
                        {selectedCats.includes(category.id)?(
                            <span className='w-3.5 h-3.5 absolute top-2 right-2'>
                                <GreenTik  />
                            </span>
                        ):''}
                        <img loading='lazy'  className='inline-block rounded-[4px]' src={category.thumb_path} alt={category.name} width={180} height={100}/>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <button 
                disabled={selectedCats.length<minimum || loading}
                onClick={handleSubmit}
                className='btn-gradient-2 text-white disabled:bg-gray-400 disabled:cursor-not-allowed relative z-10 text-cn  w-full py-1.5 rounded mt-4 mb-2'
            >
                {loading?(
                    <Spinner size='sm'/>
                ):''}
                সেভ করুন
            </button>
        </div>
        <div>
            <img loading="lazy" src="/assets/waveY.png" className='absolute bottom-0'/>
        </div>
    </div>
  )
}

export default CategoryPreferencesModal