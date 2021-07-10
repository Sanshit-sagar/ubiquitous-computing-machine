import React, { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../../components/Loader'
import StackedLayout from '@/sections/StackedLayout'
import InfoModal, { DangerModal } from '../../buildingBlocks/Modal'
import { NewSlugStore } from '../../store'
import { useViewsBySlug } from '../clickstream'

import toast from 'react-hot-toast';
import { Button, IconTrash, IconEye } from '@supabase/ui'
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell
  } from '@windmill/react-ui'

const fetcher = url => axios.get(url).then(res => res.data);

const sanitize = (text, len) => {
    return text && text.length ? text.substring(0, len) : ''
}

const useUserLibrary = (email) => {
    const { data, error } = useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null, fetcher, {
        revalidateOnFocus: true,
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

    const { views, viewsLoading, viewsError } = useViewsBySlug(slug)

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
  
const LinkEntry = ({ email, index, cellsInRow, toggle, toggleInfoModal }) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);

    const dispatch = useContext(NewSlugStore.Dispatch)

    const cells = JSON.parse(cellsInRow)

    let creationTimestamp = parseInt(cells.timestamp)
    let expiryTimestamp = cells.config ? (parseInt(cells.config.ttl) || '') : ''
    let currentTimestamp = new Date().getTime()
    
    let lifespan = expiryTimestamp - creationTimestamp
    let lifeLeft = expiryTimestamp - currentTimestamp
    
    let validity = lifeLeft > 0 ? 'Active' : 'Expired'
    let lifeLivedPercent = (validity==='Active' && lifespan) ? lifeLeft/lifespan : 0

    const cellValues = [
        [sanitize(cells.slug, 25), sanitize(cells.url, 30)], 
        [getLocaleTimestring(creationTimestamp), getDateString(creationTimestamp)],
        [getLocaleTimestring(expiryTimestamp), getDateString(expiryTimestamp)],
        [<Badge> {validity} </Badge>, `${lifeLivedPercent}`],
    ];

    const handleDeleteConfirmation = async () => {
        setDeleteLoading(true);

        dispatch({
            type: 'filter',
            payload: {
                key: 'links',
                value: index
            }
        }); 

        toast.success(`Deleted slug: ${cells.slug} at index: ${index}`)

        axios.delete(`/api/slugs/aliases/${email}?slug=${cells.slug}`).then((response) => {
            console.log(`Confirmation of deletion: ${JSON.stringify(response)}`);
        }).catch((error) => {
            toast.error(`Error: ${error.message}`);
        });

        setDeleteLoading(false);
    }

    const handleDelete = () => {
        toggle()
        if(deleteConfirmed) {
            handleDeleteConfirmation();
        } 
    }

    const handleOpen = () => {
        toggleInfoModal(cells)
    }

    return (
        <TableRow>
            <> {cellValues.map(function(value, index) {
                return (
                    <TableCell key={index}>
                         <div className="w-full flex-col justify-start items-stretch mr-1">
                            <div>
                                <div className="text-sm w-full flex-nowrap">
                                    {value[0]}
                                </div>
                                {value[1] && value[1]?.length ? 
                                    <div className="text-sm w-full flex-nowrap">
                                        {value[1]}
                                    </div>
                                : null}
                            </div>
                        </div>
                    </TableCell>
                )
            })} </>
            <TableCell>
                <ViewsDisplay slug={cells.slug} />
            </TableCell>

            <TableCell>
                <div className="w-full inline-flex justify-end align-center">
                    <Button 
                        type="outline" 
                        size="small" 
                        icon={<IconTrash />} 
                        onClick={handleDelete}
                        loading={deleteLoading}
                        className="mr-2" 
                    />
                    <Button 
                        type="primary" 
                        size="small" 
                        icon={<IconEye />} 
                        onClick={handleOpen} 
                    />
                </div>
            </TableCell> 
        </TableRow>
    );
}

const LinksTable = ({ email, links, visible, toggle, toggleInfoModal }) => {
  
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
        // <div className="container mx-auto p-2 m-2 rounded-md shadow-md">
            <TableContainer>
                <Table className="p-2 rounded-md">
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
                                    email={email}
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        // </div>
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
                email={email}
                links={state.links}
                visible={visible}
                toggle={toggle}
                toggleInfoModal={toggleInfoModal}
            />
        </>
    )
}

export default function LinksPage({ meta }) {
    // const [session] = useSession()
    // const email  = session.user.email
    const email = 'sasagar@ucsd.edu'

    const [modalVisible, setModalVisible] = useState(false)
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [infoModalDetails, setInfoModalDetails] = useState(null)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const toggleInfoModal = (details) => {
        setInfoModalVisible(!infoModalVisible)
        setInfoModalDetails(details)
    }
    
    return (
       
        <StackedLayout 
            pageMeta={meta} 
            children={
                <div className="mt-2">
                    <DangerModal
                        email={email}  
                        visible={modalVisible} 
                        toggle={toggleModal} 
                    /> 
                    <InfoModal
                        email={email} 
                        visible={infoModalVisible}
                        toggle={toggleInfoModal}
                        data={infoModalDetails}
                        setData={setInfoModalDetails}
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

LinksPage.auth = false

LinksPage.defaultProps = {
    meta: { 
        title: 'Links', 
        description: 'All your saved slugs' 
    }
}
  
  