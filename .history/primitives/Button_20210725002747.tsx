import React from 'react'
import { styled, keyframes } from '../stiches.config';
import { violet, blackA } from '@radix-ui/colors';

const StyledButton = styled('button', {
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'flex-start', 
  alignItems: 'center',
  padding: '5px',
  borderRadius: '3.5px',

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
        border: `2px solid ${blackA.blackA12}`,
        '&:hover': {
          color: blackA.blackA12,
          backgroundColor: blackA.blackA5,
          border: `2px solid ${blackA.blackA12}`,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'gray',
  }
});

export const Button = StyledButton;