import React, { useMemo } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'
import Layout from '../../sections/Layout'
import AriaTable from '../../components/Table'
import SlugProfile from '../../components/SlugProfile'

import { Box } from '../../primitives/Box'
import { getColumns } from '../../components/Table/Columns'


function useAllUsersLinks()  {
    const [session, sessionLoading] = useSession()
    const email  = !sessionLoading && session?.user ? session.user.email : ''

    const { data, error } = useSWR(email && email?.length ? `/api/links/${email}` : null);
    
    return {
        clicks: data ? data.links : [],
        isLoading: !data && !error,
        isError: error
    };
}

const AllLinks = () => {
    const { clicks, isLoading, isError } = useAllUsersLinks()

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

    let cellsLoading = loading || isLoading;
    const columns = getColumns('links');

    return (
        <Box css={{ border: 'thin solid', borderColor: '$hiContrast', br: '$1' }}>
            <AriaTable 
                columns={columns} 
                data={data}
                fetchData={fetchData}
                loading={cellsLoading}
                pageCount={pageCount}
            />  
        </Box>
    )
}

export default function AllLinksWrapper({ metadata }) {

    return (
        <Layout 
            metadata={metadata} 
            children={
                <AllLinks />
            }
        />
    );
}

AllLinksWrapper.defaultProps = {
    metadata: {
        'title': 'User Links',
        'description': 'Realtime stats such as: Number of views, unique visitors, most viewed pages and live clickstreams',
    }
}