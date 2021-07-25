import React from 'react';

import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'


export interface EmptyStateProps {
    name: string;
    cause: string;
    icon: string;
    action: React.Component; 
}

const NoResultsFoundSvg = () => {

    return (
        <svg width="168" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M104.986 1.813C83.112-1.017 65.184 9.76 45.881 27.9 30.217 42.611 4.778 43.581 3.276 67.033c-1.823 28.55 45.49 30.845 59.425 44.645 37.043 36.791 85.004 31.914 97.396-1.86 11.037-30.062-6.931-44.062-13.267-63.408-9.168-27.887-18.762-41.614-41.844-44.597z" fill="#DBEEFE" />
            <path d="M74.305 86.492l-21.647 27.159a7.002 7.002 0 01-9.822 1.097 7.04 7.04 0 01-1.102-9.847l21.648-27.152" fill="#fff" />
            <path d="M93.394 97.316c19.629 0 35.542-15.942 35.542-35.607 0-19.666-15.913-35.607-35.542-35.607s-35.54 15.941-35.54 35.607c0 19.665 15.912 35.607 35.54 35.607z" fill="#fff" />
            <path d="M77.53 93.028L55.89 120.18a7.005 7.005 0 01-9.828 1.097 7.034 7.034 0 01-1.095-9.847l23.142-29.118" fill="#fff" />
            <path d="M62.086 31.125a37.216 37.216 0 00-8.15 23.165 37.216 37.216 0 008.05 23.2 37.095 37.095 0 0020.733 13.106 37.043 37.043 0 0024.367-2.709 37.14 37.14 0 0017.361-17.341 37.233 37.233 0 002.777-24.403 37.179 37.179 0 00-13.021-20.812 37.058 37.058 0 00-23.132-8.133 36.76 36.76 0 00-16.09 3.627 36.828 36.828 0 00-12.895 10.3zm28.985-10.89a33.963 33.963 0 0121.188 7.468 34.076 34.076 0 0111.92 19.073 34.121 34.121 0 01-2.551 22.358 34.037 34.037 0 01-15.907 15.887 33.95 33.95 0 01-22.324 2.486 33.998 33.998 0 01-19.001-12.001 34.109 34.109 0 01-7.388-21.251 34.109 34.109 0 017.449-21.23 34.062 34.062 0 0111.852-9.434 34.001 34.001 0 0114.762-3.356z" fill="#B4DCF8" />
            <path d="M47.177 117.424a8.153 8.153 0 01-7.31-4.634 8.175 8.175 0 01.973-8.611l21.64-27.152 1.803 1.438-21.647 27.159a5.861 5.861 0 00.994 8.129 5.835 5.835 0 008.134-.825l21.64-27.151 1.803 1.438-21.647 27.172a8.114 8.114 0 01-5.462 3.01 8.585 8.585 0 01-.921.027z" fill="#B4DCF8" />
            <path d="M87.796 52.832l-10.324 8.22 1.791 2.258 10.323-8.221-1.79-2.257z" fill="#78BCE4" />
            <path d="M79.263 52.83l-1.79 2.257 10.325 8.219 1.79-2.258-10.325-8.218zM87.92 79.603a1.727 1.727 0 01-1.632-1.17 1.736 1.736 0 01.57-1.928 16.112 16.112 0 0119.122-.274 1.726 1.726 0 01-.776 2.988 1.72 1.72 0 01-1.227-.198 12.555 12.555 0 00-7.344-2.342 12.417 12.417 0 00-7.619 2.556 1.72 1.72 0 01-1.095.368zM113.468 52.835l-10.323 8.22 1.791 2.258 10.323-8.22-1.791-2.258z" fill="#78BCE4" />
            <path d="M104.936 52.827l-1.79 2.257 10.324 8.22 1.791-2.258-10.325-8.219z" fill="#78BCE4" />
            <path d="M73.577 47.935a1.727 1.727 0 01-1.53-.936 1.735 1.735 0 01.121-1.793c.354-.502.715-.99 1.102-1.472A30.145 30.145 0 0193.3 32.55a1.723 1.723 0 011.924 1.505 1.731 1.731 0 01-1.502 1.927 26.729 26.729 0 00-17.734 9.92c-.34.421-.668.856-.975 1.298a1.724 1.724 0 01-1.436.735z" fill="#fff" />
        </svg>
    );
}

const NoSearchResults:React.FC<EmptyStateProps> = (props) => {
    const { name, cause, icon, action } = props;

    return (
        <div className="EmptyState">
            <Flex css={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                
                <Box css={{ flexBasis: '0', flexGrow: 1, margin: '5px' }}>
                    <NoResultsFoundSvg />
                </Box>
                
                <Flex css={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Text size='3' css={{ fontWeight: '500' }}>
                        No Results Found
                    </Text>
                    <Box css={{ flexBasis: '0', flexGrow: 1, marginTop: '10px', marginBottom: '25px', borderRadius: '3px' }}>
                        <Text size='1' css={{ fontWeight: '100', width: '325px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {`Cause: ${cause}`}
                        </Text>
                    </Box>
                </Flex>

                <Box css={{ flexBasis: '0', flexGrow: 1, marginTop: '10px' }}>
                    <Flex css={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '5px', width: '100%' }}>
                        
                        <Button color="black" outlined>
                            Add Slugs
                        </Button>

                        <Button color="gray" outlined>
                            Improve SEO
                        </Button>
                    
                    </Flex>
                </Box>

            </Flex>
        </div>
    )
}

export default NoSearchResults