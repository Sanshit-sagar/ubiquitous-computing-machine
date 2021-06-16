import React from 'react'
import Link from 'next/link';
import Layout from '../../sections/Layout'
import useSWR from 'swr'
import fetcher from '../../lib/utils'
// import { useTable } from 'react-table'
import { useSession } from 'next-auth/client'
import { DateTime } from "luxon";
import { ExternalLinkIcon, ViewGridIcon } from '@heroicons/react/solid'

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
    const ts = DateTime.fromMillis(parseInt(value.timestamp));
    const tsDiff = ts.diffNow().shiftTo(...units);
    const unit = units.find((unit) => tsDiff.get(unit) !== 0) || 'second';
    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });
    
    const fields =  {   
        'timestamp': {
            primaryText: `${ts.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}`,
            secondaryText: `${relativeFormatter.format(Math.trunc(tsDiff.as(unit)), unit)}`
        },
        'slug': {
            primaryText: value.slug.substring(8),
            secondaryText: value.destination.substring(0, 25) + "...",
            icon: <ExternalLinkIcon  className="h-5 w-5 text-blue-500" /> 
        },
        'system': {
            primaryText: value.request_headers.system ? value.request_headers.system.substring(0, 25) + "..." : " ", 
            secondaryText: ''
        },
        'geodata': {
            primaryText: value.request_headers.city + ", " + value.request_headers.country + " (" + value.request_headers.postalCode + ")",
            secondaryText: "(" + value.request_headers.latitude + "," + value.request_headers.longitude + ")",
        },
        'ip': {
            primaryText: value.request_headers.ip ? value.request_headers.ip.substring(0, 10) + "..." : null,
            secondaryText: '',
        }
    };

    return (
        <> 
            {Object.entries(fields).map(function(val, ind) {
                return (
                        <td key={ind} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-between items-center">
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {val[1].primaryText}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <Link href={val[1].secondaryText || ' '}>
                                            {val[1].secondaryText ? val[1].secondaryText : ' '}
                                        </Link>
                                    </div>
                                </div>
                                <div className="ml-6 flex-shrink-0">
                                    {val[1].icon ? val[1].icon : null}
                                </div>
                            </div>
                        </td>
                );
            })}
             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <ViewGridIcon class="h-5 w-5 text-green-500"/>
                    </button>
                </span>
            </td>
        </>
    );
}

const ClickStreamList = ({ clicks }) => {
    const numClicks = clicks ? clicks.length : '0'

    const columns = React.useMemo(() => [
        { Header: 'Timestamp', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'User Agent ', Footer: '' },
        { Header: 'Geodata', Footer: '' },
        { Header: 'IP Address', Footer: '' },
        { Header: 'Actions', Footer: '' },
      ], []);

    const revChronoClickStream = clicks.sort((a, b) => String(b.timestamp).localeCompare(a.timestamp));
    

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
                                { revChronoClickStream && revChronoClickStream.length && 
                                    revChronoClickStream.map((value, i) => {
                                        return (
                                            <>
                                                { value.destination ? 
                                                    <tr key={i}>
                                                        <Click value={value} index={i} />   
                                                    </tr>
                                                : null}
                                            </>
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