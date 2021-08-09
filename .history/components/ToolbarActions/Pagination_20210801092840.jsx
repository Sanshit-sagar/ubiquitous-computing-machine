import React, { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../../store'

import { AnchorButton, ButtonGroup, NumericInput } from "@blueprintjs/core";
import toast from 'react-hot-toast'

// import Label from '../../primitives/Label'
// import { Input } from '../../primitives/LabelledInput'
// import { Button } from '../../primitives/Button'
// import ToggleButton from '../../primitives/Toggle'
// import { StyledSeparator } from '../../primitives/Separator'
// import { Flex } from '../../primitives/Flex'
// import { Box } from '../../primitives/Box'
// import { Text } from '../../primitives/Text'
// import StyledTooltip from '../../primitives/Tooltip'



const Pagination = ({
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    loading
 }) => {
    const state = useContext(GlobalStore.State)
    const [pageIndexInput, setPageIndexInput] = useState(pageIndex + 1);

    useEffect(() => {
        setPageSize(Number(10))
    }, []); 
    

    return (
        <div className="pagination">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'start', width: '100%'}}>
                <ButtonGroup>
                    <AnchorButton loading={loading} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </AnchorButton>{' '}
                    <AnchorButton  loading={loading} onClick={() => {
                        toast.success('going to prev page');
                        previousPage()
                    }} 
                    disabled={!canPreviousPage}>
                        {'<'}
                    </AnchorButton>{' '}
                    <AnchorButton  loading={loading} onClick={() => {
                        nextPage() 
                        toast.success('going to next page');
                    }} disabled={!canNextPage}>
                        {'>'}
                    </AnchorButton>{' '}
                    <AnchorButton  loading={loading} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </AnchorButton>{' '}
                </ButtonGroup>

                <ButtonGroup>
                    <AnchorButton text="Active" intent="success" />
                    <AnchorButton text="Expired" intent="danger" />
                    <AnchorButton icon="sort-asc" />
                    <AnchorButton icon="sort-desc" />
                    <AnchorButton icon="sort-alphabetical" />
                    <AnchorButton icon="sort-alphabetical-desc" />
                </ButtonGroup>
                    
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <span className="text-xs font-extralight mr-5">
                        Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                    </span>
                    <span style={{ marginRight: '10px' }}>
                        <NumericInput
                            value={pageIndexInput}
                            onChange={(e)=> {
                                const page = (e.target.value) ? parseInt(e.target.value) - 1 : 0
                                setPageIndexInput(page)
                                gotoPage(page)
                            }}
                            style={{ maxWidth: '50px'}}
                        />
                    </span>
                    {' '}
                    <div class="bp3-select">
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagination;
