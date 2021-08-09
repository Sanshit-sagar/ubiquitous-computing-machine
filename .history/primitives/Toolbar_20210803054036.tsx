import React, { useContext } from 'react'
import { styled } from '../stiches.config'

import { violet, blackA, mauve } from '@radix-ui/colors'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { 
    IdCardIcon, 
    Link2Icon, 
    CalendarIcon
} from '@radix-ui/react-icons'

import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { NewSlugStore } from '../store'

import BreadcrumbsHeader from './Breadcrumbs'
import AccessibleStyledButton from './AccessibleStyledButton'

import { getHost } from '../lib/utils'
import { getLocaleDatestringFromDate } from '../lib/datetime'
import { LockOpenIconSvg, LockClosedIconSvg } from './Icons'

const StyledToolbar = styled(ToolbarPrimitive.Root, {
    display: 'flex',
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'stretch',
    minWidth: 'max-content',
    border: 'thin solid silver',
    borderRadius: '7px',
    backgroundColor: 'white',
    padding: '5px'
});

const StyledButton = styled(ToolbarPrimitive.Button, {
    flex: '0 0 auto',
    fontSize: 12,
    height: 17.5,
    lineHeight: 1,
    border: `0.8px solid ${blackA.blackA12}`,
    borderRadius: 4,
    margin: '1px',
    padding: '0px 5px 0px 5px',
    color: blackA.blackA12,
    backgroundColor: 'gainsboro',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': { 
        backgroundColor: blackA.blackA11, 
        color: 'gainsboro', 
    },
    '&:focus': { 
        backgroundColor: blackA.blackA12,
        color: '#fff',
    },
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
    margin: '$2',
});

const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
    display: 'inline-flex',
    padding: '2px',
    border: '4px',
    borderRadius: '3.5px',
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
    '&:hover': { backgroundColor: violet.violet3, color: violet.violet11 },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${violet.violet7}` },
    backgroundColor: 'white',
    marginLeft: 2,
    '&:first-child': { marginLeft: 0 },
    '&[data-state=on]': { 
        backgroundColor: blackA.blackA5, 
        color: blackA.blackA11,
    },
});

export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;
export const ToolbarToggleGroup = StyledToggleGroup;
export const ToolbarToggleItem = StyledToggleItem;

const CustomToolbar = () => {
    const state = useContext(NewSlugStore.State)
    
    return (
        // <StyledToolbar>
        <Box css={{ py: '$1', px: '$2', height: '50px', bc: '#fff', color: '#000', border: 'thin solid white', br: '5px' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'stretch' }}>
               
                <Box> 
                    <BreadcrumbsHeader /> 
                </Box>
                   
                <Box>
                    <Flex css={{ display: 'flex', fd: 'row', jc:'flex-end', ai: 'stretch', gap: '$2' }}>
                        <AccessibleStyledButton 
                            icon={<IdCardIcon />} 
                            content={state.destination?.length ? getHost(state.destination) : null}
                            label={'IP Address'}
                        />
                        <AccessibleStyledButton 
                            icon={<Link2Icon />} 
                            content={state.slug?.length ? state.slug : '??'}
                            label={'IP Address'}
                        />
                        <AccessibleStyledButton 
                            icon={<CalendarIcon />} 
                            content={
                                <Text>
                                    {`${getLocaleDatestringFromDate(new Date())}` + `${state.ttl.length ? ` to ${getLocaleDatestringFromDate(state.ttl)}` : '' }`}
                                </Text>
                            }
                            label={'Expiration'}
                        />
                        <AccessibleStyledButton
                            icon={
                                (!state.password?.length || state.password.length<8) ? 
                                <LockOpenIconSvg /> : <LockClosedIconSvg />
                            }
                            content={
                                <Text> {!state.password?.length || state.password.length<8 ? '' : state.password } </Text>
                            }
                            label={state.routingStatus}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default CustomToolbar 