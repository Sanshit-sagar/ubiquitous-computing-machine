import { generate } from 'shortid'
import { useEffect, useState  } from 'react'

import { Store } from '../observables/store'
import { Tag } from '../interfaces/tag'

const initialState = Tag[]: []; 
const TagStore = Store<Tag[]>(initialState); 

export function addTag(tag: Tag) {
    tag.id = generate(); 

    TagStore.set(state => {
        state.push(tag)
    }); 
}

