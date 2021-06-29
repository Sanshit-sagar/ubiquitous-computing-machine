import React, { useState } from 'react';
import StackedLayout from '../sections/StackedLayout'
import { Card, Button, Badge, Input } from '@supabase/ui'
import { addTag, removeTag, useTags } from '../lib/services/tagService'

function TagItem({ tag }) {
  const handleClick = () => {
    if (tag.id) {
      removeTag(tag.id);
    }
  }

  return (
    <Button 
      className="p-3 m-2 bg-indigo-500 text-white-500" 
      onClick={handleClick}
    >
      {tag.name}
    </Button>
  ); 
}

function TagList() {
  const tags = useTags();
  
  return (
    <div className="border border-black rounded-md shadow-md p-5 m-5 bg-white">
      <ul className="list-group">
        {tags.map(tag => (
          <TagItem tag={tag} />
        ))}
      </ul>
    </div>
  );
}

export function TagForm() {
  const [tag, setTag] = useState({ name: '' })

  function onSubmit(event) {
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
  const tags = useTags();

  return (
      <Card title="Counter">

        <p>  # Tags: </p>
        <Badge className="text-md text-black font-extralight"> 
          {tags.length} 
        </Badge>
        
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
     
        <TagManager /> 
    
    </StackedLayout>
  )
}

 export default TagManagerWrapper
 
