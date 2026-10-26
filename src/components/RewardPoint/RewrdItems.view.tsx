import { FeatureItems, RewardData, RewardItemProps } from '@/app/[lang]/profile/reward-point/reward-point.type'
import { convertToBanglaDigits, decodeWord } from '@/helpers/commonFunction';
import { useAppSelector } from '@/store/store';
import { claim_reward } from '@/utils/apiServices';
import Link from 'next/link';
import React, { useState } from 'react'
import Spinner from '../ui/Spinner.view';
import CommonModal from '../ui/CommonModal/CommonModal.view';
import LockedModal from './LockedModal.view';
import CollectRewardModal from './CollectRewardModal.view';
import MobileNumberForm from './RewardForm.view';
import CongratsModal from './CongratsModal.view';
import { LockIcon } from 'lucide-react';
import { toast } from 'react-toastify';



const RewrdItems = ({data,isLocked,user_balance_point,setNewPoint}:{
    data:RewardItemProps|null,isLocked?:boolean,user_balance_point:number,setNewPoint:(val:number)=>void
}) => {
    const user=useAppSelector((store)=>store.user.userData)
    // const reward=data?.featureList.find((item)=>item?.type_reward==='reward');
    const [loading,setLoading]=useState(0);
    const [lockModal,setLockModal]=useState(false);
    const [collectRewardModal,setCollectRewardModal]=useState(false);
    const [rewardClaimData,setrewardClaimData]=useState({tierId:0,rewardId:0,required_user_info_input_field:null,point:0})
    const [rewardClaimForm,setRewardClaimForm]=useState(false);
    const [showCongratsModal,setCongratsModal]=useState(false);
    const [successMessage,setSuccessMessage]=useState('');

    const takeClaimData=async(tierId:number,rewardId:number,required_user_info_input_field:any,point:number)=>{
        //console.log(tierId,rewardId,"ressss",data)
        setrewardClaimData({tierId,rewardId,required_user_info_input_field,point});
        // setLoading(tierId);
        setCollectRewardModal(true);
        // let result= await claim_reward(user?.id??0,tierId,rewardId)
        // setLoading(0);
    }

    const showFormOrHandleApi=async()=>{
        if(rewardClaimData?.required_user_info_input_field){
            setRewardClaimForm(true);
            setCollectRewardModal(false);
            return;
        }else{
            setCollectRewardModal(false);
            let result= await claim_reward(user?.id??0,rewardClaimData?.tierId,rewardClaimData?.rewardId,null);
            if(result?.data?.message){
                setNewPoint(rewardClaimData?.point)
                setCongratsModal(true);
                setSuccessMessage(result?.data?.message??"Successfull")
            }else{
                toast.error("Something Went Wrong")
            }
        }
    }

    const FinalSubmission=async(payload:any)=>{
        //console.log(user?.id??0,rewardClaimData?.tierId,rewardClaimData?.rewardId,payload)
        let result= await claim_reward(user?.id??0,rewardClaimData?.tierId,rewardClaimData?.rewardId,payload);
        if(result?.data?.message){
            setNewPoint(rewardClaimData?.point)
            setRewardClaimForm(false);
            setCongratsModal(true);
            setSuccessMessage(result?.data?.message??"Successfull")
        }else{
            toast.error("Something Went Wrong")
        }
    }
  return (
    <div>
      <div>
        
        {/* Rewards List */}
            <div className="">
                {/* Reward 1 */}
                {data?.map((item:any,index:number)=>(
                    <div key={index} className="flex border-t border-gray-500 justify-between items-center  p-4">
                    <div className='flex items-center  gap-2'>
                        <figure className=' max-w-12 max-h-12'>
                            <img loading="lazy" className='max-w-11 max-h-11 object-cover ' src={item?.icon_path2??''}/>
                        </figure>
                        <div>
                            <p className="text-cs sm:text-cs2 md:text-cn font-medium">{item?.title}</p>
                            <p className="text-cs sm:text-cs2 font-semibold md:text-cn text-[#D90377]">{convertToBanglaDigits(item?.required_point??'')} পয়েন্ট</p>
                        </div>
                    </div>
                    {(isLocked || (user_balance_point??0)<item?.required_point)?
                        <button disabled={loading===item?.tier_id} onClick={()=>setLockModal(true)} >
                        {loading===item?.tier_id?<Spinner size='w-3 h-3'/>:''}
                            <LockIcon/>
                        </button>
                    :
                    <button disabled={loading===item?.tier_id} onClick={()=>takeClaimData(item?.tier_id,item?.id,item?.required_user_info_input_field,item.required_point)} className="bg-[#F2B5C2] text-black px-4 py-1.5 rounded-[4px] text-cs sm:text-cs2 md:text-cn font-medium">
                        {loading===item?.tier_id?<Spinner size='w-3 h-3'/>:''}
                        সংরক্ষন করুন
                    </button>}
                </div>
                ))}
            </div>
        </div>
        <CommonModal
            isOpen={lockModal}
            onClose={()=>{setLockModal(false)}}
        >
            <LockedModal/>
        </CommonModal>
        <CommonModal
            isOpen={collectRewardModal}
            onClose={()=>{setCollectRewardModal(false)}}
        >
            <CollectRewardModal 
                onSubmit={showFormOrHandleApi} 
                onClose={()=>{setCollectRewardModal(false)}}
            />
        </CommonModal>
        <CommonModal
            isOpen={rewardClaimForm}
            onClose={()=>{setRewardClaimForm(false)}}
        >
            <MobileNumberForm onSubmit={FinalSubmission} inputFields={rewardClaimData?.required_user_info_input_field} />
        </CommonModal>
        
        <CommonModal
            isOpen={showCongratsModal}
            onClose={()=>{setCongratsModal(false)}}
        >
            <CongratsModal submit={()=>{setCongratsModal(false)}} message={successMessage}/>
        </CommonModal>
    </div>
  )
}

export default RewrdItems