import React, { useContext } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

import { useSession, getSession } from 'next-auth/client'
import {fetcher} from '../../lib/utils'
import { GlobalStore } from '../../store'
import CustomSpinner from '../../buildingBlocks/Spinner'
import toast from 'react-hot-toast'
import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'

import StackedLayout from '@/sections/StackedLayout'
import {useRouter} from 'next/router'
import SlugDetailsModal from './modal'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter, Button
  } from '@windmill/react-ui'
  import { Badge } from '@windmill/react-ui'

const useListOfSlugs = (email) => { 
    
    // const { data, error } = useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null, fetcher);
    const { data, error } = useSWR(`/api/slugs/views/${slug}`, fetcher)

    return {
        links: data ? data.links : null,
        loading: !data && !error,
        error
    };
}

function getStatus(ts, exp) {
    if(ts <= exp) {
        return 'active'
    } else {
        return 'expired'
    }
}

// const LinkEntry = ({ link, user }) => {
//     const state = useContext(GlobalStore.State)
//     const dispatch = useContext(GlobalStore.Dispatch)

//     const router = useRouter()


//     const slug = link[0]
//     const timestamp = JSON.parse(link[1]).timestamp
//     const expiry = JSON.parse(link[1]).ttl || ''
    
//     const handleToggleRowSelection = (slug) => {
//         dispatch({
//             type: 'toggle_map_value',
//             payload: {
//                 key: `${slug}`
//             }
//         });
//     }

//     const isValidDate = (new Date(timestamp)).getTime() > 0
    
//     const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)
//     const localizedDatetime =  isValidDate ? timestamp && useDateTimeConverter(timestamp) : 'N/A'
//     const localizedExpiry = isValidDate && expiry.length ? useDateTimeConverter(expiry) : 'N/A'

//     const fields = {
//         slug: JSON.parse(link[1]).slug,
//         destination: `${JSON.parse(link[1]).url.substring(0, 30)}...`,
//         timestamp: `${localizedDatetime.primaryText} [${localizedDatetime.secondaryText}]`,
//         expiry: `${localizedExpiry.primaryText} [${localizedExpiry.secondaryText}]`,
//     }
//     const currentSlugStatus = getStatus(fields.slug, fields.expiry)

//     return (
//         <>
             

//             {Object.entries(fields).map(function(val, ind) {
//                 return (
//                     <td 
//                         key={ind} 
//                         className="border-dashed border-t border-gray-200"
//                     >
//                         <div className="flex items-center">
//                             <span className="text-indigo-700 font-light text-xs px-2 py-2 flex items-center">
//                                 {val[1]}
//                             </span>
//                         </div>
//                     </td>
//                 )
//             })}

//             {/*
//             */}
//         </>
//         // {Object.entries(fields).map((value, index) => {
//         //     return (
//         //         <TableCell>
//         //             <span className="font-semibold ml-2 text-sm">
//         //                 {value}
//         //             </span>
//         //         </TableCell>
//         //     );
//         // })}
//     )
// }

const LinkRow = ({ link, user }) => {
    const fields = JSON.parse(link[1]);
    
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const slug = fields.slug || ''
    const destination = fields.url ? fields.url.substring(0, 30) : ''
    const timestamp = fields.timestamp || ''
    const ttl = fields.ttl || ''

    let timestampObj = {}
    let ttlObj = {}

    if(timestamp) {
        timestampObj = useDateTimeConverter(timestamp)
    }
    if(ttl) {
        ttlObj = useDateTimeConverter(ttl)
    }

    const handleEdit = () => {
        dispatch({
            type: 'toggle_slug_modal',
            payload: {
                slug
            }
        });
    }

    const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)
  

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center text-sm">
                    <span className="ml-2"> {slug} </span>
                </div>
            </TableCell>
            <TableCell>
                <Link href={destination}>
                    <div className="flex items-center text-sm">
                        <span className="text-blue-700 ml-2"> {destination} </span>
                    </div>
                </Link>
            </TableCell>
            <TableCell>
                <div className="flex items-center text-sm">
                    <span className="ml-2"> {timestampObj.primaryText} </span>
                    <span className="ml-2"> {timestampObj.secondaryText} </span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center text-sm">
                    <span className="ml-2"> {ttlObj.primaryText} </span>
                    <span className="ml-2"> {ttlObj.secondaryText} </span>
                </div>
            </TableCell>
            <TableCell>
                <span className="inline-flex text-sm rounded-md text-green-800">
                    { 
                            !data && !error ? <CustomSpinner />  
                        :   error ? 'error!' 
                        :   <Badge type="success"> {data.views + ' views'} </Badge> 
                    }
                </span>
            </TableCell>
            <TableCell>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <button 
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" 
                            onClick={handleEdit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>

                        <button class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button 
                            class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </td> 
            </TableCell>
        </TableRow>
    );
}



const TabulatedLinks = ({ uid, email, user }) => {
    const [cursor, setCursor] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(7)
    const [sanitizedLinks, setSanitizedLinks] = React.useState([])
    // const [linksOnPage, setLinksOnPage] = React.useState([])

    // if(!uid) return <p> Login to save and edit a collection </p> // show unauthenticated route

    const {links, loading, error} = useListOfSlugs(email)
    // const [selectAll, setSelectAll] = React.useState(false)

    const columns = React.useMemo(() => [
        // { Header: '', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'Destination', Footer: '' },
        { Header: 'Created At', Footer: '' },
        { Header: 'Expiry (TTL)', Footer: '' },
        { Header: 'Views', Footer: '' },
        // { Header: 'Status', Footer: '' },
        { Header: 'Actions', Footer: '' },
    ], []);

    const handlePaginationChange = () => {
        console.log('paginating...'); 
        setCursor(cursor + pageSize);
    }

    if(loading) return <p> your links are loading... </p> //add skeleton
    if(error) return <h2> {error.message} </h2>

    // let linkEntries = Object.entries(links)
    let sortedLinks = linkEntries.sort((a, b) => JSON.parse(b[1]).timestamp - JSON.parse(a[1]).timestamp).reverse();
    let linksOnPage = sortedLinks.slice(cursor, cursor + pageSize)

    return (
        // <p> {JSON.stringify(sortedLinks)} </p>
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow className="text-left">
                        {columns.map(function(value, index) {
                            return (
                                <TableCell key={index}>
                                    {value.Header}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHeader>

                <TableBody className="bg-white divide-y divide-gray-200">
                    {linksOnPage.map(function(value, index) {
                        return (
                            <LinkRow key={index} index={index} link={value} user={user} /> 
                        );
                    })}
                </TableBody>
            </Table>

            <TableFooter>
                <Pagination 
                    totalResults={Object.entries(links).length}
                    resultsPerPage={8} 
                    onChange={handlePaginationChange} 
                    label="Table navigation" 
                />
            </TableFooter>
        </TableContainer>
    );
}

export default function Links({ user }) {
    const uid = user ? user.email : null 
    const email = user ? user.email : ''

    // const state = useContext(GlobalStore.State)
    // const dispatch = useContext(GlobalStore.Dispatch)

    // const closeModal = () => {
    //     dispatch({
    //         type: 'toggle_slug_modal',
    //         payload: {
    //             slug: ''
    //         }
    //     });
    // }

    return (
       
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
                <div className="mt-4">
                    <SlugDetailsModal/>
                    <TabulatedLinks 
                        uid={uid} 
                        email={email} 
                        user={user} 
                    />
                </div>
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

