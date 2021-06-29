import { generate } from 'shortid'
import { useEffect, useState  } from 'react'

import Store from '../observables/store'
import { Tag } from '../interfaces/tag'

const initialState: Tag[] = []; 
const tagStore = new Store<Tag[]>(initialState); 

export function addTag(tag: Tag) {
    tag.id = generate(); 

    tagStore.set(state => {
        state.push(tag)
    }); 
}

export function removeTag(id: string) {
    tagStore.set(state => {
        state.splice(
            state.findIndex(tag => tag.id === id),
            1
        ); 
    }); 
}

export function useTagStore() {
    const [tags, setTags] = useState<Tag[]>(tagStore.get()); 

    useEffect(() => {
        const subscription = tagStore.getChanges().subscribe(setTags);

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return tags;
}
  