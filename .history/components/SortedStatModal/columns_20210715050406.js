import { useMemo } from 'react' 
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../Loader'

import { Button, Tag, Spinner } from '@blueprintjs/core'
import { Tooltip2 } from '@blueprintjs/popover2'
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline'
import { Dialog, DialogTrigger, DialogContent } from '../../primitives/Dialog'

function ellipses(text, maxlen) {
    if(text && text.length) {
        return `${text.substring(0,maxlen)}${text.length>maxlen?'...':''}`; 
    }
    return '';
}

export const timeAgo = (dateTime) => {
    const units = [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
    ];

    const diff = dateTime.diffNow().shiftTo(...units);
    const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';
    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });

    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

const UserAgentCell = ({ data, title, isLoading }) => {
    return (
        <span className="text-xs font-extralight text-black"> 
            {data} 
        </span>
    ); 
}

export const useViewsBySlug = (email, slug) => {
   
    const { data, error } = useSWR(email && email.length && slug && slug.length ? `/api/stream/slugs/${slug}?email=${email}` : null)

    return {
        views: data ? data.views : undefined,
        viewsLoading: !data && !error,
        viewsError: error
    }
}

const SlugProfile = ({ slug }) => {

    return (
        <p> yoyoyo dawg, hellow from {slug} 222 </p>
    );
}

const SlugNameCell = ({ slugName }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '275px' }}>
            <span>
                <Dialog>
                    <DialogTrigger>
                        <Button icon="maximize" />
                    </DialogTrigger>
                    <DialogContent>
                        <SlugProfile slug={slugName} /> 
                    </DialogContent>
                </Dialog>
            </span> 
            <span className="text-xs font-extralight">
                {ellipses(slugName, 30)} 
            </span>
            <span style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button 
                    icon="document-open" 
                    minimal={true} 
                    intent="primary"
                    onClick={() => router.push(`https://writer.hashably.workers.dev/${slugName}`)} 
                />
                <Button 
                    icon="clipboard" 
                    minimal={true} 
                    intent="none" 
                />
            </span>
        </div>
    )
}

function getIntent(progressValue) {
    if(progressValue >= 80) return "success";
    else if(progressValue >= 60) return "none";
    else if(progressValue >= 40) return "warning";
    return "danger";
}

const getColumns = (key, email, cellsLoading) => {
    const router = useRouter()

    if(!key || !key.length) {
        return null; 
    }

    const handleDisplaySlug = (slug) => {
        alert(`displaying... ${slug}`);
    }
   
    const allViewsColumns = useMemo(() => [
        {
            Header: <Button rightIcon="link" text='Slug' minimal={true} fill={true} alignText="left" />,
            accessor: `links`,
            Cell: ({ value }) => {
                return (
                     <SlugNameCell slugName={value.slug} />
                );
            },
        },
        {
            Header: <Button rightIcon="link" text='Destination' minimal={true} fill={true}  alignText="left"/>,
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <span className="text-xs font-extralight "> 
                            {ellipses(value.hostname, 35)}
                        </span>
                        <span>
                            <Button 
                                icon="document-open" 
                                minimal={true} 
                                intent="none" 
                            />
                        </span>
                    </div>
                );
            }
        },
        {
            Header: <Button rightIcon="geolocation" text="Location" minimal={true} fill={true} alignText="left" />,
            accessor: `geodata`,
            Cell: ({ value }) => {
                return (
                    <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ marginRight:'5px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <span className="text-xs font-extralight text-gray-900"> 
                                {value.location} 
                            </span>
                            <span className="text-xs font-extralight text-gray-600 dark:text-gray-200"> 
                                ({value.coordinates}) 
                            </span>
                        </span>
                    </span>
                 );
            }
        },
        {
            Header: <Button rightIcon="ip-address" text="IP Address" minimal={true} alignText="left" fill={true} />,
            accessor: `ipInfo`,
            Cell: ({ value }) => {
                return (
                    <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>    
                        <span className="text-xs font-extralight text-gray-900 dark:text-white">
                            {value.ip} 
                        </span>
                    </span>
                );
            }
        },
        {
            Header: <Button text='Browser' rightIcon="globe" minimal={true} alignText="left" />,
            accessor: `browser`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Browser" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text='OS' rightIcon="desktop" minimal={true} alignText="left" />,
            accessor: `os`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Operating System" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text='Timestamp' rightIcon="calendar" minimal={true} alignText="left" />,
            accessor: `timestamp`,
            Cell: ({ value }) => {
                let timestampVal = parseInt(value)

                return (
                    <Button 
                        text={
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                    <span className="text-xs font-extralight"> 
                                        {DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)} 
                                    </span>
                                    <span className="text-xs font-extralight"> 
                                        {`${timeAgo(DateTime.fromMillis(timestampVal))}`}
                                    </span>
                                </div>
                            } 
                        alignText="left" 
                        fill={true} 
                        minimal={true} 
                    /> 
                );
            }
        },
        {
            Header: 'Views',
            accessor: `slug`,
            Cell: ({ value }) => {
                let slug = value; 
                const { views, viewsLoading, viewsError } = useViewsBySlug(email, slug); 

                const delta = 1

                if(viewsLoading) return <Loader />;
                if(viewsError) return <p> error! </p>;
                return (
                    <div className="inline-flex justify-start align-start w-full">
                        <div className="flex-col justify-between align-stretch">
                            <div className="text-xs font-extralight text-black">  
                                {views.total} total
                            </div>
                            <div className="text-xs font-extralight text-black">
                                {views.unique} unique
                            </div> 
                        </div>
                        <div className="inline-flex justify-end align-center">
                            {   delta > 0 ? 
                                <TrendingUpIcon className="h-5 w-5 text-green-500" /> :
                                <TrendingDownIcon className="h-5 w-5 text-red-300" />
                            }
                        </div>
                    </div>
                ); 
            }
        }
    ], []);

    const mostViewedPagesColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Views',
            accessor: `views`,
            width: 75,
        },
    ], []);
    
    const uniqueVisitorsColumns = useMemo(() => [
        {
            Header: 'IP Address',
            accessor: `ip`,
        },
        {
            Header: 'Views',
            accessor: `views`,
        },
    ], []); 

    const allLinksColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
            Cell: ({ value }) => {
                return (
                    <SlugNameCell slugName={value} /> 
                );
            }
        },
        {
            Header: 'Destination',
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start' }}>
                        <span className="text-xs font-extralight"> 
                            {ellipses(value, 30)}
                        </span>
                        <span>
                            <Button icon="document-open" minimal={true} intent="none" />
                        </span>
                    </div>
                );
            }
        },
        {
            Header: 'Creation',
            accessor: `datetime`,
            Cell: ({ value }) => {
                let dateObj = new Date(value); 
                let timestampVal = parseInt(dateObj.getTime().toString())

                return (
                    <Button 
                        text={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                <span className="text-xs font-light"> 
                                    {DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)} 
                                </span>
                                <span className="text-xs font-extralight"> 
                                    {`${timeAgo(DateTime.fromMillis(timestampVal))}`}
                                </span>
                            </div>
                        } 
                        alignText="left" 
                        fill={true} 
                        minimal={true} 
                    /> 
                );
            }
        },
        {
            Header: 'Expiration',
            accessor: `ttl`,
            Cell: ({ value }) => {
                if(!value || !value.length) return null;

                let dateObj = new Date(value); 
                let timestampVal = parseInt(dateObj.getTime().toString()) 
                let doesExpire = timestampVal && timestampVal > 0

                return (
                    <Button 
                        text={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                <span className="text-xs font-extralight"> 
                                    {doesExpire ? DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT) : null} 
                                </span>
                                <span className="text-xs font-extralight"> 
                                    {doesExpire ? `${timeAgo(DateTime.fromMillis(timestampVal))}` : null}
                                </span>
                            </div>
                        } 
                        alignText="left" 
                        fill={true} 
                        minimal={true} 
                    /> 
                );
            }
        },
        {
            Header: 'Health',
            accessor: `expiry`,
            Cell: ({ value }) => {
                if(!value) return null;

                let now = new Date().getTime();
                const isActive = !value || !value.length || parseInt(value)>now
                return (
                    <Tag 
                        interactive={false}
                        large={false}
                        minimal={true}
                        round={true}
                        intent={isActive ? "success" : "danger"}
                    >
                        {`${isActive ? 'Active' : 'Expired'}`}
                    </Tag>
                );
            }
        },
        {
            Header: 'Life Remaining',
            accessor: `lifeleftPct`,
            Cell: ({ value }) => {
                let progress = value/100;
                return (
                    <>{ value===0 ? null :
                    <span className="inline-flex justify-between align-stretch">
                        <span>
                            <Spinner
                                size="20"
                                value={progress}
                                intent={getIntent(value)}
                            />
                        </span>
                        <span className="inline-flex justify-between align-stretch ml-3">
                            {value}%
                        </span>
                    </span>
                 }</>
                )
            }
        },
        {
            Header: 'HTTP',
            accessor: `routingStatus`,
            Cell: ({ value }) => {
                return (
                    <Tag intent="primary">
                        {`${value}`}
                    </Tag>
                );      
            }
        },
        {
            Header: 'Secured',
            accessor: `password`,
            Cell: ({ value }) => {
                const isSecure = value && value.length
                return (
                    <Tooltip2 
                        interactionKind="hover"
                        placement="top"
                        content={
                            <span className="inline-flex justify-between align-stretch w-full">
                                <span className="text-xs font-extralight">
                                    {isSecure ? `Password: ${JSON.stringify(value)}` : 'Not secured. '}
                                </span>
                                {!isSecure ? <a href="#"> Add Password? </a> : null}
                            </span>
                        }
                    >
                        <Button 
                            minimal={true} 
                            icon={isSecure ? 'lock' : 'unlock'} 
                            intent={isSecure ? 'success' : 'warning'} 
                        />
                    </Tooltip2>
                );
            }
        },
        {
            Header: 'Blacklist',
            accessor: `blacklist`,
            Cell: ({ value }) => {
                return (
                    <> {value && value.length ?
                        <Tooltip2 
                            interactionKind="hover" 
                            content={JSON.stringify(value)}
                            placement="top"
                        >
                            <Tag
                                minimal={false}
                                rounde={false}
                                rightIcon="array"
                            >
                                {value.length}
                            </Tag> 
                        </Tooltip2>
                    : null } </>
                )
            }
        },
    ], []); 

    if(key==='mostViewedPages') {
        return mostViewedPagesColumns;
    } else if(key==='allViews') {
        return allViewsColumns; 
    } else if(key==='uniqueVisitors') {
        return uniqueVisitorsColumns;
    } else if(key==='allLinks') {
        return allLinksColumns;
    }

    return null; 
}

export default getColumns 