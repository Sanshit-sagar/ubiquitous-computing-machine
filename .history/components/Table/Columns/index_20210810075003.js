import { useMemo } from 'react'
import SlugProfile from '../../SlugProfile/SlugProfileDialog'
import { StyledCell, StyledHeader, LifeLeftCell, TimestampCell } from '../Cells'

export const getColumns = (datasetId) => {
    
    const clicksColumns = useMemo(() => [
        { 
            Header: 'Slug', 
            accessor: 'slug', 
            Cell: ({ value }) => <SlugProfile name={value} />,
        },
        { 
            Header: 'Destination URL', 
            accessor: 'destination',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: 'Timestamp', 
            accessor: 'timestamp',
            Cell: ({ value }) => <TimestampCell value={value} /> 
        },
        { 
            Header: 'Country', 
            accessor: 'country',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} />,
        },
        { 
            Header: 'Location', 
            accessor: 'location',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: 'IP Address', 
            accessor: 'ipAddress',
            Cell: ({ value }) => <StyledCell value={value} long={true} /> 
        },
        { 
            Header: 'Browser', 
            accessor: 'browser',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: 'Engine', 
            accessor: 'engine',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: 'OS', 
            accessor: 'os',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: 'TLS Version', 
            accessor: 'tlsVersion',
            Cell: ({ value }) => <StyledCell value={value} short={true}  />,
        },
        { 
            Header: 'HTTP Protocol', 
            accessor: 'httpProtocol',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        // { 
        //     Header: 'Host', 
        //     accessor: 'host',
        //     Cell: ({ value }) => <StyledCell value={value} />,
        // },
        { 
            Header: 'Geodata', 
            accessor: 'geodata',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        { 
            Header: 'Metro Code', 
            accessor: 'metroCode',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: 'ASN', 
            accessor: 'asn',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} /> 
        },
        {
            Header: 'TLS Cipher',
            accessor: 'tlsCipher',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        // {
        //     Header: 'TCP RTT',
        //     accessor: 'clientTcpRtt',
        //     Cell: ({ value }) => <StyledCell value={value} short={true} />,
        // },
        {
            Header: 'Accept Encoding',
            accessor: 'clientAcceptEncoding',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        }
    ], []);

    const linksColumns = useMemo(() => [
        { 
            Header: <StyledHeader name={'Slug'} />, 
            accessor: 'slug', 
            Cell: ({ value }) => <SlugProfile name={value} />,
        },
        { 
            Header: <StyledHeader name={'Destination URL'} />, 
            accessor: 'destination',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader name={'Timestamp'} />, 
            accessor: 'datetime',
            Cell: ({ value }) => <TimestampCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'Expiration'} />, 
            accessor: 'expiration',
            Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
        },
        { 
            Header: <StyledHeader name={'Life Left'} />, 
            accessor: 'lifeleftPct',
            Cell: ({ value }) => <LifeLeftCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'HTTP'} />, 
            accessor: 'routingStatus',
            Cell: ({ value }) => <StyledCell value={value} short={true} /> 
        },
        { 
            Header: <StyledHeader name={'Password'} />, 
            accessor: 'password',
            Cell: ({ value }) => <StyledCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'Blacklist'} />, 
            accessor: 'blacklist',
            Cell: ({ value }) => <StyledCell value={value} /> 
        },
    ]);

    return datasetId==='clicks' ? clicksColumns : linksColumns;
}