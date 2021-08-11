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
        <Box css={{ bc: 'red'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M503.52,241.48c-.12-1.56-.24-3.12-.24-4.68v-.12l-.36-4.68v-.12a245.86,245.86,0,0,0-7.32-41.15c0-.12,0-.12-.12-.24l-1.08-4c-.12-.24-.12-.48-.24-.6-.36-1.2-.72-2.52-1.08-3.72-.12-.24-.12-.6-.24-.84-.36-1.2-.72-2.4-1.08-3.48-.12-.36-.24-.6-.36-1-.36-1.2-.72-2.28-1.2-3.48l-.36-1.08c-.36-1.08-.84-2.28-1.2-3.36a8.27,8.27,0,0,0-.36-1c-.48-1.08-.84-2.28-1.32-3.36-.12-.24-.24-.6-.36-.84-.48-1.2-1-2.28-1.44-3.48,0-.12-.12-.24-.12-.36-1.56-3.84-3.24-7.68-5-11.4l-.36-.72c-.48-1-.84-1.8-1.32-2.64-.24-.48-.48-1.08-.72-1.56-.36-.84-.84-1.56-1.2-2.4-.36-.6-.6-1.2-1-1.8s-.84-1.44-1.2-2.28c-.36-.6-.72-1.32-1.08-1.92s-.84-1.44-1.2-2.16a18.07,18.07,0,0,0-1.2-2c-.36-.72-.84-1.32-1.2-2s-.84-1.32-1.2-2-.84-1.32-1.2-1.92-.84-1.44-1.32-2.16a15.63,15.63,0,0,0-1.2-1.8L463.2,119a15.63,15.63,0,0,0-1.2-1.8c-.48-.72-1.08-1.56-1.56-2.28-.36-.48-.72-1.08-1.08-1.56l-1.8-2.52c-.36-.48-.6-.84-1-1.32-1-1.32-1.8-2.52-2.76-3.72a248.76,248.76,0,0,0-23.51-26.64A186.82,186.82,0,0,0,412,62.46c-4-3.48-8.16-6.72-12.48-9.84a162.49,162.49,0,0,0-24.6-15.12c-2.4-1.32-4.8-2.52-7.2-3.72a254,254,0,0,0-55.43-19.56c-1.92-.36-3.84-.84-5.64-1.2h-.12c-1-.12-1.8-.36-2.76-.48a236.35,236.35,0,0,0-38-4H255.14a234.62,234.62,0,0,0-45.48,5c-33.59,7.08-63.23,21.24-82.91,39-1.08,1-1.92,1.68-2.4,2.16l-.48.48H124l-.12.12.12-.12a.12.12,0,0,0,.12-.12l-.12.12a.42.42,0,0,1,.24-.12c14.64-8.76,34.92-16,49.44-19.56l5.88-1.44c.36-.12.84-.12,1.2-.24,1.68-.36,3.36-.72,5.16-1.08.24,0,.6-.12.84-.12C250.94,20.94,319.34,40.14,367,85.61a171.49,171.49,0,0,1,26.88,32.76c30.36,49.2,27.48,111.11,3.84,147.59-34.44,53-111.35,71.27-159,24.84a84.19,84.19,0,0,1-25.56-59,74.05,74.05,0,0,1,6.24-31c1.68-3.84,13.08-25.67,18.24-24.59-13.08-2.76-37.55,2.64-54.71,28.19-15.36,22.92-14.52,58.2-5,83.28a132.85,132.85,0,0,1-12.12-39.24c-12.24-82.55,43.31-153,94.31-170.51-27.48-24-96.47-22.31-147.71,15.36-29.88,22-51.23,53.16-62.51,90.36,1.68-20.88,9.6-52.08,25.8-83.88-17.16,8.88-39,37-49.8,62.88-15.6,37.43-21,82.19-16.08,124.79.36,3.24.72,6.36,1.08,9.6,19.92,117.11,122,206.38,244.78,206.38C392.77,503.42,504,392.19,504,255,503.88,250.48,503.76,245.92,503.52,241.48Z"/></svg>
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