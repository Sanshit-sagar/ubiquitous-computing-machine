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
                        const cells = JSON.parse(value);
                        
                        return  (
                            <LinkEntry key={idx} index={idx} cellsInRow={cells} />
                        );  
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


const LinksTableWrapper = () => {
    const email = 'sasagar@ucsd.edu'
    const { links, loading, error } = useUserLibrary(email)

    if(loading) return <Loader />
    if(error) return <p> error: {`${error.message}`} </p>

    return (
       <LinksTable links={links} loading={loading} />
    //    <li>
    //        {links.map(function(value, index) {
    //            const val = JSON.parse(value);

    //            return (
    //                <ul key={index}>
    //                    <p> {val.slug} </p> 
    //                    <p> {val.ttl} </p> 
    //                </ul>
    //            );
    //        })}
    //    </li>
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