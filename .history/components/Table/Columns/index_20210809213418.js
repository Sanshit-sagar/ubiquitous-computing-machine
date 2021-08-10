import { useMemo } from 'react'
import { SlugProfile } from '../../SlugProfile/SlugProfileDialog'
import { StyledCell, StyledHeader, LifeLeftCell } from '../Cells'

export const getColumns = ({ datasetId }) => {
    
    const clicksColumns = useMemo(() => [
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
            accessor: 'timestamp',
            Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
        },
        { 
            Header: <StyledHeader name={'Country'} />, 
            accessor: 'country',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} />,
        },
        { 
            Header: <StyledHeader name={'Location'} />, 
            accessor: 'location',
            Cell: ({ value }) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader name={'IP Address'} />, 
            accessor: 'ipAddress',
            Cell: ({ value }) => <StyledCell value={value} long={true} /> 
        },
        { 
            Header: <StyledHeader name={'Browser'} />, 
            accessor: 'browser',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'Engine'} />, 
            accessor: 'engine',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'OS'} />, 
            accessor: 'os',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'TLS Version'} />, 
            accessor: 'tlsVersion',
            Cell: ({ value }) => <StyledCell value={value} short={true}  />,
        },
        { 
            Header: <StyledHeader name={'HTTP Protocol'} />, 
            accessor: 'httpProtocol',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'Host'} />, 
            accessor: 'host',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        { 
            Header: <StyledHeader name={'Geodata'} />, 
            accessor: 'geodata',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        { 
            Header: <StyledHeader name={'Metro Code'} />, 
            accessor: 'metroCode',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader name={'ASN'} />, 
            accessor: 'asn',
            Cell: ({ value }) => <StyledCell value={value} xshort={true} /> 
        },
        {
            Header: <StyledHeader name={'TLS Cipher'} />,
            accessor: 'tlsCipher',
            Cell: ({ value }) => <StyledCell value={value} />,
        },
        {
            Header: <StyledHeader name={'TCP RTT'} />,
            accessor: 'clientTcpRtt',
            Cell: ({ value }) => <StyledCell value={value} short={true} />,
        },
        {
            Header: <StyledHeader name={'Accept Encoding'} />,
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
            accessor: 'timestamp',
            Cell: ({ value }) => <StyledCell value={value} longish={true} /> 
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
    ])

    return datasetId==='clicks' ? clicksColumns : linksColumns;
}
