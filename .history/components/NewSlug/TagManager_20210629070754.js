import React, { useState } from 'react';

import { Card, Button,  Typography, Input } from '@supabase/ui'
import { XIcon } from '@heroicons/react/outline';

import StackedLayout from '../../sections/StackedLayout'
import { addTag, removeTag, useTags } from '../../lib/services/tagService'

function TagItem({ tag }) {
  const handleClick = () => {
    if (tag.id) {
      removeTag(tag.id);
    }
  }

  return (
    <Button 
      className="p-3 m-2 inline-flex justify-start align-stretch" 
      onClick={handleClick}
    >
      <span className="text-white text-sm font-extralight"> {tag.name} </span>
      <XIcon className="h-6 w-6 text-white" /> 
    </Button>
  ); 
}

function TagList() {
  const tags = useTags();
  
  return (
    <div className="infline-flex w-full justify-start align-stretch flex-wrap max-w-full overflow-hidden">
      <ul className="list-group">
        {tags.map(tag => (
          <TagItem tag={tag} />
        ))}
      </ul>
      <span className="inline-flex justify-end align-end">
        {tags.length} items
      </span>
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
  return (
      <Card 
        className="w-full flex-col justify-start align-stretch"
        title={
          <div className="inline-flex justify-start align-stretch">
            <Typography level={3}> 
              SEO and UTM tags 
            </Typography>
            <Typography level={5} variant="secondary">
              Select your category and tag from the menus on the left, 
              and enter your values on the right
            </Typography>
          </div>
        }
      >
        <TagList />
        <TagForm /> 
      </Card>
  );
}

 export default TagManager
 
