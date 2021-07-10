
import React, { useContext } from 'react'
import Loader from '../Loader/index'

const StatisticTable = () => {

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
    
    return (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                
                <StatisticTable 
                    columns={columns} 
                    data={clickstream} 
                    loading={loading} 
                    error={error} 
                /> 
            </div>
        </div>
    )
}

export default SortedStatModal 