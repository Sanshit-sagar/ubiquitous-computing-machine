import React from 'react'
import { useTable, usePagination } from 'react-table'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import Loader from '../Loader'
import TableController from '../ToolbarActions/TableController'

const tableClassName = "bp3-html-table bp3-html-table-striped bp3-html-table-bordered bp3-html-table-condensed bp3-interactive bp3-small"

const EmptyRow = () => {
    let emptyRow = [1,2,3,4,5,6,7,8,9,10];

    return (
        <td>
            <Box css={{ border: 'thin solid black' }}>
                <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
                        {emptyRow.map(function (value, index) {
                            return (
                                <Box 
                                    key={index} 
                                    css={{ width: '125px', height: '30px', ml: '$2', mt: '$2' }}
                                >
                                    <Loader /> 
                                </Box>
                            );
                        })}
                </Flex>
            </Box>
       </td>
    )
}


const EmptyTable = () => {
    let emptyTableRows = [1,2,3,4,5,6,7,8,9,10];

    return (
        <tbody>
            <Box css={{ border: 'thin solid black' }}>
                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        {emptyTableRows.map(function (value, index) {
                            return (
                                <tr>
                                    <EmptyRow /> 
                                </tr>
                            );
                        })}
                </Flex>
            </Box>
         </tbody>
    )
}

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

    

    return (       
        <Box css={{ border: 'thin solid transparent' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <TableController 
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
                    loading={loading}
                />  
            { loading ? <EmptyTable />    :  
                <table {...getTableProps()}  className={tableClassName}>
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
                                                <span>
                                                    {cell.render('Cell')}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })} 
                    </tbody>
                </table> 
            }
            </Flex>
        </Box>
    );
}

export default StatisticTable 