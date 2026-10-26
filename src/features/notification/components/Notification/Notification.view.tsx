'use client'
import { useEffect, useState } from "react";
import { container } from "@/shared/ui/static/tailwind.classes";
import { NotificationCard } from "./NotificationCard.view";
import { getNotifications, MakeReadNotification } from "@/utils/apiServices";
import { useAppSelector } from "@/store/store";
import { NotificationData } from "./static/notification.type";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import { decodeWord } from "@/helpers/commonFunction";
import Link from "next/link";
import { paths } from "@/utils/Paths";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState(0);
  const [allNotifications,setAllNotifications]=useState<NotificationData[]>([]);
  const user=useAppSelector(store=>store.user?.userData)
  const [showModal,setShowModal]=useState<NotificationData|null>(null)


  const getUnReadNotifications=()=>{
    return allNotifications?.filter(item=>!item.isRead)
  }

  const tabs = [
    { name: "All", count: null,data:allNotifications },
    { name: "Unread", count: null,data: getUnReadNotifications()},
    // { name: "Mentions", count: null },
  ];

  

  
  const getNotification=async()=>{
    if(user?.id){
        const result = await getNotifications(user?.id,1);
        setAllNotifications(result?.data)
    }
  }

  useEffect(()=>{
    getNotification()
  },[user?.id])

  const makeUnread=(notificationId:number)=>{
    if(user?.id){
        MakeReadNotification(user?.id,notificationId)
        let newNotifications=[...allNotifications];
        let item = newNotifications.find((item)=>item.id===notificationId);
        if(item){
            item.isRead=1;
        }
        setAllNotifications(newNotifications)
    }
  }

  const handleShowModal=(notification:NotificationData)=>{
    setShowModal(notification)
    makeUnread(notification.id)
  }

  return (
    <div className=" bg-slate-900">
        <div className={`${container('1300px')} `} >
        {/* Header Section */}
        <div className="flex w-full px-8 py-3 justify-center items-center border-b border-slate-700">
            <div className="flex w-full max-w-screen-xl justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-white text-xl font-normal">Notifications</h1>
            </div>
            {/* <div className="flex justify-center items-center">
                <button className="text-white text-sm font-normal hover:text-slate-300 transition-colors">
                Mark all as read
                </button>
            </div> */}
            </div>
        </div>

        {/* Filter Tabs Section */}
        <div className="flex w-full px-8 py-2 justify-center items-center border-b border-slate-700">
            <div className="flex w-full max-w-screen-xl items-start gap-4">
            {tabs.map((tab,i) => (
                <button
                key={tab.name}
                onClick={() => setActiveTab(i)}
                className={`flex px-4 py-1 justify-center items-center rounded-full transition-all duration-200 ${
                    activeTab === i
                    ? "bg-blue-100 text-blue-600"
                    : "text-white hover:bg-slate-800"
                }`}
                >
                <span className="text-sm font-normal">{tab.name}</span>
                </button>
            ))}
            </div>
        </div>

        {/* Content Area - Empty state for now */}
        <div className=" bg-background p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div   className="space-y-3 sm:space-y-4">
                {tabs[activeTab].data?.map((notification) => (
                    <div onClick={()=>handleShowModal(notification)} key={notification.id}>
                        <NotificationCard
                            profileImage={notification.n_imageUrl}
                            title={notification.n_title}
                            preview={notification.n_description}
                            timestamp={notification.created_at}
                            isRead={!!notification.isRead}
                            className="max-w-none"
                            id={notification?.id}
                            makeUnread={makeUnread}
                        />
                    </div>
                ))}
                </div>
            </div>
        </div>
        </div>
        <CommonModal
            isOpen={showModal?.id?true:false}
            onClose={()=>{setShowModal(null)}}
        >
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            {/* Image at the top */}
            <img
                loading="lazy"
                src={showModal?.n_imageUrl}
                alt="Modal Preview"
                className="w-full h-40 object-cover rounded-xl"
            />

            {/* Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
                {decodeWord(showModal?.n_title??'')}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {decodeWord(showModal?.n_description??'')}
            </p>

            {/* Button */}
            {user?.is_subscribed?
            <Link href={showModal?.n_arguments?.audiobook_id ? paths.book_details(showModal?.n_arguments?.audiobook_id):'/'} className="mt-6 inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition">
                Listen Now
            </Link>:(
                <Link href={'/subscribe'} className="mt-6 inline-block w-full btn-gradient-2 text-white font-medium py-2 px-4 rounded-xl transition">
                    Subscribe
                </Link>
            )}
            </div>
        </CommonModal>
    </div>
  );
}
