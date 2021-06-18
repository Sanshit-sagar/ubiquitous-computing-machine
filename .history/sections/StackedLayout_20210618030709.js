import React, { Fragment, useContext, useRef } from 'react'
import {useRouter} from 'next/router'

import { Menu, Transition } from '@headlessui/react'
import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
  SignOutIcon,
  ChevronDownIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

import toast from 'react-hot-toast'
import {GlobalStore} from '../store'

import FlyoutMenu from '../components/FlyoutMenu'
import Logo from '../components/Logo'
import DarkModeButton from '../components/DarkModeButton/index'
import NotificationBell from '../components/NotificationBell/index'
import CustomSpinner from '../buildingBlocks/Spinner'

import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards/index'

import useMediaQuery from '../hooks/useMediaQuery'
import { useSession, signIn, signOut } from 'next-auth/client'
import Footer from './Footer'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProfileMenu = ({ userNavigation }) => {
    const router = useRouter()
    const menuRef = useRef();
    const [session, loading] = useSession()
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


    if(!session && !loading) {
        return (
            <button
                type="button"
                onClick={() => {session && !loading ? signOut() : toggleMenu() }}
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            >
                { session && !loading ? `hi! ${session.user.name}` : 'Login' }
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
                    onClick={toggleMenu}
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

const NotificationButton = () => {

    return (
        <button 
            type="button"
            className="flex bg-yellow-600 p-1 rounded-full items-center justify-center text-white hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
        >
            <NotificationBell 
                className="h-6 w-6" 
                aria-hidden="true" 
            />
        </button>
    )
}


function StackedLayout({ children, pageMeta }) {
    const meta = {
        title: 'hashify',
        description: `the one stop shop for all your url management needs`,
        type: 'website',
        creator: 'sanshit.sagar@gmail.com',
        ...pageMeta,
    };

    const router = useRouter()
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const sidebarNavigation = [
        { name: 'New', href: 'new', icon: PlusIcon, current: state.router.current==='new' },
        { name: 'Clicks', href: 'clicks', icon: CursorClickIcon, current: state.router.current==='clicks' },
        { name: 'Saved', href: 'links', icon: CollectionIcon, current: state.router.current==='links' },
    ];
    
    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Sign out', href: '#' }
    ];

    const handleNavigation = (route) => {
        if(route !== state.router.current) {
            dispatch({
                type: 'navigate',
                payload: {
                    key: `/${route}`
                }
            });
            router.push(`/${route}`)
            toast.success(`Navigated to ${state.router.current}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    // const handleSignOut = () => {
    //     signOut(); 
    // }

    return (
        <div className="h-screen bg-gray-900 flex overflow-x-auto overflow-y-scroll">
            <div className="bg-gray-900 border-gray-50 overflow-y-auto md:block">
                <div className="w-full py-6 flex flex-col items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Logo />
                    </div>
                    
                    <div className="flex-col mt-6 w-full px-1 space-y-1 bg-gray-900 border-gray-50">
                        {sidebarNavigation.map((item) => (
                            <button
                                key={item.name}
                                route={item.href}
                                className={classNames(
                                    item.current  
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-50 text-black ' +
                                    'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                                onClick={() => handleNavigation(item.href)}
                            >
                                <item.icon
                                    className={classNames(
                                        item.current ? 'bg-yellow' : 'text-white',
                                        'h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="mt-2">
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>


           <div className="w-full h-full overflow-x-auto overflow-y-scroll px-1 mx-1 flex-col justify-start align-stretch">
                <header className="w-full">
                    <div className="w-full rounded-md py-3 px-1 ml-1 mr-5 flex justify-start align-stretch overflow-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                        <div className="flex-1 flex justify-between px-2">

                            <div className="flex-1 flex">
                                <div className="relative w-full text-gray-50 focus-within:text-gray-200">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                        <SearchIcon 
                                            className="flex-shrink-0 h-5 w-5 mr-5 text-indigo-900" 
                                            aria-hidden="true" 
                                        />
                                    </div>
                                    <input
                                        name="search_field"
                                        id="search_field"
                                        className="h-full w-full border-gray-50 rounded-md py-2 pl-2 pr-3 text-base text-gray-900 placeholder-indigo-900 focus:outline-none focus:ring-50 focus:border-red-500 focus:placeholder-indigo-900"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </div>

                            <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                                <Menu as="div" className="relative flex-shrink-0">
                                    {({ open }) => (
                                        <> 
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-200'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>

                                <DarkModeButton /> 
                                <NotificationButton />
                                <ProfileMenu />

                                {/* <button onClick={handleSignOut}>
                                    signout
                                </button> */}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="w-full rounded-lg mt-3 bg-indigo-900 overflow-x-auto overflow-y-scroll shadow">
                    <main className="w-full bg-white-50">
                        <section
                            aria-labelledby="primary-heading"
                            className="w-full flex-row items-start justify-between"
                        >
                            <div className="w-full px-2 pb-1 pt-2 rounded-md bg-gray-50 text-gray-900 inline-flex flex-row justify-between items-start">
                                <div className="w-full flex-col items-center justify-between">
                                    <Breadcrumbs /> 
                                   
                                   <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {session ? session.user.email : <CustomSpinner />}
                                        </h3>
                                        
                                        {/* <p className="text-md font-light text-gray-900">
                                            {session ? session.user.email : <CustomSpinner />}
                                        </p> */}
                                    </div>
                                </div>
                                <div className="w-full flex-row justify-end items-end">
                                    <StatisticsCards />
                                </div>
                            </div>
                        </section>

                        <div className="bg-indigo-900 shadow rounded-md">
                            {children}
                        </div>
                    </main>
                </div>
      

                <footer class="w-full text-center border-t border-grey p-1 bg-blue-dark">
                    <Footer />
                </footer>
        </div>
    </div>
    )
}

export default StackedLayout