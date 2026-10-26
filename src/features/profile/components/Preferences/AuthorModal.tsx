import { useAppSelector } from '@/store/store'
import CircleTik from '@/svgs/CircleTik'
import React, { useEffect, useState } from 'react'
import Spinner from '@/shared/ui/Spinner.view'
import { create_preference, getAuthors } from '@/utils/apiServices'
import { SearchIcon } from 'lucide-react'
import Skeleton from '@/shared/ui/Skeleton'
import { toast } from 'react-toastify'
import GreenTik from '@/svgs/GreenTik.svg'

const AuthorModal = ({closeModal}:{closeModal:()=>void}) => {
    const [authors,setAuthors]=useState<{id:string|number,name:string,imageUrl:string}[]>([])
    const [selectedAuthors,setSelectedAuthors]=useState<(string|number)[]>([]);
    const [minimum,setMinimum]=useState(3)
    const user=useAppSelector((store)=>store.user.userData)
    const [loading,setLoading]=useState(false);
    const [searchText,setSearchText]=useState('');
    

    const handleSelect=(id:string|number)=>{
        if(selectedAuthors.includes(id)){
            setSelectedAuthors(selectedAuthors.filter((item)=>item!==id))
        }else{
            setSelectedAuthors([...selectedAuthors,id])
        }
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchText(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // prevent form submission/reload if inside <form>
            find_authors(searchText)
        }
    };

    const handleSubmit=async()=>{
        setLoading(true)
        let payload={user_id:user?.id, authors:selectedAuthors}
        let result = await create_preference(payload);
        //console.log("preference result",result);
        closeModal()
        toast.success("আপনার পছন্দের লেখক সেভ করা হয়েছে!");
        setLoading(false)
    }

    const find_authors=async(text?:string)=>{
        setAuthors([])
        let result = await getAuthors(searchText);
        setAuthors(result)
    }

    useEffect(()=>{
        find_authors()
    },[])

  return (
    <div  >
        <div className='text-white text-center relative'>
             <h6 className='my-3'>আপনার পছন্দের লেখক বেছে নিন </h6>
            <p className='text-xs mb-3'>(সর্বনিম্ন ৩ জন লেখক নির্বাচন করতে পারেন)</p>
            {/* <h2 className='text-2xl  text-white mb-3'>তোমার শব্দ, তোমার জগৎ</h2>
            <p className='text-xs text-c_gray'>তোমার ভাবনার ছোঁয়ায় নির্বাচিত নতুন কিছু</p> */}
            <div className='flex mt-2 z-[11] relative items-center rounded-[4px] border border-gray-600 max-w-[250px] mx-auto px-2'>
                <input 
                    className='border-none w-[90%] text-cs outline-none bg-transparent'
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={searchText}
                    placeholder='লেখক খুঁজুন...'
                />
                <button className=' text-cn text-gray-400  rounded'><SearchIcon/></button>
            </div>
           
        </div>
        {/* <div className='max-h-[60vh] overflow-y-auto pr-4'>
            <div className='grid grid-cols-2 gap-2'>
                {categories?.length && categories.map((author)=>(
                    <div key={author.id} className='border text-white border-gray-600 p-2 rounded'>
                        <p className='font-medium'>{author.name}</p>
                    </div>
                ))}
            </div>
        </div> */}
        <div className='max-h-[60vh] overflow-y-auto pr-4'>
            <div className='grid grid-cols-3 gap-2 z-10 relative'>
                {authors?.length ? authors.map((author)=>(
                    author.name && author.imageUrl && <div onClick={()=>{
                            handleSelect(author.id)
                        }} 
                        key={author.id} 
                        className=' text-white p-1 rounded relative cursor-pointer'
                    >
                        {selectedAuthors.includes(author.id)?(
                           <span className='w-3.5 h-3.5 absolute top-2 right-2'>
                                <GreenTik  />
                            </span>
                        ):''}
                        <div className='flex flex-col content-center items-center gap-2'>
                            <img loading='lazy'  className='w-16 h-16 rounded-full object-cover' src={author.imageUrl} alt={author.name} width={60} height={60}/>
                            <p className='text-center text-cs2'>{author.name}</p>
                        </div>
                    </div>
                )):''}
                {!authors?.length?(
                    // <div className='grid grid-cols-3 gap-4 w-full'>
                    [1,2,3,4,5,6].map((item)=>
                        <div className=' flex flex-col content-center m-3' key={item}>
                            <Skeleton height='h-20' className='w-10 rounded-[50%] '/>
                            <Skeleton className='w-20 h-4 mt-2'/>
                        </div>)
                    // </div>
                ):''}
            </div>
        </div>
        <div>
            <button 
                disabled={selectedAuthors.length<minimum || loading}
                onClick={handleSubmit}
                className='btn-gradient-2  disabled:bg-gray-400 disabled:cursor-not-allowed relative z-10 text-cn text-white w-full py-1.5 rounded mt-4 mb-2'
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

export default AuthorModal