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
    return (
        <Box css={{ height: '100%', width: '100%', height: '575px', overflowY: 'hidden', overflowX: 'hidden', pt: '$1' }}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', flexWrap: 'wrap', gap: '$2' }}>                
    
            <Table aria-label="Table with selection" selectionMode="multiple">
                <TableHeader>
                    <Column>Name</Column>
                    <Column>Type</Column>
                    <Column>Level</Column>
                </TableHeader>
                <TableBody>
                    <Row key="1">
                    <Cell>Charizard</Cell>
                    <Cell>Fire, Flying</Cell>
                    <Cell>67</Cell>
                    </Row>
                    <Row key="2">
                    <Cell>Blastoise</Cell>
                    <Cell>Water</Cell>
                    <Cell>56</Cell>
                    </Row>
                    <Row key="3">
                    <Cell>Venusaur</Cell>
                    <Cell>Grass, Poison</Cell>
                    <Cell>83</Cell>
                    </Row>
                    <Row key="4">
                    <Cell>Pikachu</Cell>
                    <Cell>Electric</Cell>
                    <Cell>100</Cell>
                    </Row>
                </TableBody>
                </Table>
        
            </Flex>
        </Box>
    );
}

export default ExampleTable