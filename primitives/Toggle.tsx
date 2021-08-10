//hi

import React from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';
import { mauve, blackA } from '@radix-ui/colors'

const StyledToggle = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: '$hiContrast',
  color: '$loContrast',
  border: 'thin solid',
  borderColor: '$hiContrast',
  borderRadius: '5px',
  display: 'flex',
  fontSize: 15,
  height: 32,
  minWidth: 32,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { 
    backgroundColor: '$slate9',
    color: '$crimson9',
  },
  '&[data-state=on]': { 
    backgroundColor: '$slate9',
    color: '$blue9',
  },
  '&:focus': { 
    backgroundColor: mauve.mauve6,
    color: mauve.mauve2,
  },
});


const ToggleButton = ({ isPressed, handlePress, pressedElem, unpressedElem }) => {

    return (
      <StyledToggle onClick={handlePress}>
        {isPressed ? pressedElem : unpressedElem}
      </StyledToggle>
    );
}

export default ToggleButton;