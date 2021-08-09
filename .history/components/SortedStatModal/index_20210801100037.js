import React, { Fragment } from 'react'
import { useTable, usePagination } from 'react-table'
import Pagination from '../ToolbarActions/Pagination'

const TableSkeleton = (numRows, numCols) => {
    let emptyPage = Array.apply(null, Array(numRows));
    let emptyRow = Array.apply(null, Array(numCols));
    
    return (
        <>
            {emptyPage.map((emptyRowValue, index) => {
                prepareRow(row);
                
                return (
                    <Fragment {...row.getRowProps()}>
                        <tr>
                            {emptyRow.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        <span className="bp3-skeleton">
                                            {cell.render('Cell')}
                                        </span>
                                    </td>
                                );
                            })}
                        </tr>
                    </Fragment>
                );
            })}
        </>
    );
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
        state: { pageIndex, pageSize, expanded },
      } = useTable(
        {
            columns,
            data,
            initialState: { 
                pageIndex: 0 
            }, 
            manualPagination: true,
            pageCount: controlledPageCount
        },
        usePagination
    );

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
            
            <table 
                {...getTableProps()} 
                className="bp3-html-table bp3-html-table-striped bp3-html-table-bordered 
                            bp3-html-table-condensed bp3-interactive bp3-small"
            >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className={loading ? "bp3-skeleton" : ""}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    prepareRow(row);
                    
                   <> {loading ? <TableSkeleton /> :
                    
                    <div>  
                        {page.map((row, i) => {  
                            return (
                                <Fragment {...row.getRowProps()}>
                                    <tr>
                                        {row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    <span className="bp3-skeleton">
                                                        {cell.render('Cell')}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </div>
                    </>
                    
                    }
                </tbody>
            </table>
        </>
        
    );
}

// const SortedStatModalWrapper = ({ email, filter }) => {
//     const { filteredData, isLoading, isError } = useFilteredStatList(email, filter)
    
//     const [data, setData] = React.useState([])
//     const [loading, setLoading] = React.useState(false)
//     const [pageCount, setPageCount] = React.useState(0)
//     const fetchIdRef = React.useRef(0)

//     let cellsLoading = loading || isLoading
//     const columns = getColumns(filter, email, cellsLoading);
  
//     const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
//         const fetchId = ++fetchIdRef.current
//         setLoading(true);

//         if(!isLoading && !isError && filteredData && filteredData.length) {
//             if (fetchId === fetchIdRef.current) {
//                 const startRow = pageSize * pageIndex
//                 const endRow = startRow + pageSize
//                 setData(filteredData.slice(startRow, endRow))
//                 setPageCount(Math.ceil(filteredData.length / pageSize))
//                 setLoading(false)
//             }
//         }
//     }, [filteredData, isLoading, isError]); 
    
//     return (
//         <StatisticTable 
//             columns={columns} 
//             data={data}
//             fetchData={fetchData}
//             loading={cellsLoading}
//             pageCount={pageCount}
//         />
//     )
// }

// const SortedStatModal = ({ filter }) => {
//     const [session] = useSession()
//     let email = session && session?.user ? session.user.email : ''
    
//     return (
//         <SortedStatModalWrapper
//             email={email}
//             filter={filter || 'allViews'}
//         />
//     );
// }

export default StatisticTable 