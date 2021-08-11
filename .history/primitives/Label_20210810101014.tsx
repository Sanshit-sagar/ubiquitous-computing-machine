import { styled } from '@stitches/react';
import * as LabelPrimitive from '@radix-ui/react-label';

export const Wrapper = styled('div', {
    jc: 'flex-start',
    fd: 'column',
    position: 'relative',
    mt: '20px',
});

export const Fieldset = styled('fieldset', {
    all: 'unset',
    marginBottom: '$2',
    padding: '$1 $2',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ai: 'stretch'
  });
  
export const Label = styled(LabelPrimitive.Root, {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '25px',
    marginBottom: 10,
    color: '$hiContrast',
    display: 'block',
});
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: '$1',
    fontSize: 12,
    lineHeight: 1,
    color: '$hiContrast',
    bc: '$loContrast',
    height: 25,
    '&:focus': { 
        bc: '$slate10',
    },
});
  