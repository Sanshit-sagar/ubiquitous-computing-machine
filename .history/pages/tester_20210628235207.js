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
        counter: 0
      }
    default:
      return state; 
  }
}


const Counter = () => {
  const initialState = { 
      counter: 0,
      patches: [
          { id: 0, type: 'INIT', value: '' },
      ],
      actionStats: {
          numOps: 0,
          numSessions: 0, 
          opsThisSession: 0, 
          highestAchived: 0,
          timeOfLastAction: 0, 
      },
  }; 
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
      <>
        <Badge> 
            <span className="text-md text-black font-extralight"> 
                Count: {JSON.stringify(state)} 
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
 
