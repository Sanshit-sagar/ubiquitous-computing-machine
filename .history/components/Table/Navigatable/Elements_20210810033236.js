import React, { useContext, useRef } from 'react'
import {useFocusRing} from '@react-aria/focus'; 
import {mergeProps} from '@react-aria/utils';
import {
    useTableCell, useTableColumnHeader, 
    useTableHeaderRow, useTableRowGroup, useTableRow, 
    useTableSelectAllCheckbox, useTableSelectionCheckbox
} from '@react-aria/table'
import {useToggleState} from '@react-stately/toggle';
import {useCheckbox} from '@react-aria/checkbox';
import {GlobalStore} from '../../../store'

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

export function TableRowGroup({type: Element, style, children}) {
  let {rowGroupProps} = useTableRowGroup();
  return (
    <Element {...rowGroupProps} style={style}>
      {children}
    </Element>
  );
}


export function TableHeaderRow({item, state, children}) {
  let ref = useRef();
  let {rowProps} = useTableHeaderRow({node: item}, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}

export function TableColumnHeader({column, state}) {
  let ref = useRef();
  let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan}
      style={{
        textAlign: column.colspan > 1 ? 'center' : 'left',
        padding: '5px 10px',
        outline: isFocusVisible ? '2px solid orange' : 'none',
        cursor: 'default'
      }}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: '0 2px',
            visibility:
              state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'
          }}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}

export function TableRow({item, children, state}) {
  let ref = useRef();
  let isSelected = state.selectionManager.isSelected(item.key);
  let {rowProps} = useTableRow({node: item}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  const uiState = useContext(GlobalStore.State)

  return (
    <tr
      style={{
        paddingLeft: '5px',
        background: isSelected
          ? 'crimson'
          : item.index % 2
          ? 'var(--spectrum-alias-highlight-hover)'
          : 'none',
        color: isSelected ? 'white' : null,
        outline: isFocusVisible ? `2px solid ${uiState.darkMode ? slate.slate6 : slateDark.slate6}` : 'none'
      }}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}

export function TableCell({cell, state}) {
  let ref = useRef();
  let {gridCellProps} = useTableCell({node: cell}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  const uiState = useContext(GlobalStore.State)

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        padding: '5px 10px',
        outline: isFocusVisible ? `2px solid ${uiState.darkMode ? slate.slate6 : slateDark.slate6}` : 'none',
        cursor: 'default'
      }}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}

export function TableCheckboxCell({cell, state}) {
  let ref = useRef();
  let {gridCellProps} = useTableCell({node: cell}, state, ref);
  let {checkboxProps} = useTableSelectionCheckbox({key: cell.parentKey}, state);

  let inputRef = useRef(null);
  let {inputProps} = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  return (
    <td {...gridCellProps} ref={ref}>
      <input {...inputProps} />
    </td>
  );
}

export function TableSelectAllCell({column, state}) {
  let ref = useRef();
  let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
  let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);

  let {checkboxProps} = useTableSelectAllCheckbox(state);
  let inputRef = useRef(null);
  let {inputProps} = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  return (
    <th {...columnHeaderProps} ref={ref}>
      {
        isSingleSelectionMode && (
          <VisuallyHidden>{inputProps['aria-label']}</VisuallyHidden>
        )
      }
      <input
        {...inputProps}
        ref={inputRef}
        style={isSingleSelectionMode ? {visibility: 'hidden'} : undefined}
      />
    </th>
  );
}
