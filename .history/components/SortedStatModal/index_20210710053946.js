
import React from 'react'
import Link from 'next/link'

import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'

import useSWR from 'swr'
import axios from 'axios'
import Loader from '../Loader/index'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const fetcher = url => axios.get(url).then(res => res.data)

function useUserClickstreams(email)  {
    const time = 30;
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


const StatisticTable = ({ columns, data }) => {
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
        <>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        }, null, 2
                    )}
                </code>
            </pre>
            
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                : ''}
                            </span>
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
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                     <tr>
                        {loading ? (<td>Loading...</td>) : (
                            <td>
                                Showing {page.length} of ~{controlledPageCount * pageSize}{' '} results
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

const SortedStatModal = () => {
    const email = 'sasagar@ucsd.edu'
    const { clickstream, loading, error } = useUserClickstreams(email)

    const columns = React.useMemo(() => [
        {
            Header: 'Key',
            accessor: `key`,
            Cell: ({ value }) => {
                return (
                    <Link href={value && value.length ? value : '/'}>
                        {value && value?.length ? `${value.substring(0,5)}` : '-'}
                    </Link>
                ); 
            },
            width: 75,
        },
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Destination URL',
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <Link href={value && value.length ? value : '/'}>
                        {value && value?.length ? `${value.substring(0,20)}...` : '-'}
                    </Link>
                ); 
            }
        },
        {
            Header: 'Country',
            accessor: `geodata.country`,
            width: 75,
        },
        {
            Header: 'City',
            accessor: `geodata.city`,
            width: 125,
        },
        {
            Header: 'Postal Code',
            accessor: `geodata.postalCode`,
            width: 75,
        },
        {
            Header: 'IP Address',
            accessor: `visitor.ip`,
        },
        {
            Header: 'Host',
            accessor: `visitor.host`,
        },
        {
            Header: 'User Agent',
            accessor: `visitor.system`,
        },   
        {
            Header: 'Accessed at',
            accessor: `timestamp`,
            Cell: ({ value }) => {
                let timestamp = parseInt(value);
                let localeTime = new Date(timestamp).toLocaleTimeString();
                let dateString = new Date(timestamp).toDateString();
                return (
                    <span> {`${localeTime}, ${dateString}`} </span>
                );
            }
        },
        {
            Header: 'Time taken',
            accessor: `misc.timeTaken`
        }, 
    ], []);

    const [data, setData] = React.useState([])
    const [dataLoading, setDataLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        setDataLoading(true);

        setTimeout(() => {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                
                if(!loading && !error && clickstream && clickstream?.length) {
                    setData(clickstream.slice(startRow, endRow));
                    setPageCount(Math.ceil(clickstream.length / pageSize));
                } else {
                    setData([]);
                    setPageCount(0)
                }
                setDataLoading(false)
            }
        }, 1000)
    }, [])

    if(loading) return <Loader />
    if(error) return <p> {`Error: ${error.message}`} </p>
    
    return (
        <div className="inline-block align-middle min-w-full">
            <Styles>
                <StatisticTable 
                    columns={columns} 
                    data={data} 
                    fetchData={fetchData}
                    loading={dataLoading}
                    pageCount={pageCount}
                />
            </Styles>
        </div>
    )
}

export default SortedStatModal 