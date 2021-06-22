import React, { Fragment, useContext, useRef } from 'react'
import {useRouter} from 'next/router'

import toast from 'react-hot-toast'
import {GlobalStore} from '../store'

import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards/index'

// import useMediaQuery from '../hooks/useMediaQuery'
import { useSession, signIn, signOut } from 'next-auth/client'

import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// const extraButtons = {
//     docs: { name: 'docs', href: '/docs/cutely', isButton: false },
//     source: { name: 'source', href: '/source/https://hereissomesource', isButton: false },
//     changelog: { name: 'changelog', href: '/changelog',  isButton: true },
//     perf: { name: 'perf', href: '/perf', isButton: true },
//     locale: { name: 'locale', href: '', isButton: true }
// }

// const ProfileMenu = ({ userNavigation }) => {
//     const router = useRouter()
//     const menuRef = useRef();
//     const [session, loading] = useSession()
//     const state = useContext(GlobalStore.State)
//     const dispatch = useContext(GlobalStore.Dispatch)
//     const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)
    
//     const toggleMenu = () => {
//         dispatch({
//             type: 'toggle',
//             payload: {
//                 key: 'menuOpen'
//             }
//         })
//     }

//     const handleNavigation = (id) => {
//         if(id !== currentPage) {
//             router.push(`/${id}`)
//             dispatch({
//                 type: 'navigate',
//                 payload: {
//                     route: `${id}`
//                 }
//             });
//         } else {
//             toast((t) => (
//                 <span>
//                   Already here
//                   <button onClick={() => toast.dismiss(t.id)}>
//                         Dismiss
//                   </button>
//                 </span>
//             ));
//         }
//     }


//     if(!session && !loading) {
//         return (
//             <button
//                 type="button"
//                 onClick={() => signOut()}
//                 className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
//             >
//                 { session && !loading ? `hi! ${session.user.name}` : 'Login' }
//             </button>
//         )
//     }

//     if(loading) return <p> loading... </p>

//     return (
//         <div className="inline-flex justify-start align-center">
//             <div className="relative mr-10" ref={menuRef}>
//                 <div
//                     className="flex justify-start items-center space-x-1 sm:space-x-2"
//                     role="button"
//                     onClick={toggleMenu}
//                 >
//                     <img
//                         src={session.user.image}
//                         alt={session.user.name}
//                         className="rounded-full border-1 border-gray-200 hover:ring-2 hover:ring-white w-8 h-8"
//                     />
//                 </div>

//                 <FlyoutMenu
//                     links={userNavigation}
//                     show={isLargeScreen && state.menuOpen}
//                     containerRef={menuRef}
//                     onClose={toggleMenu}
//                     handleNavigation={handleNavigation}
//                 />
//             </div>
//         </div>
//     );
// }

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
    // const meta = {
    //     title: 'hashify',
    //     description: `the one stop shop for all your url management needs`,
    //     type: 'website',
    //     creator: 'sanshit.sagar@gmail.com',
    //     ...pageMeta,
    // };

    // const router = useRouter()
    const [session, loading] = useSession()

    // const state = useContext(GlobalStore.State)
    // const dispatch = useContext(GlobalStore.Dispatch)

    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Sign out', href: '#' }
    ];

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <div className="inline-flex space-between items-stretch">
                <Sidebar /> 
                <div className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
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