import { styled } from '@stitches/react';
import { blackA, mauve } from '@radix-ui/colors';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';


const ControlButton = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: 'white',
  color: blackA.blackA12,
  height: 30,
  width: 42,
  border: 'thin solid transparent',
  borderRadius: '5px',
  display: 'flex',
  fontSize: 16,
  alignItems: 'center',
  justifyContent: 'center',
  // boxShadow: `0 2px 10px ${blackA.blackA1}`,
  '&:hover': { 
    backgroundColor: blackA.blackA12,
    color: 'white',
  },
  '&:focus': { 
    backgroundColor: blackA.blackA2,
    // boxShadow: `0 0 0 2px black` 
  },
});


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: 'transparent',
  border: 'thin solid black',
  borderRadius: '$1'
  // boxShadow: `0 2px 10px ${blackA.blackA12}`,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: 'white',
  color: blackA.blackA12,
  borderRight: 'thin solid black',
  margin: 1,
  padding: 1,
  height: 28,
  width: 40,
  display: 'flex',
  fontSize: 15,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  '&:first-child': { 
    marginLeft: 0, 
    borderTopLeftRadius: 4, 
    borderBottomLeftRadius: 4 
  },
  '&:last-child': { 
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4, 
    borderRight: 'transparent' 
  },
  '&:hover': { 
    backgroundColor: mauve.mauve12, 
    color: mauve.mauve1 
  },
  '&[data-state=on]': { 
    backgroundColor: blackA.blackA12, 
    color: 'white', 
    outline: 'none' 
  },
  '&:focus': { 
    position: 'relative', 
    color: mauve.mauve6, 
    outline: 'none' 
  },
});

// Exports
export const ToggleGroup = StyledToggleGroup;
export const ActionButtonItem = StyledItem;
export const ToggleButtonItem = ControlButton;

