import React, { useState, useReducer, useCallback, useMemo } from 'react';
import { Input, Button,  Card } from '@supabase/ui'
import { getInitialUserState, getTagDetails, tagManagerReducer } from './Tag'


const TagsList = () => {

  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const handleKeyChange = (event) => {
    setKey(event.target.value)
  }
  const handleValueChange = (event) =>{
    setValue(event.target.value)
  }

  const [state, dispatch] = useReducer(tagManagerReducer, getInitialUserState('sasagar@ucsd.edu'))
  const { links, tags, currentUser } = state

  const handleAdd = () => {
    if(key && value) {
        dispatch({
          type: 'add',
          slugId: `${key}:${value}`,
          name: key, 
          value: value, 
      }) 
    }
  }

  const handleUseTag = useCallback(slugId => {
    dispatch({
      type: 'toggle',
      slugId
    });
  }); 

  return (
    
      <Card title="SEO Tag Manager" className="flex-col justify-start align-stretch w-full mb-10">

        <div className="flex-col justify-start align-stretch w-full p-2 m-2">
          <span className="bg-white text-black text-sm font-extralight p-2 m-2">
            {JSON.stringify(tags)} 
           </span>   
        
          <Input
            label="Key"
            value={key}
            onChange={handleKeyChange}
          /> 
          <Input
            label="Value"
            value={value}
            onChange={handleValueChange}
          /> 

          <Button onClick={handleAdd}>
            Add tag
          </Button>

        </div>
      </Card>
  )
}

export default TagsList
 
