import React, { useMemo } from 'react'
import useSWR from 'swr'

import { useSession } from 'next-auth/client'
import Layout from '../../sections/Layout'
import AriaTable from '../../components/Table'
import SlugProfile from '../../components/SlugProfile/SlugProfileDialog'

import { Box } from '../../primitives/Box'
import getColumns from '../../components/Table/Columns'

import { 
    StyledHeader, 
    StyledCell, 
    LifeLeftCell 
} from '../../components/Table/Cells'


// const getColumns = () => {
//     const linksColumns = useMemo(() => [
//         { 
//             Header: <StyledHeader name={'Slug'} />, 
//             accessor: 'slug', 
//             Cell: ({ value }) => <SlugProfile name={value} />,
//         },
//         { 
//             Header: <StyledHeader name={'Destination URL'} />, 
//             accessor: 'destination',
//             Cell: ({ value }) => <StyledCell value={value} long={true} />,
//         },
//         { 
//             Header: <StyledHeader name={'Timestamp'} />, 
//             accessor: 'timestamp',
//             Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
//         },
//         { 
//             Header: <StyledHeader name={'Expiration'} />, 
//             accessor: 'expiration',
//             Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
//         },
//         { 
//             Header: <StyledHeader name={'Life Left'} />, 
//             accessor: 'lifeleftPct',
//             Cell: ({ value }) => <LifeLeftCell value={value} /> 
//         },
//         { 
//             Header: <StyledHeader name={'HTTP'} />, 
//             accessor: 'routingStatus',
//             Cell: ({ value }) => <StyledCell value={value} short={true} /> 
//         },
//         { 
//             Header: <StyledHeader name={'Password'} />, 
//             accessor: 'password',
//             Cell: ({ value }) => <StyledCell value={value} /> 
//         },
//         { 
//             Header: <StyledHeader name={'Blacklist'} />, 
//             accessor: 'blacklist',
//             Cell: ({ value }) => <StyledCell value={value} /> 
//         },
//     ])

//     return linksColumns;
// }

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
    const columns = getColumns({ 'links' });

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