import { useState, FormEvent } from 'react';
import StackedLayout from '../sections/StackedLayout'
import { Card, Button, Menu } from '@supabase/ui'
import { Tag } from '../lib/interfaces/tag'
import { addTag, removeTag, useTags } from '../lib/services/tagService'


interface Props {
    tag: Tag; 
}

function TagItem({ tag }: Props) {
  const handleClick = () => {
    if (tag.id) {
      removeTag(tag.id);
    }
  }

  return (
    <span 
      className="p-3 m-2 bg-indigo-500 text-white-500" 
      onClick={handleClick}
    >
      {tag.name}
    </span>
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

export function TagForm({}: any) {
  const [tag, setTag] = useState<Tag>({ name: '' });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    addTag(tag);
    setTag({ name: '' });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
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
 
