import React, { useRef, cloneElement } from 'react'
import {useBreadcrumbs, useBreadcrumbItem} from '@react-aria/breadcrumbs'

import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { Heading } from './Heading'
import { ChevronRightIcon } from '@radix-ui/react-icons'

function Breadcrumbs(props) {
    let {navProps} = useBreadcrumbs(props);
    let children = React.Children.toArray(props.children);
  
    return (
      <nav {...navProps}>
        <ol style={{display: 'flex', listStyle: 'none', margin: 0, padding: 0}}>
            {children.map((child, i) =>
                cloneElement(child, {
                    isCurrent: i === children.length - 1,
                    elementType: i === children.length - 1 ? 'h3' : 'a'
                })
            )}
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
            style={{
                margin: '1px',
                fontSize: '1em',
                color: 'black'
            }}
        >
            {props.children}
        </h3>
      );
    } else {
      breadcrumbContent = (
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center' }}>
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
            <span aria-hidden="true" style={{padding: '5px 5px'}}>
                <ChevronRightIcon />
            </span>
        </Flex>
      );
    }
  
    return <li>{breadcrumbContent}</li>;
  }
  
const BreadcrumbsHeader = () => {
    const crumbs = [
        { id: '1', href: '/', text: 'Home' },
        { id: '2', href: '/', text: 'React-aria'},
        { id: '3', href: '/', text: 'useBreadcrumbs'}
    ];

    return (
        <Heading size='1'>
            <Breadcrumbs>
                {crumbs.map(function(crumb, index) {
                    return (
                        <BreadcrumbItem 
                            key={index} 
                            href={`${crumb.href}`}
                        >
                            <span className="text-sm font-extralight">
                                {crumb.text} 
                            </span>
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumbs>
        </Heading>
    )
}

export default BreadcrumbsHeader; 