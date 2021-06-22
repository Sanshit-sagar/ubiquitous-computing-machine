import React, {useState, useEffect} from 'react'
import {BellIcon} from '@heroicons/react/solid'


const NotificationBell = () => {
    return (
        <button
            type="button"
            className="h-15 w-15 text-indigo-200 rounded-sm"
        >   
            <BellIcon className="h-15 w-15" aria-hidden="true" />
        </button>
    )
}

export default NotificationBell


// const NotificationButton = () => {

//     return (
//         <button 
//             type="button"
//             className="flex outline-yellow-600 p-1 rounded-md items-center justify-center text-white hover:bg-yellow-800 focus:outline-none hover:ring-2 hover:ring-offset-2 focus:ring-white-500"
//         >
//             <NotificationBell 
//                 className="h-6 w-6" 
//                 aria-hidden="true" 
//             />
//         </button>
//     )
// }

