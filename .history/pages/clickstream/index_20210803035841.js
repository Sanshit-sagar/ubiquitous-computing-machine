import React from 'react'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'

import Layout from '../../sections/Layout'
import StatisticTable from '../../components/SortedStatModal'

function useFilteredStatList(email, filter)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/filtered/${email}?filter=${filter}` : null)
    return {
        filteredData: data ? data.filteredData : [],
        isLoading: !data && !err,
        isError: err
    };
}


const ClickstreamWrapper = ({ email, filter }) => {
    const { filteredData, isLoading, isError } = useFilteredStatList(email, filter)
    
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    let cellsLoading = loading || isLoading
    const columns = getColumns(filter, email, cellsLoading);
  
    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        setLoading(true);

        if(!isLoading && !isError && filteredData && filteredData.length) {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(filteredData.slice(startRow, endRow))
                setPageCount(Math.ceil(filteredData.length / pageSize))
                setLoading(false)
            }
        }
    }, [filteredData, isLoading, isError]); 
    
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
    const [session, loading] = useSession()
    const email  = !loading && session?.user ? session.user.email : ''

    return (
        <Layout 
            metadata={metadata} 
            children={
                <ClickstreamWrapper 
                    filter="allViews" 
                    email={email}
                />
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