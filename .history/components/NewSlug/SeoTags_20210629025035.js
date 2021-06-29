import React from 'react';
import { Input, Select, Button, Badge, Card } from '@supabase/ui'
import StackedLayout from '../../sections/StackedLayout'
import { getInitialUserState, getTagDetails, tagManagerReducer } from './Tag'


const TagManager = () => {
  const [session, loading] = useSession()
  const [state, dispatch] = useReducer(tagManagerReducer, getInitialUserState())
  const { users, tags, currentUser } = state

  const handleAdd = () => {
    if(key && value && session && session?.user) {
        dispatch({
          type: 'add',
          slugId: `${key}:${value}`,
          name: key, 
          value: value, 
          usedBy: 
      }); 
  }
}

  const handleUseTag = useCallback(slugId => {
    dispatch({
      type: 'toggle',
      slugId
    });
  }


  const initData = getInitialUserState(); 
  const 


  return (
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <Card title="SEO Tag Manager">
        <div className="flex-col justify-start align-stretch w-full p-2 m-2">
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
        </div>
      </Card>
    </StackedLayout>
  )
}

export default TagManager
 
