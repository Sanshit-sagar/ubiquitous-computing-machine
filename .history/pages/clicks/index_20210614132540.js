import React from 'react'
import Layout from '../../sections/Layout'
import useSWR from 'swr'
import fetcher from '../../lib/utils'

const useClickStream = () => {
    const { data, error } = useSWR('/api/clicks/stream', fetcher);

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
                            <div key={i}>
                                <p> ID: {value.id} </p>
                                <p> Path: {value.pathname} </p>
                                <p> timestamp: {value.timestamp} </p>
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