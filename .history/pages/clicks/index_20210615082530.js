import React from 'react'
import Layout from '../../sections/Layout'
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useTable } from 'react-table'
import {useSession} from 'next-auth/client'

const useClickStream = () => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : '';

    const { data, error } = useSWR(session && !loading ? `/api/clicks/${email}` : null, fetcher);

    return {
        clicks: data ? data.clicks : null,
        loading: !data && !error,
        error,
    };
}

const ClickStreamList = ({ clicks }) => {
    const numClicks = clicks ? clicks.length : '0'

    return (
        <>
            <h5> Number of Clicks: {numClicks} </h5>
            { clicks && clicks.length && 
                <div style={{ backgroundColor: '#fff'}}>
                    { clicks.map((value, i) => {
                        return (
                            <div key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                                <p>{value.id}  </p>
                                <p>{value.slug} </p>
                                <p>{value.owner} </p>
                                {value.headers && 
                                    <div style={{ backgroundColor: 'red'}}>
                                        <p> {value.request_headers['host']} </p>
                                        <p> {value.request_headers['ip']} </p>
                                        <p> {value.request_headers['system']} </p>
                                        <p> {value.request_headers['city']} </p>
                                        <p> {value.request_headers['country']} </p>
                                        <p> {value.request_headers['longitude']} </p>
                                        <p> {value.request_headers['latitude']} </p>
                                        <p> {value.request_headers['postalCode']} </p>
                                        <p> {value.request_headers['metroCode']} </p>
                                        <p> {value.request_headers['region']} </p>
                                        <p> {value.request_headers['timezone']} </p>
                                    </div>                                
                                }
                                <p>{value.timestamp} </p>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

const ClickStream = () => {
    const { clicks, loading, error } = useClickStream();

    return (
        <Layout>
             <section className="text-center pt-12 sm:pt-24 pb-16">
                <h1 className="text-4xl sm:text-7xl font-bold capitalize">
                    Click Stream
                </h1>
            </section>

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