import React, { useContext } from 'react'
import {useRouter} from 'next/router'

import toast from 'react-hot-toast'
import {GlobalStore} from '../store'

// import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards/index'

// // import useMediaQuery from '../hooks/useMediaQuery'
import { useSession, signIn, signOut } from 'next-auth/client'

import Sidebar from './Sidebar'
import SecondarySidebar from './SecondarySidebar'
import Footer from './Footer'
import Header from './Header'
import ActionsMenu from '../components/ActionsMenu'

import { Windmill } from '@windmill/react-ui'


function StackedLayout({ children, pageMeta }) {

    const router = useRouter()
    
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [session, loading] = useSession()

    const renavigate = (route) => {
        if(route !== state.router.current) {
            dispatch({
                type: 'navigate',
                payload: {
                    route: `${route}`,
                }
            });
            router.push(`${route}`)
            toast.success(`Navigated to ${state.router.current}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }

    const sendToasty = (toastyMessage) => {
        if(toastyMessage && toastyMessage?.length) {
            console.log('proxying message to toaster')
            toast.message(`${toastyMessage}`)
        }
    }
   
    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <div className="w-full inline-flex space-between items-stretch">
                
                <Sidebar 
                    handleNavigation={renavigate}
                    broadcastToast={sendToasty}
                /> 

                {/* <SecondarySidebar 
                    handleNavigation={renavigate}
                    broadcastToast={sendToasty}
                /> */}

                <div className="w-full h-full flex-col justify-start items-stretch overflow-hidden order-last">
                    <Header 
                        handleNavigation={renavigate}
                        broadcastToast={sendToasty}
                    />

                    

                    <Windmill dark={state.darkMode}>

                        <div className="container mx-auto my-auto bg-gray-300 mb-4 rounded-md">
                            <div className="w-full h-full bg-white overflow-y-hidden overflow-x-hidden shadow rounded-md mt-2">
                                <div className="w-full h-full flex-col justify-between align-stretch">
                                    
                                    <div className="w-full inline-flex justify-end align-start mb-4">
                                        <StatisticsCards />
                                    </div>

                                    <div className="w-full h-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Windmill>
                    
                    {/* <ActionsMenu 
                        handleNavigation={renavigate}
                        broadcastToast={sendToasty}
                    />  */}
                </div>
            </div>
        </div>
    );
}

export default StackedLayout