import React, {Fragment, useState, useEffect, useContext} from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import StackedLayout from './StackedLayout'
import {useRouter} from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SITE_DOMAIN = 'TODO';

function PageHeader() {
  return (
    <div className="w-full h-full inline-flex flex-row justify-between items-center mb-6 ml-4">
        <div className="w-full">
          <h1 id="message-heading" className="text-lg font-medium text-indigo-500">
            Full-Stack Developer
          </h1>
          <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
            Checkout and Payments Team
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Open
          </span>
          <Menu as="div" className="ml-3 relative inline-block text-left">
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex justify-between px-4 py-2 text-sm'
                            )}
                          >
                            <span>Edit</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex justify-between px-4 py-2 text-sm'
                            )}
                          >
                            <span>Duplicate</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'w-full flex justify-between px-4 py-2 text-sm'
                            )}
                          >
                            <span>Archive</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
  )
}
const Layout = ({ children, pageMeta }) => {
    const router = useRouter()

    const meta = {
        title: 'hashify',
        description: `the one stop shop for all your url management needs`,
        type: 'website',
        creator: 'sanshit.sagar@gmail.com',
        ...pageMeta,
    };

    return (   
        <>
            <Head>
                <title> {meta.title} </title>
                <meta content={meta.description} name="description" />
                <meta property="author" content="AlterClass" />
                <link rel="canonical" href={`${SITE_DOMAIN}${router.asPath}`} />
                
                {/* Open Graph */}
                <meta property="og:url" content={`${SITE_DOMAIN}${router.asPath}`} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="hashify" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                {meta.image && <meta property="og:image" content={meta.image} />}
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@AlterClassIO" />
                <meta name="twitter:creator" content={meta.creator} />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                {meta.image && <meta name="twitter:image" content={meta.image} />}

                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>

            <StackedLayout>
              {children}
            </StackedLayout>

            {/* <div className="min-h-screen bg-gray-100"> */}
              {/* <div className="bg-indigo-600 pb-32"> */}
                
                {/* <Header /> */}

                {/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"> */}
                  {/* <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8"> */}
                    {/* <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"> */}
                      {/* <div className="px-2 flex-col items-center lg:px-0"> */}
                        {/* <PageHeader />  */}
                        {/* {children} */}
                      {/* </div> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* </main> */}

                {/* <Footer /> */}
              {/* </div> */}
            {/* </div> */}
        </>
    )
}

export default Layout 