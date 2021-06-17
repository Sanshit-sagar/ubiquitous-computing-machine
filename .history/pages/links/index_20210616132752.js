import React, { useEffect, useMemo, useState, useRef } from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useSession } from 'next-auth/client'
import { Layout } from '@/sections/index';

import CustomButton  from '../../buildingBlocks/Button'
import CustomSpinner from '../../buildingBlocks/Spinner'

const useListOfSlugs = () => { 
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : ''
    const { data, error } = useSWR(email.length ? `/api/slugs/list` : null, fetcher);

    return {
        links: data ? data.slugs : null,
        loading: !data && !error,
        error
    };
}

const useUserCollectionSize = (uid) => {
    const {data, error} = useSWR(uid.length ? `/api/slugs/user-links/${uid}` : null, fetcher)

    return {
        numLinks: data ? data.userLinks : null,
        loading: !data && !error,
        error   
    };
}

const useUserClickStreamSize = (uid) => {
    const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

    return {
        numViews: data ? data.userViews : null,
        loading: !data && !error,
        error
    }
}

const UserStatistics = ({ uid }) => {
    // const numLinks = links ? Object.entries(links).length : 0
    const {numViews, nvLoading, nvError} = useUserClickStreamSize(uid)
    const {numLinks, nlLoading, nlError} = useUserCollectionSize(uid) 
    

    const stats = [
        { name: 'Num Links', stat: numLinks ? numLinks : nvLoading ? '...' : 'error'},
        { name: 'Num Views', stat: numViews ? numViews : nlLoading ? '...' : 'error'},
      ]

    return (
        <div>
            <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="px-2 py-2 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-md font-semibold text-gray-900">
                            {item.stat}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

const SelectAllRowsCheckbox = ({ select, toggleSelect }) => {
    return (
        <label class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
            <input 
                type="checkbox" 
                class="form-checkbox focus:outline-none focus:shadow-outline"
                value={select}
                onClick={toggleSelect}
            />
        </label>
    )
}

const LinkEntry = ({ link }) => {
    const slug = link[0]
    
    const [selectRow, setSelectRow] = useState(false)
    
    const toggleSelected = () => {
        setSelectRow(!selectRow)
    }
    
    const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)


    const fields = {
        slug: JSON.parse(link[1]).slug,
        destination: JSON.parse(link[1]).url.substring(0, 25) + "...",
        timestamp: JSON.parse(link[1]).timestamp,
        expiry: JSON.parse(link[1]).ttl ? JSON.parse(link[1]).ttl : 'N/A',
    }

    return (
        <>
             <td className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="form-checkbox focus:outline-none focus:shadow-outline"
                        value={selectRow}
                        onClick={toggleSelected}
                    />
                </label>
            </td>

            <>
                {Object.entries(fields).map(function(val, ind) {
                    return (
                        <td 
                            key={ind} 
                            className="border-dashed border-t border-gray-200"
                        >
                            <div className="flex items-center">
                                <span className="text-gray-700 px-6 py-3 flex items-center">
                                    {val[1]}
                                </span>
                            </div>
                        </td>
                    )
                })}
            </>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    { !data && !error ? <CustomSpinner />  :   error ? 'error!' : data.views + ' views' }
                </span>
            </td>
        </>
    )
}

const TableOptions = () => {

    return (

		<div class="mb-4 flex justify-between items-center">
        <div class="flex-1 pr-4">
            <div class="relative md:w-1/3">
                <input type="search"
                    class="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                    placeholder="Search..." />
                <div class="absolute top-0 left-0 inline-flex items-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                </div>
            </div>
        </div>
        <div>
            <div className="shadow rounded-lg flex">
                <div className="relative">
                    <button className="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:hidden" viewBox="0 0 24 24"
                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                            <path
                                d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5" />
                        </svg>
                        <span className="hidden md:block">Display</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" width="24" height="24"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    <div x-show="open" @click.away="open = false"
                        className="z-40 absolute top-0 right-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden">
                        <template x-for="heading in headings">
                            <label
                                className="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2">
                                <div className="text-teal-600 mr-3">
                                    <input type="checkbox" className="form-checkbox focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="select-none text-gray-700" x-text="heading.value"></div>
                            </label>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

const TabulatedLinks = ({ links }) => {
    const [session, loading] = useSession()

    const [selectAll, setSelectAll] = React.useState(false)

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
    }

    const title = 'Saved Links'

    const columns = React.useMemo(() => [
          { Header: 'Slug', Footer: '' },
          { Header: 'Destination', Footer: '' },
          { Header: 'Created At', Footer: '' },
          { Header: 'Expiry (TTL)', Footer: '' },
          { Header: 'Views', Footer: '' },
          { Header: '', Footer: '' },
        ], []);


    return (
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-scroll border-b border-gray-200 sm:rounded-lg">
                    
                    <div className="container mx-auto py-6 px-4">
                        <h1 className="text-3xl py-2 border-b mb-4">
                            {title}
                        </h1>

                        <TableOptions />

                    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                            <thead className="bg-gray-50">
                                
                                
                                <tr className="text-left">
                                    <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                                        
                                        <SelectAllRowsCheckbox 
                                            select={selectAll} 
                                            toggleSelect={toggleSelectAll} 
                                        />
                                    </th>
                                    {columns.map(function(value, index) {
                                        return (
                                            <th 
                                                key={index} 
                                                scope="col"
                                                class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
                                            >
                                                {value.Header}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(links).map(function(value, index) {
                                    return (
                                        <tr key={index} className="text-left">
                                            {session && !loading && JSON.parse(value[1]).user===session.user.email ?
                                                <LinkEntry link={value} /> : null
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </div>
    );
}

const Links = () => {
    const { links, loading, error } = useListOfSlugs()
    const [session, userLoading] = useSession()

    const uid = session && !userLoading ? session.user.email : ''

    return (
        <Layout>
            {/* <section className="text-left my-5 sm:py-1">
                <h2 className="text-3xl font-bold capitalize">
                    My Links
                </h2>
            </section> */}

            { 
                    loading ? <p> loading... </p> 
                :   error   ? <p> error...   </p>
                :   <TabulatedLinks links={links} />
            }

            <UserStatistics uid={uid} />

        </Layout>
    );
};


export default Links;