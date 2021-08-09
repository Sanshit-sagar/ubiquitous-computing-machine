import React, { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../../store'
import { styled } from '@stitches/react'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ToggleGroup, ActionButtonItem, ToggleButtonItem } from '../../primitives/ToggleGroup'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { Text } from '../../primitives/Text'
import { TextField } from '../../primitives/TextField'

import { useAsyncDebounce } from 'react-table'

import StyledTooltip from '../../primitives/Tooltip'
import toast from 'react-hot-toast'
import {darkTheme} from '../../stiches.config'

import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectItem 
} from '../../primitives/Selectable'

import * as Menu from "@radix-ui/react-dropdown-menu";


import {  
    ChevronLeftIcon, 
    DoubleArrowLeftIcon, 
    ChevronRightIcon, 
    DoubleArrowRightIcon,
    ReloadIcon,
    DotsVerticalIcon,
    CaretSortIcon,
    CalendarIcon,
    CheckboxIcon,
    InputIcon,
    DropdownMenuIcon
} from '@radix-ui/react-icons';


export function darkThemeColor(color) {
    return {
      [`body.${darkTheme} &`]: {
        bc: color,
      },
    };
  }

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

const StyledSelectMenu = () => {
    const [open, setOpen] = React.useState(false);
    let items = ['111', '222', '333']; 

    return (
        <SelectRoot open={open} onOpenChange={value => setOpen(value)}>
            <SelectTrigger>
                Showing 10
            </SelectTrigger>
            <SelectContent>
                {items.map(function(value, index) {
                    return (
                        <SelectItem key={index}>
                            <Text> {value} </Text>
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </SelectRoot>
    )
}



const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) =>  {

    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {setGlobalFilter(value || undefined)}, 200)
  
    return (
        <TextField
            size="1"
            value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`${count} records...`}
        />
    )
  }


const PageIterator = ({ 
    loading, pageCount, canPreviousPage, canNextPage, gotoPage, nextPage, previousPage, 
    setPageSize, pageIndex, pageSize, pageOptions
}) => {
 
    const execTransition = (destination) => {
        if (destination==='first') {gotoPage(0)}
        else if (destination==='prev') {previousPage()}
        else if (destination==='next') {gotoPage(nextPage)}
        else {gotoPage(pageCount - 1)}
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
            defaultValue="center" 
            aria-label="Pagination Controls"
        >
            {iterationOptions.map(function(option, index) {
                return (
                    <ActionButtonItem
                        key={index}
                        value={option.value}
                        aria-label={option.label}
                        onClick={() => execTransition(option.value)}
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
    loading,
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
 }) => {
    const state = useContext(GlobalStore.State)
    const [pageIndexInput, setPageIndexInput] = useState(pageIndex + 1);

    const handleRefresh = () => {
        toast.success(`Refreshing...`)
    }

    useEffect(() => {
        setPageSize(Number(10))
    }, []); 

   

    return (
        <div className={darkTheme}>
            <Box css={{ py: '$1', px: '$2', height: '50px', bc: darkTheme.colors.hiContrast.token, color: darkTheme.colors.loContrast.token, border: 'thin solid white', br: '5px' }}>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    <RefreshTableButton 
                        loading={loading}
                        onClick={handleRefresh}

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

                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />

                    <StyledSelectMenu 
                        loading={loading}
                        pageCount={pageCount}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        pageCount={pageCount}
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
    );
}

export default TableController
