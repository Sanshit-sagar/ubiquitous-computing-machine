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
            <div className="inline-flex justify-end align-center ml-5">
                {     views.total > 1 || views.unique > 1 ? <TriangleUpIcon /> 
                    : views.total === 1 && views.unique === 1 ? <DashIcon /> 
                    : <TriangleDownIcon />
                }
            </div>
        </div>
    ); 
}
const StyledHeader = ({ name, icon }) => {
    return (
        <Box css={{ minWidth: '75px' }}>
            <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'center'}}>
                <Text>{name}</Text>
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
            Header: <Button 
                        rightIcon="link" 
                        text={
                            <span className="text-xs font-extralight"> 
                                Slug
                            </span>
                        } 
                        minimal={true} 
                        fill={true} 
                        alignText="left" 
                    />,
            accessor: `links`,
            Cell: ({ value }) => {
                return (
                     <SlugNameCell slugName={value.slug} />
                );
            },
        },
        {
            Header: <Button 
                        rightIcon="link" 
                        text={
                            <span className="text-xs font-extralight"> 
                                Destination
                            </span>
                        }  
                        minimal={true} 
                        fill={true}  
                        alignText="left"
                    />,
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <div style={{ width: '170px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Button 
                            rightIcon={<Icon icon="link" intent="primary" />}
                            text={
                                <span className="text-xs font-extralight"> 
                                    {ellipses(value.hostname.substring(0,15), 35)}...
                                </span>
                            }
                            minimal={true} 
                            fill={true} 
                            alignText="left"
                            onClick={() => router.push(`${value.url}`)} 
                        />                            
                    </div>
                );
            }
        },
        {
            Header: <StyledHeader name={"Geodata"} icon={<DrawingPinIcon />} />,
            accessor: `geodata`,
            Cell: ({ value }) => {
                let coords = value.coordinates.split('.')
                let xCoord = `${coords[0]}.{coords[1].split(' ')[0]}`;
                let yCoord = `${coords[1]}.{coords[0].split(' ')[1]}`;

                return (
                    <Box css={{ width: '150px' }}>
                        <Flex css={{ fd: 'row', jc:'flex-start', ai: 'center'}}>
                            <Text> {value.location} </Text> 
                        </Flex>
                    </Box>
                 );
            }
        },
        {
            Header: <Button rightIcon="ip-address" text={
                <span className="text-xs font-extralight"> 
                    IP Address
                </span>
            }  minimal={true} alignText="left" fill={true} />,
            accessor: `ipInfo`,
            Cell: ({ value }) => {
                return (
                    <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>    
                        <span className="text-xs font-extralight ">
                            {value.ip} 
                        </span>
                    </span>
                );
            }
        },
        {
            Header: <Button text='' rightIcon="globe" minimal={true} alignText="left" />,
            accessor: `browser`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Browser" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text='' rightIcon="desktop" minimal={true} alignText="left" />,
            accessor: `os`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Operating System" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text='' rightIcon="pulse" minimal={true} alignText="left" />,
            accessor: `engine`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Engine" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text={
                <span className="text-xs font-extralight"> 
                    Timestamp
                </span>
            } rightIcon="calendar" minimal={true} alignText="left" />,
            accessor: `timestamp`,
            Cell: ({ value }) => {
                let timestampVal = parseInt(value)
                let localeTimeStr = DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)

                return (
                    <Button 
                        text={
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                    <span className="text-xs font-extralight"> 
                                        {localeTimeStr.substring(0,4)}, {localeTimeStr.substring(10)}
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
            Header: <Button 
            text={
                <span className="text-xs font-extralight"> 
                    Views
                </span>
            }
            rightIcon="calculator" minimal={true} alignText="left" />,
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