import React from 'react'
import useSWR from 'swr'

import Layout from '../../sections/Layout'
import { Box } from '../../primitives/Box'
import AriaTable from '../../components/Table'
import { getColumns } from '../../components/Table/Columns'

import { useSession } from 'next-auth/client'
import { darkTheme } from '../../stiches.config'

export function darkThemeColor(color) {
    return {
      [`body.${darkTheme} &`]: {
        bc: color,
      },
    };
}

function useClickstream()  {
    const [session, sessionLoading] = useSession()
    const email  = !sessionLoading && session?.user ? session.user.email : ''

    const { data, error } = useSWR(email?.length ? `/api/clicks/${email}` : null);

    return {
        clicks: data ? data.clicks : [],
        isLoading: !data && !error,
        isError: error
    };
}

const Clickstream = () => {
    const { clicks, isLoading, isError } = useClickstream()
    
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

    let cellsLoading = loading || isLoading
    const columns = getColumns('clicks');

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

export default function ClickstreamWrapper({ metadata }) {

    return (
        <Layout 
            metadata={metadata} 
            children={
                <Clickstream />
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