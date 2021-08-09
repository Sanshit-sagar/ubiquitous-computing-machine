import React, { useMemo } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'
import Layout from '../../sections/Layout'
import StatisticTable from '../../components/SortedStatModal'
import SlugProfile from '../../components/SlugProfile/SlugProfileDialog'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'



function useClickstream(email)  {

    const isPaused = () => {
        return true;
    }

    const options = {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: false,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
        shouldRetryOnError: false,
        isPaused: () => {
            return true;
        }
    }

    // const { data, err } = useSWR(email && email?.length ? `/api/stream/filtered/${email}?filter=${filter}` : null)
    const { data, err } = useSWR(email && email?.length ? `/api/clicks/${email}` : null, options={options})


    return {
        clicks: data ? data.clicks : [],
        isLoading: !data && !err,
        isError: err
    };
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

const StyledCell = ({ value, long, longish, short, xshort }) => {
    
    const getLength = () => {
        return long ? '150px' : longish ? '125px' : short ? '50px' : xshort ? '30px' : '100px';
    }

    return (
        <Box css={{ width: getLength(), height: '30px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <span className="text-xs font-extralight"> 
                    {value} 
                </span> 
            </Flex>
        </Box>
    )
}

const getColumns = () => {
    
    const columns = useMemo(() => [
        { 
            Header: <StyledHeader name={'#'} />, 
            accessor: 'id',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} />,
        }, 
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
            Header: <StyledHeader name={'Host'} />, 
            accessor: 'host',
            Cell: ({ value }) => <StyledCell value={value} />,
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

    return columns;
}


const ClickstreamWrapper = () => {
    const [session, sessionLoading] = useSession()
    const email  = !sessionLoading && session?.user ? session.user.email : ''

    const { clicks, isLoading, isError } = useClickstream(email)
    
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    let cellsLoading = loading || isLoading || sessionLoading
    const columns = getColumns(email, cellsLoading);
  
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
    
    return (
        <StatisticTable 
            columns={columns} 
            data={data}
            fetchData={fetchData}
            loading={cellsLoading}
            pageCount={pageCount}
        />
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