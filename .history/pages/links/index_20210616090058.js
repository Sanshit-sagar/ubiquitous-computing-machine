import React, { useEffect, useMemo, useState, useRef } from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useSession } from 'next-auth/client'
import { Layout } from '@/sections/index';
import { PencilIcon, EyeIcon, TrashIcon, ChevronIcon } from '@heroicons/react/solid'
import CustomButton  from '../../buildingBlocks/Button'

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

const LinkEntry = ({ link, index }) => {
    const slug = link[0]
    const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)


    const fields = {
        index,
        slug: JSON.parse(link[1]).slug,
        destination: JSON.parse(link[1]).url.substring(0, 25) + "...",
        timestamp: JSON.parse(link[1]).timestamp,
        expiry: JSON.parse(link[1]).ttl ? JSON.parse(link[1]).ttl : 'N/A',
    }

    return (
        <>
            <>
                {Object.entries(fields).map(function(value, index) {
                    return (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                    {value[1]}
                                </div>
                            </div>
                        </td>
                    )
                })}
            </>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {
                            !data && !error ? 'loading...' 
                        :   error           ? 'error!' 
                        :   data.views      + ' views'
                    }
                </span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <CustomButton color="dark" isLoading={!data && !error} children={data.views} />
                </span>
            </td>
        </>
    )
}

const TabulatedLinks = ({ links }) => {
    const [session, loading] = useSession()

    const columns = React.useMemo(() => [
          { Header: 'ID', Footer: '' },
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
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        
                    <table className="table-auto min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map(function(value, index) {
                                    return (
                                        <th 
                                            key={index} 
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                                    <tr key={index}>
                                        {session && !loading && JSON.parse(value[1]).user===session.user.email ?
                                            <LinkEntry link={value} index={index} /> : null 
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
    );
}

const Links = () => {
    const { links, loading, error } = useListOfSlugs()
    const [session, userLoading] = useSession()

    const uid = session && !userLoading ? session.user.email : ''

    return (
        <Layout>
            {/* <section className="text-center pt-12 sm:pt-24 pb-16">
                <h2 className="text-4xl sm:text-7xl font-bold capitalize">
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