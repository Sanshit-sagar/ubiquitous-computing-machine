import { useMemo } from 'react'
import SlugProfile from '../../SlugProfile'
import { 
    StyledCell, 
    StyledHeader, 
    LifeLeftCell, 
    TimestampCell, 
    UrlCell, 
    HttpStatusCell, 
    PasswordCell, 
    TrendlineCell,
    CountryCell
} from '../Cells'

const crimson = {
    crimson1: '#fffcfd',
    crimson2: '#fff7fb',
    crimson3: '#feeff6',
    crimson4: '#fce5f0',
    crimson5: '#f9d8e7',
    crimson6: '#f4c6db',
    crimson7: '#edadc8',
    crimson8: '#e58fb1',
    crimson9: '#e93d82',
    crimson10: '#e03177',
    crimson11: '#d31e66',
    crimson12: '#3d0d1d',
  }

  const crimsonDark = {
    crimson1: '#1d1418',
    crimson2: '#27141c',
    crimson3: '#3c1827',
    crimson4: '#481a2d',
    crimson5: '#541b33',
    crimson6: '#641d3b',
    crimson7: '#801d45',
    crimson8: '#ae1955',
    crimson9: '#e93d82',
    crimson10: '#f04f88',
    crimson11: '#f76190',
    crimson12: '#feecf4',
  }

  const mauve = {
    mauve1: '#fdfcfd',
    mauve2: '#f9f8f9',
    mauve3: '#f4f2f4',
    mauve4: '#eeedef',
    mauve5: '#e9e8ea',
    mauve6: '#e4e2e4',
    mauve7: '#dcdbdd',
    mauve8: '#c8c7cb',
    mauve9: '#908e96',
    mauve10: '#86848d',
    mauve11: '#6f6e77',
    mauve12: '#1a1523',
  }

  const mauveDark = {
    mauve1: '#161618',
    mauve2: '#1c1c1f',
    mauve3: '#232326',
    mauve4: '#28282c',
    mauve5: '#2e2e32',
    mauve6: '#34343a',
    mauve7: '#3e3e44',
    mauve8: '#504f57',
    mauve9: '#706f78',
    mauve10: '#7e7d86',
    mauve11: '#a09fa6',
    mauve12: '#ededef',
  }

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
            Cell: ({ value }) => <UrlCell value={value} />,
        },
        { 
            Header: 'Timestamp',
            accessor: 'timestamp',
            Cell: ({ value }) => <StyledCell value={value} /> 
        },
        {
            Header: 'Views',
            accessor: 'views',
            Cell: ({ value }) => <TrendlineCell value={value} />
        },
        { 
            Header: 'Country', 
            accessor: 'country',
            Cell: ({ value }) => <CountryCell value={value} />,
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
            Cell: ({ value }) => <UrlCell value={value} />,
        },
        { 
            Header: <StyledHeader name={'Created At'} />, 
            accessor: 'timestamp',
            Cell: ({ value }) => <TimestampCell value={value} /> 
        },
        {
            Header: <StyledHeader name={'Clicks'} />, 
            accessor: 'views',
            Cell: ({ value }) => <SlugClickstream value={value} />,
        },
        { 
            Header: <StyledHeader name={'Expiration'} />, 
            accessor: 'expiry',
            Cell: ({ value }) => <TimestampCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'Life Left'} />, 
            accessor: 'lifeleftPct',
            Cell: ({ value }) => <LifeLeftCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'HTTP'} />, 
            accessor: 'routingStatus',
            Cell: ({ value }) => <HttpStatusCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'Password'} />, 
            accessor: 'password',
            Cell: ({ value }) => <PasswordCell value={value} /> 
        },
        { 
            Header: <StyledHeader name={'Blacklist'} />, 
            accessor: 'blacklist',
            Cell: ({ value }) => <StyledCell value={value} /> 
        },
    ]);

    return datasetId==='clicks' ? clicksColumns : linksColumns;
}