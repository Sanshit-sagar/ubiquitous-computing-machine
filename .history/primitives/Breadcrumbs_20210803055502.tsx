import React, { useRef, useContext } from 'react'
import {useBreadcrumbs, useBreadcrumbItem} from '@react-aria/breadcrumbs'

import { Box } from './Box'
import { Button } from './Button'
import { Flex } from './Flex'
import { Text } from './Text'
import { Heading } from './Heading'
import { AccessibleIcon } from './AccessibleIcon'
import Link from 'next/link'
import { GlobalStore } from '../store'
import { 
    ChevronRightIcon, 
    HomeIcon, 
    CheckboxIcon, 
    FileIcon 
} from '@radix-ui/react-icons'


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
        <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
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
            <Box>
                <AccessibleIcon label={'Breadcrumb Separator'}>
                    <ChevronRightIcon />
                </AccessibleIcon>
            </Box>
        </Flex>
        );
    }
  
    return <li>{breadcrumbContent}</li>;
}

const IconifiedCrumb = ({ text, icon, href }) => {
    
    return (
        <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
            <Box css={{ mt: '$1', mr: '$1' }}> 
                {icon && 
                    <AccessibleIcon label={text}>
                        {icon} 
                    </AccessibleIcon>
                }
            </Box> 
            
            <Link href={href}>
                <Text css={{ mb: '$1' }}> 
                    {`${text.charAt(0).toUpperCase()}${text.substring(1)}`} 
                </Text>
            </Link>
        </Flex>
    )
}
  
const BreadcrumbsHeader = () => {
    const state = useContext(GlobalStore.State)

    const crumbs = [
        { id: '1', href: '/', icon: null, text: 'Home' },
        { id: '2', href: '/', icon: null, text: `${state.currentPage}` },
        { id: '3', href: '/', icon: null, text: `${state.currentTab}` },
        { id: '4', href: '/', icon: null, text: 'yeyeye' }
    ];

    return (
        <Heading size='1'>
            <Breadcrumbs>
                {crumbs.map(function(crumb, index) {
                    return (
                        <BreadcrumbItem 
                            key={index} 
                            href={`#${crumb.href}`}
                        >
                            <IconifiedCrumb 
                                icon={crumb.icon} 
                                text={crumb.text} 
                                href={crumb.href}
                            />
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumbs>
        </Heading>
    )
}

export default BreadcrumbsHeader; 