import React, { Fragment, useState, useEffect, useContext } from 'react'

import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import { useTable, usePagination } from 'react-table'
import { Card, Elevation } from '@blueprintjs/core'

import toast from 'react-hot-toast'

import getColumns from './columns'
import Pagination from '../ToolbarActions/Pagination'

// const Pagination = ({
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     pageIndex,
//     pageSize,
//     loading
//  }) => {
//     const state = useContext(GlobalStore.State)
//     const [pageIndexInput, setPageIndexInput] = useState(pageIndex + 1);

//     useEffect(() => {
//         setPageSize(Number(10))
//     }, []); 
    

//     return (
//         <div className="pagination">
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'start', width: '100%'}}>
//                 <ButtonGroup>
//                     <AnchorButton loading={loading} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//                         {'<<'}
//                     </AnchorButton>{' '}
//                     <AnchorButton  loading={loading} onClick={() => {
//                         toast.success('going to prev page');
//                         previousPage()
//                     }} 
//                     disabled={!canPreviousPage}>
//                         {'<'}
//                     </AnchorButton>{' '}
//                     <AnchorButton  loading={loading} onClick={() => {
//                         nextPage() 
//                         toast.success('going to next page');
//                     }} disabled={!canNextPage}>
//                         {'>'}
//                     </AnchorButton>{' '}
//                     <AnchorButton  loading={loading} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//                         {'>>'}
//                     </AnchorButton>{' '}
//                 </ButtonGroup>

//                 {/* <ButtonGroup>
//                     <AnchorButton text="Active" intent="success" />
//                     <AnchorButton text="Expired" intent="danger" />
//                     <AnchorButton icon="sort-asc" />
//                     <AnchorButton icon="sort-desc" />
//                     <AnchorButton icon="sort-alphabetical" />
//                     <AnchorButton icon="sort-alphabetical-desc" />
//                 </ButtonGroup> */}
                    
//                 <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
//                     <span className="text-xs font-extralight mr-5">
//                         Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
//                     </span>
//                     <span style={{ marginRight: '10px' }}>
//                         <NumericInput
//                             value={pageIndexInput}
//                             onChange={(e)=> {
//                                 const page = (e.target.value) ? parseInt(e.target.value) - 1 : 0
//                                 setPageIndexInput(page)
//                                 gotoPage(page)
//                             }}
//                             style={{ maxWidth: '50px'}}
//                         />
//                     </span>
//                     {' '}
//                     <div class="bp3-select">
//                         <select
//                             value={pageSize}
//                             onChange={e => {
//                                 setPageSize(Number(e.target.value))
//                             }}
//                         >
//                             {[5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50].map(pageSize => (
//                                 <option key={pageSize} value={pageSize}>
//                                     Show {pageSize}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

  {/* <Card style={{ padding: '5px' }}> 
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
             </Card> */}

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
        <Card style={{ minHeight: '100%', minWidth: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
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
                    {page.map((row, i) => {
                        prepareRow(row);
                        
                        return (
                            <Fragment {...row.getRowProps()}>
                                <tr>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                <span className={loading ? "bp3-skeleton" : ""}>
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
        </Card>
        
    );
}

function useFilteredStatList(email, filter)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/filtered/${email}?filter=${filter}` : null)

    return {
        filteredData: data ? data.filteredData : [],
        isLoading: !data && !err,
        isError: err
    };
}

const SortedStatModalWrapper = ({ email, filter }) => {
    const { filteredData, isLoading, isError } = useFilteredStatList(email, filter)
    
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    let cellsLoading = loading || isLoading
    const columns = getColumns(filter, email, cellsLoading);
  
    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true);

        if(!isLoading && !isError && filteredData && filteredData.length) {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(filteredData.slice(startRow, endRow))
                setPageCount(Math.ceil(filteredData.length / pageSize))
                setLoading(false)
            }
        }
    }, [filteredData, isLoading, isError]); 
    
    return (
        <StatisticTable 
            columns={columns} 
            data={data}
            fetchData={fetchData}
            loading={cellsLoading}
            pageCount={pageCount}
        />
    )
}

const SortedStatModal = ({ filter }) => {
    const [session] = useSession()
    let email = session && session?.user ? session.user.email : ''
    
    return (
        <SortedStatModalWrapper
            email={email}
            filter={filter || 'allViews'}
        />
    );
}

export default SortedStatModal 