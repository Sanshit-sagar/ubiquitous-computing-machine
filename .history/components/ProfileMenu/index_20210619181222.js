
import React, { Fragment, useContext, useRef } from 'react'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/client'
import useMediaQuery from '../../hooks/useMediaQuery'

import toast from 'react-hot-toast'
import {GlobalStore} from '../../store'

const ProfileMenu = ({ userNavigation }) => {
    const [session, loading] = useSession()

    const router = useRouter()
    const menuRef = useRef();

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)
    
    const toggleMenu = () => {
        dispatch({
            type: 'toggle',
            payload: {
                key: 'menuOpen'
            }
        })
    }

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


    if(loading) return <p> loading... </p>
    if(!session && !loading) {
        return (
            <button 
                type="button" 
                onClick={() => signIn()}
                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 whitespace-nowrap"
            >
                Login
            </button>
        )
    }

    return (
        <div className="inline-flex justify-start align-center">
            <div className="relative mr-10" ref={menuRef}>
                <div
                    className="flex justify-start items-center space-x-1 sm:space-x-2"
                    role="button"
                    onClick={toggleMenu}
                >
                    <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="rounded-full border-1 border-gray-200 hover:ring-2 hover:ring-white w-8 h-8"
                    />
                </div>

                <FlyoutMenu
                    links={userNavigation}
                    show={isLargeScreen && state.menuOpen}
                    containerRef={menuRef}
                    onClose={toggleMenu}
                    handleNavigation={handleNavigation}
                />
            </div>
        </div>
    );
}

export default ProfileMenu
