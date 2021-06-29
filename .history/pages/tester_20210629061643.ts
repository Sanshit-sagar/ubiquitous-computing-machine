import { Card } from '@supabase/ui'
import React, { useState, useReducer, FormEvent } from 'react';
import StackedLayout from '../sections/StackedLayout'

import { Tag } from '../lib/interfaces/tag'
import { addTag, removeTag, useTags } from '../lib/services/tagService'


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
    
          {tag.name}
      </li>
  )
}

export function TagsList() {
  const tags = useTagStore();

  return (
    <div className="border border-black rounded-md shadow-md p-2 m-2">
      <ul className="listgroup">
        {tags.map(tag => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </ul>
    </div>
);
}

export function TagsForm({}: any) {
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
        className="form-control"
        placeholder="Please enter a Tag name"
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
 
