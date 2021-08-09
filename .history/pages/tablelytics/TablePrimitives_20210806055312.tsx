import { styled } from '@stitches/react' 

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { TextField } from '../../primitives/TextField'

import { blackA, blue } from '@radix-ui/colors'
import { darkTheme, theme } from '../../stiches.config'

export const loContrasts = ['lime', 'yellow', 'amber', 'sky', 'mint'];

export function darkThemeColor(color: string): any {
  return {
    [`body.${darkTheme} &`]: {
      bc: color,
    },
  };
}


export function getHiContrast(color: string) {
    if (loContrasts.includes(color)) {
      return 'hsl(0, 0%, 0%)';
    }
  
    return 'hsl(0, 0%, 100%)';
}

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

export const StyledTableHeader = styled('div', {
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


export const StyledTextField = () => {
    return (
        <TextField
            size="2"
            placeholder="Slate & Blue"
            css={{
                ...darkThemeColor('$slate1'),
                boxShadow: 'inset 0 0 0 1px $colors$slate7',
                color: '$slate12',
                fontVariantNumeric: 'tabular-nums',

                '&:-webkit-autofill': {
                    boxShadow: 'inset 0 0 0 1px $colors$blue6, inset 0 0 0 100px $colors$blue3',
                },

                '&:-webkit-autofill::first-line': {
                    fontFamily: '$untitled',
                    color: '$hiContrast',
                },

                '&:focus': {
                    boxShadow: 'inset 0px 0px 0px 1px $colors$blue8, 0px 0px 0px 1px $colors$blue8',
                    '&:-webkit-autofill': {
                    boxShadow:
                        'inset 0px 0px 0px 1px $colors$blue8, 0px 0px 0px 1px $colors$blue8, inset 0 0 0 100px $colors$blue3',
                    },
                },
                '&::placeholder': {
                    color: '$slate9',
                },
            }}
        />
    )
}

// function Sidebar({ children }) {
//     return (
//       <Box
//         css={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           bottom: 0,
//           bc: 'white',
//           overflowY: 'scroll',
//           boxShadow: '1px 0 $colors$gray6',
//           width: 240,
//           ...darkThemeColor('black'),
//         }}
//       >
//           {children}
//       </Box>
//     );
// }

// const StyledButton = () => {

//     return (
//         <Button
//         size="2"
//         css={{
//           textTransform: 'capitalize',
//           backgroundColor: `$${color}9`,
//           color: getHiContrast(color),
//           boxShadow: 'none',
//           borderRadius: '$pill',
//           '@hover': {
//             '&:hover': {
//               color: getHiContrast(color),
//               boxShadow: 'none',
//               backgroundColor: `var(--colors-${color}10)`,
//             },
//           },
//           '&:active': {
//             boxShadow: 'none',
//             color: 'white',
//             backgroundColor: `$${color}11`,
//           },
//           '&:focus': {
//             boxShadow: `0 0 0 2px $colors$${color}7`,
//           },
//         }}
//       >
//         {color}
//       </Button>
//     )
// }

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
 
