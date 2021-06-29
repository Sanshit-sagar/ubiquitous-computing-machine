import React, { useState } from 'react';
import StackedLayout from '../sections/StackedLayout'
import { Card, Button, Badge, Typography, Input } from '@supabase/ui'
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
    <div className="border border-black rounded-md shadow-md p-1 bg-white">
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
      <Card 
        title={
          <div className="inline-flex justify-start align-stretch">
            <Typography level={3}> 
              SEO and UTM tags 
            </Typography>
            <Typography level={5} variant="secondary">
              Select your category and tag names from the menus on the left, 
              and type your value in the input field below
            </Typography>
          </div>
        }
      >
        <TagList />
        <TagForm /> 
      </Card>
  );
}

const TagManagerWrapper = () => {

  return (
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <TagManager />
    </StackedLayout>
  );
}

 export default TagManagerWrapper
 
