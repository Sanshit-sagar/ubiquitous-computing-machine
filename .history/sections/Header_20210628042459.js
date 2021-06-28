import React, { useState, useEffect, useContext } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/client'
import { fetchAndWait } from '../lib/fetchWrapper'
import { Windmill } from '@windmill/react-ui'

import Loader from '../components/Loader'
import DarkModeButton from '../components/DarkModeButton/index'
import ProfileMenu from '../components/ProfileMenu/index'
import { GlobalStore } from 'store'

import toast from 'react-hot-toast'

const SearchIconSvg = () => {
    return (
        <svg fill="none" class="relative w-5 h-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    )
}

const InputContainerSvg = () => {

    return (
        <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
            </path>
        </svg>
    );
}

const AddIconSvg = () => {

    return (
        <div class="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block">
            +
        </div>
    )
}

const Header = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    const [activeSlug, setActiveSlug] = useState('')
    const [fetchLoading, setFetchLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (activeSlug) {
            setActiveSlug(activeSlug.toLowerCase())
        }
    }, [activeSlug])

  
    return (
        // <Windmill>
            <header className="w-90 mx-5 shadow-md bg-white dark:bg-gray-600 items-center h-16 rounded-md z-20">
                <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                    <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                        <div className="container relative left-0 z-50 flex w-3/4 h-auto">
                            <div className="relative inline-flex items-center w-full lg:w-64 h-full group">
                                <div className="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                                    <SearchIconSvg />
                                </div>
                                <InputContainerSvg />
                                
                                <input 
                                    type="text" 
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="   Search"
                                    disabled={fetchLoading}
                                    className="inline-flex pl-10 bg-white text-black dark:bg-gray-900 dark:text-white rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-200 ring-opacity-90aa-input" 
                                />
                                <span>
                                    { fetchLoading ? <Loader /> : undefined} 
                                </span>
                            </div>
                        </div>
                        
                       
                        <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                           
                                <>
                                    <button 
                                        disabled={loading}
                                        onClick={() => {
                                            if(session && session.user) {
                                                return signOut();
                                            } else {
                                                return signIn();
                                            }
                                        }}
                                    > 
                                        {   session && session.user ?  'signout' 
                                            :   !loading ?  'signin' 
                                            :   <Loader />
                                        }
                                    </button> 

                                    <a href="#" class="block relative">
                                        <img 
                                            alt={session.user.name} 
                                            src={session.user.image} 
                                            class="mx-auto object-cover rounded-full h-10 w-10"
                                        />
                                    </a>
                                </> 
                        </div> 

                    </div>
                </div>
                
            </header>
        // </Windmill>
    )
}

export default Header

//     return (
//         <div className={`px-2 py-2 shadow bg-white h-14 flex items-center`}>
//             <div className="mx-auto container flex items-center justify-between">
//                 {/* <div className="flex-1 flex items-center justify-start">
//                     <Link href="/">
//                         <Logo />
//                     </Link>
//                 </div> */}

//                 <div className="flex-1 flex items-start justify-start">
//                     {/* <div className="border-1"> */}
//                         <form
//                             onSubmit={(e) => goToSlug(e)}
//                             className={`
//                                 flex items-center bg-white text-black font-mono px-2 rounded-sm
//                                 text-sm ${fetchLoading ? 'opacity-75' : ''}
//                             `}
//                         >
                            
//                             <p className="hidden sm:block"> cutely/ </p>
//                             <input
//                                 type="text"
//                                 value={activeSlug}
//                                 onChange={(e) => setActiveSlug(e.target.value)}
//                                 placeholder="slug"
//                                 disabled={fetchLoading}
//                                 className="flex bg-white text-black"
//                             />
                            
//                         </form>
//                     {/* </div> */}
//                 </div>

//                 <div className="flex-1 flex items-center justify-end">
//                     <DarkModeButton />
//                     {/* <div className="cursor-pointer relative "> */}
//                     {/* {session && session.user
//                         ? (
//                             <div
//                                 onClick={() => router.push('/profile')}
//                                 style={{ backgroundImage: `url('${session.user.image}')` }}
//                                 className="h-8 w-8 bg-no-repeat bg-center bg-cover rounded-full" 
//                             />
//                         )
//                         : ( */}
//                         {/* <ProfileMenu />  */}
//                         {/* ) */}
//                     {/* } */}
//                     {/* </div> */}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Header