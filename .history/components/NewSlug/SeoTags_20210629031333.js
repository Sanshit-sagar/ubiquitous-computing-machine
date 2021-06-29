import React, { useState, useReducer } from 'react';
import { Input, Select, Button, Badge, Card } from '@supabase/ui'
import StackedLayout from '../../sections/StackedLayout'
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
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <Card title="SEO Tag Manager">

        <div className="flex-col justify-start align-stretch w-full p-2 m-2">
          <span className="bg-white text-black text-sm font-extralight p-2 m-2">
            {JSON.stringify(tags)} 
            // run a map and within each, display the tag and a bbutton w/ onclick trigger for handleusetag
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
            Hi hellllo, you have ${links.length} links 
          </Button>

        </div>
      </Card>
    </StackedLayout>
  )
}

export default TagsList
 
