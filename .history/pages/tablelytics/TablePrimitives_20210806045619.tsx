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

export const StyledHeader = styled('div', {
    height: '35px',
    width: '1240px',
    margin: '2px 5px',
    padding: '1.5px',
    borderBottom: 'thin solid silver',
    borderBottomRadius: '0px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: blue.blue6,
        color: 'white',
    }
}); 

export const StyledCell = styled('span', {
    height: '30px',
    display: 'alignItems',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '$1 $2',
    overflowY: 'hidden',
    overflowX: 'hidden',
    flexShrink: 0,
    flexWrap: 'wrap',
    borderLeft: 'thin solid silver',
    borderBottom: 'thin solid silver',
    lineHeight: 1,
    '&:hover': {
        opacity: 1,
        color: blue.blue12,
    },
    '&:last-child': { 
        borderRight: 'thin solid silver',
    },

    variants: {
        size: {
          '1': {
            width: '50px',
          },
          '2': {
            width: '100px',
          },
          '3': {
            width: '150px',
          },
        },
    },
});


// const StyledHeader = ({ name }) => {
    
//     return (
//         <Box css={{ height: '30px' }}>
//             <Flex css={{ width: '100%', fd: 'row', jc:'space-between', ai: 'flex-start'}}>
//                 <Text>{name}</Text>
//             </Flex>
//         </Box>
//     )
// }

// const StyledCell = ({ value, long, short }) => {
//     return (
//         <Box css={{ width: long ? '150px' : short ? '50px' : '100px', height: '27.5px', overflowY: 'hidden', overflowX: 'hidden' }}>
//             <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
//                 <Text> {value} </Text> 
//             </Flex>
//         </Box>
//     )
// }
 
