import React from 'react'
import { styled, keyframes } from '../stiches.config';
import { violet, blackA } from '@radix-ui/colors';

const StyledButton = styled('button', {
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'flex-start', 
  alignItems: 'center',
  padding: '10px',
  borderRadius: '3px',

  variants: {
    color: {
      black: {
        backgroundColor: blackA.blackA10,
        borderColor: blackA.blackA12,
        color: 'white',
        '&:hover': {
          backgroundColor: blackA.blackA12,
        },
      },
      white: {
        backgroundColor: 'white',
        borderColor:  blackA.blackA10,
        color:  blackA.blackA10,
        '&:hover': {
          backgroundColor: 'gainsboro',
          borderColor: blackA.blackA12,
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