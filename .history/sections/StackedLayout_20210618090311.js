import React, { Fragment, useContext, useRef } from 'react'
import {useRouter} from 'next/router'

import { Menu, Transition } from '@headlessui/react'
import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
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

const extraButtons = {
    docs: { name: 'docs', href: '/docs/cutely', isButton: false },
    source: { name: 'source', href: '/source/https://hereissomesource', isButton: false },
    changelog: { name: 'changelog', href: '/changelog',  isButton: true },
    perf: { name: 'perf', href: '/perf', isButton: true },
    locale: { name: 'locale', href: '', isButton: true }
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
                onClick={() => signOut()}
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            >
                { session && !loading ? `hi! ${session.user.name}` : 'Login' }
            </button>
        )
    }

    if(loading) return <p> loading... </p>

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

const NotificationButton = () => {

    return (
        <button 
            type="button"
            className="flex outline-yellow-600 p-1 rounded-md items-center justify-center text-white hover:bg-yellow-800 focus:outline-none hover:ring-2 hover:ring-offset-2 focus:ring-white-500"
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

    const SignInButton = () => { router.push('/api/auth/signin')}

    return (
    <div className="h-screen bg-gray-900 flex">
        <div className="bg-gray-900 border-gray-50 md:block">
            <div className="w-full py-6 flex flex-col items-center">
                
                <div className="flex-shrink-0 flex items-center text-white">
                    <Logo />
                </div>
                    
                <div className="flex-col mt-6 w-full px-3 space-y-1 bg-gray-900 text-white border-gray-50">
                    {sidebarNavigation.map((item) => (
                        <button
                            key={item.name}
                            route={item.href}
                            className={classNames(
                                item.current  
                                ? 'text-white'
                                : 'text-black bg-white'+
                                'font-lightest group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => handleNavigation(item.href)}
                        >
                            <item.icon
                                className={classNames(item.current ? 'bg-yellow' : 'text-white h-6 w-6')}
                                aria-hidden="true"
                            >
                                <span className="mt-2">
                                    {item.name}
                                </span>
                            </item.icon>
                        </button>
                    ))}
                </div>
            </div>
        </div>


        <div className="w-full h-full flex-col justify-end align-stretch border-b-4 border-white">
            <header className="w-full pt-2 pb-4 bg-black shadow inline-flex justify-items-end align-baseline border-b-6">
                <div className="flex-1 flex ml-2 mt-2">
                    <div className="relative w-75 text-gray-50 focus-within:text-gray-200">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                            <SearchIcon 
                                className="flex-shrink-0 h-5 w-5 mr-5 text-indigo-900" 
                                aria-hidden="true" 
                            />
                        </div>
                        <input
                            name="search_field"
                            id="search_field"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
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
                                        className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg py-1 bg-gray-50 ring-1 ring-black ring-opacity-5 textgray-900 hover:text-pink-800"
                                    >
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : 'block px-4 py-2 text-smtext-gray-200'
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
                </div>
            </header>

            <div className="w-full bg-black overflow-x-auto shadow">
                <main className="w-full bg-white-50">
                    <section
                        aria-labelledby="primary-heading"
                        className="w-full flex-row items-start justify-between"
                    >
                        <div className="w-full px-2 pb-1 pt-2 rounded-md bg-black text-white inline-flex justify-between items-start">
                            <div className="w-full flex-col items-center justify-between">
                                <Breadcrumbs /> 
                                
                                <div>
                                    <h3 className="text-2-lg leading-6 font-lightest text-gray-50">
                                        {session ? session.user.email : loading ? <CustomSpinner /> : 'error!'}
                                    </h3>
                                    
                                </div>
                            </div>
                            <div className="w-full flex-row justify-end items-end">
                                <StatisticsCards />
                            </div>
                        </div>
                    </section>

                    <div className="bg-gray-700 shadow max-h-96 mb-1 rounded-xs">
                        {children}
                    </div>
                </main>
            </div>

            <footer className="w-full text-center border-t border-grey p-1 bg-blue-800">
                <Footer />
            </footer>
        </div>
    </div>
    )
}

export default StackedLayout