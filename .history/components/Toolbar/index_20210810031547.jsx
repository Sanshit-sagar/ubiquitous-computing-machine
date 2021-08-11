import React, { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../../store'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
// import { TextField } from '../../primitives/TextField'

import { 
    ToggleGroup, 
    ActionButtonItem, 
    ToggleButtonItem 
} from '../../primitives/ToggleGroup'

// import { useAsyncDebounce } from 'react-table'
import toast from 'react-hot-toast'

import {  
    ChevronLeftIcon, 
    DoubleArrowLeftIcon, 
    ChevronRightIcon, 
    DoubleArrowRightIcon,
    CaretSortIcon,
    CalendarIcon,
    CheckboxIcon,
    InputIcon,
    DropdownMenuIcon
} from '@radix-ui/react-icons';

import RefreshTable from './Actions/Refresh'
import PageSizeSelector from './Actions/Resize'
import GlobalFilter from './Actions/Search'

import {darkTheme, theme as lightTheme} from '../../stiches.config'
export function darkThemeColor(color) {
    return {
      [`body.${darkTheme} &`]: {
        bc: color,
      },
    };
  }


const Paginator = ({ 
    loading, pageIndex, pageCount, canPreviousPage, canNextPage, gotoPage, nextPage, previousPage, pageOptions,
}) => {
    const [pageValue, setPageValue] = useState("none")
 
    const execTransition = (destination) => {
       
        if (destination==='first') {
            toast.success(`Moving to page: 0}`)
            gotoPage(0)
        } else if (destination==='prev') {
            toast.success(`Moving to page: ${destination}`)
            previousPage()
        } else if (destination==='next') {
            toast.success(`Moving to page: ${destination}`)
            nextPage()
        } else {
            toast.success(`Moving to page: ${pageCount-1}`)
            gotoPage(pageCount - 1)
        }
    }

    const isMovePossible = (index) => {
        if (index===1) return canPreviousPage
        if (index===2) return canNextPage 
        if (index===3) return (pageIndex<pageOptions.length-1)
        return pageIndex!==0; 
    }

    let iterationOptions = [
        { label: "First Page", value: "first", icon: <DoubleArrowLeftIcon />, },
        { label: "Previous Page", value: "prev", icon: <ChevronLeftIcon /> },
        { label: "Next Page", value: "next", icon: <ChevronRightIcon /> },
        { label: "Last Page", value: "last", icon: <DoubleArrowRightIcon />  },
    ];

    return (
        <ToggleGroup 
            type="single" 
            value={pageValue}
            onValueChange={(value) => { 
                let canMove = isMovePossible(value);
                if(canMove) {
                    setPageValue(value)
                    execTransition(value)
                }
            }}
            aria-label="Pagination Controls"
        >
            {iterationOptions.map(function(option, index) {
                return (
                    <div key={index}>
                        <ActionButtonItem
                            value={option.value}
                            aria-label={option.label}
                        >
                            {option.icon} 
                        </ActionButtonItem>
                    </div>
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
                        <div key={index}>
                            <ToggleButtonItem> 
                                <Text> {loading ? '...' : action.category} </Text> 
                                <Box css={{ ml: '$1', color: 'white' }}>
                                    <AccessibleIcon label={'Filters'}>
                                        {action.icon}
                                    </AccessibleIcon>
                                </Box>
                            </ToggleButtonItem>
                        </div>
                    );
                })}
            </Flex>
        </ToggleGroup>
    );
}

const Toolbar = ({
    loading,
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
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
 }) => {
    const uiState = useContext(GlobalStore.State)

    useEffect(() => { setPageSize(Number(15)) }, []); 

    return (
        <div className={uiState.darkMode ? darkTheme : lightTheme}>
            <Box css={{ py: '$2', px: '$3', height: '50px', bc: '$mauve11', color: '$hiContrast', borderBottom: `thin sold ${'$hiContrast'}` }}>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    
                    <RefreshTable 
                        loading={loading}
                    />
        
                    <Paginator  
                        loading={loading}
                        pageIndex={pageIndex}
                        pageCount={pageCount}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        gotoPage={gotoPage} 
                        nextPage={nextPage} 
                        previousPage={previousPage} 
                        pageOptions={pageOptions}
                    />

                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    
                    <TableActionsGroup 
                        loading={loading} 
                    />
                        
                    {/* 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <span className="text-xs font-extralight mr-5">
                                Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                            </span>
                        </div>
                     */}

                    <PageSizeSelector 
                        loading={loading}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />

                </Flex>
            </Box>
        </div>
    );
}

export default Toolbar
