import { Card } from '@supabase/ui'
import React, { useState, useReducer, FormEvent } from 'react';
import StackedLayout from '../sections/StackedLayout'

import { Tag } from '../lib/interfaces/tag'
import { addTag, removeTag, useTags } from '../lib/services/tagService'


interface Props {
    tag: Tag; 
}

function TagItem({ tag }: Props) {
   return (
    <li
      key={tag.id}
      onClick={() => {
        if (tag.id) {
          removeTag(tag.id);
        }
      }}
      className="list-group-item"
    >
        {tag.name}
    </li>
  );
}

export function TagList() {
  const tags = useTags();
  
  return (
    <ul className="list-group">
     <>
      {tags.map(tag => (
        <TagItem key={tag.id} tag={tag} />
      ))}
      </>
    </ul>
  );
}

export function TagForm({}: any) {
  const [tag, setTag] = useState<Tag>({ name: '' });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    addTag(tag);
    setTag({ name: '' });
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        value={tag.name}
        onChange={(event) => setTag({ ...tag, name: event.target.value })}
      />
    </form>
  );
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
 
