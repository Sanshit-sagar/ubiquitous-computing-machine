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
    InputIcon,
    DropdownMenuIcon
} from '@radix-ui/react-icons';


const RefreshTableButton = () => {

    return (
        <ToggleGroup 
            type="single" 
            defaultValue={false} 
            aria-label="Reload Data"
        >
            <ActionButtonItem>
                <AccessibleIcon label={'Refresh table'}>
                    <ReloadIcon />
                </AccessibleIcon>
            </ActionButtonItem>
        </ToggleGroup>
    )
}

const PageIterator = ({ 
    loading, pageCount, canPreviousPage, canNextPage, gotoPage, nextPage, previousPage, 
    setPageSize, pageIndex, pageSize, pageOptions
}) => {
    const canFirstPage = canPreviousPage && pageIndex!==0;
    const canLastPage = canNextPage && (pageIndex+1)!==pageOptions.length;
    // const goToFirstPage = () => {
    //      gotoPage(0);
    // }
    // const goToLastPage = () => gotoPage(pageCount);
    
    const getNextPageInIteration = (value) => {
        return value==='first' ? goToFirstPage() : goToLastPage(); 
    }

    // const handleClick = (value) => {
    //     if(value==='first' && !canFirstPage) return;
    //     if(value==='last' && !canLastPage) return;
    //     if(value==='next' && !canNextPage) return;
    //     if(value==='prev' && !canPreviousPage) return;
    //     gotoPage(getNextPageInIteration(value))
    // }

    let iterationOptions = [
        { label: "First Page", value: "first", icon: <DoubleArrowLeftIcon />, },
        { label: "Previous Page", value: "prev", icon: <ChevronLeftIcon /> },
        { label: "Next Page", value: "next", icon: <ChevronRightIcon /> },
        { label: "Last Page", value: "last", icon: <DoubleArrowRightIcon />  },
    ];

    return (
        <ToggleGroup 
            type="single" 
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            {iterationOptions.map(function(option, index) {
                return (
                    <ActionButtonItem
                        key={index}
                        value={option.value}
                        aria-label={option.label}
                        // disabled={option.disabled}
                        onClick={() => {
                            let moveTo=option.value; 

                            if(moveTo==='first') gotoPage(0);
                            else if(moveTo==='last') gotoPage(pageCount);
                            else if(moveTo==='prev') gotoPage(pageIndex-1);
                            gotoPage(pageIndex + 1);
                        }}
                    >
                        {option.icon}
                    </ActionButtonItem>
                );
            })}
        </ToggleGroup>
    );
}

const TableActionsGroup = ({ loading }) => {
    const actionsArr = [
        { id: 'filter', category: 'Filter', state: '', icon: <DropdownMenuIcon /> },
        { id: 'sort', category: 'Sort', state: '', icon: <CaretSortIcon /> },
        { id: 'select', category: 'Select', state: '', icon: <CheckboxIcon /> },
        { id: 'search', category: 'Search', state: '', icon: <InputIcon /> },
        { id: 'range', category: 'Range', state: '', icon: <CalendarIcon /> }
    ];    

    return (
        <ToggleGroup
            type="multiple" 
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center' }}>
                {actionsArr.map(function(action, index) {
                    return (
                        <ToggleButtonItem> 
                            <Text> {action.category} </Text> 
                            <Box css={{ ml: '$1', color: 'white' }}>
                                <AccessibleIcon label={'Filters'}>
                                    {action.icon}
                                </AccessibleIcon>
                            </Box>
                        </ToggleButtonItem>
                    );
                })}
            </Flex>
        </ToggleGroup>
    );
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

    useEffect(() => {
        setPageSize(Number(10))
    }, []); 
   

    return (
        <div className={darkTheme}>
            <Box css={{ py: '$1', px: '$2', height: '50px', bc: darkTheme.colors.hiContrast.token, color: darkTheme.colors.loContrast.token, border: 'thin solid white', br: '5px' }}>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    <RefreshTableButton 
                        loading={loading}
                    />
                    
                    <PageIterator  
                        loading={loading}
                        pageCount={pageCount}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        gotoPage={gotoPage} 
                        nextPage={nextPage} 
                        previousPage={previousPage} 
                        pageOptions={pageOptions}
                    />

                    <TableActionsGroup 
                        loading={loading}
                    />
                        
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
