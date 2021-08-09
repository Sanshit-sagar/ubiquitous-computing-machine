import React, { useMemo } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'
import Layout from '../../sections/Layout'
import StatisticTable from '../../components/SortedStatModal'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'


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
        <Box css={{ width: long ? '150px' : short ? '50px' : '100px', height: '30px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <span className="text-xs font-extralight"> 
                    {value} 
                </span> 
            </Flex>
        </Box>
    )
}


function useFilteredStatList(email)  {
    // const { data, err } = useSWR(email && email?.length ? `/api/stream/filtered/${email}?filter=${filter}` : null)
    const { data, err } = useSWR(email && email?.length ? `/api/clicks/${email}` : null);
    
    return {
        clicks: data ? data.clicks : [],
        isLoading: !data && !err,
        isError: err
    };
}

const getColumns = () => {
    
    const columns = useMemo(() => [
        { 
            Header: <StyledHeader name={'#'} />, 
            accessor: 'id',
            Cell: ({ value }) => <SlugNameCell slugName={value.slug} long={true}/>
        }, 
        { Header: <StyledHeader name={'Slug'} />, accessor: <StyledCell value={'name'} /> },
        { Header: <StyledHeader name={'Destination URL'} />, accessor: <StyledCell value={'destination'} /> },
        { Header: <StyledHeader name={'Country'} />, accessor: <StyledCell value={'country'} /> },
        { Header: <StyledHeader name={'Location'} />, accessor: <StyledCell value={'location'} /> },
        { Header: <StyledHeader name={'Geodata'} />, accessor: <StyledCell value={'geodata'} /> },
        { Header: <StyledHeader name={'IP Address'} />, accessor: <StyledCell value={'ipAddress'} /> },
        { Header: <StyledHeader name={'Host'} />, accessor: <StyledCell value={'host'} />},
        { Header: <StyledHeader name={'TLS Version'} />, accessor: <StyledCell value={'tlsVersion'} /> },
        { Header: <StyledHeader name={'HTTP Protocol'} />, accessor: <StyledCell value={'httpProtocol'} /> },
        { Header: <StyledHeader name={'Timestamp'} />, accessor: <StyledCell value={'timestamp'} /> },
        { Header: <StyledHeader name={'ASN'} />, accessor: <StyledCell value={'asn'} /> }
    ], []);

    return columns;
}


const ClickstreamWrapper = () => {
    const [session, sessionLoading] = useSession()
    const email  = !sessionLoading && session?.user ? session.user.email : ''

    const { clicks, isLoading, isError } = useFilteredStatList(email)
    
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