import React, { useState, useMemo } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'

import Meter from '../../components/Meter'
import Layout from '../../sections/Layout'
import AriaTable from '../../components/Table'
import SlugProfile from '../../components/SlugProfile/SlugProfileDialog'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { darkTheme } from '../../stiches.config'


export function darkThemeColor(color) {
    return {
      [`body.${darkTheme} &`]: {
        bc: color,
      },
    };
}


const StyledHeader = ({ name, index }) => {
    const [sortApplied, setSortApplied] = useState(false)
    const [sortRowId, setSortRowId] = useState('')

    const applySort = (updatedSortRowId) => {
        if(!sortApplied && !sortRowId===updatedSortRowId) {
            setSortApplied(true);
            setSortRowId(updatedSortRowId);
        } else if(sortApplied && sortRowId===updatedSortRowId) {
            setSortApplied(false);
            setSortRowId('')
        } else {
            setRowId(updatedSortRowId);
        }
    }
    let isFirstCol = name?.length && name==='#'

    return (
        <Box css={{ height: '30px', padding: '$1' }}>
            <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'center' }}>
                <Text size='2'> 
                    {isFirstCol ? '' : name}
                </Text>
            </Flex>
        </Box>
    )
}

const StyledCell = ({ value, long, longish, short, xshort }) => {
    
    const getLength = () => {
        return long ? '155px' : longish ? '135px' : short ? '50px' : xshort ? '30px' : '100px';
    }

    return (
        <Box css={{ width: getLength(), height: '40px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <Text size='1'> 
                    {value} 
                </Text> 
            </Flex>
        </Box>
    )
}


const LifeLeftCell = ({ value }) => {
    
    return (
        <Box css={{ width: '150px', height: '30px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'column', jc:'flex-start', ai: 'flex-end', gap: '$1' }}>
                <Text size='1'>{value}%</Text>
                <Meter label="" value={parseInt(value)} maxValue={100} />
            </Flex>
        </Box>
    );
}

const getColumns = () => {
    
    const clicksColumns = useMemo(() => [
        { 
            Header: <StyledHeader name={'Slug'} />, 
            accessor: 'slug', 
            Cell: ({ value }) => <SlugProfile name={value} />,
        },
        { 
            Header: <StyledHeader name={'Destination URL'} />, 
            accessor: 'destination',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader name={'Timestamp'} />, 
            accessor: 'timestamp',
            Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
        },
        { 
            Header: <StyledHeader name={'Country'} />, 
            accessor: 'country',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} />,
        },
        { 
            Header: <StyledHeader name={'Location'} />, 
            accessor: 'location',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader name={'IP Address'} />, 
            accessor: 'ipAddress',
            Cell: ({ value }) => <StyledCell value={value} long={true} /> 
        },
        { 
            Header: <StyledHeader name={'Browser'} />, 
            accessor: 'browser',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'Engine'} />, 
            accessor: 'engine',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'OS'} />, 
            accessor: 'os',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'TLS Version'} />, 
            accessor: 'tlsVersion',
            Cell: ({ value }) => <StyledCell value={value} short={true}  />,
        },
        { 
            Header: <StyledHeader name={'HTTP Protocol'} />, 
            accessor: 'httpProtocol',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'Host'} />, 
            accessor: 'host',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        { 
            Header: <StyledHeader name={'Geodata'} />, 
            accessor: 'geodata',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        { 
            Header: <StyledHeader name={'Metro Code'} />, 
            accessor: 'metroCode',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'ASN'} />, 
            accessor: 'asn',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} /> 
        },
        {
            Header: <StyledHeader name={'TLS Cipher'} />,
            accessor: 'tlsCipher',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        {
            Header: <StyledHeader name={'TCP RTT'} />,
            accessor: 'clientTcpRtt',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        {
            Header: <StyledHeader name={'Accept Encoding'} />,
            accessor: 'clientAcceptEncoding',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        }
    ], []);

    const linksColumns = useMemo(() => [
        { 
            Header: <StyledHeader name={'Slug'} />, 
            accessor: 'slug', 
            Cell: ({ value }) => <SlugProfile name={value} />,
        },
        { 
            Header: <StyledHeader name={'Destination URL'} />, 
            accessor: 'destination',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader name={'Timestamp'} />, 
            accessor: 'timestamp',
            Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
        },
        { 
            Header: <StyledHeader name={'Expiration'} />, 
            accessor: 'expiration',
            Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
        },
        { 
            Header: <StyledHeader name={'Life Left'} />, 
            accessor: 'lifeleftPct',
            Cell: ({ value }) => <LifeLeftCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'HTTP'} />, 
            accessor: 'routingStatus',
            Cell: ({ value }) => <StyledCell value={value} short={true} /> 
        },
        { 
            Header: <StyledHeader name={'Password'} />, 
            accessor: 'password',
            Cell: ({ value }) => <StyledCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'Blacklist'} />, 
            accessor: 'blacklist',
            Cell: ({ value }) => <StyledCell value={value} /> 
        },
    ])

    return clicksColumns;
}


function useClickstream(email)  {
    const { data, error } = useSWR(email?.length ? `/api/clicks/${email}` : null);

    return {
        clicks: data ? data.clicks : [],
        isLoading: !data && !error,
        isError: error
    };
}

// function useAllUsersLinks(email)  {
//     const { data, error } = useSWR(email && email?.length ? `/api/links/${email}` : null);
    
//     return {
//         clicks: data ? data.links : [],
//         isLoading: !data && !error,
//         isError: error
//     };
// }
const FirefoxIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M189.37,152.86Zm-58.74-29.37C130.79,123.5,130.71,123.5,130.63,123.49Zm351.42,45.35c-10.61-25.5-32.08-53-48.94-61.73,13.72,26.89,21.67,53.88,24.7,74,0,0,0,.14.05.41-27.58-68.75-74.35-96.47-112.55-156.83-1.93-3.05-3.86-6.11-5.74-9.33-1-1.65-1.86-3.34-2.69-5.05A44.88,44.88,0,0,1,333.24.69a.63.63,0,0,0-.55-.66.9.9,0,0,0-.46,0l-.12.07-.18.1.1-.14c-54.23,31.77-76.72,87.38-82.5,122.78a130,130,0,0,0-48.33,12.33,6.25,6.25,0,0,0-3.09,7.75,6.13,6.13,0,0,0,7.79,3.79l.52-.21a117.84,117.84,0,0,1,42.11-11l1.42-.1c2-.12,4-.2,6-.22A122.61,122.61,0,0,1,291,140c.67.2,1.32.42,2,.63,1.89.57,3.76,1.2,5.62,1.87,1.36.5,2.71,1,4.05,1.58,1.09.44,2.18.88,3.25,1.35q2.52,1.13,5,2.35c.75.37,1.5.74,2.25,1.13q2.4,1.26,4.74,2.63,1.51.87,3,1.8a124.89,124.89,0,0,1,42.66,44.13c-13-9.15-36.35-18.19-58.82-14.28,87.74,43.86,64.18,194.9-57.39,189.2a108.43,108.43,0,0,1-31.74-6.12c-2.42-.91-4.8-1.89-7.16-2.93-1.38-.63-2.76-1.27-4.12-2C174.5,346,149.9,316.92,146.83,281.59c0,0,11.25-41.95,80.62-41.95,7.5,0,28.93-20.92,29.33-27-.09-2-42.54-18.87-59.09-35.18-8.85-8.71-13.05-12.91-16.77-16.06a69.58,69.58,0,0,0-6.31-4.77A113.05,113.05,0,0,1,173.92,97c-25.06,11.41-44.55,29.45-58.71,45.37h-.12c-9.67-12.25-9-52.65-8.43-61.08-.12-.53-7.22,3.68-8.15,4.31a178.54,178.54,0,0,0-23.84,20.43A214,214,0,0,0,51.9,133.36l0,0a.08.08,0,0,1,0,0,205.84,205.84,0,0,0-32.73,73.9c-.06.27-2.33,10.21-4,22.48q-.42,2.87-.78,5.74c-.57,3.69-1,7.71-1.44,14,0,.24,0,.48-.05.72-.18,2.71-.34,5.41-.49,8.12,0,.41,0,.82,0,1.24,0,134.7,109.21,243.89,243.92,243.89,120.64,0,220.82-87.58,240.43-202.62.41-3.12.74-6.26,1.11-9.41,4.85-41.83-.54-85.79-15.82-122.55Z"/>
        </svg>
    )
}


const ClickstreamWrapper = () => {
    
    const [session, sessionLoading] = useSession()
    const email  = !sessionLoading && session?.user ? session.user.email : ''

    // getFromRedis with useClickstream() -> useSWR
    // fetch(POST) -> mutate Redis cache with a POST request that fetches data from the edge
    //                  and updates the cache
    // upon success -> mark last updated at time in local storage 
    //                  and in cache (update in cache w/ pipeline w/ POST req
    
    const { clicks, isLoading, isError } = useClickstream(email)
    
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)
    
    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true);

        if(!isLoading && !isError && clicks?.length) {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(clicks.slice(startRow, endRow))
                setPageCount(Math.ceil(clicks.length / pageSize))
                setLoading(false)
            }
        }
    }, [clicks, isLoading, isError]); 

    let cellsLoading = loading || isLoading || sessionLoading

    const columns = getColumns();

    return (
        <Box css={{ border: 'thin solid', borderColor: '$hiContrast', br: '$1' }}>
            <FirefoxIcon /> 
            {/* <AriaTable 
                columns={columns} 
                data={data}
                fetchData={fetchData}
                loading={cellsLoading}
                pageCount={pageCount}
            />  */}
        </Box>
    )
}

export default function Clickstream({ metadata }) {

    return (
        <Layout 
            metadata={metadata} 
            children={
                <ClickstreamWrapper />
            }
        />
    );
}

Clickstream.defaultProps = {
    metadata: {
        'title': 'Dashboard',
        'description': 'Realtime stats such as: Number of views, unique visitors, most viewed pages and live clickstreams',
    }
}