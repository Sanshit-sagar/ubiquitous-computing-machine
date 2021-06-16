import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { Popover, Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

import useMediaQuery from '../hooks/useMediaQuery';
import { useTheme } from 'next-themes'
import { useSession, signIn } from 'next-auth/client'

import Footer from './Footer'
import Logo from '../components/Logo'
import { FlyoutMenu, MobileMenu } from '../components/index'

import {
    ChevronDownIcon,
    PlusCircleIcon,
    TableIcon,
    CursorClickIcon
} from '@heroicons/react/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import {GlobalStore} from '../store'
import toast from 'react-hot-toast'

const links = [
    {
      text: 'New Slug',
      icon: PlusCircleIcon,
      href: '/new',
    },
    {
        text: 'My Slugs',
        icon: TableIcon,
        href: '/links',
    },
    {
        text: 'Click Stream',
        icon: CursorClickIcon,
        href: '/clicks',
    }
];

const NotificationsButton = () => {
    return (
        
            <button
                type="button"
                className="flex-shrink-0 p-1 text-indigo-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
            >        
                {/* <span className="sr-only"> */}
                    Notifications
                {/* </span> */}
                
                <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
        
    )
}

const Header = () => {
    const router = useRouter()
    const menuRef = useRef()

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [session, loading] = useSession()
    const [mounted, setMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false) 

    const { theme, systemTheme, setTheme } = useTheme();
    const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if(!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme; 
            
        if(currentTheme==='dark') {
            return (
                <SunIcon 
                    className="w-7 h-7" 
                    role="button" 
                    onClick={() => setTheme('light')} 
                />
            );
        } else {
            return (
                <MoonIcon 
                    className="w-7 h-7" 
                    role="button" 
                    onClick={() => setTheme('dark')} 
                />
            );
        }
    }

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
            <div>
                <div className="relative" ref={menuRef}>
                    <button 
                        className="bg-indigo-200 border-2 rounded-md border-double border-indigo-700 inline-flex justify-between align-center w-full px-2 py-2"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >       
                        <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="rounded-md border-2 border-gray-200 w-8 h-8 mx-2"
                        />
                            
                        <p className="text-md font-light"> Hello, {session.user.name?.split(' ')?.[0] ?? 'there'} </p>
                        <ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1" />
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
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Logo /> 
                                </div>
                            </div>

                                <div className="ml-4 flex items-center md:ml-6">
                                    {renderThemeChanger()}
                                    <NotificationsButton />
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    
                </>
            )}
        </Disclosure>
    )
}

const SearchBar = () => {

    return (
        <div className="w-full bg-gray-200 inline-flex flex-row justify-between align-stretch">
            
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-gray-900">
                    Dashboard
                </h1>
            </div>
                
            <div>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>

                <div className="relative text-gray-900 focus-within:text-gray-600 bg-green-100" >
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                        id="search"
                        className="block w-full bg-gray-200 focus:bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-gray-900 rounded-md leading-5 text-gray-900 placeholder-gray-900 focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                    />
                </div>
            </div>
        </div>
    )
}
  
function StackedLayout({ children }) {
    const [session, loading] = useSession()

    return (
        
    <div className="min-h-screen bg-gray-200">
        <Header /> 

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <SearchBar />

            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <div className="grid grid-cols-1 gap-4 lg:col-span-2 shadow-lg">
                    <section aria-labelledby="section-1-title">
                        
                        <div className="rounded-lg bg-white overflow-hidden shadow">
                            <div className="p-6">
                                <h2 id="section-1-title">
                                    Section title
                                </h2>
                                {children}
                            </div>
                        </div>
                    </section>
                </div>

                
                <div className="grid grid-cols-1 gap-4">
                    <section aria-labelledby="section-2-title">
                    <h2 className="sr-only" id="section-2-title">
                        Section title
                    </h2>
                    <div className="rounded-lg bg-white overflow-hidden shadow">
                        <div className="p-6">
                            {/* Your content */}
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </div>

        <footer>
            <Footer /> 
        </footer>
      </div>
    )
  }

  export default StackedLayout
