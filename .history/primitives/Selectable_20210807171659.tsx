import React from 'react'
import { styled } from '../stiches.config'
import { mauve, blackA } from '@radix-ui/colors'
import * as Menu from "@radix-ui/react-dropdown-menu";


const SelectableTrigger = styled(Menu.Trigger, {
    padding: '$1',
    cursor: 'pointer',
    backgroundColor: '#d1d9e0',
    color: blackA.blackA12,
    border: '1px solid',
    borderColor: blackA.blackA12,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    "&:hover": {
        backgroundColor: 'white',
        color: blackA.blackA12,
    },
}); 

const SelectableContent = styled(Menu.Content, {
    padding: '$1',
    margin: '$1',
    border: 'thin solid black',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
});

const SelectableItem = styled(Menu.Item, {
    padding: '$1 $2',
    border: '0px',
    borderColor: 'transparent',
    borderRadius: '5px',
    width: '$7',
    lineHeight: 1,
    fontSize: '14px',
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'stretch',
    backgroundColor: 'white',
    color: blackA.blackA12,
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