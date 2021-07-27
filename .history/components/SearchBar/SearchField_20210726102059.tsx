import React, { useState, useEffect, useContext } from 'react'

import { useButton } from '@react-aria/button'
import { useComboBoxState, useSearchFieldState } from '@react-aria'
import { useCombo, useFilter, useData, useSearchField } from 'react-stately'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Fieldset, Label, Input } from '../../primitives/LabelledInput'


function SearchField(props) {
    let {label} = props;
    let ref = React.useRef();
    let state = useSearchFieldState(props);
    let {labelProps, inputProps, clearButtonProps} = useSearchField(props, state, ref);
    let {buttonProps} = useButton(clearButtonProps);

    return (
        <Box css={{ width: '200px', flexBasis: '0', flexGrow: 1, margin: '5px'}}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <Fieldset>
                    <Label {...labelProps}> 
                        <Text> {label} </Text> 
                    </Label>
                    <span>
                        <Input {...inputProps} ref={ref} />
                        <> {state.value !== '' ? (
                            <button {...buttonProps}>
                                ❎
                            </button>
                        ) : null} </>

                    </span>
                </Fieldset>
            </Flex> 
        </Box>
    );
}

export default SearchField
