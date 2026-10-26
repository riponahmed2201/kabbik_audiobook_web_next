"use client";

import { ChangeEvent, useRef, useState } from "react";
import CommonButton from "../ui/button";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner.view";
import { updateProfile, updateUser } from "@/utils/apiServices";
import { useAppSelector } from "@/store/store";
import { siteConfig } from "@/config/config";
import { TprofileFields } from "../ui/static/types";
import { Edit, Edit2, Edit2Icon } from "lucide-react";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import CategoryPreferencesModal from "../Preferences/CategoryPreferencesModal";
import AuthorModal from "../Preferences/AuthorModal";

const ProfileInfoForm = ({onclose}:{onclose:()=>void}) => {
  const user=useAppSelector(store=>store?.user?.userData)
  const [editingField, setEditingField] = useState<{[key:string]:string}>({});

  const [loading,setLoading]=useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phoneNo: "",
    city_name: "",
    address: "",
  });
  const [formData, setFormData] = useState({
    name: user?.full_name??'',
    phoneNo: user?.phone_no??'',
    city_name: user?.city??'',
    address: user?.address??'',
    postCode: user?.post_code ?? '',
    preference:"প্রিফারেন্স পরিবর্তন"
  });
  const [image, setImage] = useState<File|null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPreferenceCatModal,setShowPreferenceCatModal]=useState(false);
  const [showPreferenceAuthorModal,setShowPreferenceAuthorModal]=useState(false);


  const handleEditClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      // reader.onloadend = (): void => {
      //   setPreviewUrl(reader.result as string);
      // };
      setPreview(URL.createObjectURL(file));
      reader.readAsDataURL(file);
    }
  };

  const showPrepAuthorModal=()=>{
    setShowPreferenceCatModal(false);
    setShowPreferenceAuthorModal(true);
  }

   const updateProfileForm = async (event: any) => {
    event.preventDefault();
    if(!validateForm())return;
    setLoading(true)
    const payloadData = {
      full_name: formData.name,
      phone_no: formData.phoneNo,
      city_name: formData.city_name,
      phone_email:user?.phone_no||'',
      file:image,
      address: formData.address,
      post_code: formData.postCode,
    };
    let updatedProfileData:any;
    if(image){
      
      updatedProfileData = await updateUser(user?.id||0,payloadData);
    }else{
      updatedProfileData = await updateProfile(payloadData);
    }
    window.location.reload();
    if (updatedProfileData?.success===true || updatedProfileData?.message) {
      toast.success(`Profile Updated Successfully`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      // window.location.reload('/profile');
    } else {
      toast.error(`Something went wrong !`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
    setLoading(false)
  };

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    //console.log(name,value,"kalue")
    setFormData({ ...formData, [name]: value });

    // Remove error message as user types
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    // if (!formData.name.trim())
    //   newErrors.name = "অনুগ্রহ করে আপনার নাম লিখুন।";
    // if (!formData.phoneNo.trim())
    //   newErrors.phoneNo = "অনুগ্রহ করে বই এর নাম লিখুন।";
    // if (!formData.city_name.trim())
    //   newErrors.city_name = "অনুগ্রহ করে লেখকের নাম লিখুন।";
    // if (!formData.address.trim())
    //   newErrors.address = "অনুগ্রহ করে ভাষার নাম লিখুন।";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const fields = [
    // { key: '', label: 'ইমেইল ঠিকানা', sublabel: 'আপনার ইমেইল পরিবর্তন করুন',value:user?.user_email||'' },
    { key: 'name', label: 'আপনার নাম', sublabel: 'আপনার নাম পরিবর্তন করুন',value:user?.full_name||"Kabbik User" },
    { key: 'phoneNo', label: 'ফোন নম্বর', sublabel: 'আপনার ফোন নম্বর পরিবর্তন করুন',value:user?.phone_no||'' },
    { key: 'city_name', label: 'আপনার শহর', sublabel: 'আপনার শহর পরিবর্তন করুন',value:user?.city||'' },
    { key: 'address', label: 'আপনার ঠিকানা', sublabel: 'আপনার ঠিকানা পরিবর্তন করুন',value:user?.address||'' },
    { key: 'postCode', label: 'পোস্টকোড', sublabel: 'আপনার পোস্টকোড পরিবর্তন করুন',value:user?.post_code||'' },
     { key: 'preference', label: 'প্রিফারেন্স', sublabel: 'আপনার প্রিফারেন্স পরিবর্তন করুন',value:'প্রিফারেন্স পরিবর্তন' , handleClick:()=>setShowPreferenceCatModal(true) }
  ];
 
  
  const handleEdit = (field:string) => {
    setEditingField({...editingField,[field]:field});
    // setTempValue(profileData[field]);
  }

  return (
    <div className=" bg-slate-900 rounded-[12px] text-white p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <h1 className="text-xl font-bold mb-6 text-center">প্রোফাইল সেটিংস</h1>

        {/* Account Information Section */}
        <div className="bg-slate-900 rounded-xl p-4 mb-4">
          <h2 className="text-base font-semibold mb-3">অ্যাকাউন্ট তথ্য</h2>

          {/* Profile Picture */}
          {/* <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-medium mb-0.5">Change profile pic</h3>
              <p className="text-slate-400 text-xs">Change or remove your profile pic</p>
            </div>
            <div className="relative">
              <img 
                src={siteConfig.defaultProfilePic} 
                alt="Profile" 
                className="w-11 h-11 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
                // onClick={() => document.getElementById('profilePicInput').click()}
              />
              <input 
                id="profilePicInput"
                type="file" 
                accept="image/*"
                className="hidden"
                // onChange={handleProfilePicChange}
              />
            </div>
          </div> */}
          <div className="relative w-20 h-20w-20 mx-auto mb-4 group">
          <img
            loading="lazy"
            src={preview||user?.image_url||siteConfig.defaultProfilePic }
            alt="Profile"
            className="max-w-full max-h-full object-cover rounded-[50%] w-20 h-20"
          />
          
          <button
            onClick={handleEditClick}
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            <div className="bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
              <Edit className="w-4 h-4 text-gray-700" />
            </div>
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

          {/* Dynamic Fields */}
          {fields.map((field) => (
            <div key={field.key} className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0 last:mb-0">
              <div className="flex-1 mr-3">
                <h3 className="text-sm font-medium mb-0.5">{field.label}</h3>
                {/* <p className="text-slate-400 text-xs">{formData[field.key as TprofileFields]}</p> */}
              </div>
              <div className="flex items-center gap-2 min-w-[160px] justify-end">
                {editingField[field.key] ? (
                  <input
                    type="text"
                    value={formData[field.key as TprofileFields]}
                    name={field.key}
                    onChange={handleChange}
                    className="bg-slate-800 border border-slate-700 rounded-[6px] px-2.5 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 w-full"
                    placeholder={`নতুন ${field.label}`}
                    autoFocus
                    // onBlur={() => setEditingField(null)}
                  />
                ) : (
                  <>
                    {/* <span className="text-slate-300 text-sm  max-w-[100px]">{formData[field.key as TprofileFields] }</span> */}
                    <button
                      onClick={() =>field?.handleClick?field?.handleClick() :handleEdit(field.key)}
                      className="bg-slate-800 w-[200px] items-center justify-start line-clamp-1 h-[35px] hover:bg-slate-700 text-white px-2.5  rounded-[6px] transition text-xs font-medium border border-slate-700 whitespace-nowrap flex"
                    >
                      <span className="max-w-[30px] mr-2">
                        <Edit className="w-4 h-4"/>
                      </span>
                       <span className="inline-block max-w-[140px]">{formData[field.key as TprofileFields || field?.value]} </span>
                      {/* <Edit className="w-3.5"/> */}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0 last:mb-0">
              <div className="flex-1 mr-3">
                <h3 className="text-sm font-medium mb-0.5">প্রিফারেন্স</h3>
          <div className="flex items-center gap-2 min-w-[160px] justify-end">
          <button
          onClick={() => setShowPreferenceCatModal(true)}
          className="bg-slate-800 w-[200px] items-center justify-start line-clamp-1 h-[35px] hover:bg-slate-700 text-white px-2.5  rounded-[6px] transition text-xs font-medium border border-slate-700 whitespace-nowrap flex"
        >
          <span className="max-w-[30px] mr-2">
            <Edit className="w-4 h-4"/>
          </span>
           <span className="inline-block max-w-[140px]">প্রিফারেন্স </span>
        </button>
        </div>
        </div>
        </div> */}
        
        {/* Save All Button */}
        <div className="flex justify-center">
          <button 
            onClick={updateProfileForm}
            className="btn_gradient_new w-full text-white px-5 py-2 rounded-[6px] transition font-medium text-sm"
          >
            সেভ করুন
          </button>
        </div>
      </div>

      <CommonModal
          isOpen={showPreferenceCatModal}
          onClose={()=>setShowPreferenceCatModal(false)}
      >
          <div className='relative z-[11] rounded-[6px]'>
              <img loading="lazy" className='absolute' src='/assets/gradientBG.png'/>
              <img loading="lazy" className='absolute' src='/assets/wave.png'/>
              <div className='bg-[#050F1E]  p-4 px-4 rounded-[8px] overflow-y-auto '>
                  <CategoryPreferencesModal closeModal={showPrepAuthorModal}/>
              </div>
          </div>
      </CommonModal>
      <CommonModal
          isOpen={showPreferenceAuthorModal}
          onClose={()=>setShowPreferenceAuthorModal(false)}
      >
          <div className='relative'>
              <img loading="lazy" className='absolute' src='/assets/gradientBG.png'/>
              {/* <div className='circular_gradient2 right-[-80%] z-40   top-[-90%] w-[30vw] h-[30vw] absolute rounded-[50%] '></div>  */}
              <img loading="lazy" className='absolute' src='/assets/wave.png'/>
              <div className='bg-[#050F1E] p-4 px-4 rounded-[8px] overflow-y-auto '>
                  <AuthorModal closeModal={()=>setShowPreferenceAuthorModal(false)}/>
              </div>
          </div>
          
      </CommonModal>
    </div>

  );
};

export default ProfileInfoForm;
{/* <div className="w-full max-h-[95vh] overflow-y-auto profile_btn_gradients max-w-md mx-auto p-8 rounded-2xl shadow-2xl text-white relative">
      <h2 className="text-2xl font-semibold text-center mb-8 text-white drop-shadow-md">
        আপনার প্রোফাইল আপডেট করুন
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার নাম লিখুন
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.name && <p className="text-yellow-300 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            ফোন নম্বর
          </label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="8801800000000"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.phoneNo && <p className="text-yellow-300 text-xs mt-1">{errors.phoneNo}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার শহর এর নাম লিখুন
          </label>
          <input
            type="text"
            name="city_name"
            value={formData.city_name}
            onChange={handleChange}
            placeholder="Dhaka"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.city_name && <p className="text-yellow-300 text-xs mt-1">{errors.city_name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার ঠিকানা লিখুন
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="mohakhali, amtoli, road 5"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.address && <p className="text-yellow-300 text-xs mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            পোস্টকোড লিখুন
          </label>
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            placeholder="1112"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <CommonButton
          handleClick={updateProfileForm}
          className="w-full py-2 bg-white text-[#3A2768] font-semibold rounded-[4px] 
                    hover:bg-gray-100 transition-all duration-200 shadow-md"
        >
          {loading ? <Spinner size="w-4 h-4" /> : ""}
          সেভ করুন
        </CommonButton>
      </div>
    </div> */}