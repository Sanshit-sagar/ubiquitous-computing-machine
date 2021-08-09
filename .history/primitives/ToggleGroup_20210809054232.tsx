import { blackA, mauve } from '@radix-ui/colors';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';
import { darkTheme, styled, CSS, StitchesVariants } from '../stiches.config'

const ControlButton = styled(Toggle.Root, {
  height: '100%',
  backgroundColor: darkTheme.colors.hiContrast,
  color: darkTheme.colors.loContrast,
  border: '1px solid',
  borderColor: blackA.blackA12,
  padding: '$1 $2',
  fontSize: 9,
  lineHeight: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:disabled': {
    backgroundColor: 'red',
    color: 'white',
    border: '2px solid gold',
  }
});

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: '$slate10',
  border: `thin solid ${ darkTheme.colors.hiContrast}`,
  borderRadius: '$1',
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: darkTheme.colors.loContrast,
  color: darkTheme.colors.hiContrast,
  height: 28,
  width: 35,
  display: 'flex',
  fontSize: 9,
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: `thin solid ${darkTheme.colors.hiContrast}`,
  '&:first-child': { 
    marginLeft: 0, 
    borderTopLeftRadius: 4, 
    borderBottomLeftRadius: 4,
  },
  '&:last-child': { 
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4, 
    borderRightColor:  darkTheme.colors.hiContrast 
  },
  '&:hover': { 
    backgroundColor: '$slate9',
    color: darkTheme.colors.hiContrast,
  },
  '&[data-state=on]': { 
    backgroundColor: '$slate9',
    color: darkTheme.colors.hiContrast,
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

