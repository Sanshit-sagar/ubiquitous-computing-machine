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
    all: 'unset',
    width: '100%',
    flex: '1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '4px',
    padding: '2px',
    fontSize: 15,
    lineHeight: 1,
    color: blackA.blackA11,
    boxShadow: `0 0 0 1px ${blackA.blackA7}`,
    height: '20px',
  
    '&:focus': { boxShadow: 'none', outline: 'none' },
});
  