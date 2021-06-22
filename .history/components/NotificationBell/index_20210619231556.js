import React, {useState, useEffect} from 'react'
import {BellIcon} from '@heroicons/react/solid'


const NotificationBell = () => {
    return (
        <button
            type="button"
            className="bg-red-500 rounded-sm"
        >   
            <BellIcon className="h-15 w-15" aria-hidden="true" />
        </button>
    )
}

export default NotificationBell
