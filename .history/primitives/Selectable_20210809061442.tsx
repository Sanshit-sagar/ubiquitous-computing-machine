import React from 'react'
import { styled } from '../stiches.config'
import { mauve, blackA } from '@radix-ui/colors'
import * as Menu from "@radix-ui/react-dropdown-menu";


const SelectableTrigger = styled(Menu.Trigger, {
    padding: '$1',
    cursor: 'pointer',
    backgroundColor: '$loContrast',
    color: '$hiContrast',
    border: '1px solid',
    borderColor: '$hiContrast',
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
    padding: '$1 $2',
    display: 'flex', 
    flexDirection: 'row',  
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: '$loContrast',
    color: '$hiContrast',
    borderBottom: 'thin solid $hiContrast',
    '&[data-state=on]': { 
        backgroundColor: '$hiContrast',
        color: '$loContrast',
    },
    "&:hover": {
        backgroundColor: mauve.mauve4,
        color: blackA.blackA12,
    },
    "&:disabled": {
        color: 'gray',
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