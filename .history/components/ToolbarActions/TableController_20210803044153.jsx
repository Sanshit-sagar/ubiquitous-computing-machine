import React, { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../../store'

import toast from 'react-hot-toast'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ToggleGroup, ActionButtonItem, ToggleButtonItem } from '../../primitives/ToggleGroup'
import { Text } from '../../primitives/Text'

import StyledTooltip from '../../primitives/Tooltip'

import {  
    ChevronLeftIcon, 
    DoubleArrowLeftIcon, 
    ChevronRightIcon, 
    DoubleArrowRightIcon
} from '@radix-ui/react-icons';


const PageIterator = ({ 
    loading, pageCount, canPreviousPage, canNextPage, gotoPage, nextPage, previousPage
}) => {

    // if(loading) return <loadingbar />

    return (
        <ToggleGroup 
            type="single" 
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            <ActionButtonItem 
                value="first" 
                onClick={() => gotoPage(0)} 
                disabled={!canPreviousPage} 
                aria-label="First Page"
            >
                <ChevronLeftIcon />
            </ActionButtonItem>
            <ActionButtonItem 
                value="prev" 
                onClick={() => previousPage()} 
                disabled={!canPreviousPage} 
                aria-label="Previous Page"
            >
                <DoubleArrowLeftIcon />
            </ActionButtonItem>
            <ActionButtonItem 
                value="next" 
                onClick={() => nextPage()} 
                disabled={!canNextPage} 
                aria-label="Next Page"
            >
                <ChevronRightIcon />
            </ActionButtonItem>
            <ActionButtonItem 
                value="last" 
                onClick={() => gotoPage(pageCount - 1)} 
                disabled={!canNextPage} 
                aria-label="Last Page"
            >
                <DoubleArrowRightIcon />
            </ActionButtonItem>
        </ToggleGroup>
    );
}

const TableFilters = () => {

    return (
        <ToggleGroup
            type="multiple" 
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            <ToggleButtonItem> <Text> Active </Text> </ToggleButtonItem>
            <ToggleButtonItem> <Text> Active </Text> </ToggleButtonItem>
            {/* <ToggleGroupItem icon="sort-asc" />
            <ToggleGroupItem icon="sort-desc" />
            <ToggleGroupItem icon="sort-alphabetical" />
            <ToggleGroupItem icon="sort-alphabetical-desc" /> */}
        </ToggleGroup>
    )
}

const TableController = ({
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    loading
 }) => {
    const state = useContext(GlobalStore.State)
    const [pageIndexInput, setPageIndexInput] = useState(pageIndex + 1);

    // initialize page size 
    useEffect(() => {
        setPageSize(Number(10))
    }, []); 
    

    return (
        
        <Box css={{ py: '$1', px: '$2', height: '50px', bc: '#fff', color: '#000', border: 'thin solid white', br: '5px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                <PageIterator  
                    loading={loading}
                    pageCount={pageCount}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    gotoPage={gotoPage} 
                    nextPage={nextPage} 
                    previousPage={previousPage} 
                />

                <TableFilters />
                    
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <span className="text-xs font-extralight mr-5">
                        Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                    </span>
                   
                    <div class="bp3-select">
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Flex>
        </Box>
    )
}

export default DataTableController;
