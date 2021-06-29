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
      className="p-3 m-2 inline-flex justify-start align-stretch rounded-md" 
      onClick={handleClick}
    >
      <span className="text-white text-sm font-extralight"> 
        {tag.name} 
      </span>
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


      // <Button 
      //       size="small" 
      //       icon={<XCircleIcon className="h-6 w-6 m-1 text-black" />} 
      //       className="bg-white text-black" 
      //     /> 
const SeoFilterDropdown = ({ value }) => {
  const [seoFilter, setSeoFilter] = useState('google')

  return (
    <Dropdown
      overlay={[
        <Dropdown.RadioGroup value={seoFilter} onChange={setSeoFilter}>
          <Dropdown.Radio value="google">
            <Typography.Text>Google Play</Typography.Text>
          </Dropdown.Radio>
          <Dropdown.Radio value="itunes">
            <Typography.Text>iTunes Connect</Typography.Text>
          </Dropdown.Radio>
          <Dropdown.Radio value="android">
            <Typography.Text>Android</Typography.Text>
          </Dropdown.Radio>
        </Dropdown.RadioGroup>,
      ]}
    >
      <Button type="outline" iconRight={<IconChevronDown />}>
        {seoFilter}
      </Button>
    </Dropdown>
  )
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
      <div className="inline-flex justify-start align-stretch w-1/2"> 
        <SeoFilterDropdown value={tag.name} />
        <Input
          type="text"
          value={tag.name}
          onChange={(event) => setTag({ ...tag, name: event.target.value })}
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
 
