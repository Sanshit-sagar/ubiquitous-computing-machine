
import React, { Fragment, useContext, useRef } from 'react'

import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/client'

import useMediaQuery from '../../hooks/useMediaQuery'
import {GlobalStore} from '../../store'
import FlyoutMenu from '../FlyoutMenu/index'

const ProfileMenu = ({ userNavigation }) => {
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

    const handleNavigation = (id) => {
        if(id !== currentPage) {
            router.push(`/${id}`)
            dispatch({
                type: 'navigate',
                payload: {
                    route: `${id}`
                }
            });
        } else {
            toast((t) => (
                <span>
                  Already here
                  <button onClick={() => toast.dismiss(t.id)}>
                        Dismiss
                  </button>
                </span>
            ));
        }
    }


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
        <button 
            href='/profile' 
            className="flex-shrink-0 w-full"
            onClick={() => {
                  !session && !loading ?  signIn() 
                : !loading ? router.push('/profile') 
                : toast.error({message: 'lemme try and authenticate you first'}) 
            }}
        >
            <img
                className="block mx-auto h-10 w-10 rounded-md"
                src={session.user.image} 
                alt={session.user.name}
            />
            <div className="sr-only">
                <p> {session.user.name} </p>
                <p> {session.user.email} </p>
            </div>
        </button>
    );
}

export default ProfileMenu
