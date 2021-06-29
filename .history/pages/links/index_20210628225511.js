import React, { useState, useContext } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import { useSession, getSession } from 'next-auth/client'
import { GlobalStore } from '../../store'

import CustomSpinner from '../../buildingBlocks/Spinner'
import StackedLayout from '@/sections/StackedLayout'
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

const fetcher = url => axios.get(url).then(res => res.data);

// const useListOfSlugs = (email) => { 
    
//     // const { data, error } = useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null, fetcher);
//     const { data, error } = useSWR(`/api/slugs/views/${slug}`, fetcher)

//     return {
//         links: data ? data.links : null,
//         loading: !data && !error,
//         error
//     };
// }

// function getStatus(ts, exp) {
//     if(ts <= exp) {
//         return 'active'
//     } else {
//         return 'expired'
//     }
// }

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
const actionBtnClassName = `w-4 mr-2 transform hover:text-purple-500 hover:scale-110`;

const LinkRow = ({ link, user }) => {
    const fields = JSON.parse(link[1]);
    
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
  
    const SlugViewsCell = () => {

        return (
            <span className="inline-flex text-sm rounded-md text-green-800">
                {       !data && !error ? <CustomSpinner />  
                    :   error ? 'error!' 
                    :   <Badge type="success"> {data.views + ' views'} </Badge> 
                }
            </span>
        )
    }

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center text-sm">
                    <span className="ml-2"> {slug} </span>
                </div>
            </TableCell>
            <TableCell>
                <Link href={destination}>
                    <div className="inline-flex justify-start items-stretch text-sm">
                        <span className="text-blue-700 ml-2"> {destination} </span>
                        {/* add external link icon here */}
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
            {/* TODO: display status here  */}
            <TableCell>
                <SlugViewsCell />
            </TableCell>
            <TableCell>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <button 
                            className={`${actionBtnClassName}`}
                            onClick={handleEdit}
                        >
                            <PencilIconSvg /> 
                        </button>

                        <button 
                            className={`${actionBtnClassName}`}
                            onClick={handleEdit}
                        >
                            <TrashIconSvg /> 
                        </button>
                    </div>
                </td> 
            </TableCell>
        </TableRow>
    );
}

const useUserLibrary = () => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : '';

    const { data, error } = useSWR(session && !loading ? `/api/links/${email}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    });

    return {
        links: data ? data.links : null,
        linksLoading: !data && !error,
        linksError: error
    };
}



const TabulatedLinks = ({ user, sortedLinks, numLinks }) => {
    const [cursor, setCursor] = useState(0)
    const [pageSize, setPageSize] = useState(7)

    const handlePagination = () => {
        setCursor(cursor + pageSize);
    }

    const columns = React.useMemo(() => [
        { Header: 'Slug', Footer: '' },
        { Header: 'Destination', Footer: '' },
        { Header: 'Created At', Footer: '' },
        { Header: 'Expiry (TTL)', Footer: '' },
        { Header: 'Views', Footer: '' },
        { Header: 'Actions', Footer: '' },
    ], []);

    let linksOnPage = sortedLinks.slice(cursor, cursor + pageSize)

    return (
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
                            <LinkRow 
                                key={index} 
                                index={index} 
                                link={value} 
                                user={user} 
                            /> 
                        );
                    })}
                </TableBody>
            </Table>

            <TableFooter>
                <Pagination 
                    totalResults={numLinks}
                    resultsPerPage={pageSize} 
                    onChange={handlePagination} 
                    label="Table navigation" 
                />
            </TableFooter>
        </TableContainer>
    );
}

export default function Links({ user }) {
  
    const [reval, setReval] = useState(0)
    const [numLinks, setNumLinks] = useState(0)
    const [sortedLinks, setSortedLinks] = useState([])

    let email = user && user.session ? user.session.email : ''
    const {links, linksLoading, linksError} = useUserLibrary(email);

    React.useEffect(() => {
        if(links && links.length && !linksLoading && !linksError) {
            setMounted(true); 
            setReval(reval + 1)

            let tempLinks = []; 
            links.forEach((link, index) => {
                tempLinks.push(link);
                ++numLinks;
            });
            setSortedLinks(tempLinks.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)));
            setNumLinks(tempLinks.length)
        }
    }, [links, linksLoading, linksError, sortedLinks, numLinks, reval]);

    if(linksLoading) return <p> your links are loading... </p>  // display table skeleton
    if(linksError) return <h2> {error.message} </h2> //create element : TODO

    return (
       
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
                <div className="mt-4">
                    <SlugDetailsModal/>
                    <TabulatedLinks user={user} sortedLinks={sortedLinks} numLinks={numLinks} />
                </div>
            }
        />
    );
}

// export async function getServerSideProps(ctx) {
//     const session = await getSession(ctx)

//     if (!session) {
//       ctx.res.writeHead(302, { Location: '/' })
//       ctx.res.end()
//       return {}
//     }
  
//     return {
//       props: {
//         user: session.user,
//       },
//     }
//   }


