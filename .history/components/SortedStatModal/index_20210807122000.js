import React from 'react'
import { useTable, usePagination } from 'react-table'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import TableSkeleton from '../Skeletons/TableSkeleton'
import TableController from '../ToolbarActions/TableController'

const tableClassName = "bp3-html-table bp3-html-table-striped bp3-html-table-bordered bp3-html-table-condensed bp3-interactive bp3-small"

const StatisticTable = ({ columns, data, fetchData, loading, pageCount: controlledPageCount }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
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
      } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, 
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    )

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])


    if(loading) return <TableSkeleton />;

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
                                {page.map((row, i) => {  
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