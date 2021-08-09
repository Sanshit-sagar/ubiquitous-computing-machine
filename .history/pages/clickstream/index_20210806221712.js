import React, { useMemo } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'

// import getColumns from '../../components/SortedStatModal/columns'
import Layout from '../../sections/Layout'
import StatisticTable from '../../components/SortedStatModal'

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
        { Header: '#', accessor: 'id' }, 
        { Header: 'Slug', accessor: 'name' },
        { Header: 'Destination URL', accessor: 'destination' },
        { Header: 'Country', accessor: 'country' },
        { Header: 'Location', accessor: 'location' },
        { Header: 'Geodata', accessor: 'geodata' },
        { Header: 'IP Address', accessor: 'ipAddress' },
        { Header: 'Host', accessor: 'host' },
        { Header: 'TLS Version', accessor: 'tlsVersion' },
        { Header: 'HTTP Protocol', accessor: 'httpProtocol' },
        { Header: 'Timestamp', accessor: 'timestamp' },
        { Header: 'ASN', accessor: 'asn' }
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

    let cellsLoading = loading || isLoading
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