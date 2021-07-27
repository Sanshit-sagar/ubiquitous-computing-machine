import React, { useRef } from 'react'

import {useButton} from '@react-aria/button'
import {useSearchField} from '@react-aria/searchfield'
import {useSearchFieldState} from '@react-stately/searchfield'

function SearchField(props) {
  let {label} = props;
  let ref = useRef();
  let state = useSearchFieldState(props);
  let {labelProps, inputProps, clearButtonProps} = useSearchField(props,state,ref);
  let {buttonProps} = useButton(clearButtonProps, ref);

  return (
    <Popover.Root>
      <StyledAnchor>
        Row as anchor 
        <Popover.Trigger>
          Trigger
        </Popover.Trigger>
      </StyledAnchor>

      <StyledContent>
        <h3>Popover content</h3>
        <p>Are you sure you wanna do this?</p>
        <Popover.Close>Yes</Popover.Close>
        <StyledArrow />
      </StyledContent>
    </Popover.Root>
  );
}

export default SearchField