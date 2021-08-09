import React, { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../../store'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ToggleGroup, ActionButtonItem, ToggleButtonItem } from '../../primitives/ToggleGroup'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { Text } from '../../primitives/Text'

import StyledTooltip from '../../primitives/Tooltip'
import toast from 'react-hot-toast'
import {darkTheme} from '../../stiches.config'

import {  
    ChevronLeftIcon, 
    DoubleArrowLeftIcon, 
    ChevronRightIcon, 
    DoubleArrowRightIcon,
    ReloadIcon,
    SwitchIcon,
    CaretSortIcon,
    CalendarIcon,
    CheckboxIcon,
    InputIcon
} from '@radix-ui/react-icons';


const PageIterator = ({ 
    loading, 
    pageCount, canPreviousPage, canNextPage, gotoPage, nextPage, previousPage, 
    setPageSize, pageIndex, pageSize
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
                onClick={() => {
                    if(!canPreviousPage) {
                        return;
                    }
                    gotoPage(0);
                }}
                disabled={!canPreviousPage} 
                aria-label="First Page"
            >
                <DoubleArrowLeftIcon />
            </ActionButtonItem>
            <ActionButtonItem 
                value="prev" 
                onClick={() => {
                    if(!canPreviousPage) {
                        return;
                    }
                    previousPage()
                }} 
                disabled={!canPreviousPage} 
                aria-label="Previous Page"
            >
                <ChevronLeftIcon />
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

const TableActions = ({ actionCategory, currentState }) => {

    return (
        <ToggleGroup
            type="multiple" 
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            <ToggleButtonItem> 
                <Text> {actionCategory} </Text> 
                <Box css={{ ml: '$1', color: 'white' }}>
                    <AccessibleIcon label={'Filters'}>
                        <CaretSortIcon />
                    </AccessibleIcon>
                </Box>

            </ToggleButtonItem>
        </ToggleGroup>
    )
}

const RefreshTableButton = () => {

    return (
        <ToggleGroup
            type="single"
            defaultValue="left"
            aria-label="Refresh Trigger"
        >
            <ActionButtonItem>
                <AccessibleIcon label={'Refresh table'}>
                    <ReloadIcon />
                </AccessibleIcon>
            </ActionButtonItem>
        </ToggleGroup>
    )
}

const actionsArr = [
    { id: 'filter', category: 'Filter', state: '', icon: CheckboxIcon },
    { id: 'sort', category: 'Sort', state: '', icon: CarentSortIcon },
    { id: 'select', category: 'Select', state: '', icon: CheckboxIcon },
    { id: 'search', category: 'Search', state: '', icon: MagnifyingGlassIcon }
];

const TableActionsGroup = () => {

    return (
        <Box>
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center' }}>
                {actionsArr.map(function(action, index) {
                    return (
                        <TableActions 
                            actionCategory={action.category}
                            currentState={action.state}
                            icon={action.icon} 
                        /> 
                    );
                })}
            </Flex>
        </Box>
        
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
        <div className={darkTheme}>
            <Box css={{ py: '$1', px: '$2', height: '50px', bc: darkTheme.colors.hiContrast.token, color: darkTheme.colors.loContrast.token, border: 'thin solid white', br: '5px' }}>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    <RefreshTableButton />
                    
                    <PageIterator  
                        loading={loading}
                        pageCount={pageCount}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        gotoPage={gotoPage} 
                        nextPage={nextPage} 
                        previousPage={previousPage} 
                    />

                    <TableActionsGroup />
                        
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
        </div>
    )
}

export default TableController;
