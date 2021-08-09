import React from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'

import Layout from '../../sections/Layout'
import StatisticTable from '../../components/SortedStatModal'
import getColumns from '../../components/SortedStatModal/columns'

function useAllUsersLinks(email, filter)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/filtered/${email}?filter=allLinks` : null)
    return {
        filteredData: data ? data.filteredData : [],
        isLoading: !data && !err,
        isError: err
    };
}

const UserLinksWrapper = ({ email, filter }) => {
    const { filteredData, isLoading, isError } = useAllUsersLinks(email, filter)
    
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)
    
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

    const columns = getColumns(filter, email, isLoading || loading);
    
    return (
        <StatisticTable 
            columns={columns} 
            data={data}
            fetchData={fetchData}
            loading={isLoading || loading}
            pageCount={pageCount}
        />
    )
}

export default function LinksPage({ metadata }) {
    const [session, loading] = useSession()
    
    return (
        <Layout 
            metadata={metadata} 
            children={
                <UserLinksWrapper 
                    filter="allLinks" 
                    email={!loading && session ? session.user?.email : ''} 
                    loading={loading}
                />
            }
        />
    );
}

LinksPage.defaultProps = {
    metadata: { 
        title: 'Links', 
        description: 'All your saved slugs' 
    }
}
  
  