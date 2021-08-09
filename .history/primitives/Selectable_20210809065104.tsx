import React from 'react'
import { styled } from '../stiches.config'
import { mauve, blackA } from '@radix-ui/colors'
import * as Menu from "@radix-ui/react-dropdown-menu";

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
  const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  
  const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
  const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  

const SelectableTrigger = styled(Menu.Trigger, {
    padding: '$1',
    cursor: 'pointer',
    color: '$hiContrast',
    border: '1px solid $slate8',
    backgroundColor: '$loContrast',
    borderRadius: '$1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    "&:hover": {
        backgroundColor: '$mauve9',
        color: '$mauve4',
    },
    '&[data-state=open]': { 
        backgroundColor: mauve.mauve4,
        color: blackA.blackA12,
    }
}); 

const SelectableContent = styled(Menu.Content, {
    border: 'thin solid $loContrast',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%'
});

const SelectableItem = styled(Menu.Item, {
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: '$hiContrast',
    borderColor: '$hiContrast',
    backgroundColor: '$loContrast',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 25,
    userSelect: 'none',

    '&[data-disabled]': {
        color: mauve.mauve8,
        pointerEvents: 'none',
    },

    '&:focus': {
        backgroundColor: violet.violet9,
        color: violet.violet1,
    },
    "&:last-child": {
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
    },
    "&:first-child": {
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    },
});

export const SelectRoot = Menu.Root
export const SelectTrigger = SelectableTrigger 
export const SelectContent = SelectableContent
export const SelectItem = SelectableItem