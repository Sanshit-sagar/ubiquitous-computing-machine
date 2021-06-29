import React from 'react';
import { Input, Select, Button, Badge } from '@supabase/ui'



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
 
