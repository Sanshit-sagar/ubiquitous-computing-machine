import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';

export const Wrapper = styled('div', {
    jc: 'flex-start',
    fd: 'column',
    position: 'relative',
    mt: '20px',
});

export const Label = styled('label', {
    display: 'block',
    ta: 'left',
    fsize: '14px',
});
