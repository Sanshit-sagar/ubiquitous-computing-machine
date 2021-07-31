import React from 'react'
import { styled, keyframes } from '@stitches/react'
import { violet, blackA, mauve, green } from '@radix-ui/colors'

const ActionButton = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    borderRadius: '4px',
    border: `thin solid ${blackA.blackA10}`,
    padding: '0px 3.5px',
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 500,
    height: 35,
    width: '100%',
  
    variants: {
      variant: {
        black: {
            backgroundColor: 'white',
            color: 'black',
            '&:hover': { backgroundColor: blackA.blackA10 },
            '&:focus': { boxShadow: `0 0 0 2px black` },
        },
        violet: {
          backgroundColor: 'white',
          color: violet.violet11,
          boxShadow: `0 2px 10px ${blackA.blackA7}`,
          '&:hover': { backgroundColor: mauve.mauve3 },
          '&:focus': { boxShadow: `0 0 0 2px black` },
        },
        green: {
          backgroundColor: green.green4,
          color: green.green11,
          '&:hover': { backgroundColor: green.green5 },
          '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
        },
      },
    },
  
    defaultVariants: {
      variant: 'violet',
    },
});

export default ActionButton