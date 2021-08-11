import React, { useState }  from 'react'
import { TextField } from '../../../primitives/TextField'
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) =>  {

    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)
  
    return (
        <TextField
            size="1"
            value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`Search ${preGlobalFilteredRows.length} entries...`}
        />
    )
}

export default GlobalFilter