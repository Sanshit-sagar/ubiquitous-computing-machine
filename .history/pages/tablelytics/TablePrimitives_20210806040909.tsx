import { styled } from '@stitches/react' 

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { blackA, blue } from '@radix-ui/colors'
import { darkTheme, theme } from '../../stiches.config'
import { colors, getHiContrast, loContrasts } from ''
// '../pages/colors';

// TODO: turn this into a callable hook
// const isDarkTheme = document.body.classList.contains(darkThemeClassName.toString());

export const StyledTableContainer = styled('div', {
    height: '650px',
    width: '1250px',
    lineHeight: 1,
    padding: '$1',
    margin: '$2',
    fontSize: '$1',
    border: 'thin solid silver',
    borderRadius: '5px',
    boxShadow: `0px 0px 5px 10px ${blackA.blackA12}`,
    color: '$slate11',
    backgroundColor: `white`,
    borderTopLeftRadius: '$2',
    borderTopRightRadius: '$2',
    flexShrink: 0,
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    outline: 'none',

    zIndex: '10',
    '@hover': {
        '&:hover': {
          color: '$hiContrast',
          borderColor: '$slate6',
        },
    },
});

export const StyledHeader = styled('button', {


}


const StyledHeader = ({ name }) => {
    
    return (
        <Box css={{ height: '30px' }}>
            <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'flex-start'}}>
                <Text>{name}</Text>
            </Flex>
        </Box>
    )
}

const StyledCell = ({ value, long, short }) => {
    return (
        <Box css={{ width: long ? '150px' : short ? '50px' : '100px', height: '27.5px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <Text> {value} </Text> 
            </Flex>
        </Box>
    )
}
 
