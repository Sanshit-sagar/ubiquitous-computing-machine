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
        <Box css={{ color: 'red'}}>
            <img src='/assets/firefox.svg' class='filter-green' />
        </Box>
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