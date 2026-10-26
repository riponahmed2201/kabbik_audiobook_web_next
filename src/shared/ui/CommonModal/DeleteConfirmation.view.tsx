'use client'
import { AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import { TDelete } from '../static/types'
import Spinner from '../Spinner.view'

const DeleteConfirmation = ({heading,subTitle, handleDelete,onClose}:TDelete) => {
  const [loader,setLoader]=useState(false);

  const submit=async()=>{
    setLoader(true);
    await handleDelete();
    setLoader(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-sm rounded-lg shadow-xl p-6" style={{ background: '#060F1E', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 bg-opacity-20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {heading||"আপনি কি নিশ্চিত ?"}
                </h3>
                <p className="text-sm text-gray-300">
                  {subTitle||"এই তথ্যটি স্থায়ীভাবে অপসারিত হয়ে যাবে "}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={ onClose}
                className="flex-1 px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-[6px] transition-colors text-sm font-medium"
              >
                বাতিল
              </button>
              <button
                onClick={submit}
                className="flex-1 px-4 py-2 rounded-[6px] bg-red-600 hover:bg-red-700 text-white  transition-colors text-sm font-medium"
              >
                {loader?<Spinner size='w-3 h-3 mr-1'/>:''}
                কন্টিনিউ
              </button>
            </div>
          </div>
        </div>
  )
}

export default DeleteConfirmation