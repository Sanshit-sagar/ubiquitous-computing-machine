//hi

import { styled } from '../stiches.config'
import { blackA } from '@radix-ui/colors'

export const Text = styled('span', {
    color: 'black',
    fontSize: 12,
    lineHeight: '20px',
});

export const Fieldset = styled('fieldset', {
    all: 'unset',
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    marginBottom: 15,
});
  
export const Label = styled('label', {
    fontSize: 15,
    color: blackA.blackA12,
    userSelect: 'none',
});

export const Input = styled('input', {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: blackA.blackA12,
    boxShadow: 'none',
    border: `thin solid ${blackA.blackA12}`,
    borderRadius: "$2",
  
    '&:focus': { 
        boxShadow: 'none', 
        outline: 'none' 
    },
});
  