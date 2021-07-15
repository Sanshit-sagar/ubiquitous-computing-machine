import React, { useState, useContext } from 'react'

import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import { useTable, usePagination } from 'react-table'
import { Card, AnchorButton, ButtonGroup, Elevation, NumericInput } from '@blueprintjs/core'

import getColumns from './columns'
import { GlobalStore } from '../../store'

import { Dialog, DialogTrigger, DialogContent } from '../../primitives/Dialog'

const Pagination = ({
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
    loading
 }) => {
    const state = useContext(GlobalStore.State)
    const [pageIndexInput, setPageIndexInput] = useState(pageIndex + 1);

    return (
        <div className="pagination">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'start', width: '100%'}}>
                <ButtonGroup>
                    <AnchorButton loading={loading} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </AnchorButton>{' '}
                    <AnchorButton  loading={loading} onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </AnchorButton>{' '}
                    <AnchorButton  loading={loading} onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </AnchorButton>{' '}
                    <AnchorButton  loading={loading} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </AnchorButton>{' '}
                </ButtonGroup>


                <Dialog>
                    <DialogTrigger>
                        <AnchorButton>
                            open dialog    
                        </AnchorButton> 
                    </DialogTrigger>
                    <DialogContent>
                        dialog content here 
                    </DialogContent>
                </Dialog>
                

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>
                        Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                    </span>
                    <span style={{ marginRight: '10px' }}>
                        {/* | Go to page:{' '} */}
                        <NumericInput
                            value={pageIndexInput}
                            onChange={(e)=> {
                                const page = (e.target.value) ? parseInt(e.target.value) - 1 : 0
                                setPageIndexInput(page)
                                gotoPage(page)
                            }}
                        />
                    </span>{' '}
                    <div class="bp3-select">
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StatisticTable = ({ columns, data, fetchData, loading, pageCount: controlledPageCount }) => {
    const state = useContext(GlobalStore.State)

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
    );

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (       
        <Card 
            style={{ marginVertical: '20px' }}
        >
            <Card 
                className={state.darkMode ? "bp3-dark" : ""} 
                style={{ padding: '5px' }}
            >
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
            </Card>
            <Card 
                className={state.darkMode ? "bp3-dark" : ""}
                interactive={true} 
                elevation={Elevation.ONE}
                style={{ marginTop: '20px', padding: '2.5px', border: 'thin solid black', borderRadius: '5px' }}
            >      
                <table 
                    {...getTableProps()} 
                    className="bp3-html-table bp3-html-table-striped bp3-html-table-bordered 
                                bp3-html-table-condensed bp3-interactive bp3-small"
                >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th  
                                        {...column.getHeaderProps()} 
                                        className={loading ? "bp3-skeleton" : ""}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
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
                            );
                        })}
                    </tbody>
                </table>
            </Card>
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