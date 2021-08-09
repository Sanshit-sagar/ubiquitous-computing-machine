import React from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../../sections/Layout'
import SortedStatModal from '../../components/SortedStatModal'


const SortedStatModalWrapper = ({ email, filter }) => {
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

export default function LinksPage({ metadata }) {
    const [session, loading] = useSession()

    if(!session && !loading) return <p> Error! </p>
    
    return (
        <Layout 
            metadata={metadata} 
            children={
                <SortedStatModal 
                    filter="allLinks" 
                    email={!loading && session?.user ? session.user?.email : ''} 
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
  
  