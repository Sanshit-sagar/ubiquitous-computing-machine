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

                    <div className="container mx-auto p-4 bg-gray-300 h-5/6">
                        <div className="w-full h-full bg-white overflow-y-scroll overflow-x-scroll shadow rounded-md">
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