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
      violet: {
        backgroundColor: 'blueviolet',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkviolet',
        },
      },
      gray: {
        backgroundColor: blackA.blackA6,
        '&:hover': {
          backgroundColor: blackA.blackA12,
        },
      },
    },
    outlined: {
      true: {
        borderColor: blackA.blackA12,
      },
    },
  },

  compoundVariants: [
    {
      color: 'violet',
      outlined: true,
      css: {
        color: 'blueviolet',
        borderColor: 'darkviolet',
        '&:hover': {
          color: 'white',
        },
      },
    },
    {
      color: 'gray',
      outlined: true,
      css: {
        color: 'black',
        backgroundColor: 'white',
        border: 'thin solid black',
        '&:hover': {
          color: 'white',
          backgroundColor: 'black',
          border: 'thin solid gray',
        },
      },
    },
  ],

  defaultVariants: {
    color: 'gray',
  }
});

export const Button = StyledButton;