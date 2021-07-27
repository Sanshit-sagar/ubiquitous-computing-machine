import React, { useState, useEffect, useContext } from 'react'

import {useButton} from '@react-aria/button'
import {useSearchField} from '@react-aria/searchfield'
import {useSearchFieldState} from '@react-stately/searchfield'

import { styled, keyframes } from '@stitches/react'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

const StyledInput = styled('input', {

})

function SearchField(props) {
    let {label} = props;
    let ref = React.useRef();
    let state = useSearchFieldState(props);
    let {labelProps, inputProps} = useSearchField(props, state, ref);

    return (
        <Box css={{ width: '200px', flexBasis: '0', flexGrow: 1, margin: '5px'}}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <label {...labelProps}> {label} </label>
                <input {...inputProps} ref={ref} />
            </Flex> 
        </Box>
    );
}
