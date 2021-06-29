import { Card } from '@supabase/ui'
import React, { useState, useReducer, FormEvent } from 'react';
import StackedLayout from '../sections/StackedLayout'

import { Tag } from '../lib/interfaces/tag'
import { removeTag } from '../lib/services/tagService'
import  {useTags}  from "../lib/services/tagService";


interface Props {
    tag: Tag; 
}

export function TagItem({ tag }: Props) {
   return (
      <li
        onclick={() => {
          if (tag.id) removeTag(tag.id);
        }}
        className="list-group-item"
    
          {tag.name}
      </li>
  )
}

export function TagsList() {
  const todos = useTags();

  return (
    <ul className="list-group">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo}></TodoItem>
      ))}
    </ul>
  );
}

export function TagsForm() {
  const [tag, setTag] = useState<Tag>({ name: '' });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    addTodo(todo);
    setTodo({ name: '' });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={todo.name}
        onChange={event => setTag({ ...todo, name: event.target.value })}
        className="form-control"
        placeholder="Please enter a Todo name!"
      />
    </form>
  )
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
 
