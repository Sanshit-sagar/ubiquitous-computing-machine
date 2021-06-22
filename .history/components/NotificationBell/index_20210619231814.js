import React, {useState, useEffect} from 'react'
import {BellIcon} from '@heroicons/react/outline'


const NotificationBell = () => {
    return (
        <button className="flex-shrink-0 bg-white rounded-sm p-2 text-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-8 w-8" aria-hidden="true" />
        </button>
    )
}

export default NotificationBell
