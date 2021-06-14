import React from 'react';
import Layout from '../../sections/Layout'

const useClickStream = () => {
    const { data, error } = useSWR('https://cold-cell-7c15.hashably.workers.dev/api/click-stream', fetcher);

    return {
        clicks: data.clicks,
        loading: !data && !error,
        error,
    };
}

const ClickStreamList = ({ clicks }) => {
    const numClicks = clicks.length;

    return (
        <>
            <h5> Number of Clicks: {numClicks} </h5>
            <p> {JSON.stringify(clicks)} </p>
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
                        error ? <p> error... </p>
                    :   loading ? <p> loading... </p>
                    :   <ClickStreamList clicks={clicks} /> 
                }
            </div>
        </Layout>
    )
}

export default ClickStream