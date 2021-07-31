import { useMemo } from 'react' 
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import useSWR from 'swr'

import { Button, Tag, Spinner, Icon } from '@blueprintjs/core'

import Loader from '../Loader'
import { StyledTooltip } from '../../primitives/Tooltip'
import { ellipses, getIntent } from '../../lib/utils'
import { timeDifference } from '../../lib/datetime'

import { 
    TriangleUpIcon, 
    TriangleDownIcon
} from '../../primitives/Icons'
import { DrawingPinIcon, DashIcon } from '@radix-ui/react-icons'

import SlugProfileDialog from '../SlugProfile/SlugProfileDialog'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { AccessibleIcon } from '../../primitives/Text'

const UserAgentCell = ({ data, title, isLoading }) => {
    return (
        <span className="text-xs font-extralight"> 
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

export const useSlugDetails = (slug) => {
    const { data, error } = useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);

    return {
        details: data ? data.details : undefined,
        loading: !data && !error,
        error,
    }; 
}


const SlugNameCell = ({ slugName }) => {
    return <SlugProfileDialog slugName={slugName} />;
}

export const SlugViewsCell = ({ slug, email }) => {
    const { views, viewsLoading, viewsError } = useViewsBySlug(email, slug); 

    if(viewsLoading) return <Loader />;
    if(viewsError) return <p> error! </p>;

    return (
        <div className="inline-flex justify-start align-start w-full">
            <div className="flex-col justify-between align-stretch">
                <div className="text-xs font-extralight">  
                    {views.total} total
                </div>
                <div className="text-xs font-extralight">
                    {views.unique} unique
                </div> 
            </div>
        </div>
    ); 
}
const StyledHeader = ({ name }) => {
    return (
        <Box css={{ minWidth: '75px' }}>
            <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'center'}}>
                <Text>{name}</Text>
            </Flex>
        </Box>
    )
}

const StyledCell = ({ value }) => {
    return (
        <Box css={{ minWidth: '80px' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'center'}}>
                <span className="text-xs font-extralight"> 
                    {value} 
                </span> 
            </Flex>
        </Box>
    )
}

const getColumns = (key, email, cellsLoading) => {
    const router = useRouter()

    if(!key || !key.length) {
        return null; 
    }
   
    const allViewsColumns = useMemo(() => [
        {
            Header: <StyledHeader name={"Slug"} />,
            accessor: `links`,
            Cell: ({ value }) => {
                return (
                     <SlugNameCell slugName={value.slug} />
                );
            },
        },
        {
            Header: <StyledHeader name={"Destination URL"} />,
            accessor: `destination`,
            Cell: ({ value }) => {
                let hostname = ellipses(value.hostname.substring(0,15), 35);
                return (
                    <StyledCell value={`${hostname}...`} />
                );
            }
        },
        {
            Header: <StyledHeader name={"Geodata"} />,
            accessor: `geodata`,
            Cell: ({ value }) => {
                let coords = value.coordinates.split('.')
                let xCoord = `${coords[0]}.{coords[1].split(' ')[0]}`;
                let yCoord = `${coords[1]}.{coords[0].split(' ')[1]}`;

                return <StyledCell value={value.location} />
            }
        },
        {
            Header: <StyledHeader name={"IP Address"} />,
            accessor: `ipInfo`,
            Cell: ({ value }) => {
                return (
                    <StyledCell value={value.ip} />
                );
            }
        },
        {
            Header: <StyledHeader name={"Browser"} />,
            accessor: `browser`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Browser" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <StyledHeader name={"OS"} />,
            accessor: `os`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Operating System" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <StyledHeader name={"Engine"} />,
            accessor: `engine`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Engine" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <StyledHeader name={"Timestamp"} />,
            accessor: `timestamp`,
            Cell: ({ value }) => {
                let timestampVal = parseInt(value)
                let localeTimeStr = DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)

                return (
                    <StyledCell value={`${localeTimeStr}`} />
                );
            }
        },
        {
            Header: <StyledHeader name={"Views"} />,
            accessor: `slug`,
            Cell: ({ value }) => {
                return (
                    <SlugViewsCell slug={value} email={email} /> 
                )
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
            Header: <Button rightIcon="id-number" text='Slug' minimal={true} fill={true}  alignText="left"/>,
            accessor: `slug`,
            Cell: ({ value }) => {
                return (
                    <SlugNameCell slugName={value} /> 
                );
            }
        },
        {
            Header: <Button rightIcon="link" text='Destination' minimal={true} fill={true}  alignText="left"/>,
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <span style={{ width: '175px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       
                            <Button 
                                rightIcon="document-open" 
                                minimal={true} 
                                text={`${value.substring(0,20)}...`}
                                intent="primary"
                                alignText="left"
                                fill={true}
                                onClick={() => router.push(`${destination}`)}
                            // onClick={() => router.push(`https://writer.hashably.workers.dev/${slugName}`)} 
                        />
                    </span>
                );
            }
        },
        {
            Header: <Button text='Created At' rightIcon="calendar" minimal={true} alignText="left" fill={true} />,
            accessor: `datetime`,
            Cell: ({ value }) => {
                let dateObj = new Date(value); 
                let timestampVal = parseInt(dateObj.getTime().toString())

                return (
                    <Button 
                        text={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                <span className="text-xs font-extralight"> 
                                    {DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)} 
                                </span>
                                <span className="text-xs font-extralight"> 
                                    {`${timeDifference(DateTime.fromMillis(timestampVal))}`}
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
            Header: <Button text='Expiry' rightIcon="outdated" minimal={true} alignText="left" fill={true} />,
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
                                    {doesExpire ? `${timeDifference(DateTime.fromMillis(timestampVal))}` : null}
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
            Header: <Button text='Health' rightIcon="lifesaver" minimal={true} alignText="left" fill={true} />,
            accessor: `expiry`,
            Cell: ({ value }) => {
                if(!value || value===NaN) return <Tag minimal round intent="success"> Active </Tag>;

                let now = new Date().getTime();
                const isActive = !value || !value.length || parseInt(value)>now
                let doesExpire = value==='NaN' || !value

                return (
                    <Tag 
                        interactive={false}
                        large={false}
                        minimal={true}
                        round={true}

                        intent={isActive || doesExpire ? "success" : "danger"}
                    >
                        <span className="text-xs font-extralight">
                            {value==='NaN' ? 'Immortal' : `${isActive ? 'Active' : 'Expired'}`}
                        </span>
                    </Tag>
                );
            }
        },
        {
            Header: <Button text='TTL' rightIcon="time" minimal={true} alignText="left" fill={true} />,
            accessor: `lifeleftPct`,
            Cell: ({ value }) => {
                // return <p> {value} </p>;
                if(value==='NaN') {
                    value = 100;
                }

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
                );
            }
        },
        {
            Header: <Button text='' rightIcon="app-header" minimal={true} alignText="left" fill={true} />,
            accessor: `routingStatus`,
            Cell: ({ value }) => {
                return (
                    <Tag intent="primary">
                        {`HTTP ${value}`}
                    </Tag>
                );      
            }
        },
        {
            Header: <Button rightIcon="shield" text='' minimal={true} fill={true} alignText="left"/>,
            accessor: `password`,
            Cell: ({ value }) => {
                const isSecure = value && value.length
                return (
                    <StyledTooltip
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
                    </StyledTooltip>
                );
            }
        },
        {
             Header: <Button rightIcon="calculator" text='Views' minimal={true} fill={true}  alignText="left"/>,
             accessor: 'views',
             Cell: ({ value }) => {
                return (
                    <SlugViewsCell slug={value} email={email} /> 
                );
             }    
        }
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