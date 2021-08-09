//hi

import React from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';
import { mauve, blackA } from '@radix-ui/colors'

const StyledToggle = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: blackA.blackA11,
  color: 'silver',
  border: 'thin solid silver',
  borderRadius: '5px',
  display: 'flex',
  fontSize: 15,
  height: 35,
  minWidth: 35,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { 
    backgroundColor: mauve.mauve12,
    color: mauve.mauve2,
  },
  '&[data-state=on]': { 
    backgroundColor: mauve.mauve2,
    color: blackA.blackA12,
  },
  '&:focus': { 
    boxShadow: `0 0 0 2px silver` 
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