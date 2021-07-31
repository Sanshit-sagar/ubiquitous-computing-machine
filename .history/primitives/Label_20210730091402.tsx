import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';

export const Wrapper = styled('div', {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    margin-top: 20px;
});

export const Label = styled('label', {
    display: block;
    text-align: left;
    font-size: 14px;
});
