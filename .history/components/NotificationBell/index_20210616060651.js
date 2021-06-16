import React, {useState, useEffect} from 'react'
import {BellIcon} from '@heroicons/react'


const NotificationBell = () => {
    return (
        <button
            type="button"
            className="flex-shrink-0 p-1 text-indigo-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
        >   
            <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
    )
}

export default NotificationBell
