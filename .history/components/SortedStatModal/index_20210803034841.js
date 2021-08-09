import React, { Fragment } from 'react'
import { useTable, usePagination } from 'react-table'
import Pagination from '../ToolbarActions/Pagination'


// const TableSkeleton = ({ numRows, numCols, prepareRow }) => {
//     let emptyPage = Array.apply(null, Array(numRows));
//     let emptyRow = Array.apply(null, Array(numCols));
    
//     return (
//         <>  
//             {emptyPage.map((col, index) => {
                
//                 return (
//                     <Fragment>
//                         <tr>
//                             {emptyRow.cells.map(cell => {
//                                 prepareRow(cell);
                                
//                                 return (
//                                     <td>
//                                         <span className="bp3-skeleton">
//                                             {index}
//                                         </span>
//                                     </td>
//                                 );
//                             })}
//                         </tr>
//                     </Fragment>
//                 );
//             })} 
//         </>
//     );
// }
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

    return (       
        <>
            <Pagination 
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
                                            <span className="bp3-light">
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
        </>
        
    );
}

export default StatisticTable 