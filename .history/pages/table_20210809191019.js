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
    
            <Table
                aria-label="Example static collection table"
                style={{height: '210px', maxWidth: '400px'}}
            >
                <TableHeader>
                    <Column>Name</Column>
                    <Column>Type</Column>
                    <Column>Date Modified</Column>
                </TableHeader>
                <TableBody>
                    <Row>
                        <Cell>Games</Cell>
                        <Cell>File folder</Cell>
                        <Cell>6/7/2020</Cell>
                    </Row>
                    <Row>
                        <Cell>Program Files</Cell>
                        <Cell>File folder</Cell>
                        <Cell>4/7/2021</Cell>
                    </Row>
                    <Row>
                        <Cell>bootmgr</Cell>
                        <Cell>System file</Cell>
                        <Cell>11/20/2010</Cell>
                    </Row>
                    <Row>
                        <Cell>log.txt</Cell>
                        <Cell>Text Document</Cell>
                        <Cell>1/18/2016</Cell>
                    </Row>
                </TableBody>
            </Table>
        
            </Flex>
        </Box>
    );
}

export default ExampleTable