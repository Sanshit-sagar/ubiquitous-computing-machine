// import React, { useState, useEffect, useRef, useContext } from 'react'
// import {useRouter} from 'next/router'
// import Logo from '../components/Logo'
// import useMediaQuery from '../hooks/useMediaQuery';
// import { useTheme } from 'next-themes'
// import { useSession, signIn } from 'next-auth/client'
// import { FlyoutMenu, MobileMenu } from '../components/index'
// import { Disclosure } from '@headlessui/react'
// import {
//     ChevronDownIcon,
//     PlusCircleIcon,
//     TableIcon,
//     CursorClickIcon
// } from '@heroicons/react/outline'
// import { SunIcon, MoonIcon } from '@heroicons/react/solid'
// import {GlobalStore} from '../store'
// // import toast from 'react-hot-toast'

// const links = [
//     {
//       text: 'New Slug',
//       icon: PlusCircleIcon,
//       href: '/new',
//     },
//     {
//         text: 'My Slugs',
//         icon: TableIcon,
//         href: '/links',
//     },
//     {
//         text: 'Click Stream',
//         icon: CursorClickIcon,
//         href: '/clicks',
//     }
// ];

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }


// const Header = () => {
//     const router = useRouter()
//     const menuRef = useRef()

//     const state = useContext(GlobalStore.State)
//     const dispatch = useContext(GlobalStore.Dispatch)

//     const [session, loading] = useSession()
//     const [mounted, setMounted] = useState(false)
//     const [menuOpen, setMenuOpen] = useState(false) 

//     const { theme, systemTheme, setTheme } = useTheme();
//     const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

//     const [currentPage, setCurrentPage] = React.useState('dashboard')


//     useEffect(() => {
//         setMounted(true)
//     }, [])

//     const renderThemeChanger = () => {
//         if(!mounted) return null

//         const currentTheme = theme === 'system' ? systemTheme : theme; 
            
//         if(currentTheme==='dark') {
//             return (
//                 <SunIcon 
//                     className="w-7 h-7" 
//                     role="button" 
//                     onClick={() => setTheme('light')} 
//                 />
//             );
//         } else {
//             return (
//                 <MoonIcon 
//                     className="w-7 h-7" 
//                     role="button" 
//                     onClick={() => setTheme('dark')} 
//                 />
//             );
//         }
//     }

//     const ProfileMenu = () => {

//         if(!session && !loading) {
//             return (
//                 <button
//                     type="button"
//                     onClick={() => signIn()}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
//                 >
//                     Sign in
//                 </button>
//             )
//         }
//         if(loading) return <p> loading... </p>

//         return (
//             <div>
//                 <div className="relative" ref={menuRef}>
//                   <div
//                     className="flex items-center space-x-1 sm:space-x-2"
//                     role="button"
//                     onClick={() => setMenuOpen(prev => !prev)}
//                   >
//                     <img
//                       src={session.user.image}
//                       alt={session.user.name}
//                       className="rounded-full border-2 border-blue-600 w-8 h-8"
//                     />
//                     <p className="flex items-center sm:space-x-1">
//                       <span className="hidden sm:inline-block">
//                         Hello, {session.user.name?.split(' ')?.[0] ?? 'there'}
//                       </span>{' '}
//                       <ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1" />
//                     </p>
//                   </div>
//                     <FlyoutMenu
//                         links={links}
//                         show={isLargeScreen && menuOpen}
//                         containerRef={menuRef}
//                         onClose={() => setMenuOpen(false)}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     return (
//     <Disclosure as="nav" className="bg-gray-800">
//         <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
//             <div className="relative flex items-center justify-between h-16">
//                 <Logo /> 
//                 {renderThemeChanger()}
//                 <ProfileMenu /> 
//             </div>
//         </div>
//     </Disclosure>
//     )
// }

// export default Header 

// const NotificationButton = () => {

//     return (
//         <button 
//             type="button"
//             className="flex outline-yellow-600 p-1 rounded-md items-center justify-center text-white hover:bg-yellow-800 focus:outline-none hover:ring-2 hover:ring-offset-2 focus:ring-white-500"
//         >
//             <NotificationBell 
//                 className="h-6 w-6" 
//                 aria-hidden="true" 
//             />
//         </button>
//     )
// }


// const Header = () => {
//     const [session, loading] = useSession()

//     // const state = useContext(GlobalStore.State)
//     // const dispatch = useContext(GlobalStore.Dispatch)

//     const userNavigation = [
//         { name: 'Your Profile', href: '#' },
//         { name: 'Sign out', href: '#' }
//     ];

//     return (
//         <header className="w-full pt-2 pb-4 bg-black shadow inline-flex justify-items-end outline-gray-50 align-baseline border-b-6">
//             <div className="flex-1 flex ml-2 mt-2">
//                 <div className="relative w-75 text-gray-50 focus-within:text-gray-200">
//                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
//                         <SearchIcon 
//                             className="flex-shrink-0 h-5 w-5 mr-5 text-indigo-900" 
//                             aria-hidden="true" 
//                         />
//                     </div>

//                     <input
//                         name="search_field"
//                         id="search_field"
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
//                         placeholder="Search"
//                         type="search"
//                     />
//                 </div>
//             </div>

//             <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
//                 <Menu as="div" className="relative flex-shrink-0">
//                     {({ open }) => (
//                         <> 
//                             <Transition
//                                 show={open}
//                                 as={Fragment}
//                                 enter="transition ease-out duration-100"
//                                 enterFrom="transform opacity-0 scale-95"
//                                 enterTo="transform opacity-100 scale-100"
//                                 leave="transition ease-in duration-75"
//                                 leaveFrom="transform opacity-100 scale-100"
//                                 leaveTo="transform opacity-0 scale-95"
//                             >
//                                 <Menu.Items
//                                     static
//                                     className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg py-1 bg-gray-50 ring-1 ring-black ring-opacity-5 textgray-900 hover:text-pink-800"
//                                 >
//                                     {userNavigation.map((item) => (
//                                         <Menu.Item key={item.name}>
//                                             {({ active }) => (
//                                                 <a
//                                                     href={item.href}
//                                                     className={classNames(
//                                                         active ? 'bg-gray-100' : 'block px-4 py-2 text-smtext-gray-200'
//                                                     )}
//                                                 >
//                                                     {item.name}
//                                                 </a>
//                                             )}
//                                         </Menu.Item>
//                                     ))}
//                                 </Menu.Items>
//                             </Transition>
//                         </>
//                     )}
//                 </Menu>

//                 <DarkModeButton /> 
//                 <NotificationButton />
//                 <ProfileMenu />
//             </div>
//         </header>
//     );
// }

// export default Header 
import React, { useState, useEffect, useContext } from 'react'

import Link from 'next/link'
import Icon from '@supabase/ui'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { fetchAndWait } from '../lib/fetchWrapper'
import { GlobalStore } from '../store'

// import DarkModeButton from '../components/DarkModeButton/index'
// import NotificationBell from '../components/NotificationBell/index'
// import ProfileMenu from '../components/ProfileMenu/index'

import toast from 'react-hot-toast'

import Logo from '../components/Logo'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
  
const Header = () => {
    const router = useRouter()
    const [session, loading] = useSession()
    
    const [activeSlug, setActiveSlug] = useState('')
    const [fetchLoading, setFetchLoading] = useState(false)

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    useEffect(() => {
        if (activeSlug) setActiveSlug(activeSlug.toLowerCase())
      }, [activeSlug])

    const goToSlug = async(event) => {
        event.preventDefault()
        event.stopPropagation()
    
        setFetchLoading(true)
        const org = await fetchAndWait(`https://api.github.com/orgs/${activeSlug.toLowerCase()}`)
        if (org.login) {
          router.push(`/${org.login}`)
        } else {
          toast.error(`The slug ${activeSlug} cannot be found`)
        }
        setFetchLoading(false)
    }


    return (
        <div className={`px-4 2xl:px-0 shadow bg-gray-900 h-14 flex items-center`}>
            <div className="mx-auto container flex items-center justify-between">
                <div className="flex-1 flex items-center justify-start">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <form
                        onSubmit={(e) => goToSlug(e)}
                        className={`
                            flex items-center bg-gray-500 font-mono px-2 py-1 rounded-md text-white
                            w-full text-sm ${fetchLoading ? 'opacity-75' : ''}
                        `}
                    >
                        <p className="hidden sm:block"> cute.ly </p>
                        <input
                            type="text"
                            value={activeSlug}
                            onChange={(e) => setActiveSlug(e.target.value)}
                            placeholder="/slug"
                            disabled={fetchLoading}
                            className="flex-1 bg-gray-500 text-white focus:outline-none text-center sm:text-left"
                        />
                        {fetchLoading && <Icon type="Loader" size={18} strokeWidth={2} className="animate-spin" />}
                    </form>
                </div>

                <div className="flex-1 flex items-center justify-end">
                    <div className="cursor-pointer relative">
                    {session && session.user
                        ? (
                        <div
                            onClick={() => router.push('/profile')}
                            style={{ backgroundImage: `url('${session.user.image}')` }}
                            className="h-8 w-8 bg-no-repeat bg-center bg-cover rounded-full" 
                        />
                        )
                        : (
                        <button
                            onClick={() => signIn()}
                            className={`
                                text-xs text-white border transition opacity-50 hover:opacity-100 px-3 py-1
                                rounded-full focus:outline-none
                            `}
                        >
                            Sign in
                        </button>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header