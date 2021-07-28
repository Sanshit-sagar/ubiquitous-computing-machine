import React from 'react';
import { styled } from '../stiches.config';
import { blackA, violet } from '@radix-ui/colors'

export const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    height: 35,
    width: 35,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: violet.violet11,
    backgroundColor: 'white',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    '&:hover': { backgroundColor: violet.violet3 },
    '&:focus': { boxShadow: `0 0 0 2px black` },
});