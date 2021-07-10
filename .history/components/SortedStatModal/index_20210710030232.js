
import React, { useContext } from 'react'
import { useTable } from 'react-table'

import useSWR from 'swr'
import axios from 'axios'
import Loader from '../Loader/index'

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
      } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(group => (
                    <tr {...group.getHeaderGroupProps()}>
                        {group.headers.map(column => {
                            return (
                                <th 
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        background: 'aliceblue',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                            ); 
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr 
                            {...row.getRowProps()}
                            style={{
                                padding: '10px',
                                border: 'solid 1px gray',
                                background: 'papayawhip',
                            }}
                        >
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
    );
}

const SortedStatModal = () => {
    const email = 'sasagar@ucsd.edu'
    const { clickstream, loading, error } = useUserClickstreams(email)

    const columns = React.useMemo(() => [
        {
            Header: 'Basic Info',
            columns: [
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
                
                <StatisticTable 
                    columns={columns} 
                    data={clickstream} 
                /> 
            </div>
        </div>
    )
}

export default SortedStatModal 