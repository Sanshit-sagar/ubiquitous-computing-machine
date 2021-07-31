//hi

import React, { useContext } from 'react'
import { styled } from '../stiches.config'

import { violet, blackA, mauve } from '@radix-ui/colors'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { 
    IdCardIcon, 
    Link2Icon, 
    CalendarIcon, 
    SlashIcon 
} from '@radix-ui/react-icons'

import { Box } from './Box'
import { Flex } from './Flex'
import { NewSlugStore } from '../store'

import BreadcrumbsHeader from './Breadcrumbs'
import AccessibleStyledButton from './AccessibleStyledButton'
import { getLocaleDatestringFromDate } from '../lib/datetime'

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


const LockOpenIconSvg = () => {
    return (
        <span className="text-green-500">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </span>
    )
}
const LockClosedIconSvg = () => {
    return (
        <span className="text-red-500">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </span>
    )
}

const CustomToolbar = () => {
    const state = useContext(NewSlugStore.State)
    
    return (
        <StyledToolbar>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    
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
                            content={new Date().toLocaleDateString() + (state.ttl.length ? ` to ${getLocaleString(state.ttl)}` : '')}
                            label={'Expiration'}
                        />
                        <AccessibleStyledButton
                            icon={
                                (!state.password?.length || state.password.length<8) ? 
                                <LockOpenIconSvg /> : <LockClosedIconSvg />
                            }
                            content={<Link2Icon />}
                            label={state.routingStatus}
                        />
                    </Flex>
                </Box>
            </Flex>
        </StyledToolbar>
    );
}

export default CustomToolbar 