import React from 'react';
import { Input, Select, Button, Badge } from '@supabase/ui'

const reducer = (state, action) => {
  switch(action.type) {
    case 'show_all':
      return {
        ...state
      };
    default:
      return state; 
  
  }
}

 export default TagManager
 
