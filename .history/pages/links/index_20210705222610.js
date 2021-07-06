import React, { useState, useContext } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import axios from 'axios'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
// import { useSession } from 'next-auth/client'
import { GlobalStore } from '../../store'

import Loader from '../../components/Loader'
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
    Badge
  } from '@windmill/react-ui'

const fetcher = url => axios.get(url).then(res => res.data);


const useUserLibrary = (email) => {
    const { data, error } = useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    });

    return {
        links: data ? Object.values(data.links) : [],
        loading: !data && !error,
        error
    };
}

const LinkEntry = ({ cellsInRow }) => {
    const fields = JSON.parse(cellsInRow[1]);
    
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
                {       !data && !error ? <Loader />  
                    :   error ? <p> {`error: ${error.message}`} </p> 
                    :  <Badge type="success"> 
                            {data.views + ' views'} 
                        </Badge> 
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

const LinksTable = ({ links, loading }) => {
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

    let linksOnPage = links.slice(cursor, cursor + pageSize)

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
                    {linksOnPage.map(function(value, idx) {
                        return (
                            <div key={idx} index={idx}>
                                <LinkEntry cellsInRow={value} />
                            </div>
                        );
                    })}
                </TableBody>
            </Table>

            <TableFooter>
                <Pagination 
                    totalResults={links.length}
                    resultsPerPage={pageSize} 
                    onChange={handlePagination} 
                    label="Table navigation" 
                />
            </TableFooter>
        </TableContainer>
    );
}


const LinksTableWrapper = () => {
    const email = 'sasagar@ucsd.edu'
    const { links, loading, error } = useUserLibrary(email)

    if(loading) return <Loader />
    if(error) return <p> error: {`${error.message}`} </p>

    return (
    //    <LinksTable links={links} loading={loading} />
       <li>
           {links.map(function(value, index) {
               return (
                   <ul key={index}>
                       <p> {JSON.parse(value)} </p> 
                   </ul>
               );
           })}
       </li>
    )
}

const LinksPage = () => {
    
    return (
       
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
                <div className="mt-4">
                    <SlugDetailsModal />
                    <LinksTableWrapper />
                </div>
            }
        />
    );
}

export default LinksPage