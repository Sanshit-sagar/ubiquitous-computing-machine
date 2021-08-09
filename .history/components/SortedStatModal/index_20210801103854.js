import React, { Fragment } from 'react'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import matchSorter from 'match-sorter'
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
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
}

function DefaultColumnFilter({ column: { 
    filterValue, preFilteredRows, setFilter }, }) 
{
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
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
        getSortByToggleProps,
        setPageSize,
        state: { pageIndex, pageSize, expanded },
      } = useTable(
        {
            columns,
            data,
            initialState: { 
                pageIndex: 0 
            }, 
            useSortBy,
            manualPagination: true,
            pageCount: controlledPageCount,
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
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                        <span>  
                                            { column.isSorted? column.isSortedDesc ? ' 🔽' : ' 🔼' : '' }
                                        </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                   {page.map((row, i) => {  
                        prepareRow(row);

                        return (
                            <Fragment {...row.getRowProps()}>
                                <tr>
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
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </>
        
    );
}

export default StatisticTable 