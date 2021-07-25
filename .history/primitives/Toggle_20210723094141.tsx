import React from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';
import { violet, blackA } from '@radix-ui/colors'

export const StyledToggle = styled(Toggle.Root, {
  appearance: 'none', 
  height: 37.5,
  width: 37.5,
  backgroundColor: 'white',
  padding: '10px',
  boxShadow: 'inset 0 0 0 1px gainsboro',
  overflow: 'hidden',
  borderRadius: 4,
  marginHorizontail: 5,

  '&:focus': {
    outline: 'none',
    border: 'none',
  },

  '&[data-state=on]': {
    backgroundColor: 'transparent',
  },

  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: violet.violet12,
    color: 'white',
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