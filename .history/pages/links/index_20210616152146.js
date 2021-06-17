import React, { useContext } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'
import fetcher from '../../lib/utils'
import {GlobalStore} from '../../store'
import CustomSpinner from '../../buildingBlocks/Spinner'
import {useDateTimeConverter} from '../clicks/index'

import StackedLayout from '@/sections/StackedLayout'
import Breadcrumbs from '../../components/Breadcrumbs/index'
import StatisticsCards from '../../components/StatisticsCards/index'

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

function getStatus(ts, exp) {
    if(ts <= exp) {
        return 'active'
    } else {
        return 'expired'
    }
}

const LinkEntry = ({ link }) => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const slug = link[0]
    const timestamp = JSON.parse(link[1]).timestamp
    const expiry = JSON.parse(link[1]).ttl || ''
    
    const handleToggleRowSelection = (slug) => {
        dispatch({
            type: 'toggle_map_value',
            payload: {
                key: `${slug}`
            }
        });
    }
    
    const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)
    const localizedDatetime = useDateTimeConverter(timestamp)
    const localizedExpiry = expiry.length ? useDateTimeConverter(expiry) : 'N/A'

    const fields = {
        slug: JSON.parse(link[1]).slug,
        destination: `${JSON.parse(link[1]).url.substring(0, 30)}...`,
        timestamp: `${localizedDatetime.primaryText} [${localizedDatetime.secondaryText}]`,
        expiry: `${localizedExpiry.primaryText} [${localizedExpiry.secondaryText}]`,
    }
    const currentSlugStatus = getStatus(fields.slug, fields.expiry)

    return (
        <>
             <td className="py-2 px-3 sticky top-0 border-b">
                <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="form-checkbox focus:outline-none focus:shadow-outline"
                        value={state.selectedRows[`${slug}`]}
                        onClick={handleToggleRowSelection}
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
                <td>
                    <span className={`px-2 py-3 inline-flex text-md leading-5 font-semibold rounded-md ${currentSlugStatus==='active' ?  'bg-green-100 text-green-800' : 'bg-red-400 text-gray-200'}`}>
                        {currentSlugStatus}
                    </span>
                </td>
            </>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-3 inline-flex text-md leading-5 font-semibold rounded-md bg-green-100 text-green-800">
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
                    <input 
                        type="search"
                        class="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                        placeholder="Search..." 
                    />

                    <div className="absolute top-0 left-0 inline-flex items-center p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* <div>
                <div className="shadow rounded-lg flex">
                    <div className="relative">
                        <button className="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4">
                            <span className="hidden md:block">Display</span>
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

const TabulatedLinks = ({ uid }) => {
    const [session, isLoading] = useSession()
    const { links, loading, error } = useListOfSlugs()

    const [selectAll, setSelectAll] = React.useState(false)

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
    }

    const columns = React.useMemo(() => [
          { Header: 'Slug', Footer: '' },
          { Header: 'Destination', Footer: '' },
          { Header: 'Created At', Footer: '' },
          { Header: 'Expiry (TTL)', Footer: '' },
          { Header: 'Views', Footer: '' },
          { Header: '', Footer: '' },
        ], []);


    return (
        <div class="container w-full mx-auto py-6 px-4">
            <div className="w-full inline-flex justify-between items-center">
                <div className="inline-flex justify-start items-start">
                    <h1 className="text-3xl py-2 border-b mb-4">
                        {`${uid}'s saved links`}
                    </h1>
                    <Breadcrumbs />
                </div>
                <StatisticsCards /> 
            </div>
       
        <>
        { links && !loading && !error ? 
            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-scroll relative">
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
                                    {session && !loading && value && JSON.parse(value[1]).user===session.user.email ?
                                        <LinkEntry link={value} /> : null
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        : loading ? <p> loading... </p> : <p> error... </p> }
        </>
    </div>
    );
}

const Links = () => {
    const [session, userLoading] = useSession()
    const uid = session && !userLoading ? session.user.email : ''

    return (
        <StackedLayout>
            <TabulatedLinks uid={uid} /> 
        </StackedLayout>
    );
};


export default Links;