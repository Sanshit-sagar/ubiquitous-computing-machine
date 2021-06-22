
import React, { Fragment, useContext, useRef } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/client'

import { GlobalStore } from '../../store'
// import { UserIcon, KeyIcon } from '@heroicons/react/outline'

const ProfileMenu = () => {
    const [session, loading] = useSession()

    const router = useRouter()
    // const menuRef = useRef();

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    // const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)
    
    // const toggleMenu = () => {
    //     dispatch({
    //         type: 'toggle',
    //         payload: {
    //             key: 'menuOpen'
    //         }
    //     })
    // }

    // const handleNavigation = (id) => {
    //     if(id !== currentPage) {
    //         router.push(`/${id}`)
    //         dispatch({
    //             type: 'navigate',
    //             payload: {
    //                 route: `${id}`
    //             }
    //         });
    //     } else {
    //         toast((t) => (
    //             <span>
    //               Already here
    //               <button onClick={() => toast.dismiss(t.id)}>
    //                     Dismiss
    //               </button>
    //             </span>
    //         ));
    //     }
    // }


    // if(loading) return <p> loading... </p>
    // if(!session && !loading) {
    //     return (
    //         <button 
    //             type="button" 
    //             onClick={() => signIn()}
    //             className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 whitespace-nowrap"
    //         >
    //             Login
    //         </button>
    //     )
    // }

    return (
        // <Button 
        //     href='/profile' 
        //     style={{ marginLeft: '1rem' }}
        //     shadow={true}
        //     onClick={() => {session ? router.push('/profile') : signIn()}}
        //     loading={!session && loading}
        //     icon={session ? <UserIcon className="h-8 w-8 text-white" /> : <KeyIcon className="h-8 w-8 text-white" />}
        // />
        <button className="ml-2" onClick={() => {session ? router.push('/profile') : signIn()}}>
            {
                session && session.user  ? 
                    <Image 
                        src={`${session.user.image}`}
                        alt="Profile Pic" 
                        height={50} 
                        width={50} 
                    />
                : loading ? <p> 'loading...' </p> 
                : <p> 'error' </p> 
            }
        </button>
    );
}

export default ProfileMenu
