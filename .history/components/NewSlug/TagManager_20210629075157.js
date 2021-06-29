import React, { useState } from 'react';

import { Card, Button, Badge, Dropdown, Typography, Input } from '@supabase/ui'
import { XIcon, IconChevronDown } from '@heroicons/react/solid';
import { addTag, removeTag, useTags } from '../../lib/services/tagService'


function TagItem({ tag }) {
  const handleClick = () => {
    if (tag.id) {
      removeTag(tag.id);
    }
  }

  return (
    <Button 
      layout="outline"
      className="p-3 m-2 inline-flex justify-start align-stretch rounded-md text-white text-sm font-extralight" 
      onClick={handleClick}
      iconRight={<XIcon className="h-6 w-6 text-white" />}
    >
      {tag.id}:{tag.name} 
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

const SeoFilterDropdown = ({ tag, setTag }) => {
  const { key, value } = tag; 

  const handleKeyChange = (updatedKey) => {
    setTag({
      ...tag,
      key: updatedKey
    });
  }
  const handleValueChange = (updatedValue) => {
    setTag({
      ...tag,
      value: updatedValue
    }); 
  };

  return (
    <Dropdown
      overlay={[
        <Dropdown.RadioGroup value={key} onChange={(event) => handleKeyChange(event.target.value)}>
          <Dropdown.Radio value="one">
            <Typography.Text>google play</Typography.Text>
          </Dropdown.Radio>
          <Dropdown.Radio value="two">
            <Typography.Text>itunes connect</Typography.Text>
          </Dropdown.Radio>
          <Dropdown.Radio value="three">
            <Typography.Text>android</Typography.Text>
          </Dropdown.Radio>
        </Dropdown.RadioGroup>,
      ]}
    >
      <p className="text-black text-md font-extralight m-6">
        {key}:{value}
      </p>
      <Button type="outline" iconRight={<IconChevronDown />}>
        {key}
      </Button>
    </Dropdown>
  )
}

export function TagForm() {
  const [tag, setTag] = useState({ key: '', value: '' })

  function onSubmit(event) {
    event.preventDefault();
    addTag(tag);
    setTag({ key: tag.key, value: tag.value });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="inline-flex justify-start align-stretch w-1/2"> 
        <SeoFilterDropdown tag={tag} setTag={setTag} />
        <Input
          type="text"
          value={tag.value}
          onChange={(event) => setTag({ 
            ...tag, 
            value: event.target.value 
          })}
        />
      </div>
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
 
