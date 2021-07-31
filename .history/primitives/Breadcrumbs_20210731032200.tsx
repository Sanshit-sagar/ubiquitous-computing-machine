import React, { useRef, useContext, ReactElement, JSXElementConstructor } from 'react'
import {useBreadcrumbs, useBreadcrumbItem} from '@react-aria/breadcrumbs'

import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { Heading } from './Heading'
import { AccessibleIcon } from './AccessibleIcon'
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
    // let child: ReactElement<any | string> | ReactElement<any, string | JSXElementConstructor<any>>
  
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
            <h3
                {...itemProps}
                ref={ref}
                style={{ margin: '1px', fontSize: '1em', color: 'black' }}
            >
                {props.children}
            </h3>
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
            <Box css={{ margin: '$1'}}>
                <AccessibleIcon label={'loss'}>
                    <ChevronRightIcon />
                </AccessibleIcon>
            </Box>
        </Flex>
        );
    }
  
    return <li>{breadcrumbContent}</li>;
}

const IconifiedCrumb = ({ text, icon }) => {
    
    return (
        <Box css={{ ml: '$1' }}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                <Box css={{ mt: '$1', mr: '$1' }}> 
                    <AccessibleIcon label={text}>
                        {icon} 
                    </AccessibleIcon>
                </Box> 
                
                <Text css={{ mt: '$1' }}> 
                    {text} 
                </Text>
            </Flex>
        </Box>
    )
}
  
const BreadcrumbsHeader = () => {
    const state = useContext(GlobalStore.State)

    const crumbs = [
        { id: '1', href: '/', icon: <HomeIcon />, text: '' },
        { id: '2', href: '/', icon: null, text: `${state.currentPage}` },
        { id: '3', href: '/', icon: null, text: `${state.currentTab}` }
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
                            />
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumbs>
        </Heading>
    )
}

export default BreadcrumbsHeader; 