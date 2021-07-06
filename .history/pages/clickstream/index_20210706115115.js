import React, { useState, useEffect, useMemo } from 'react'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'
import axios from 'axios'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import StackedLayout from '../../sections/StackedLayout'
import Loader from '../../components/Loader'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell
  } from '@windmill/react-ui'

import { 
    DeviceMobileIcon, 
    LinkIcon, 
    LocationMarkerIcon, 
    KeyIcon, 
    FingerPrintIcon, 
    TrendingUpIcon,
    ClockIcon,
    GlobeIcon
} from '@heroicons/react/outline'

import { EyeIcon } from '@heroicons/react/solid'

export const fetcher = url => axios.get(url).then(res => res.data);

function sanitize(text) {
    if(!text) return '';
    return (text.length > 18) ? `${text.substring(0, 18)}...` : text || '';
}

function useUserClickstreams(email)  {
    const time = 30;
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}

export const useViewsBySlug = (slug) => {
    const [session] = useSession()
    var email = session && session.user ? session.user.email : ''
    
    const { data, error } = useSWR(session && session.user && slug ? `/api/stream/slugs/${slug}?email=${email}` : null, fetcher)

    return {
        views: data ? data.views : undefined,
        viewsLoading: !data && !error,
        viewsError: error
    }
}

const useUserAgentParser = (useragent, slug) => {
    const { data, error } = useSWR(userAgent && userAgent.length ? `/api/user-agent/${slug}?useragent=${useragent}` : null, fetcher);

    return {
        ua: data ? data.ua : null,
        ualoading: !data && !error,
        uaerror: error 
    };
}

const CellSkeleton = () => {

    return (
        <div class="animate-pulse flex space-x-4 w-32">
            <div class="rounded-full bg-blue-400 h-5/6 w-16"></div>
            <div class="flex-1 space-y-4 py-1">
                <div class="h-4 bg-blue-400 rounded w-32"></div>
                <span class="space-y-1">
                    <div class="h-2 bg-blue-400 rounded"></div>
                </span> 
            </div>
        </div>
    )
}

const TableSkeleton = ({ pageSize, rowSize, loading }) => {
    if(!loading || !pageSize || !rowSize) return null

    const cols = new Array(pageSize).fill(null);
    const rows = new Array(rowSize).fill(null);

    return (
        <TableBody className="min-w-full min-h-full">
            {rows.map((row, i) => {
                return (
                    <TableRow index={i} className="min-w-full min-h-full">
                        {cols.map(function (cell, j) {
                            return (
                                <TableCell index={j}>
                                    <CellSkeleton /> 
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    );
}

const ViewsDisplay = (slug) => {
    const [showLoader,setShowLoader] = React.useState(true)
    let delay = 1.25;

    useEffect(() => {
        let fakeTimer = setTimeout(() => setShowLoader(false), delay * 1000);
        return () => { 
            clearTimeout(fakeTimer); 
        }
    }, []);

    const { views, viewsLoading, viewsError } = useViewsBySlug(slug.slug)

    if(viewsError) return <p> --/-- </p>

    return (
        <TableCell className="flex-col justify-between align-stretch">
            <div className="flex-col justify-between align-stretch">
                <div className="text-sm">  
                    {showLoader || viewsLoading ? <Loader /> : views ? `${views.total} total` : <p> !! </p>}
                </div>
                <div className="text-xs">
                    {showLoader || viewsLoading ? <Loader /> : views ? `${views.unique} unique` : <p> !! </p>} 
                </div> 
            </div>
            <div className="inline-flex justify-end align-center">
                <TrendingUpIcon className="h-5 w-5 text-green-500" />
            </div>
        </TableCell>
    )
}

const StyledCellSlottedContents = ({ slot1, slot2, loading }) => {

    return (
        <TableCell className="flex-col justify-between align-stretch">
            <div className="text-sm text-green-200">  
                {loading ? <Loader /> : `${slot1}`}
            </div>
            <div className="text-xs">
                {loading ? <Loader /> : `${slot2}`}
            </div>
        </TableCell>
    )
}

const ClickStreamEntry = ({ click, index, loading  }) => {
    const [keyVisible, setKeyVisible] = React.useState(false)

    const toggleKeyVisibility = () => {
        setKeyVisible(!keyVisible)
    }

    const key = click.key || click.hash || click.crypto || 'N/A'
    const slug = click.slug
    const owner = click.owner  || click.userId || 'N/A'
    const destination = click.destination 
    const geodata = click.geodata || click.geo|| 'N/A'
    const visitor = click.visitor || click.userInfo || 'N/A'
    const misc = click.misc

    const timestamp = click.timestamp || click.finalTimestamp || 'N/A'
    const formattedTimestamp = timestamp != 'N/A' ? useDateTimeConverter(timestamp) : 'N/A'

    let useragent = loading || !visitor || !visitor.length ? '' : visitor.system
    const { ua, ualoading, uaerror } = useUserAgentParser(useragent, slug)

    return (
        <TableRow key={index} className="font-extralight">
            <TableCell>
                <>
                    {    loading ? <Loader /> : 
                        <button className="text-sm" onClick={toggleKeyVisibility}> 
                            {keyVisible ? sanitize(key) : <KeyIcon className="h-4 w-4 text-yellow-500" />}
                        </button>
                    }
                </>
            </TableCell>
            
            <StyledCellSlottedContents slot1={slug} slot2={sanitize(destination)} loading={loading}/>

            <StyledCellSlottedContents  
                slot1={formattedTimestamp.primaryText} 
                slot2={formattedTimestamp.secondaryText} 
                loading={loading} 
            />

            <ViewsDisplay slug={slug} /> 

            <TableCell className="flex-col justify-between align-stretch">
                <span className="text-sm flex flex-wrap m-width-15">  
                    {`${geodata.city}, ${geodata.region} ${geodata.country} (${geodata.postalCode})`} 
                </span>
                <span className="text-sm"> 
                    {loading ? <Loader /> : `${geodata.latitude},${geodata.longitude}` } 
                </span>                
            </TableCell>

            <TableCell className="flex-col justify-between align-stretch">
                <div className="text-sm"> 
                    {loading ? <Loader /> : `${visitor.ip}`}
                </div> 
                <div className="text-xs"> 
                    {loading ? <Loader /> : `${sanitize(visitor.realIp)}`}
                </div> 
            </TableCell> 

            <TableCell className="flex-col justify-between align-stretch">
                <div className="text-sm"> 
                    {   
                          loading || ualoading ? <Loader /> 
                        : uaerror ? <p>  Error!! </p> 
                        : `${JSON.stringify(ua)}`
                    }
                </div>
            </TableCell>
        </TableRow>
    )
}


const ClickstreamTable = ({ email }) => {
    const [pageSize, setPageSize] = useState(8)
    const [cursor, setCursor] =useState(0)
    
    const columns = useMemo(() => [
        { Header: 'Crypto ID', icon: <FingerPrintIcon className="h-4 w-4" /> },
        { Header: 'Links', icon: <LinkIcon className="h-4 w-4" /> },
        { Header: 'Timestamp', icon: <ClockIcon className="h-4 w-4" />},
        { Header: 'Views', icon: <EyeIcon className="h-4 w-4" /> },
        { Header: 'Geodata', icon: <GlobeIcon className="h-4 w-4" /> },
        { Header: 'IP Address', icon: <LocationMarkerIcon  className="h-4 w-4" />},
        { Header: 'User-Agent', icon: <DeviceMobileIcon  className="h-4 w-4" />},
        { Header: 'Actions', icon: <LinkIcon className="h-4 w-4" /> },
    ], []);

    const { clickstream, loading, error } = useUserClickstreams(email)

    if(error) return <p> Clickstream Error! </p> 
   
    return (
        <div className="container mx-auto p-4 m-3 rounded-md shadow-md dark:bg-gray-700 dark:text-white font-extralight">
            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map(function(value, i) {
                                return (
                                    <TableCell key={i}>
                                        <span className="text-xs inline-flex justify-start align-stretch font-extralight"> 
                                            <span className="ml-1">
                                                {loading ? <Loader /> : value.icon}
                                            </span>
                                            <span className="ml-1"> 
                                                {loading  ? <Loader /> : `${value.Header}`} 
                                            </span>
                                        </span>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHeader>

                    <TableBody>  
                        <> { loading  ?
                                <TableSkeleton 
                                    pageSize={pageSize} 
                                    rowSize={clickstream && clickstream.length ? clickstream[0].length : Object.entries(columns).length} 
                                    loading={loading} 
                                /> 
                            : clickstream ?
                            <>
                                {clickstream.map(function(rowCells, index) {
                                    if(!rowCells.visitor || !rowCells.destination || !rowCells.owner) return null;
                                    
                                    return (
                                        <ClickStreamEntry 
                                            click={clickstream[index]} 
                                            index={index} 
                                            loading={loading} 
                                        />
                                    );
                                })} 
                            </> : undefined }
                        </>
                    </TableBody>    
                </Table>
            </TableContainer>  
        </div>
    )
}

export default function Clickstream() {
    const [session] = useSession()
    const email  = session.user.email 

    const dashboardMetadata = {
        'title': 'Dashboard',
        'description': 'Realtime stats such as: Number of views, unique visitors, most viewed pages and live clickstreams',
    }; 

    return (
        <>  
            <StackedLayout 
                pageMeta={dashboardMetadata} 
                children={
                    <ClickstreamTable email={email} />
                }    
            />
        </>
    )
}

Clickstream.auth = true; 
