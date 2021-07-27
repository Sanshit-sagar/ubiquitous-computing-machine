import React, { useState, useEffect, useContext } from 'react'

import {useButton} from '@react-aria/button'
import {useSearchField} from '@react-aria/searchfield'
import {useSearchFieldState} from '@react-stately/searchfield'

function SearchField(props) {
    let {label} = props;
    let ref = React.useRef();
    let state = useSearchFieldState(props);
    let {labelProps, inputProps} = useSearchField(props, state, ref);

    
}
