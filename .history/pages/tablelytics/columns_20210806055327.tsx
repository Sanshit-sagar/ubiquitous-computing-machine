import React, { useMemo } from 'react' 
import { useRouter } from 'next/router'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { 
    StyledTableContainer, 
    StyledHeader, 
    StyledCell, 
    StyledTextField 
} from './TablePrimitives'


// let data = [
//     { row: 0, name: 'Slug', accessor: slug, component: StyledCell, long: true },
//     { row: 1, name: 'Destination', accessor: slug, component: StyledCell,  long: false },
//     { row: 2, name: 'Country', accessor: slug, component: CountryCell, long: false },
//     { row: 3, name: 'Location', accessor: slug, component: GeodataCell,  long: true },
//     { row: 4, name: 'User Agent', accessor: slug, component: UserAgentCell, long: true },
//     { row: 5, name: 'HTTP Protocol', accessor: slug, component: StyledCell, long: false },
//     { row: 6, name: 'IP Address', accessor: slug, component: StyledCell, long: false },
//     { row: 7, name: 'Host', accessor: slug,component: StyledCell,  long: false },
//     { row: 8, name: 'TLS Version', accessor: slug, component: StyledCell, long: true },
//     { row: 9, name: 'Timestamp', accessor, component: TimestampCell, long: false },
//     { row: 10, name: 'asn', accessor: slug, component: StyledCell, long: true },
//     { row: 11, name: 'Views', accessor: views, component: ViewsCell, long: true },
// ];


