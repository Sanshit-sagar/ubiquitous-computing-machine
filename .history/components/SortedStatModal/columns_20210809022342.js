import { useMemo } from 'react' 
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import useSWR from 'swr'


import Loader from '../Loader'
import { ellipses, getIntent } from '../../lib/utils'
import { timeDifference } from '../../lib/datetime'

import SlugProfileDialog from '../SlugProfile/SlugProfileDialog'
import SlugViews from '../SlugProfile/SlugViews'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import Meter from '../Meter';

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


export const SlugViews = ({ slug }) => {
    const { views, loading, error } = useViewsBySlug({ slug }); 

    if(loading) return <Loader />;
    if(error) return <p> error! </p>;

    return (
        <SlugViewsContainer>
            <Flex css={{ fd: 'column', jc:'flex-start', ai: 'center' }}>
                <Text> {views.total} total </Text>
                <Text> {views.unique} unique </Text> 
                <Text> {views.daily} today </Text>
            </Flex>
        </SlugViewsContainer>
    ); 
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

const StyledHeader = ({ name }) => {
    return (
        <Box css={{ height: '30px' }}>
            <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'flex-start'}}>
                <Text>{name}</Text>
            </Flex>
        </Box>
    )
}

const StyledCell = ({ value, long, short }) => {
    return (
        <Box css={{ width: long ? '160px' : short ? '60px' : '120px', height: '30px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <span className="text-xs font-extralight"> 
                    {value} 
                </span> 
            </Flex>
        </Box>
    )
}

const StyledLifeLeftCell = ({ value, maxValue }) => {
  

    return (
        <Box css={{ px: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center', gap: '15px' }}>
                <Meter label="" value={value} maxValue={maxValue} />
                <span className="text-xs font-extralight">{value}%</span>
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
                     <SlugNameCell slugName={value.slug} long={true}/>
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
            Header: <StyledHeader name={"Geodata"} long={true} />,
            accessor: `geodata`,
            Cell: ({ value }) => {
                let coords = value.coordinates.split('.')
                let xCoord = `${coords[0]}.${coords[1].split(' ')[0]}`;
                let yCoord = `${coords[1]}.${coords[0].split(' ')[1]}`;

                return <StyledCell value={value.location} long={true} />
            }
        },
        {
            Header: <StyledHeader name={"IP Address"} long={true} />,
            accessor: `ipInfo`,
            Cell: ({ value }) => {
                return (
                    <StyledCell value={value.ip} long={true} />
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
                    <StyledCell value={`${localeTimeStr}`} long={true} />
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
                    <SlugNameCell slugName={value} long={true}/> 
                );
            }
        },
        {
            Header: <StyledHeader name={`Destination URL`} />,
            accessor: `destination`,
            Cell: ({ value }) => {
                let host = new URL(value).host;

                return (
                    <StyledCell value={`${host}`} long={true}/>
                );
            }
        },
        {
            Header: <StyledHeader name={`Created At`} />,
            accessor: `datetime`,
            Cell: ({ value }) => {

                return (
                    <StyledCell value={`${value}`} long={true}/>
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

                let localeTimestamp = DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
                return (
                    <StyledCell value={doesExpire ? `${localeTimestamp}` : `N/A`} long={true} />
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

                return (
                    <StyledLifeLeftCell value={value} maxValue={100} />
                );
            }
        },
        {
            Header: <StyledHeader name={`Routing Code`} />,
            accessor: `routingStatus`,
            Cell: ({ value }) => {
                return (
                    <StyledCell value={`HTTP ${value}`}  short={true} />
                );      
            }
        },
        {
            Header: <StyledHeader name={`Security`} />,
            accessor: `password`,
            Cell: ({ value }) => {
                const isSecure = value && value.length
                return (
                    <StyledCell value={isSecure ? 'lock' : 'unlock'} short={true}/>
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