import React from 'react';
import { Input, Select, Button, Badge } from '@supabase/ui'

const reducer = (state, action) => {
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

const initState = {
  counter: 0,
  title: 'title1'
}; 

 export default TagManager
 
