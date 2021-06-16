import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'
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

const NotificationsPopover = () => {
    return (
        <button
            type="button"
            className="flex-shrink-0 p-1 text-indigo-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
        >
            <span className="sr-only">
                View notifications
            </span>

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
                  <div
                    className="flex items-center space-x-1 sm:space-x-2"
                    role="button"
                    onClick={() => setMenuOpen(prev => !prev)}
                  >
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="rounded-full border-2 border-blue-600 w-8 h-8"
                    />
                    <p className="flex items-center sm:space-x-1">
                      <span className="hidden sm:inline-block">
                        Hello, {session.user.name?.split(' ')?.[0] ?? 'there'}
                      </span>{' '}
                      <ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1" />
                    </p>
                  </div>

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
    <div className="bg-gray-100 mb-8">
         <Popover as="header" className="pb-6 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex items-center justify-center lg:justify-between">
            
                <div className="absolute left-0 flex-shrink-0 lg:static">
                    <Logo /> 
                </div> 

                {renderThemeChanger()}

                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    <NotificationsPopover />
                    <ProfileMenu />
                </div>
            </div>
        </div>
        </Popover>
    </div>
    )
}

const SearchBar = () => {

    return (
        <div className="bg-indigo-600">
            <div className="max-w-xs w-full mx-auto">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative text-white focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                    id="search"
                    className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
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
        
    <div className="min-h-screen bg-gray-100">
        <Header /> 

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* <h1 className="sr-only">
                Page title
            </h1> */}
                
            <SearchBar />

            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                    <section aria-labelledby="section-1-title">
                        <h2 className="sr-only" id="section-1-title">
                            Section title
                        </h2>
                        <div className="rounded-lg bg-white overflow-hidden shadow">
                            <div className="p-6">
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
