import React from 'react';
import { Input, Select, Button, Badge } from '@supabase/ui'

function reducer(state, action) {
  switch(action.type) {
    case 'show_all':
      return {
        ...state,
      };
    case 'increment': 
      return {
        ...state,
        counter: state.counter + 1,
      }; 
    case 'decrement':
      return {
        ...state,
        counter: state.counter - 1,
      }; 
    case 'reset':
      return {
        ...state,
        countrer: 0
      }
    default:
      return state; 
  }
}


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

 export default TagManager
 
