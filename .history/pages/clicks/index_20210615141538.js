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
        clicks: data ? data.clicks : null,
        loading: !data && !error,
        error,
    };
}

const units = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
];

const Click = ({ value, index }) => {
    const ts = value.timestamp ? DateTime.fromMillis(parseInt(value.timestamp)) : null;
    const tsDiff = ts.diffNow().shiftTo(...units);
    const unit = units.find((unit) => tsDiff.get(unit) !== 0) || 'second';
    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });

    const fields =  {
        'id': `#${index}`,
        'slug': value.slug ? value.slug.substring(8) : null, 
        'geodata': value.request_headers ? `${value.request_header.city || ' '} ${value.request_headers.country || ' '} - ${value.request_headers.postalCode || ' '} ${value.request_headers.region || ' '} ${value.request_headers.metroCode || ' '}` : null,
        // 'coordinates': `(${value.request_headers.latitude}, ${value.request_headers.longitude})`,
        // 'metroCode': value.request_headers.metroCode,
        'ip': value.request_headers.ip ? value.request_headers.ip.substring(0, 10) + "..." : null,
        'system': value.request_headers.system ? value.request_headers.system.substring(0, 25) + "..." : " ", 
        // 'timestamp': ts.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS),
        'timestamp': `${ts.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)} [${relativeFormatter.format(Math.trunc(tsDiff.as(unit)), unit)}]`,
        'destination': value.destination,
    };

    return (
        <>
            {Object.entries(fields).map(function(value, ind) {
                return (
                    <td key={ind} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                                {value[1]}
                            </div>
                        </div>
                    </td>
                );
            })}
        </>
    );
}

const ClickStreamList = ({ clicks }) => {
    const numClicks = clicks ? clicks.length : '0'

    const columns = React.useMemo(() => [
        { Header: 'ID', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'Geodata', Footer: '' },
        // { Header: 'Country', Footer: '' },
        // { Header: 'Postal Code', Footer: '' },
        // { Header: 'Metro Code', Footer: '' },
        // { Header: 'Coordinates', Footer: '' }, 
        // { Header: 'Latitude', Footer: '' }, 
        // { Header: 'Metro Code', Footer: '' }, 
        { Header: 'IP Address', Footer: '' },
        { Header: 'User Agent ', Footer: '' },
        { Header: 'Timestamp', Footer: '' },
        { Header: 'Destination', Footer: '' },
      ], []);


    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        
                        <table className="table-auto min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
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

                            <tbody className="bg-white divide-y divide-gray-200">
                                { clicks && clicks.length && 
                                    clicks.sort((a, b) => { b.timestamp - a.timestamp }).reverse().map((value, i) => {
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

            
            { 
                    error ? <p> {JSON.stringify(error)} </p>
                :   loading ? <p> loading... </p>
                :   <ClickStreamList clicks={clicks} /> 
            }
        </Layout>
    )
}

export default ClickStream