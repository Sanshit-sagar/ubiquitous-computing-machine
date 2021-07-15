import React, { useState } from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';

const StyledToggle = styled(Toggle.Root, {
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'thin solid gray',
  padding: '3px 7px',
  boxShadow: 'inset 0 0 0 1px gainsboro',
  overflow: 'hidden',
  borderRadius: 6,
  marginHorizontail: 5,

  '&:focus': {
    outline: 'none',
    boxShadow: 'inset 0 0 0 1px dodgerblue, 0 0 0 1px dodgerblue',
  },

  '&[data-state=on]': {
    backgroundColor: 'blue',
  },
  '&[data-state=off]': {
    backgroundColor: 'gainsboro',
  },
});

const ToggleButton = ({ isPressed, handlePress, pressedElem, unpressedElem }) => {

    return (
        <StyledToggle
            pressed={isPressed}
            onPressedChange={handlePress}
            disabled={false}
        >
            {isPressed ? pressedElem : unpressedElem}
        </StyledToggle>
    );
}

export default ToggleButton;