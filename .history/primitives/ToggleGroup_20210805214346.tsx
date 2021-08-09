import { styled } from '@stitches/react';
import { blackA, mauve } from '@radix-ui/colors';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';


const ControlButton = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: 'white',
  color: blackA.blackA12,
  height: 28,
  width: 50,
  margin: 1,
  padding: 1,
  border: 'thin solid transparent',
  borderRadius: '5px',
  display: 'flex',
  fontSize: 12,
  alignItems: 'center',
  justifyContent: 'center',
  // boxShadow: `0 2px 10px ${blackA.blackA1}`,
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


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: 'transparent',
  border: 'thin solid silver',
  borderRadius: '$1'
  // boxShadow: `0 2px 10px ${blackA.blackA12}`,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: 'white',
  color: blackA.blackA12,
  borderRight: 'thin solid transparent',
  margin: 1,
  padding: 1,
  height: 28,
  width: 40,
  display: 'flex',
  fontSize: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  '&:first-child': { 
    marginLeft: 0, 
    borderTopLeftRadius: 4, 
    borderBottomLeftRadius: 4,
    borderRight: 'thin solid silver', 
    borderRightRadius: '0px',
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

