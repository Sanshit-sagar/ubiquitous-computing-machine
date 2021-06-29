import { Card } from '@supabase/ui'
import React, { useReducer } from 'react';
import StackedLayout from '../sections/StackedLayout'
import Tag from '../lib/interfaces/tag'

interface Props {
    tag: Tag; 
}

export function TagItem({ tag }: Props) {
   return (
       <li 
          onClick={() => {
            if (tag.id) removeTag(tag.id);
          }}
          className="list-group-item"
        >
           {tag.name}
       </li>
   )
}

const TagList = () => {

    
}


const TagManager = () => {
//   const initialState = { 
//     tags: [],
//     count: 0,
//     error: null 
//   }; 

//   const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
      <Card title="Counter Card"> 
        <span className="text-md text-black font-extralight"> 
            # Tags: {state.tags.length}
        </span>
        
        <div className="p-2 m-2 mt-4 flex-col justify-start align-stretch bg-white border border-black rounded-md shadow">
           <TagList />
           <TagForm /> 
        </div>
      </Card>
  );
}

const TagManagerWrapper = () => {

  return (
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <Card title="Counter">
        <TagManager /> 
      </Card>
    </StackedLayout>
  )
}

 export default TagManagerWrapper
 
