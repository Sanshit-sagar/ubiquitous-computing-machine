import React, { useState, useRef } from 'react'
import './SearchField.css'

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
    <div className="search-field">
      <label {...labelProps}>{label}</label>
      <div>
        <input {...inputProps} ref={ref} />
        {state.value !== '' && <button {...buttonProps}>❎</button>}
      </div>
    </div>
  );
}

export default SearchField