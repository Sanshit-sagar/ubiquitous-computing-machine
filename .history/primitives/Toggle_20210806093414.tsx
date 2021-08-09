//hi

import React from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';
import { mauve, blackA } from '@radix-ui/colors'

const StyledToggle = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: blackA.blackA11,
  color: 'silver',
  height: 35,
  minWidth: 35,
  border: 'thin solid silver',
  borderRadius: '5px',
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { 
    color: mauve.mauve2,
    backgroundColor: mauve.mauve12,
  },
  '&[data-state=on]': { 
    backgroundColor: 'green',
    color: 'white' 
  },
  '&:focus': { 
    boxShadow: `0 0 0 2px black` 
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