import React, { useRef, useContext } from 'react'
import Link from 'next/link'

import {useBreadcrumbs, useBreadcrumbItem} from '@react-aria/breadcrumbs'

import { Box } from './Box'
import { Flex } from './Flex'
import { Card } from './Card'
import { Text } from './Text'
import { Heading } from './Heading'
import { AccessibleIcon } from './AccessibleIcon'

import { GlobalStore } from '../store'
import { 
    ChevronRightIcon, 
    ChevronDownIcon,
    HomeIcon, 
    LapTimerIcon, 
    FilePlusIcon
} from '@radix-ui/react-icons'

import { darkTheme, theme as lightTheme } from '../stiches.config'


function Breadcrumbs(props) {
    let { navProps } = useBreadcrumbs(props);
    let children = React.Children.toArray(props.children);
  
    return (
        <nav {...navProps}>
            <ol style={{display: 'flex', listStyle: 'none', margin: 0, padding: 0}}>
               <> {children.map((child, i) => {
                    return (
                        <> 
                            { React.isValidElement(children[i]) ? 
                                <> {React.cloneElement(child, {
                                        isCurrent: i === children.length - 1,
                                        elementType: i === children.length - 1 ? 'h3' : 'a'
                                    })}
                                </> : null 
                            } 
                        </>
                    )
                })} </> 
            </ol>
        </nav>
    );
}
  

function BreadcrumbItem(props) {
    let ref = useRef();
    let {itemProps} = useBreadcrumbItem(props, ref);
    let breadcrumbContent;

    if (props.isCurrent) {
        breadcrumbContent = (
            <a 
                style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    cursor:  'default'
                }}
            >
                <h3
                    {...itemProps}
                    ref={ref}
                    // style={{ margin: '1px', fontSize: '1em', color: 'black' }}
                >
                    {props.children}
                </h3>
            </a>
        );
    } else {
        breadcrumbContent = (
        <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', fr: '$1' }}>
            <a
                {...itemProps}
                ref={ref}
                href={props.href}
                style={{
                    color: 'blue',
                    fontWeight: props.isCurrent ? 'bold' : null,
                    cursor: props.isCurrent ? 'default' : 'pointer'
                }}
            >
                {props.children}
            </a>
            <Box css={{ ml: '$1', mr: '$1' }}>
                <AccessibleIcon label={'Breadcrumb Separator'}>
                    <ChevronRightIcon  css={{ color: '$hiContrast' }} />
                </AccessibleIcon>
            </Box>
        </Flex>
        );
    }
  
    return <li>{breadcrumbContent}</li>;
}

const IconifiedCrumb = (props) => {
    
    return (
        <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', color: '$hiContrast' }}>
            <Box> 
                {props.icon && 
                    <AccessibleIcon label={props.text}>
                        {props.icon} 
                    </AccessibleIcon>
                }
            </Box> 
            
            <Link href={props.href}>
                <Text css={{ mb: '$1', ml: '$1', color: '$hiContrast' }}> 
                    {`${props.text.charAt(0).toUpperCase()}${props.text.substring(1)}`} 
                </Text>
            </Link>
        </Flex>
    )
}
  
const BreadcrumbsHeader = () => {
    const uiState = useContext(GlobalStore.State)

    // TODO: maybe store the user input for the current element in the next crumb
    const crumbs = [
        { id: '1', href: '/', icon: <HomeIcon />, text: 'Home' },
        { id: '2', href: '/', icon: <FilePlusIcon />, text: `${uiState.currentPage}` },
        { id: '3', href: '/', icon: <LapTimerIcon />, text: `${uiState.currentTab}` }
    ];

    return (
        // <div className={uiState.darkMode ? darkTheme : lightTheme}>
            <Card css={{ height: '40px', backgroundColor:'$loContrast', color: '$hiContrast', border: `thin solid`, borderColor: '$hiContrast', br: '$1' }}>
                <Box>
                    <Heading size='1'>
                        <Breadcrumbs>
                            {crumbs.map(function(crumb, index) {
                                return (
                                    <BreadcrumbItem 
                                        key={index} 
                                        href={`#${crumb.href}`}
                                    >
                                        <IconifiedCrumb 
                                            isCurrent={index=== crumbs.length}
                                            icon={crumb.icon} 
                                            text={crumb.text} 
                                            href={crumb.href}
                                        />
                                    </BreadcrumbItem>
                                )
                            })}
                        </Breadcrumbs>
                    </Heading>
                </Box>
            </Card>
        // </div>
    )
}

export default BreadcrumbsHeader; 