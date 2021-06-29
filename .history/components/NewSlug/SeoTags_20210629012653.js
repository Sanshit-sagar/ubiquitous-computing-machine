import React from 'react';
import { Input, Select, Button, Badge } from '@supabase/ui'

import produce from "immer"

export const tagManagerReducer = produce((draft, action) => {
  switch(action.type) {
    case "add_tag":
      const { slugId, name, value } = action
      draft.tags.push({
        slugId,
        name, 
        value
      })
      break; 
    case "toggle_tag": 
      const tag = draft.tags.find(tag => tag.id===action.id)  
        tag.usedBy = tag.usedBy===undefined 
          ? draft.currentSlug.id 
          : tag.usedBy===draft.currentSlug.id 
          ? undefined
          : draft.usedBy
    default:
      return state; 
  }
}); 


const Counter = () => {
  const initialState = { counter: 0}; 
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
      <>
        Count: {state.count}
        <Button onClick={() => dispatch({ type: "reset" })}> Reset </Button>
        <Button onClick={() => dispatch({ type: "increment" })}> Increment </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}> Decrement </Button>
      </>
  );
}

const TagManager = () => {

  return (
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <Card title="Counter">
        <Counter /> 
      </Card>
    </StackedLayout>
  )
}
 
