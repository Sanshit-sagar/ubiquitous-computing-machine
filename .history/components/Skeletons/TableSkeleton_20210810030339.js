import React from 'react'
import Skeleton from 'react-loading-skeleton';

import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader
  } from '@react-stately/table';
import Table from '../Table/Navigatable/Table';

const Box = ({ children }) => (
    <a
      style={{
        display: "block",
        width: 100,
        height: 50,
      }}
    >
      {children}
    </a>
);

const CellSkeleton = () => <Skeleton wrapper={Box} />;

const TableSkeleton = () => {
    let rows = [...new Array(15)].map(() => 0);
    let cols = [...new Array(15)].map(() => 0);

    return (
        <Table>
            <TableHeader>
                {rows.map(function(value, h) {
                    return (
                        <Column key={h}> 
                            Loading... 
                        </Column>
                    );
                })}
            </TableHeader>
            <TableBody>
                {rows.map(function(value, i) {
                    return (
                        <Row key={i}>
                            {cols.map(function (value, j) {
                                return (
                                    <Cell key={j}>
                                        <CellSkeleton />
                                    </Cell>
                                )
                            })}
                        </Row>
                    );
                })}
            </TableBody>
        </Table> 
    )
}


export default TableSkeleton
