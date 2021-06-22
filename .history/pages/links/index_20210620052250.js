import React, { useContext } from 'react'
import useSWR from 'swr'


// import { useSession } from 'next-auth/client'
import { getSession } from 'next-auth/client'
import {fetcher} from '../../lib/utils'
import { GlobalStore } from '../../store'
import CustomSpinner from '../../buildingBlocks/Spinner'
import { useDateTimeConverter } from '../clicks/index'
import toast from 'react-hot-toast'

import StackedLayout from '@/sections/StackedLayout'
import router from 'next/router'

const useListOfSlugs = (uid) => { 
    // const [session, loading] = useSession()
    // const email = session && !loading ? session.user.email : ''
    const { data, error } = useSWR(uid && uid.length ? `/api/slugs/list` : null, fetcher);

    return {
        links: data ? data.slugs : null,
        loading: !data && !error,
        error,
        uid
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

const LinkEntry = ({ link, user }) => {
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

    const handleLinkEntryAction = () => {
        dispatch({
            type: 'navigate',
            payload: {
                route: `/links/${slug}`
            }
        });
        router.push({
            pathname: '/links/[slug]',
            query: '1234'
        })
        toast.success(`Opening links/${slug}`)
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

            {Object.entries(fields).map(function(val, ind) {
                return (
                    <td 
                        key={ind} 
                        className="border-dashed border-t border-gray-200"
                    >
                        <div className="flex items-center">
                            <span className="text-indigo-700 font-light text-xs px-2 py-2 flex items-center">
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

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-3 inline-flex text-md leading-5 font-semibold rounded-md bg-green-100 text-green-800">
                    { !data && !error ? <CustomSpinner />  :   error ? 'error!' : data.views + ' views' }
                </span>
            </td>

            <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                    <button 
                        class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        onClick={handleLinkEntryAction}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button 
                        class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        // onClick={handleEdit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button 
                        class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        // onClick={handleDelete}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        </>
    )
}

const TabulatedLinks = ({ uid, user }) => {
    
    if(!uid) return <p> Login to save and edit a collection </p> // show unauthenticated route

    const {links, loading, error} = useListOfSlugs(uid)
    const [selectAll, setSelectAll] = React.useState(false)

    // const toggleSelectAll = () => {
    //     setSelectAll(!selectAll)
    // }

    const columns = React.useMemo(() => [
        { Header: '', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'Destination', Footer: '' },
        { Header: 'Created At', Footer: '' },
        { Header: 'Expiry (TTL)', Footer: '' },
        { Header: 'Status', Footer: '' },
        { Header: 'Views', Footer: '' },
        { Header: 'Actions', Footer: '' },
    ], []);

    if(loading) return <p> your links are loading... </p> //add skeleton
    if(error) return <h2> error! </h2>
    
    // if(!links.length) {
    //     return (
    //         <p> Nothing to show you, add a new one 
    //             <a href='/new'> here </a>
    //         </p>
    //     );
    // }

    return (
        <div className="container">
            <table className="border-collapse table-auto whitespace-no-wrap table-striped relative">
                <thead>
                    <tr className="text-left">
                        {/* <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                            <SelectAllRowsCheckbox 
                                select={selectAll} 
                                toggleSelect={toggleSelectAll} 
                            />
                        </th> */}
                        {columns.map(function(value, index) {
                            return (
                                <th 
                                    key={index} 
                                    scope="col"
                                    class="bg-black text-white sticky top-0 border-b border-gray-200 px-6 py-2 font-bold tracking-wider text-xs"
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
                                {uid && value && JSON.parse(value[1]).user===uid ?
                                    <LinkEntry link={value} user={user} /> : null
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default function Links({ user }) {
    const uid = user ? user.email : null 

    return (
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
            <TabulatedLinks uid={uid} user={user} />
        } 
        />
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)

    if (!session) {
      ctx.res.writeHead(302, { Location: '/' })
      ctx.res.end()
      return {}
    }
  
    return {
      props: {
        user: session.user,
      },
    }
  }


