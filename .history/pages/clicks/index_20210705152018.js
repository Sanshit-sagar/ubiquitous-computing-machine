import React from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router'
import useSWR from 'swr'

import { fetcher } from '../../lib/utils'

import StackedLayout from '../../sections/StackedLayout'
import CustomSpinner from '../../buildingBlocks/Spinner'

import { useSession, getSession } from 'next-auth/client'
import { DateTime } from "luxon";
import { ExternalLinkIcon } from '@heroicons/react/solid'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    Pagination
  } from '@windmill/react-ui'

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
    const router = useRouter()
    const localizedDatetime = useDateTimeConverter(value.timestamp)
    
    const fields =  {   
        'timestamp': {
            primaryText: localizedDatetime.primaryText,
            secondaryText: localizedDatetime.secondaryText,
        },
        'slug': {
            primaryText: value.slug.substring(8),
            secondaryText: value.destination ? value.destination.substring(0,35) + "..." : ' ',
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
            primaryText: value.request_headers.ip ? value.request_headers.ip.substring(0, 20) + "..." : null,
            secondaryText: '',
        }
    };

    return (
    <> 
        {Object.entries(fields).map(function(val, ind) {
            return (
                <TableCell key={ind}>
                    <div className="flex justify-between items-center">
                        
                        <div>
                            <div className={ind===1 ? "text-sm text-blue-700" : "text-sm"}>
                                {val[1].primaryText}
                            </div>
                            <div className="text-sm max-w-sm flex-auto flex-wrap">
                                <Link href={val[1].secondaryText || ' '}>
                                    {val[1].secondaryText ? val[1].secondaryText : ' '}
                                </Link>
                            </div>
                        </div>
                        <button 
                            className="ml-6 flex-shrink-0" 
                            onClick={() => router.push(val && val[1].secondaryText ? `${val[1].secondaryText}` : '#')}
                        >
                            {val[1].icon ? val[1].icon : null}
                        </button>
                    </div>
                </TableCell>
            );
        })}
    </>
    );
}

const ClickStreamTable = ({ clicks, reval }) => {
    const [session, loading] = useSession()
    // const [backupLoading, setBackupLoading] = React.useState(false)

    const uid = session && !loading ? session.user.email : ''
  

    const columns = React.useMemo(() => [
        { Header: 'Timestamp', Footer: '' },
        { Header: 'Slug', Footer: '' },
        { Header: 'User Agent ', Footer: '' },
        { Header: 'Geodata', Footer: '' },
        { Header: 'IP Address', Footer: '' },
      ], []);

    let clickStream = clicks ? clicks.slice(0, 6) : []

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map(function(value, index) {
                            return (
                                <TableCell key={index}>
                                    {value.Header}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    { clickStream.map((value, index) => {
                        // if(!value.slug) return null;
                        // if(vale)
                        return (
                            <TableRow key={index}>
                                <Click value={value} index={index} uid={uid} />  
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            
            <TableFooter>
                <Pagination 
                    totalResults={clicks.length} 
                    resultsPerPage={8} 
                    onChange={() => {
                        clickStream = clicks.slice(8, 16)
                    }} 
                    label="Table navigation" 
                />
            </TableFooter>
        </TableContainer>
    );
}

const clickStreamMetadata = {
     title: 'Click Stream',
     description: `Maintain a realtime log of incoming requests for one of the users shortened slugs`,
}

const useClickStream = () => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : '';

    const { data, error } = useSWR(session && !loading ? `/api/clicks/${email}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    });

    return {
        clicks: data ? data.clicks : null,
        clicksLoading: !data && !error,
        clicksError: error
    };
}

const ClickStreamCache = () => {
    const [mounted, setMounted] = React.useState(false)
    const [reval, setReval] = React.useState(0)
    const [sortedClicks, setSortedClicks] = React.useState([])

    const { clicks, loading, error  } = useClickStream();
    

    React.useEffect(() => {
        if(!mounted && clicks && clicks.length && !loading && !error) {
            setMounted(true); 
            setReval(reval + 1)

            let tempClicks = []; 
            clicks.forEach((click, index) => {
                tempClicks.push(click)
            });
            setSortedClicks(tempClicks.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)));
        }
    }, [mounted, clicks, loading,error, sortedClicks, reval]);

    return (
        <>
            <StackedLayout
                pageMeta={clickStreamMetadata}
                children={!loading && !error 
                    ? sortedClicks ? <ClickStreamTable clicks={sortedClicks} reval={reval} />  : <p> sorting them... </p>
                    : loading ? <CustomSpinner /> 
                    :  <p> error! </p>
                } 
            />
        </>
    );
}

export default ClickStreamCache


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)

    if (!session) {
      ctx.res.writeHead(302, { Location: '/' })
      ctx.res.end()
      return {}
    }
  
    return {
      props: {
        user: session.user,
      },
    }
  }


