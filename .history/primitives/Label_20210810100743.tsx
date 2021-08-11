import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';

export const Wrapper = styled('div', {
    jc: 'flex-start',
    fd: 'column',
    position: 'relative',
    mt: '20px',
});

export const Fieldset = styled('fieldset', {
    all: 'unset',
    marginBottom: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  });
  
export const Label = styled('label', {
    fontSize: 13,
    lineHeight: 1,
    marginBottom: 10,
    color: violet.violet12,
    display: 'block',
});
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: 4,
    padding: '0 10px',
    fontSize: 12,
    lineHeight: 1,
    color: '$hiContrast',
    bc: '$loContrast',
    height: 25,
    '&:focus': { 
        bc: '$slate10',
    },
});
  