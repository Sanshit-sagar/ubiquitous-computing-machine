import { useMemo } from 'react' 
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import useSWR from 'swr'

import { Button, Tag, Spinner, Icon } from '@blueprintjs/core'

import Loader from '../Loader'
import { StyledTooltip } from '../../primitives/Tooltip'
import { ellipses, getIntent } from '../../lib/utils'
import { timeDifference } from '../../lib/datetime'

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

const StyledLifeLeftCell = ({ value }) => {
    let tsNow = new Date().getTime();
    let tsExpiry = new Date(parseInt(value)).getTime();
    let diff = tsNow - tsExpiry;
    

    return (
        <StyledCell value={`${value}`} />
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
                let xCoord = `${coords[0]}.${coords[1].split(' ')[0]}`;
                let yCoord = `${coords[1]}.${coords[0].split(' ')[1]}`;

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
            Header: <StyledHeader name={'Slug'} />,
            accessor: `slug`,
            Cell: ({ value }) => {
                return (
                    <SlugNameCell slugName={value} /> 
                );
            }
        },
        {
            Header: <StyledHeader name={`Destination URL`} />,
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <StyledCell value={`${value.substring(0,20)}`} />
                );
            }
        },
        {
            Header: <StyledHeader name={`Created At`} />,
            accessor: `datetime`,
            Cell: ({ value }) => {
                let timestampVal = parseInt(value)
                let localeTimeStr = DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)

                return (
                    <StyledCell value={`${localeTimeStr}`} />
                );
            }
        },
        {
            Header: <StyledHeader name={`Expiry`} />,
            accessor: `ttl`,
            Cell: ({ value }) => {
                if(!value || !value.length) return null;

                let dateObj = new Date(value); 
                let timestampVal = parseInt(dateObj.getTime().toString()) 
                let doesExpire = timestampVal && timestampVal > 0

                if(!doesExpire) return null;

                let localeTimestamp = DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)
                return (
                    <StyledCell value={localeTimestamp} />
                );
            }
        },
        {
            Header: <StyledHeader name={`Status`} />,
            accessor: `expiry`,
            Cell: ({ value }) => {
                if(!value || value===NaN) return <Tag minimal round intent="success"> Active </Tag>;

                let now = new Date().getTime();
                const isActive = !value || !value.length || parseInt(value)>now
                let doesExpire = value==='NaN' || !value

                return (
                    <StyledLifeLeftCell value={value==='NaN' ? 'Immortal' : `${isActive ? 'Active' : 'Expired'}`} />
                );
            }
        },
        {
            Header: <StyledHeader name={`Time to live`} />,
            accessor: `lifeleftPct`,
            Cell: ({ value }) => {
                if(value==='NaN') {
                    value = 100;
                }

                let progress = value/100;

                return (
                    <StyledCell value={`${value===0 ? value : '0'}%`} />
                );
            }
        },
        {
            Header: <StyledHeader name={`Routing Code`} />,
            accessor: `routingStatus`,
            Cell: ({ value }) => {
                return (
                    <StyledCell value={`HTTP ${value}`} />
                );      
            }
        },
        {
            Header: <StyledHeader name={`Security`} />,
            accessor: `password`,
            Cell: ({ value }) => {
                const isSecure = value && value.length
                return (
                    <StyledCell value={isSecure ? 'lock' : 'unlock'} />
                );
            }
        },
        {
             Header: <StyledHeader name={`Views`} />,
             accessor: `views`,
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