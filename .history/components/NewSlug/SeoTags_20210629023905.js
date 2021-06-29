import React from 'react';
import { Input, Select, Button, Badge, Card } from '@supabase/ui'
import StackedLayout from '../../sections/StackedLayout'
import { GlobalStore } from '../../store'

const TagManager = () => {
  const state = useContext(GlobalStore.State)
  const dispatch = useContext(GlobalStore.Dispatch)



  return (
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <Card title="SEO Tag Manager">
        <div className="flex-col justify-start align-stretch w-full p-2 w-2">
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
 
