import React, { useEffect, useState } from 'react';
import { X, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/helpers/commonFunction';
import { getDeviceList, logout } from '@/utils/apiServices';
import { DeviceSession } from '@/shared/ui/static/types';
import { setDeviceList } from '@/features/auth/store/DeviceListSlice';
import Spinner from '@/shared/ui/Spinner.view';

export default function DeviceLimitModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [loader,setLoader]=useState(false);
  const [deleting, setDeleting]=useState('');
  const [userId,setUserId]=useState(0);
  const dispatch=useAppDispatch();
  
  const deviceList= useAppSelector(store=>store?.deviceList?.data)

   const handleDeviceList=async()=>{
     let result:{result:DeviceSession[]} = await getDeviceList();
     dispatch(setDeviceList(result?.result));
    }
  

  const getDeviceIcon = (type:string) => {
    switch(type) {
      case 'android':
        return <Smartphone className="w-5 h-5 text-blue-500" />;
      case 'ios':
        return <Tablet className="w-5 h-5 text-green-500" />;
      default:
        return <Monitor className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleLogout = async(deviceId:string) => {
    // alert(`Logging out device ${deviceId}`);
    setLoader(true);
    setDeleting(deviceId)
    await logout(0,deviceId)
    await handleDeviceList()
    setLoader(false);
    // Add your logout logic here
  };

//   useEffect(()=>{
//     handleDeviceList()
//   },[])

  if (!isOpen) return null;

  return (
    <div className="">
      <div className="bg-slate-900 rounded-[4px] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">ডিভাইস লিস্ট</h2>
          
        </div>

        {/* Content */}
        <div className="px-6 py-4">

          {/* Device List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {deviceList?.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-[8px] hover:bg-slate-750 transition-colors border border-slate-700"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {getDeviceIcon(device.os)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {device.device_name}
                    </h3> 
                    <p className="text-xs text-gray-400 mt-1">
                      • লগিন - {formatDate(device.last_login,'bn')}
                    </p>
                  </div>
                </div>
                <button
                  disabled={loader && (device.device_id===deleting)}
                  onClick={() => handleLogout(device.device_id)}
                  className="ml-4 px-4 rounded-[4px] py-2 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors flex-shrink-0"
                >
                 {loader && (device.device_id===deleting) ?<Spinner size='w-3 h-3'/>:''}
                  লগ আউট
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700 bg-slate-800">
          <p className="text-xs text-gray-400 text-center">
            সাহায্য দরকার? যোগাযোগ করুন: support@wondersoftsolution.com
          </p>
        </div>
      </div>
    </div>
  );
}