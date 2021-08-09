//hi

import React from 'react'
import { styled } from '@stitches/react';
import * as Toggle from '@radix-ui/react-toggle';
import { mauve, blackA } from '@radix-ui/colors'

const StyledToggle = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: 'white',
  color: mauve.mauve11,
  height: 35,
  minWidth: 35,
  border: 'thin solid black',
  borderRadius: '5px',
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA1}`,
  '&:hover': { 
    backgroundColor: blackA.blackA12,
    color: 'white',
  },
  '&[data-state=on]': { 
    backgroundColor: blackA.blackA5, 
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