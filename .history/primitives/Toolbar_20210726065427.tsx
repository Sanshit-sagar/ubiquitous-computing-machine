import React, { useContext } from 'react'
import { styled } from '../stiches.config'
import { useSession } from 'next-auth/client'

import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { violet, blackA, mauve } from '@radix-ui/colors'

import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { Button } from './Button'

import Loader from '../components/Loader'
import UserAvatar from '../components/UserAvatar' 

import { GlobalStore, NewSlugStore } from '../store'
import { timeDifference } from '../lib/datetime'

const StyledToolbar = styled(ToolbarPrimitive.Root, {
  display: 'flex',
  width: '100%',
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'stretch',
  minWidth: 'max-content',
  borderRadius: '5px',
  backgroundColor: 'transparent',
});

const StyledButton = styled(ToolbarPrimitive.Button, {
    flex: '0 0 auto',
    fontSize: 12,
    lineHeight: 1,
    height: 17.5,
    padding: '1px',
    borderRadius: 4,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { 
        backgroundColor: violet.violet3, 
        color: violet.violet11 
    },
    '&:focus': { 
        position: 'relative', 
        boxShadow: `0 0 0 2px ${violet.violet7}` 
    },
    paddingLeft: '5px',
    paddingRight: '5px',
    color: blackA.blackA12,
    backgroundColor: blackA.black1,
    margin: '1px',
    border: `0.8px solid ${blackA.blackA12}`,
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

function getLocaleString(date) {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString();
}

function getHost(destination) {
    if(!destination || !destination.length) return;
    let url = new URL(destination)
    return url.hostname
}
const CalendarIconSvg = () => {

    return (
        <svg 
            width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
                <path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" 
            fill="currentColor" 
            fill-rule="evenodd" 
            clip-rule="evenodd"
        >
            </path>
        </svg>
    )
}

const CircleBackslashIcon = () => {

    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM3.85768 3.15057C4.84311 2.32448 6.11342 1.82708 7.49991 1.82708C10.6329 1.82708 13.1727 4.36689 13.1727 7.49991C13.1727 8.88638 12.6753 10.1567 11.8492 11.1421L3.85768 3.15057ZM3.15057 3.85768C2.32448 4.84311 1.82708 6.11342 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C8.88638 13.1727 10.1567 12.6753 11.1421 11.8492L3.15057 3.85768Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const LockOpenIconSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}
const LockClosedIconSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}
const IdCardIconSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 11.0001V4.00006L1 4.00006L1 11.0001H14ZM15 4.00006V11.0001C15 11.5523 14.5523 12.0001 14 12.0001H1C0.447715 12.0001 0 11.5523 0 11.0001V4.00006C0 3.44778 0.447715 3.00006 1 3.00006H14C14.5523 3.00006 15 3.44778 15 4.00006ZM2 5.25C2 5.11193 2.11193 5 2.25 5H5.75C5.88807 5 6 5.11193 6 5.25V9.75C6 9.88807 5.88807 10 5.75 10H2.25C2.11193 10 2 9.88807 2 9.75V5.25ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H7.5ZM7 9.5C7 9.22386 7.22386 9 7.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H7.5C7.22386 10 7 9.77614 7 9.5ZM7.5 5C7.22386 5 7 5.22386 7 5.5C7 5.77614 7.22386 6 7.5 6H11.5C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}
const LinkIconSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const VerticalDotsIconSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}
const CaretSortSvg = () => {

    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const CustomBreadcrumbs = () => {
    const state = useContext(GlobalStore.State)
    const [session, loading] = useSession();

    if(loading) return <Loader />
    
    return (
        <Flex css={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingRight: '2px' }}>
        
            <StyledLink>
                <Text css={{ fontSize: '20px' }}>
                    {`${session.user.email.split('@')[0]}`}
                </Text>
            
            </StyledLink>

            <div style={{ marginLeft: '5px', marginRight: '5px'}}> / </div>

            <StyledLink>
                <Text css={{ fontSize: '20px' }}>
                    {state.currentPage || '--'}
                </Text>
            </StyledLink>

            <div style={{ marginLeft: '5px', marginRight: '5px'}}> / </div>

            <StyledLink>
                <Text css={{ fontSize: '20px' }}>
                    {state.currentTab?.length ? state.currentTab.toLowerCase() : ''}
                </Text>
            </StyledLink>
        </Flex>
    )
}


const CustomToolbar = () => {
    const state = useContext(NewSlugStore.State)
    
    return (
        <StyledToolbar>
            <span style={{ width: '40%'}}>
                <CustomBreadcrumbs /> 
            </span>

            <StyledSeparator />
            
            <Box css={{ width: '60%'}}>
                <Flex css={{ display: 'flex', flexDirection: 'row', justifyContent:'flex-end', alignItems: 'stretch'}}>
                    <StyledButton>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'stretch'}}>
                            <span style={{ marginRight: '5px'}}>
                                <IdCardIconSvg />
                            </span>
                            {
                                state.destination?.length ?
                                <span className="ml-1 text-xs font-extralight">
                                    {getHost(state.destination)}
                                </span> : 
                                <span className="ml-1 text-xs font-extralight text-white bg-red-500">
                                    TODO
                                </span>
                            }
                        </div>
                    </StyledButton> 
                        
                    <StyledButton>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <span style={{ marginRight: '5px'}}>
                                <LinkIconSvg />
                            </span>
                            {
                                state.slug?.length ?
                                <span className="ml-1 text-xs font-extralight">
                                    {state.slug}
                                </span> : 
                                <span className="ml-1 text-xs font-extralight text-red-500">
                                    ??
                                </span>
                            }
                        </div>
                    </StyledButton>
                    

                    <StyledButton>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <span style={{ marginRight: '5px'}}>
                                <CalendarIconSvg />
                            </span>
                            <span className="ml-1 text-xs font-extralight">
                                {new Date().toLocaleDateString() + (state.ttl.length ? ` to ${getLocaleString(state.ttl)}` : '')}
                            </span>
                        </div>
                    </StyledButton>

                    <StyledButton>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>           
                            <span className="text-xs font-extralight">
                                { !state.password?.length || state.password.length < 8 ? <LockOpenIconSvg /> : <LockClosedIconSvg /> }
                            </span>
                        </div>
                    </StyledButton>

                    <span style={{ marginBottom: '3px'}}>
                        <StyledButton>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}> 
                                <span className="text-xs font-extralight mr-2">
                                    <CircleBackslashIcon />
                                </span>
                                <span className="text-xs font-extralight">
                                    {`${state.routingStatus}`}
                                </span>
                            </div>
                        </StyledButton>
                    </span>

                    <StyledSeparator />
                
                    <StyledLink style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center', flexWrap: 'nowrap'}}>
                        <Text css={{ color: 'green' }}>
                            {state.lastUpdatedAt ? timeDifference(state.lastUpdatedAt) : null}
                        </Text>
                    </StyledLink>
                </Flex>
            </Box>
        </StyledToolbar>
    );
}

export default CustomToolbar 