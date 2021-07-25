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
      color: {
        violet: {
          backgroundColor: 'blueviolet',
          color: 'white',
          '&:hover': {
            backgroundColor: 'darkviolet',
          },
        },
        gray: {
          backgroundColor: 'gainsboro',
          '&:hover': {
            backgroundColor: 'lightgray',
          },
        },
      },
    },
  },

  defaultVariants: {
    color: 'black'
  }
});

export const Button = StyledButton;