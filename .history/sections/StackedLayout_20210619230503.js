import React, { Fragment, useContext, useRef } from 'react'
import {useRouter} from 'next/router'

import toast from 'react-hot-toast'
import {GlobalStore} from '../store'

import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards/index'

// import useMediaQuery from '../hooks/useMediaQuery'
import { useSession, signIn, signOut } from 'next-auth/client'

import Sidebar from './Sidebar'
import SecondarySidebar from './SecondarySidebar'
import Footer from './Footer'
import Header from './Header'
import ActionsMenu from '../components/ActionsMenu'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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


function StackedLayout({ children, pageMeta }) {

    const router = useRouter()
    const [session, loading] = useSession()
   

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <div className="w-full inline-flex space-between items-stretch">
                <Sidebar /> 
                <SecondarySidebar />

                <div className="w-full h-full flex-col justify-start items-stretch overflow-hidden order-last">
                    <Header />

                    <div className="container mx-auto p-4 bg-black h-5/6">
                        <div className="w-full h-full bg-white overflow-y-scroll overflow-x-scroll shadow rounded-sm">
                            <div className="w-full h-full inline-flex justify-between align-stretch px-2 py-2 mx-1 my-1">
                                {children}
                            </div>
                        </div>
                    </div>
                    
                    <ActionsMenu /> 
                </div>
            </div>
        </div>
    );
}

export default StackedLayout



                {/* <main className="max-h-lg overflow-hidden flex-col justify-between align-center"> */}
                    {/* <section className="w-full bg-black outline-white rounded-md shadow">
                        <div className="w-full inline-flex justify-between align-center px-2 py-2">
                            <div className="w-full px-2 rounded-md bg-black text-white flex-col justify-between items-start">
                                <Breadcrumbs /> 
                            
                                <h1 className="text-2-lg leading-6 font-lightest text-white">
                                    {session && session.user.email}
                                </h1>
                            </div>
                        
                            <div className="flex-row justify-end items-end">
                                <StatisticsCards />
                            </div>
                        </div>
                    </section> */}

                
                {/* </main> */}