import React, { useContext } from 'react'
import { styled } from '../stiches.config'
import { useSession } from 'next-auth/client'

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { violet, blackA, mauve } from '@radix-ui/colors';

import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import Loader from '../components/Loader'

import { GlobalStore, NewSlugStore } from '../store'
import { timeDifference } from '../lib/datetime'


const StyledToolbar = styled(ToolbarPrimitive.Root, {
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'stretch',
  minWidth: 'max-content',
  borderRadius: '5px',
  border: `1px solid ${blackA.blackA12}`,
  backgroundColor: 'gainsboro',
  width: '100%',
  height: '32.5px',
  padding: '2.5px 1px 2.5px 1',
});

const StyledButton = styled(ToolbarPrimitive.Button, {
    flex: '0 0 auto',
    color: mauve.mauve11,
    height: '32.5',
    padding: '0 5px',
    borderRadius: 4,
    display: 'inline-flex',
    fontSize: 13,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { backgroundColor: violet.violet3, color: violet.violet11 },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${violet.violet7}` },
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    margin: '2.5px',
    border: `thin solid ${blackA.blackA12}`,
});

const StyledLink = styled(ToolbarPrimitive.Link, {
    backgroundColor: 'transparent',
    color: mauve.mauve11,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
);

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
  width: 1,
  backgroundColor: mauve.mauve6,
  margin: '0 10px',
});

const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
  display: 'inline-flex',
  borderRadius: 4,
});

const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
    flex: '0 0 auto',
    color: mauve.mauve11,
    height: 25,
    padding: '0 5px',
    borderRadius: 4,
    display: 'inline-flex',
    fontSize: 13,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { 
        backgroundColor: violet.violet3, 
        color: violet.violet11 },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${violet.violet7}` },
    backgroundColor: 'white',
    marginLeft: 2,
    '&:first-child': { marginLeft: 0 },
    '&[data-state=on]': { 
        backgroundColor: blackA.blackA5, 
        color: black
    },
});

export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;
export const ToolbarToggleGroup = StyledToggleGroup;
export const ToolbarToggleItem = StyledToggleItem;
