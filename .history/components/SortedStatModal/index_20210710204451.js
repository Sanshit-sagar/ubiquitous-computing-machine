
import React from 'react'
import Link from 'next/link'

import { useSession } from 'next-auth/client'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'

import useSWR from 'swr'
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
// function useUserClickstreams(email) {
//     let time = '30'
//     const { data, err } = useSWR(email && email?.length ? `/api/stream/users/${email}?time=${time}` : null)

//     return {
//         clickstream: data ? data.clickstream : [],
//         isLoading: !data && !err,
//         isError: err
//     };
// }

// function useUserUniqueClickstream(email)  {
//     const { data, err } = useSWR(email && email?.length ? `/api/stream/uniques/${email}` : null)

//     return {
//         uniques: data ? data.uniques : [],
//         isLoading: !data && !err,
//         isError: err
//     };
// }


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
    );

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])
    

    return (
        <>
            {/* <pre>
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
            </pre> */}

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
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

function useFilteredStatList(email, filter)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/filtered/${email}?filter=allLinks` : null)

    return {
        filteredData: data ? data.filteredData : [],
        isLoading: !data && !err,
        isError: err
    };
}

const SortedStatModal = ({ filter }) => {
    const [session, sessionLoading] = useSession();

    let email = session && session?.user ? session.user.email : '';
    const { filteredData, isLoading, isError } = useFilteredStatList(email, filter)

    if(sessionLoading) return <Loader />
    if(isError) return <p> {`Error: ${isError.message}`} </p>
    
    return (
        <div className="inline-block align-middle min-w-full">
            {/* <Styles>
                <StatisticTable 
                    columns={columns} 
                    data={data} 
                    fetchData={fetchData}
                    loading={dataLoading}
                    pageCount={pageCount}
                />
            </Styles> */}
            <p> {`${email}--${filter}`} </p>
            <p> {isLoading ? <Loader /> : <p> {JSON.stringify(filteredData)} </p>} </p>
        </div>
    )
}

export default SortedStatModal 