import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useSession } from 'next-auth/client'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import { NewSlugStore } from '../../store'
import { useViewsBySlug } from '../clickstream'
import Loader from '../../components/Loader'
import StackedLayout from '@/sections/StackedLayout'
import InfoModal, { DangerModal } from '../../buildingBlocks/Modal'

import { Button, IconTrash, IconEye, Badge } from '@supabase/ui'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    Pagination
  } from '@windmill/react-ui'

const fetcher = url => axios.get(url).then(res => res.data);

const sanitize = (text, len) => {
    return text && text.length ? text.substring(0, len) : ''
}

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

function getLocaleTimestring(timestamp) {
    return new Date(timestamp).toLocaleTimeString()
}

function getDateString(timestamp) {
    return new Date(timestamp).toDateString()
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
            <div className="text-sm">  
                {showLoader || viewsLoading ? <Loader /> : views ? `${views.total} total` : <p> !! </p>}
            </div>
            <div className="text-xs">
                {showLoader || viewsLoading ? <Loader /> : views ? `${views.unique} unique` : <p> !! </p>} 
            </div> 
        </TableCell>
    )
}
  
const LinkEntry = ({ index, cellsInRow, toggle, toggleInfoModal }) => {
    const cells = JSON.parse(cellsInRow)

    let creationTimestamp = parseInt(cells.timestamp)
    let expiryTimestamp = cells.config ? (parseInt(cells.config.ttl) || '') : ''
    let currentTimestamp = new Date().getTime()
    
    let lifespan = expiryTimestamp - creationTimestamp
    let lifeLeft = expiryTimestamp - currentTimestamp
    
    let validity = lifeLeft > 0 ? 'Active' : 'Expired'
    let lifeLivedPercent = (validity==='Active' && lifespan && lifespan!==0) ? ((lifeLeft/lifespan)*100) : 0

    const cellValues = [
        [cells.slug, 'sanitize(cells.url, 35)'], 
        [getLocaleTimestring(creationTimestamp), getDateString(creationTimestamp)],
        [getLocaleTimestring(expiryTimestamp), getDateString(expiryTimestamp)],
        [validity, `${lifeLivedPercent} of ${lifespan} remaining`],
        [cells.password || '', ],
        [cells.routingStatus || '301']
    ];

    const handleDelete = () => {
        toggle()
    }
    const handleOpen = () => {
        toggleInfoModal()
    }

    return (
        <TableRow>
            <> {cellValues.map(function(value, index) {
                return (
                    <TableCell key={index}>
                         <div className="flex justify-between items-center">
                            <div>
                                <div className="text-sm">
                                    {value[0]}
                                </div>
                                {value[1] && value[1]?.length ? 
                                    <div className="text-sm max-w-sm flex-auto flex-wrap">
                                        {value[1]}
                                    </div>
                                : null}
                            </div>
                            <>{value[2] ? 
                                <button  className="ml-6 flex-shrink-0">
                                    {value[2]}
                                </button> 
                                : null
                            }</>
                        </div>
                    </TableCell>
                )
            })} </>
            <TableCell>
                <ViewsDisplay slug={cells.slug} />
            </TableCell>
            <TableCell>
                <Button 
                    type="outline" 
                    size="small" 
                    icon={<IconTrash />} 
                    onClick={handleDelete}
                    className="mr-2" 
                />
                <Button 
                    type="primary" 
                    size="small" 
                    icon={<IconEye />} 
                    onClick={handleOpen} 
                />
            </TableCell> 
        </TableRow>
    );
}

const LinksTable = ({ links, visible, toggle, toggleInfoModal }) => {
    // const state = useContext(NewSlugStore.State)

    const [cursor, setCursor] = useState(0)
    const [pageSize, setPageSize] = useState(7)

    const handlePagination = () => {
        setCursor(cursor + pageSize)
    }

    const columns = React.useMemo(() => [
        { Header: 'URLs' },
        { Header: 'Created At' },
        { Header: 'Expiry (TTL)' },
        { Header: 'Validity' },
        { Header: 'Views' },
        { Header: 'Actions' },
    ], []);

    // let linksOnPage = links.slice(cursor, cursor + pageSize)

    return (
        <div className="container mx-auto p-2 m-2 rounded-md shadow-md">
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
                        {links.map(function(value, idx) {
                            return  (
                                <LinkEntry 
                                    index={idx} 
                                    cellsInRow={value} 
                                    toggle={toggle}
                                    toggleInfoModal={toggleInfoModal}
                                />
                            )
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
        </div>
    );
}


const LinksTableWrapper = ({ email, visible, toggle, toggleInfoModal }) => {
    const [numUpdates, setNumUpdates] = useState(0)
    
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { links, loading, error } = useUserLibrary(email)

    useEffect(() => {
        if(!loading && !error && links.length!==state.links.length) {
            dispatch({
                type: 'assign',
                payload: {
                    key: 'links',
                    value: links.sort((a, b) => {
                        if(JSON.parse(a).timestamp && JSON.parse(b).timestamp) {
                            return parseInt(JSON.parse(b).timestamp) - parseInt(JSON.parse(a).timestamp)
                        } else if(JSON.parse(a).timestamp) {
                            return parseInt(JSON.parse(a).timestamp)
                        } else if(JSON.parse(b).timestamp) {
                            return parseInt(JSON.parse(b).timestamp)
                        } 
                        return 0; 
                    }),
                }
            }); 
            setNumUpdates(numUpdates + 1)
        }
    }, [state.links, links, loading, error, numUpdates]); 

    if(loading) return <Loader />
    if(error) return <p> error! </p>

    return (
        <> 
            <LinksTable 
                links={state.links}
                visible={visible}
                toggle={toggle}
                toggleInfoModal={toggleInfoModal}
            />
        </>
    )
}

export default function LinksPage() {
    const [session] = useSession()
    const email  = session.user.email

    const [modalVisible, setModalVisible] = useState(false)
    const [infoModalVisible, setInfoModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const toggleInfoModal = () => {
        setInfoModalVisible(!infoModalVisible)
    }
    
    return (
       
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
                <div className="mt-4">
                    <DangerModal 
                        visible={modalVisible} 
                        toggle={toggleModal} 
                    /> 
                    <InfoModal
                        visible={infoModalVisible}
                        toggle={toggleInfoModal}
                    /> 
                    <LinksTableWrapper
                        email={email} 
                        visible={modalVisible}
                        toggle={toggleModal}
                        toggleInfoModal={toggleInfoModal}
                    />
                </div>
            }
        />
    );
}

LinksPage.auth = true