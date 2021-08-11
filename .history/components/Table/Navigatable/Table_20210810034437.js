import React, { useRef } from 'react'
import { 
    TableRowGroup, 
    TableHeaderRow, 
    TableSelectAllCell, 
    TableColumnHeader,
    TableCheckboxCell, 
    TableRow,
    TableCell
} from './Elements'
import { useTableState } from '@react-stately/table';
import  { useTable } from '@react-aria/table'


const slate = {
  slate1: '#fbfcfd',
  slate2: '#f8f9fa',
  slate3: '#f1f3f5',
  slate4: '#eceef0',
  slate5: '#e6e8eb',
  slate6: '#dfe3e6',
  slate7: '#d7dbdf',
  slate8: '#c1c8cd',
  slate9: '#889096',
  slate10: '#7e868c',
  slate11: '#687076',
  slate12: '#11181c',
}
const slateDark = {
  slate1: '#151718',
  slate2: '#1a1d1e',
  slate3: '#202425',
  slate4: '#26292b',
  slate5: '#2b2f31',
  slate6: '#313538',
  slate7: '#3a3f42',
  slate8: '#4c5155',
  slate9: '#697177',
  slate10: '#787f85',
  slate11: '#9ba1a6',
  slate12: '#ecedee',
}

function Table(props) {
    let state = useTableState({
      ...props,
      showSelectionCheckboxes: props.selectionMode === 'multiple'
    });
    let ref = useRef();
    let {collection} = state;
    let {gridProps} = useTable(props, state, ref);
  
    return (
      <table {...gridProps} ref={ref} style={{ borderCollapse: 'collapse' }}>
        <TableRowGroup
          type="thead"
          style={{
            backgroundColor: slate.slate7,
            borderBottom: '2px solid', 
            borderBottomColor: slate.slate12,
          }}
        >
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
              {[...headerRow.childNodes].map((column) =>
                column.props.isSelectionCell ? (
                  <TableSelectAllCell
                    key={column.key}
                    column={column}
                    state={state}
                  />
                ) : (
                  <TableColumnHeader
                    key={column.key}
                    column={column}
                    state={state}
                  />
                )
              )}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup type="tbody">
          {[...collection.body.childNodes].map((row) => (
            <TableRow key={row.key} item={row} state={state}>
              {[...row.childNodes].map((cell) =>
                cell.props.isSelectionCell ? (
                  <TableCheckboxCell key={cell.key} cell={cell} state={state} />
                ) : (
                  <TableCell key={cell.key} cell={cell} state={state} />
                )
              )}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    );
  }

export default Table