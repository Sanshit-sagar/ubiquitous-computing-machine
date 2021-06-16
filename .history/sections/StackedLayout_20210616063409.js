import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusIcon,
  CursorClickIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

import {useSession} from 'next-auth/client'
import Logo from '../components/Logo'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function StackedLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [session, loading] = useSession()

    const sidebarNavigation = [
        { name: 'New', href: '/new', icon: PlusIcon, current: false },
        { name: 'Clicks', href: '/clicks', icon: CursorClickIcon, current: false },
        { name: 'Saved', href: '/links', icon: CollectionIcon, current: true },
    ];

    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Sign out', href: '#' },
    ]

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
        
            <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
                <div className="w-full py-6 flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center">
                    <Logo />
                </div>
                <div className="flex-1 mt-6 w-full px-2 space-y-1">
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

                    <button
                    type="button"
                    className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Add file</span>
                    </button>
                </div>
                </div>
            </div>
            </header>

            {/* Main content */}
            <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                {/* Primary column */}
                <section
                aria-labelledby="primary-heading"
                className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
                >
                <h1 id="primary-heading" className="sr-only">
                    Photos
                </h1>
                {/* Your content */}
                </section>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block">
                {/* Your content */}
            </aside>
            </div>
        </div>
    </div>
    )
}

export default StackedLayout