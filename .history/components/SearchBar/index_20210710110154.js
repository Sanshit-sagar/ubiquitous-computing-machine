import React, { useState, useEffect } from 'react'

import { IconMail, Input } from '@supabase/ui'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'
import Loader from '../../components/Loader'

import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import { ChevronRightIcon } from '@heroicons/react/solid'

// const fetcher = url => axios.get(url).then(res => res.data)

// function useUserClickstreams(email, timeFilter)  {
//     const time = timeFilter || '30'
//     const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

//     return {
//         clickstream: data ? data.clickstream : [],
//         loading: !data && !err,
//         error: err
//     };
// }

const solutions = [
    {
      name: 'Insights',
      description: 'Measure actions your users take',
      href: '##',
      icon: IconMail,
    },
    {
      name: 'Automations',
      description: 'Create your own targeted content',
      href: '##',
      icon: IconMail,
    },
    {
      name: 'Reports',
      description: 'Keep track of your growth',
      href: '##',
      icon: IconMail,
    },
];
const MyPopover = () => {
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement)

    return (
        <div className="w-full max-w-sm px-4 fixed top-16">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button ref={setReferenceElement} className='p-2 border border-black rounded-md shadow-md'>
                            <ChevronRightIcon
                                className={`${open ? 'transform rotate-90' : ''} h-6 w-6 text-green-400`}
                            />
                        </Popover.Button>
            
                        <Popover.Panel 
                            className="absolute z-10 w-30 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-8 bg-white p-7">
                                    {solutions.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        >
                                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                                <item.icon className="h-6 w-6 text-red-400" /> 
                                            </div>
                                            <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.description}
                                            </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    )
}

const clicks = [
    {slug: 'Tim', url: 'https://tim.com', views: 3},
    {slug: 'Joe', url: 'https://joe.com', views: 2},
    {slug: 'Bel', url: 'https://bel.com', views : 3},
    {slug: 'Max', url: 'https://max.com', views : 2},
    {slug: 'Lee', url: 'https://lee.com', views: 4},
    {slug: 'HOE', url: 'https://hoe.com', views: 6},
]; 

const ResultsPopover = ({ results, timestamp }) => {
    if(!results || !results.length) return;

    return (
        <div>   
            <pre> 
                {results.map(function(value, index) {
                    return (
                        <div keys={index}>
                            <span className="w-full inline-flex justify-between align-start">
                                <span className="text-sm text-black dark:text-white">
                                    {`${index}:${JSON.stringify(value)}`}
                                </span>
                            </span> 
                        </div>
                    )
                })}
            </pre>
            <span> Found at {new Date(parseInt(timestamp)).toLocaleTimeString()} </span>
        </div>
    );
}
  
const SearchBar = () => {
    const [session, loading] = useSession()
    const email = session && session?.user ? session.user.email : ''

    // const email = 'sasagar@ucsd.edu'
    const [results, setResults] = useState()

    return (
        <>
            <Input
                type="text"
                placeholder="Search"
                onChange={async (e) => {
                    const { value } = e.currentTarget
                    let options = {
                        includeScore: true,
                        keys: ['slug', 'url', 'views'],
                    };
                    const Fuse = (await import('fuse.js')).default
                    const fuse = new Fuse(clicks, options)

                    let temp = [];
                    let results = fuse.search(value)
                    results.map(function(value, index) {
                        temp.push({ 
                            slug: value.item.slug, 
                            index: value.refIndex,
                            score: value.score,
                        }); 
                    });
                    setResults(temp); 
                }}
            />
            {/* <MyPopover /> */}
           

            {results && results?.length ?
                <ResultsPopover results={results} timestamp={new Date().getTime().toString()} />
                : null
            }
        </>
    )
}

export default SearchBar