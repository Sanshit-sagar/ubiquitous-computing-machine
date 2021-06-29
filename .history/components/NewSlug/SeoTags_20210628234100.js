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

const initialState = { count: 0 };

const Counter = () => {

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
    <StackedLayout>
      <Card title="Counter">
        <Counter /> 
      </Card>
    </StackedLayout>
  )
}

 export default TagManager
 
