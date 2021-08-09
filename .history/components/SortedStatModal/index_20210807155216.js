import React from 'react'
import { useTable, usePagination, useFilters, useGlobalFilter } from 'react-table'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import TableSkeleton from '../Skeletons/TableSkeleton'
import TableController from '../ToolbarActions/TableController'
import matchSorter from 'match-sorter'

const tableClassName = "bp3-html-table bp3-html-table-striped bp3-html-table-bordered bp3-html-table-condensed bp3-interactive bp3-small"


function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

const StatisticTable = ({ columns, data, fetchData, loading, pageCount: controlledPageCount }) => {
    const filterTypes = React.useMemo(
        () => ({
          // Add a new fuzzyTextFilterFn filter type.
          fuzzyText: fuzzyTextFilterFn,
          // Or, override the default text filter to use
          // "startWith"
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
        },
    }), []);

    // Define a default UI for filtering
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length

        return (
            <input
                value={filterValue || ''}
                onChange={e => {
                setFilter(e.target.value || undefined)}}
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
        state: { pageIndex, pageSize },
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
        useGlobalFilter,
        usePagination
    )

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    const firstPageRows = rows.slice(0, 10)

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
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />  
                 
                { loading ? <TableSkeleton /> : 
                    <Box css={{ width: '1275px', overflowX: 'scroll' }}>
    
                        <table 
                            {...getTableProps()}  
                            className={tableClassName}
                            style={{ borderTop: 'thin solid silver' }}
                        >
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                        
                            <tbody {...getTableBodyProps()}>
                            {firstPageRows.map((row, i) => {  
                                    prepareRow(row);

                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        <span> {cell.render('Cell')} </span>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })} 
                            </tbody>
                    </table> 
                </Box> }
            </Flex>
        </Box>
    );
}

export default StatisticTable 