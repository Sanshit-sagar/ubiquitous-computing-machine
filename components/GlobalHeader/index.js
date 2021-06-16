import React, { useState, useContext, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { GlobalStore } from '../../store'
import { useSession, signIn } from 'next-auth/client'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Disclosure } from '@headlessui/react'

import Logo from '../Logo'
import DarkModeButton from '../DarkModeButton/index'
import NotificationBell from '../NotificationBell/index'
import FlyoutMenu from '../FlyoutMenu'


const Header = () => {
    const menuRef = useRef()
    // const router = useRouter()
    // const state = useContext(GlobalStore.State)
    // const dispatch = useContext(GlobalStore.Dispatch)

    const [session, loading] = useSession()
    const [menuOpen, setMenuOpen] = useState(false) 

    // const { theme, systemTheme, setTheme } = useTheme();
    const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

    const ProfileMenu = () => {
        if(!session && !loading) {
            return (
                <button
                    type="button"
                    onClick={() => signIn()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
                >
                    Sign in
                </button>
            )
        }

        if(loading) return <p> loading... </p>

        return (
            <div className="inline-flex justify-between align-baseline">
                <div className="relative" ref={menuRef}>
                    <button 
                        className="inline-flex w-full justify-between align-center py-2 px-4 bg-indigo-500 text-white font-light rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >       
                        <p className="text-md font-light text-white"> 
                            Hello, {session.user.name?.split(' ')?.[0] ?? 'there'} 
                        </p>
                        <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="rounded-md border-2 border-gray-200 w-8 h-8 mx-2"
                        />
                    </button>

                    <FlyoutMenu
                        links={links}
                        show={isLargeScreen && menuOpen}
                        containerRef={menuRef}
                        onClose={() => setMenuOpen(false)}
                    />
                </div>
            </div>
        );
    }

    return (
        <Disclosure as="nav" className="bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Logo /> 
                        </div>
                    </div>

                        <div className="ml-4 flex items-center md:ml-6">
                            <DarkModeButton />
                            <NotificationBell />
                            <ProfileMenu />
                        </div>
                    </div>
                </div>
        </Disclosure>
    )
}

export default Header