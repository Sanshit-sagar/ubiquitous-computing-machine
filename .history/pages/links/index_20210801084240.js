import React from 'react'
import Layout from '../../sections/Layout'
import StatisticTable from '../../components/SortedStatModal'
import useSWR from 'swr'
import { isValidEmail } from '../../lib/utils'

function useFilteredStatList(email, filter)  {

    const { data, err } = useSWR( isValidEmail(email, filter) ? `/api/stream/filtered/${email}?filter=${filter}` : null)

    return {
        filteredData: data ? data.filteredData : [],
        isLoading: !data && !err,
        isError: err
    };
}


const UserLinksWrapper = ({ email, filter }) => {
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

    // if(!session && !loading) return <p> Error! </p>
    
    return (
        <Layout 
            metadata={metadata} 
            children={
                <UserLinksWrapper 
                    filter="allLinks" 
                    email={email} 
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
  
  