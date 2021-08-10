import React, { useContext } from 'react'
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from 'react-table'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import TableSkeleton from '../Skeletons/TableSkeleton'
import TableController from '../Toolbar'
import matchSorter from 'match-sorter'

import { GlobalStore } from '../../store/GlobalStore'
import { darkTheme, theme as lightTheme } from '../../stiches.config'
import { TableScrollView } from '../../primitives/ScrollView'


import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader,
    useTableState
  } from '@react-stately/table';
import Table from './Navigatable/Table'
  

export function darkThemeColor(color) {
    return {
        [`body.${darkTheme} &`]: {
            bc: color,
        },
    };
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

const AriaTable = ({ columns, data, fetchData, loading, pageCount: controlledPageCount }) => {
    const uiState = useContext(GlobalStore.State)

    const filterTypes = React.useMemo(
        () => ({
          fuzzyText: fuzzyTextFilterFn,

          text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                    ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                    : true
                }
            )
        },
    }), []);

    function DefaultColumnFilter({column:{filterValue, preFilteredRows, setFilter}}) {
        const count = preFilteredRows.length

        return (
            <input
                value={filterValue || ''}
                onChange={(e) => {
                    setFilter(e.target.value || undefined)}
                }
                placeholder={`Search ${count} records...`}
            />
        )
    }

    const defaultColumn = React.useMemo(() => ({
        Filter: DefaultColumnFilter,
    }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { 
            pageIndex, 
            pageSize 
        },
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: { 
                pageIndex: 0 
            }, 
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        useFilters,
        useSortBy,
        useGlobalFilter,
        usePagination
    )

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

   {/* <div> {column.canFilter ? column.render('Filter') : null}</div> */}
    let [selectedKeys, setSelectedKeys] = React.useState(new Set([2]));

    return (       
    <Box css={{ border: 'thin solid transparent', bc: 'white' }}>
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <TableController 
                loading={loading}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                setPageSize={setPageSize}
                pageIndex={pageIndex}
                pageSize={pageSize}
                preGlobalFilteredRows={page}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />  
            <div className={uiState.darkMode ? darkTheme : lightTheme}>
                {loading ? 
                <TableSkeleton /> : 
                <TableScrollView content={
                    <Table 
                        {...getTableProps()}  
                        aria-label="Table with selection"
                        selectionMode="multiple" 
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        disabledKeys={[]}
                        style={{ border: 'thin solid', borderColor: '$hiContrast' }}
                    >
                        
                        {headerGroups.map(headerGroup => (
                            <TableHeader {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, index) => (
                                    <Column key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>{column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}</span>
                                    </Column>
                                ))}
                            </TableHeader>
                        ))} 
                    
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, i) => {  
                                prepareRow(row);

                                return (
                                    <Row key={i} {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <Cell {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </Cell>
                                            );
                                        })}
                                    </Row>
                                );
                            })} 
                        </TableBody>
                    </Table>
                    }
                />}
            </div>
        </Flex>
    </Box>
    );
}

export default AriaTable 