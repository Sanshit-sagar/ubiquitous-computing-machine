import React, { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Meter from '../../Meter'
import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'
import { AccessibleIcon } from '../../../primitives/AccessibleIcon'

import { darkTheme } from '../../../stiches.config'
import { timeDifference } from '../../../lib/datetime'
import { GlobalStore } from '../../../store'

import { EyeOpenIcon } from '@radix-ui/react-icons' 


const violetA = {
    violetA1: '#5805ab03',
    violetA2: '#3705ff05',
    violetA3: '#3c00ff0d',
    violetA4: '#2e02f416',
    violetA5: '#2f01e821',
    violetA6: '#2a01df30',
    violetA7: '#2b01d447',
    violetA8: '#2a00d066',
    violetA9: '#2500b6a9',
    violetA10: '#1f00a5b0',
    violetA11: '#180091b9',
    violetA12: '#0e003dec',
}

const violetDarkA = {
    violetA1: '#00000000',
    violetA2: '#743afd0e',
    violetA3: '#7452fe26',
    violetA4: '#7650ff38',
    violetA5: '#7654ff49',
    violetA6: '#7253ff5f',
    violetA7: '#7053ff83',
    violetA8: '#6f52ffbb',
    violetA9: '#8668ffc8',
    violetA10: '#8e75ffd7',
    violetA11: '#a18efffa',
    violetA12: '#f5f2fffa',
}


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
                        <Text size="1" css={{ color: uiState.darkMode ? violetDarkA.violetA12 : violetA.violetA12, cursor: 'alias'}} > 
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

export const HttpStatusCell = ({ value }) => {
    let responseStatus = {
        301: 'Moved Perm.',
        302: 'Found',
        303: 'See Other',
        305: 'Not Modified',
        307: 'Temp. Redirect',
        308: 'Perm. Redirect',
    }

    return (
        <StyledCell value={
            <Flex css={{ fd: 'column', jc:'flex-start', ai: 'flex-end'}}>
                <Text size="1"> {value} </Text>
                <Text size="1"> {responseStatus[parseInt(value)]}</Text>
            </Flex>
        }/>
    )
}

export const PasswordCell = ({ value }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <StyledCell 
            longish={true}
            value={
                <button 
                    style={{ padding: '2.5px' }} 
                    onClick={toggleVisibility}
                >
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2' }}>
                        <Text size="1"> {value} </Text>
                        <AccessibleIcon label={'show password'}>
                            <EyeOpenIcon />
                        </AccessibleIcon> 
                    </Flex> 
                </button>
            }
        />
    );
}



export const BrowserCell = ({ value }) => {
    return (
        <StyledCell>
            <Image src='/assets/firefox.svg' alt='firefox' height={25} width={25}  />
        </StyledCell>
    )
}
