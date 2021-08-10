import React, { useState, useRef } from 'react';
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
import { Text } from '../primitives/Text'

function ExampleTable(props) {
    let columns = [
        {name: 'Name', uid: 'name'},
        {name: 'Type', uid: 'type'},
        {name: 'Level', uid: 'level'}
      ];
    
    let rows = [
        {id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67'},
        {id: 2, name: 'Blastoise', type: 'Water', level: '56'},
        {id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
        {id: 4, name: 'Pikachu', type: 'Electric', level: '100'}
    ];

      
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

            <Text> Selected Keys: JSON.stringify(selectedKeys) </Text>

        </Flex>
    </Box>
        );
    }

export default ExampleTable