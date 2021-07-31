import { generate } from 'shortid'
import { useEffect, useState  } from 'react'

import Link from '../interfaces/link'
import Store from '../observables/store'

const initialState: Link[] = []; 
const linkStore = new Store<Link[]>(initialState); 

export function addLink(link: Link) {
    link.id = generate(); 

    linkStore.set(state => {
        state.push(link)
    }); 
}

export function removeLink(id: string) {
    linkStore.set(state => {
        state.splice(
          state.findIndex(link => link.id === id),
          1
        );
    });
}

export function useLinks() {
    const [links, setLinks] = useState<Link[]>(linkStore.get()); 

    useEffect(() => {
        const subscription = linkStore.getChanges().subscribe(setLinks);

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return links;
}
  