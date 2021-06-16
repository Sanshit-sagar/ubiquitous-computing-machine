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

const ClickStreamList = ({ clicks }) => {
    const numClicks = clicks ? clicks.length : '0'
    
    return (
        <>
            {/* <h5> 
                Number of Clicks: {numClicks} 
            </h5> */}
            
            <div>
                <ul className="divide-y divide-gray-200">
                    { clicks && clicks.length && clicks.map((value, i) => {
                        return (
                            <li key={i} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium"> 
                                                {value.slug}  
                                            </h3>
                                            <p className="text-sm text-gray-500"> 
                                                {value.request_headers.city}, {value.request_headers.postalCode}, {value.request_headers.country} 
                                            </p>
                                            <p className="text-sm text-gray-500"> 
                                                {value.request_headers.ip} 
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {DateTime.fromMillis(parseInt(value.timestamp)).toLocaleString({ month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            {value.request_headers && 
                                                <p className="text-sm text-gray-500">
                                                    {value.request_headers['system']}
                                                </p>                         
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
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