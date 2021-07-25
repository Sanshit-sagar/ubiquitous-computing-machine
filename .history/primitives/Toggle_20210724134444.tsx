import React from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';
import { violet, blackA, mauve } from '@radix-ui/colors'

const StyledToggle = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: 'white',
  color: mauve.mauve11,
  height: 37.5,
  width: 37.5,
  borderRadius: 4,
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: violet.violet3 },
  '&[data-state=on]': { backgroundColor: violet.violet6, color: violet.violet12 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});


const ToggleButton = () => {

    return (
      <StyledToggle defaultOpen={false}>
        {children}
      </StyledToggle>
    );
}

export default ToggleButton;

// isPressed, handlePress, pressedElem, unpressedElem