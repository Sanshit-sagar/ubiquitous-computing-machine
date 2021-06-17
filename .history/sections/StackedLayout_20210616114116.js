import React, { Fragment, useState, useContext } from 'react'
import router from 'next/router'

import { Menu, Transition } from '@headlessui/react'
import {
//   CogIcon,
  CollectionIcon,
  MenuAlt2Icon,
  PlusIcon,
  CursorClickIcon,
  PencilIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

import {useSession, signIn, signOut} from 'next-auth/client'
import {GlobalStore} from '../store'

import Logo from '../components/Logo'
import DarkModeButton from '../components/DarkModeButton/index'
import NotificationBell from '../components/NotificationBell/index'
import Breadcrumbs from '../components/Breadcrumbs/index'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function StackedLayout({ children }) {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [session, loading] = useSession()
    
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [currentRoute, setCurrentRoute] = useState('/')

    const sidebarNavigation = [
        { name: 'New', href: 'new', icon: PlusIcon, current: currentRoute==='new' },
        { name: 'Clicks', href: 'clicks', icon: CursorClickIcon, current: currentRoute==='clicks' },
        { name: 'Saved', href: 'links', icon: CollectionIcon, current: currentRoute==='links' },
        // { name: 'Settings', href: '#', icon: CogIcon, current: currentRoute==='settings' },
    ];

    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Sign out', href: '#' },
    ]

    const handleNavigation = (route) => {
        if(route !== currentRoute) {
            dispatch({
                type: 'navigate',
                payload: {
                    route: `/${route}`
                }
            });
            setCurrentRoute(route)
            router.push(`/${route}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
        
            <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
                <div className="w-full py-6 flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center">
                    <Logo />
                </div>
                {/* <div className="flex-1 mt-6 w-full px-2 space-y-1">
                    {sidebarNavigation.map((item) => (
                        <button
                            key={item.name}
                            route={item.href}
                            className={classNames(
                                item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => handleNavigation(item.href)}
                        >
                            <item.icon
                                className={classNames(
                                    item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                                    'h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            <span className="mt-2">{item.name}</span>
                        </button>
                    ))}
                </div> */}
                 <div class="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
                    <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                        <ul class="flex flex-col py-4 space-y-1">
                            <li class="px-5 hidden md:block">
                            <div class="flex flex-row items-center h-8">
                                <div class="text-sm font-light tracking-wide text-gray-400 uppercase">Main</div>
                            </div>
                            </li>
                            <li>
                            <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </span>
                                <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                            </a>
                            </li>
                            <li>
                            <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                </span>
                                <span class="ml-2 text-sm tracking-wide truncate">Board</span>
                                <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span>
                            </a>
                            </li>
                            <li>
                            <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                                </span>
                                <span class="ml-2 text-sm tracking-wide truncate">Messages</span>
                            </a>
                            </li>
                            <li>
                            <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                </span>
                                <span class="ml-2 text-sm tracking-wide truncate">Notifications</span>
                                <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                            </a>
                            </li>
                            <li class="px-5 hidden md:block">
                            <div class="flex flex-row items-center mt-5 h-8">
                                <div class="text-sm font-light tracking-wide text-gray-400 uppercase">Settings</div>
                            </div>
                            </li>
                            <li>
                            <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </span>
                                <span class="ml-2 text-sm tracking-wide truncate">Profile</span>
                            </a>
                            </li>
                            <li>
                            <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                </span>
                                <span class="ml-2 text-sm tracking-wide truncate">Settings</span>
                            </a>
                            </li>
                        </ul>

                    {/* <p class="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p> */}
                    </div>
                </div>
            </div>
        </div>


        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="w-full">
                <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        <div className="flex-1 flex">
                            <form className="w-full flex md:ml-0" action="#" method="GET">
                                <label htmlFor="search_field" className="sr-only">
                                    Search all files
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                        <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <input
                                        name="search_field"
                                        id="search_field"
                                        className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                            <Menu as="div" className="relative flex-shrink-0">
                                {({ open }) => (
                                    <>
                                        <div>
                                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                {!session && loading ? null : 
                                                    <img className="h-8 w-8 rounded-full" src={session.user.image} alt={session.user.name} />
                                                }
                                            </Menu.Button>
                                        </div>
                                        
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
                                                                'block px-4 py-2 text-sm text-gray-700'
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

                            <button 
                                type="button"
                                className="flex bg-yellow-600 p-1 rounded-full items-center justify-center text-white hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                            >
                                <NotificationBell className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex items-stretch overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                   
                    <section
                        aria-labelledby="primary-heading"
                        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last dark:bg-black light:bg-white px-3 py-1"
                    >
                        <Breadcrumbs />

                        {children}
                    </section>
                </main>

                {/* <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block"> 
                   {JSON.stringify(state.router.history)}
                </aside> */}
            </div>
        </div>
    </div>
    )
}

export default StackedLayout