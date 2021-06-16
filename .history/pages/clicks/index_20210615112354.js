import React from 'react'
import Layout from '../../sections/Layout'
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useTable } from 'react-table'
import {useSession} from 'next-auth/client'
import { DateTime } from "luxon";

const useClickStream = () => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : '';

    const { data, error } = useSWR(session && !loading ? `/api/clicks/${email}` : null, fetcher);

    return {
        clicks: data ? data.clicks.reverse() : null,
        loading: !data && !error,
        error,
    };
}

const Click = ({ value, index }) => {
    const id = value.id
    const slug = value.slug.substring(8) 
    const owner = value.owner
    const destination = value.destination
    const city = value.request_headers.city
    const postalCode = value.request_headers.postalCode
    const country = value.request_headers.country
    const ip = value.request_headers.ip
    const timestamp = DateTime.fromMillis(parseInt(value.timestamp)).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
    const system = value.request_headers && value.request_headers['system']

    return (
        <div>
            <p> {id}, {timestamp}, {ip}, {destination} </p>
        </div>
    )
}

const ClickStreamList = ({ clicks }) => {
    const numClicks = clicks ? clicks.length : '0'

    const columns = React.useMemo(() => [
        { Header: 'ID', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'Destination', Footer: '' },
        { Header: 'City', Footer: '' },
        { Header: 'Country', Footer: '' },
        { Header: 'Postal Code', Footer: '' },
        { Header: 'Metro Code', Footer: '' },
        { Header: 'Region', Footer: '' }, 
        { Header: 'IP Address', Footer: '' },
        { Header: 'Operating System', Footer: '' },
        { Header: 'Timestamp', Footer: '' },
      ], []);


    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            
                        <table className="table-auto min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    {columns.map(function(value, index) {
                                        return (
                                            <th 
                                                key={index} 
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {value.Header}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                { clicks && clicks.length && clicks.map((value, i) => {
                                    return (
                                        <tr key={i}>
                                             <Click value={value} index={i} />   
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ClickStream = () => {
    const { clicks, loading, error } = useClickStream();

    return (
        <Layout>
             {/* <section className="text-center pt-12 sm:pt-24 pb-16">
                <h1 className="text-4xl sm:text-7xl font-bold capitalize">
                    Click Stream
                </h1>
            </section> */}

            <div style={{ border: 'thin solid black' }}>
                { 
                        error ? <p> {JSON.stringify(error)} </p>
                    :   loading ? <p> loading... </p>
                    :   <ClickStreamList clicks={clicks} /> 
                }
            </div>
        </Layout>
    )
}

export default ClickStream