import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Meter from '../../Meter'
import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'
import { darkTheme } from '../../../stiches.config'
import { timeDifference } from '../../../lib/datetime'

import { GlobalStore } from '../../../store'

export function darkThemeColor(color) {
    return {
      [`body.${darkTheme} &`]: {
        bc: color,
      },
    };
}

function formatTimestamp(ts) {
    return new Date(parseInt(ts)).toLocaleString();
}

export const StyledHeader = ({ name, index }) => {
    // const [sortApplied, setSortApplied] = useState(false)
    // const [sortRowId, setSortRowId] = useState('')

    // const applySort = (updatedSortRowId) => {
    //     if(!sortApplied && !sortRowId===updatedSortRowId) {
    //         setSortApplied(true);
    //         setSortRowId(updatedSortRowId);
    //     } else if(sortApplied && sortRowId===updatedSortRowId) {
    //         setSortApplied(false);
    //         setSortRowId('')
    //     } else {
    //         setRowId(updatedSortRowId);
    //     }
    // }
    let isFirstCol = name?.length && name==='#'

    return (
        <Box css={{ height: '30px', padding: '$1' }}>
            <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'center' }}>
                <Text size='1'> 
                    {isFirstCol ? '' : name.toUpperCase()}
                </Text>
            </Flex>
        </Box>
    )
}

export const StyledCell = ({ value, long, longish, short, xshort }) => {
    
    const getLength = () => {
        return long ? '155px' : longish ? '135px' : short ? '50px' : xshort ? '30px' : '100px';
    }

    return (
        <Box css={{ width: getLength(), height: '40px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <Text size='1'> 
                    {value} 
                </Text> 
            </Flex>
        </Box>
    )
}


export const LifeLeftCell = ({ value }) => {
    
    return (
        <Box css={{ width: '150px', height: '30px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'column', jc:'flex-start', ai: 'flex-end', gap: '$1' }}>
                <Text size='1'>{value}%</Text>
                <Meter label="" value={parseInt(value)} maxValue={100} />
            </Flex>
        </Box>
    );
}

export const UrlCell = ({ value }) => {
    let hostname = new URL(value).hostname;
    const uiState = useContext(GlobalStore.State)

    return (
        <StyledCell 
            long={true} 
            value={
                <Flex css={{ fd: 'column', jc:'flex-start', ai: 'flex-start', gap: '$1' }}>
                    <Link href={value}> 
                        <Text size="1" css={{ color: uiState.darkMode ? 'blue' : 'green', cursor: 'alias'}} > 
                        {hostname || value.substring(0, 20)} 
                        </Text>
                    </Link>
                    <Text size="1"> 
                        {value.substring(0,25)}... 
                    </Text>
                </Flex>
            } 
        />
    );
}

export const TimestampCell = ({ value }) => {

    return (
        <StyledCell longish={true} value={
             <Flex css={{ fd: 'column', jc:'flex-start', ai: 'flex-end', gap: '$1' }}>
                <Text size="1"> {formatTimestamp(value)} </Text>
                <Text size="1"> {timeDifference(value)} </Text>
            </Flex>
        }/>
    )
}



export const BrowserCell = ({ value }) => {
    return (
        <StyledCell>
            <Image src='/assets/firefox.svg' alt='firefox' height={25} width={25}  />
        </StyledCell>
    )
}
