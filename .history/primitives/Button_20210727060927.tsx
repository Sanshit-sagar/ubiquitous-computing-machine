import React from 'react'
import { styled, keyframes } from '../stiches.config';
import { violet, blackA } from '@radix-ui/colors';

const StyledButton = styled('button', {
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '1px 2.5px 1px 2.5px',
  borderRadius: '3.5px',
  minWidth: '100px',

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
        backgroundColor: blackA.blackA2,
        '&:hover': {
          backgroundColor: blackA.blackA8,
        },
      },
      black: {
        backgroundColor: blackA.blackA12,
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
        color: blackA.blackA12,
        backgroundColor: 'white',
        border: `1px solid ${blackA.blackA12}`,
        '&:hover': {
          color: blackA.blackA12,
          backgroundColor: 'gainsboro',
          border: `1px solid ${blackA.blackA12}`,
        },
      },
    },
    {
      color: 'black',
      outlined: true,
      css: {
        color: 'gainsboro',
        backgroundColor: blackA.blackA11,
        border: `1px solid ${blackA.blackA1}`,
        '&:hover': {
          color: 'white',
          backgroundColor: blackA.blackA12,
          border: `1px solid ${blackA.blackA1}`,
        },
      },
    }
  ],

  defaultVariants: {
    color: 'gray', 
  }
});

export const Button = StyledButton;