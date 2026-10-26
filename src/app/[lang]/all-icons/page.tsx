
import { Icons } from '@/svgs/Index'
import { icons } from 'lucide-react'
import React from 'react'


const page = () => {

    
  return (
    <div className='grid grid-cols-6'>
        {Icons.map((item,i)=>(
            <div key={i} className='w-16 h-16 mb-16'>
                {item.name}
                <span className='w-8 h-8'>
                    {item.component}
                </span>
            </div>
        ))}
    </div>
  )
}

export default page