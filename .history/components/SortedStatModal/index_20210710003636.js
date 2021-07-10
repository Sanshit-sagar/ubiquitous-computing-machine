
import React, { useContext } from 'react'

import Loader from '../Loader/index'


const SortedStatTable = () => {

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {headers.map(function(value, index) {
                        return (
                            <th 
                                key={index} 
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {value}
                            </th>
                        )
                    })}
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <time dateTime={payment.datetime}>
                                {payment.date}
                            </time>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.amount}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const SortedStatModal = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Basic Info',
                columns: [
                    {
                        Header: 'Slug',
                        accessor: 'clickstream.slug',
                    },
                    {
                        Header: 'Destination URL',
                        accessor: 'clickstream.destination',
                    },
                ],
            },
            {
                Header: 'Geodata',
                columns: [
                    {
                        Header: 'Country',
                        accessor: 'age',
                    },
                    {
                        Header: 'City',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Postal Code',
                        accessor: 'status',
                    },
                ],
            },
            {
                Header: 'Geodata',
                columns: [
                    {
                        Header: 'Country',
                        accessor: 'age',
                    },
                ]
            }
    ], []);
    
    return (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
               
                <SortedStatTable /> 
        
            </div>
        </div>
    )
}

export default SortedStatModal 