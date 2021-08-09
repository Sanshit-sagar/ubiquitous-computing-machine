import React from 'react'
import { styled } from '../stiches.config'
import { mauve, blackA } from '@radix-ui/colors'

import { Button } from './Button'

const SelectableTrigger = styled('div', {
    padding: '$1',
    margin: '$1',
    cursor: 'pointer',
    backgroundColor: '#d1d9e0',
    color: blackA.blackA12,
    border: '1px solid',
    borderColor: blackA.blackA12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    "&:hover": {
        backgroundColor: mauve.mauve6,
        color: 'white',
    },
}); 

//   height: 32px;
//   width: 32px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer
//   background-color: #d1d9e0;
//   color: #404b5a;
//   border: 1px solid;
//   border-color: #d1d9e0;
//   transition-property: background-color, color, border-color;
//   transition-duration: 150ms;