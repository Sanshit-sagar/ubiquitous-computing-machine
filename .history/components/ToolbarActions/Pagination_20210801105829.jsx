import React, { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../../store'

import { AnchorButton, ButtonGroup } from "@blueprintjs/core";
import toast from 'react-hot-toast'

import ToggleGroup from '../../primitives/StyledGroup'
import ToggleGroupItem from '../../primitives/ToggleGroup'
import ToggleButton from '../../primitives/Toggle'

import { StyledSeparator } from '../../primitives/Separator'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import StyledTooltip from '../../primitives/Tooltip'


const ToggleGroupDemo = () => {

    return (
        <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Left aligned">
            <TextAlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
            <TextAlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
            <TextAlignRightIcon />
        </ToggleGroupItem>
        </ToggleGroup>
    );
}

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
        
        <Box css={{ py: '$1', px: '$2', height: '50px', bc: '#000', color: '#fff', border: 'thin solid white', br: '5px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                <ToggleGroupDemo>
                    <ToggleButton loading={loading} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </ToggleButton>{' '}
                    <ToggleButton  loading={loading} onClick={() => {
                        toast.success('going to prev page');
                        previousPage()
                    }} 
                    disabled={!canPreviousPage}>
                        {'<'}
                    </ToggleButton>{' '}
                    <ToggleButton  loading={loading} onClick={() => {
                        nextPage() 
                        toast.success('going to next page');
                    }} disabled={!canNextPage}>
                        {'>'}
                    </ToggleButton>{' '}
                    <ToggleButton  loading={loading} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </ToggleButton>{' '}
                </ToggleGroupDemo>

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
                    {/* <span style={{ marginRight: '10px' }}>
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
                    {' '} */}
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
            </Flex>
        </Box>
    )
}

export default Pagination;
