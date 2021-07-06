import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import { NewSlugStore } from '../../store'

import Loader from '../../components/Loader'
import StackedLayout from '@/sections/StackedLayout'
import InfoModal, { DangerModal } from '../../buildingBlocks/Modal'

import { Button, IconTrash, IconEye } from '@supabase/ui'

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

export function formatDate(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    const year = date.getFullYear()
  
    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day
  
    return `${month}/${day}/${year}`; 
}
  
const LinkEntry = ({ index, cellsInRow, toggle }) => {
    const cells = JSON.parse(cellsInRow)

    const cellValues = [
        [cells.slug, ''], 
        [sanitize(cells.url, 35), ''], 
        [useDateTimeConverter(cells.timestamp).primaryText, useDateTimeConverter(cells.timestamp).secondaryText],
        [cells.ttl ? formatDate(new Date(cells.ttl)) : '', '']
    ];

    const handleDelete = () => {
        toggle()
    }
    const handleOpen = () => {
        toggle()
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
                xx views 
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

const LinksTable = ({ links, modalVisible, toggle }) => {
    const state = useContext(NewSlugStore.State)
    
    const [cursor, setCursor] = useState(0)
    const [pageSize, setPageSize] = useState(7)

    const handlePagination = () => {
        setCursor(cursor + pageSize)
    }

    const columns = React.useMemo(() => [
        { Header: 'Slug' },
        { Header: 'Destination'},
        { Header: 'Created At' },
        { Header: 'Expiry (TTL)' },
        { Header: 'Views' },
        { Header: 'Actions' },
    ], []);

    let linksOnPage = state.links.slice(cursor, cursor + pageSize)

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
                        return  (
                            <LinkEntry 
                                index={idx} 
                                cellsInRow={value} 
                                toggle={toggle}
                            />
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


const LinksTableWrapper = ({ modalVisible, setModalVisible, toggleModal }) => {
    const [numUpdates, setNumUpdates] = useState(0)
    
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const email = 'sasagar@ucsd.edu'

    const { links, loading, error } = useUserLibrary(email)

    useEffect(() => {
        if(!loading && !error && links.length!==state.links) {
            dispatch({
                type: 'assign',
                payload: {
                    value: links.sort((a, b) => {
                        if(a.timestamp && b.timestamp) {
                            return parseInt(b.timestamp) - parseInt(a.timestamp); 
                        } 
                        return b.timestamp ?  1 : -1; 
                    })
                }
            }); 
            setNumUpdates(numUpdates + 1)
        }
    }, [state.links, links, loading, error]); 

    if(loading) return <Loader />
    if(error) return <p> error: {`${error.message}`} </p>

    return (
        <LinksTable 
            links={links} 
            modalVisible={modalVisible}
            toggle={toggleModal}
        />
    )
}

const LinksPage = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    
    return (
       
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
                <div className="mt-4">
                    {/* <SlugDetailsModal /> */}
                    <DangerModal 
                        visible={modalVisible} 
                        toggle={toggleModal} 
                    /> 
                    <InfoModal 
                        visible={modalVisible} 
                        toggle={toggleModal} 
                    /> 
                    <LinksTableWrapper 
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        toggleModal={toggleModal}
                    />
                </div>
            }
        />
    );
}

export default LinksPage