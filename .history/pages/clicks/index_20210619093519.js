import React from 'react'
import Link from 'next/link';
import useSWR from 'swr'
import {fetcher} from '../../lib/utils'

import StackedLayout from '../../sections/StackedLayout'
import CustomSpinner from '../../buildingBlocks/Spinner'

import { useSession } from 'next-auth/client'
import { DateTime } from "luxon";
import { ExternalLinkIcon } from '@heroicons/react/solid'


export const useDateTimeConverter = (timestamp) => {
    const units = [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
    ];
    
    const ts = DateTime.fromMillis(parseInt(timestamp));
    const tsDiff = ts.diffNow().shiftTo(...units);
    const unit = units.find((unit) => tsDiff.get(unit) !== 0) || 'second';
    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });

    var localizedDatetime = {
        primaryText: `${ts.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}`,
        secondaryText: `${relativeFormatter.format(Math.trunc(tsDiff.as(unit)), unit)}`
    }    

    return localizedDatetime
}

const Click = ({ value, index, uid }) => {
    const localizedDatetime = useDateTimeConverter(value.timestamp)
    
    const fields =  {   
        'id': {
            primaryText: `#${index}`,
            secondaryText: '', //assign mutation or uuid here?
        },
        'timestamp': {
            primaryText: localizedDatetime.primaryText,
            secondaryText: localizedDatetime.secondaryText,
        },
        'slug': {
            primaryText: value.slug.substring(8),
            secondaryText: value.destination,
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
                <td key={ind} className="whitespace-nowrap">
                    <div className="flex justify-between items-center">
                        
                        <div>
                            <div className="text-sm">
                                {val[1].primaryText}
                            </div>
                            <div className="text-sm">
                                <Link href={val[1].secondaryText || ' '}>
                                    {val[1].secondaryText ? val[1].secondaryText : 'N/A'}
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
    </>
    );
}

const ClickStreamTable = ({ clicks }) => {
    const [session, loading] = useSession()

    const uid = session && !loading ? session.user.email : ''
    const numClicks = clicks ? clicks.length : '0'

    const columns = React.useMemo(() => [
        { Header: 'Timestamp', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'User Agent ', Footer: '' },
        { Header: 'Geodata', Footer: '' },
        { Header: 'IP Address', Footer: '' },
        { Header: 'Actions', Footer: '' },
      ], []);

    const clickStream = clicks ? clicks : []
    // .sort((a, b) => String(b.timestamp).localeCompare(a.timestamp))

    return (
        <div class="container">
            <table className="table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(function(value, index) {
                            return (
                                <th 
                                    key={index} 
                                    scope="col"
                                    className="text-left text-xs font-medium text-gray-500"
                                >
                                    {value.Header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                        { clickStream && clickStream.length ? clickStream.reverse().map((value, index) => {
                            return (
                                <tr key={index}>
                                    <Click value={value} index={index} uid={uid} />  
                                </tr>
                            );
                        }) : null}
                </tbody>
            </table>
        </div>
    );
}

const clickStreamMetadata = {
     title: 'Click Stream',
     description: `Maintain a realtime log of incoming requests for one of the users shortened slugs`,
}

const useClickStream = () => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : '';

    const { data, error } = useSWR(session && !loading ? `/api/clicks/${email}` : null, fetcher);

    return {
        clicks: data ? data.clicks : null,
        clicksLoading: !data && !error,
        clicksError: error
    };
}

const ClickStreamCache = () => {
    const { clicks, loading, error  } = useClickStream();

    return (
        // <StackedLayout
            // pageMeta={clickStreamMetadata}
            // children=
        <>
            {!loading && !error ?  <ClickStreamTable clicks={clicks} />  : 
            loading ? <CustomSpinner /> : 
            <p> error! </p>}
        </>
    );
}

export default ClickStreamCache