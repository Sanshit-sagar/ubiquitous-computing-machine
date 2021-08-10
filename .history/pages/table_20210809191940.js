import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  useTableState
} from '@react-stately/table';
import  { useTable } from '@react-aria/table'
import Table from '../components/Table/Navigatable/Table'
import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

function ExampleTable() {
    let [selectedKeys, setSelectedKeys] = React.useState(new Set([2]));

    return (
    <Box css={{ height: '100%', width: '100%', height: '575px', overflowY: 'hidden', overflowX: 'hidden', pt: '$1' }}>
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', flexWrap: 'wrap', gap: '$2' }}>                
    
            <Table  
                aria-label="Table with controlled selection"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                {...props}
            >
                <TableHeader columns={columns}>
                    {(column) => <Column key={column.uid}>{column.name}</Column>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
                </TableBody>
            </Table>

        </Flex>
    </Box>
        );
    }

export default ExampleTable