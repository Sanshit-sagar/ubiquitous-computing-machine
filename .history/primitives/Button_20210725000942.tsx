import React from 'react'
import { styled, keyframes } from '../stiches.config';
import { violet, blackA } from '@radix-ui/colors';

const StyledButton = styled('button', {
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'flex-start', 
  alignItems: 'center',
  padding: '10px',
  borderRadius: '5px',

  variants: {
    color: {
      black: {
        backgroundColor: blackA.blackA12,
        borderColor: 'dodgerblue',
        color: 'white',
        '&:hover': {
          backgroundColor: blackA.blackA12,
          borderColor: 'white',
          color: 'gainsboro',
        },
      },
      white: {
        backgroundColor: 'white',
        border: `1.5px solid ${blackA.blackA10}`,
        color:  blackA.blackA12,
        '&:hover': {
          backgroundColor: 'gainsboro',
          border: `3px solid ${blackA.blackA12}`,
          color:  blackA.blackA12,
        },
      },
      violet: {
        backgroundColor: violet.violet12,
        borderColor: violet.violet12,
        color: 'white',
        '&:hover': {
          backgroundColor: violet.violet12,
          borderColor: violet.violet10,
        },
      },
    },
  },

  defaultVariants: {
    color: 'black'
  }
});

export const Button = StyledButton;