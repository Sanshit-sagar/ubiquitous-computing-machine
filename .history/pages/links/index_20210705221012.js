import React, { useState, useContext } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import { useSession } from 'next-auth/client'
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
        links: data ? data : [],
        loading: !data && !error,
        error
    };
}

const LinksList = () => {
    const email = 'sasagar@ucsd.edu'
    const { links, loading, error } = useUserLibrary(email)

    if(loading) return <Loader />
    if(error) return <p> error: {`${error.message}`} </p>

    return (
        <p> {JSON.stringify(links)} </p> 
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
                    <LinksList />
                </div>
            }
        />
    );
}

export default LinksPage