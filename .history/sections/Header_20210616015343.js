import React, { useState, useEffect, useRef } from 'react'
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
import toast from 'react-hot-toast'

const links = [
    {
      text: 'New Slug',
      icon: PlusCircleIcon,
      href: '/new',
    },
    // {
    //   text: 'My posts',
    //   icon: GlobeIcon,
    //   href: '/posts/me',
    // },
    // {
    //   text: 'My drafts',
    //   icon: DocumentTextIcon,
    //   href: '/drafts/me',
    // },
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

    const [session, loading] = useSession()
    const [mounted, setMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false) 

    const { theme, systemTheme, setTheme } = useTheme();
    const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

    const [currentPage, setCurrentPage] = React.useState('dashboard')

    const navigation = [
        { id: 'new', name: 'New', href: '/new', current: currentPage==='new' },
        { id: 'dashboard', name: 'Dashboard', href: '#', current: currentPage==='dashboard' },
        { id: 'clicks', name: 'Click Stream', href: '/clicks', current: currentPage==='clicks'},
        { id: 'links', name: 'Saved Links', href: '/links', current: currentPage==='links' },
    ];

    const handleNavigation = (id) => {
        setCurrentPage(id);

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
        {/* {({ open }) => ( */}
            {/* <> */}
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <Logo /> 
                        
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.id}
                                        // href={item.href}
                                        as="button"
                                        onClick={() => handleNavigation(item.id)}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'px-3 py-2 rounded-md text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {renderThemeChanger()}

                        <ProfileMenu /> 

                        <MobileMenu
                            links={links}
                            show={!isLargeScreen && menuOpen}
                            onClose={() => setMenuOpen(false)}
                        />
                    </div>
                </div>
            {/* </> */}
        {/* )} */}
    </Disclosure>
    )
}

export default Header 