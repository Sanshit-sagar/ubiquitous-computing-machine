
import React, { useContext } from 'react'
import { useTable, useSortBy } from 'react-table'
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
        rows,
        prepareRow,
      } = useTable({ columns, data },  useSortBy );

    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(group => (
                        <tr {...group.getHeaderGroupProps()}>
                            {group.headers.map(column => {
                                return (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted? column.isSortedDesc ? ' 🔽' : ' 🔼'  : ''}
                                        </span>
                                    </th>
                                ); 
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
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
                </tbody>
            </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
        </>
    );
}

const SortedStatModal = () => {
    const email = 'sasagar@ucsd.edu'
    const { clickstream, loading, error } = useUserClickstreams(email)

    const columns = React.useMemo(() => [
        {
            Header: 'Basic Info',
            columns: [
                // {
                //     Header: 'Key',
                //     accessor: `key`,
                // },
                {
                    Header: 'Slug',
                    accessor: `slug`,
                },
                {
                    Header: 'Destination URL',
                    accessor: `destination`,
                },
            ],
        },
        {
            Header: 'Geodata',
            columns: [
                {
                    Header: 'Country',
                    accessor: `geodata.country`,
                },
                {
                    Header: 'City',
                    accessor: `geodata.city`,
                },
                {
                    Header: 'Postal Code',
                    accessor: `geodata.postalCode`,
                },
            ],
        },
        {
            Header: 'Visitor',
            columns: [
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
            ]
        }
    ], []);

    if(loading) return <Loader />
    if(error) return <p> {`Error: ${error.message}`} </p>
    
    return (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <Styles>
                    <StatisticTable columns={columns} data={clickstream} />
                </Styles>
            </div>
        </div>
    )
}

export default SortedStatModal 