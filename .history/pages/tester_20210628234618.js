import React, { useReducer } from 'react';
import { Button, Badge, Card } from '@supabase/ui'
import StackedLayout from '../sections/StackedLayout'

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
  const initialState = { count: 0}; 
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
      <>
        <Badge> 
            <span className="text-md text-white font-extralight"> 
                Count: {state.count} 
            </span>
        </Badge>
        
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
 
