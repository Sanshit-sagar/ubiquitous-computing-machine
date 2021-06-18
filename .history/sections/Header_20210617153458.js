import React, { useState, useEffect, useRef, useContext } from 'react'
import {useRouter} from 'next/router'
import Logo from '../components/Logo'
import useMediaQuery from '../hooks/useMediaQuery';
import { useTheme } from 'next-themes'
import { useSession, signIn } from 'next-auth/client'
import { FlyoutMenu, MobileMenu } from '../components/index'
import { Disclosure } from '@headlessui/react'
import {
    ChevronDownIcon,
    PlusCircleIcon,
    TableIcon,
    CursorClickIcon
} from '@heroicons/react/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import {GlobalStore} from '../store'
// import toast from 'react-hot-toast'

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
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

    const [currentPage, setCurrentPage] = React.useState('dashboard')


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
    <Disclosure as="nav" className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <Logo /> 
                
                {renderThemeChanger()}

                <ProfileMenu /> 

            </div>
        </div>
    </Disclosure>
    )
}

export default Header 