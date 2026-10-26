import Notifications from '@/components/Notification/Notification.view'
import { container } from '@/components/ui/static/tailwind.classes'
import { getNotifications } from '@/utils/apiServices'
import React from 'react'

const page = () => {
  return (
    <div >
        <Notifications/>
    </div>
  )
}

export default page