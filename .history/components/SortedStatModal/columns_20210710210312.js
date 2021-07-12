
const columns = React.useMemo(() => [
    {
        Header: 'Key',
        accessor: `key`,
        Cell: ({ value }) => {
            return (
                <Link href={value && value.length ? value : '/'}>
                    {value && value?.length ? `${value.substring(0,5)}` : '-'}
                </Link>
            ); 
        },
        width: 75,
    },
    {
        Header: 'Slug',
        accessor: `slug`,
    },
    {
        Header: 'Destination URL',
        accessor: `destination`,
        Cell: ({ value }) => {
            return (
                <Link href={value && value.length ? value : '/'}>
                    {value && value?.length ? `${value.substring(0,20)}...` : '-'}
                </Link>
            ); 
        }
    },
    {
        Header: 'Location',
        accessor: `geodata`,
        width: 75,
    },
    {
        Header: 'Coordinates',
        accessor: `coordinates`,
        width: 75,
    },
    {
        Header: 'IP Address',
        accessor: `ip`,
    },
    {
        Header: 'Host',
        accessor: `host`,
    },
    {
        Header: 'Browser',
        accessor: `browser`,
    },   
    {
        Header: 'Engine',
        accessor: `engine`,
    },
    {
        Header: 'OS',
        accessor: `os`,
    },
    {
        Header: 'Time Taken',
        accessor: `timeTaken`,
    },
    {
        Header: 'Timestamp',
        accessor: `datetime`,
    },
], []);