import produce from "immer"
import { useSession } from "next-auth/client";

export const tagManagerReducer = produce((draft, action) => {
  switch(action.type) {
    case 'add_tag':
        const { slugId, name, value } = action
        draft.tags.push({
            slugId,
            name, 
            value,
            usedBy: undefined
        })
        break; 
    case 'toggle_tag':
        const tag = draft.tags.find(tag => tag.id===action.id)
        tag.usedBy = tag.usedBy===undefined 
            ? draft.currentSlug.id 
            : tag.usedBy===draft.currentSlug.id 
            ? undefined : draft.usedBy;     
        break; 
    case 'update_tag': 
        let { updatedValue } = update_tag_value
        if(updatedValue && updatedValue.length) {
            const tag = draft.tags[draft.tags.findIndex(tag => tag.id===action.id)]
            tag.value = updatedValue
        }
        break; 
    case "reset":
        return initialState; 
  }
}); 


export async function getTagDetails() {
    const tagDetails = await fetch(`/api/tags/${id}`, fetcher)
    return tagDetails; 
}

export function getInitialUserState() {
    const [session, loading] = await useSession();
    let email = session && session?.user ? session.user.email : ''

    let allLinks = [];
    if(email && email.length) {
        allLinks = await fetch(`/api/slugs/getAll/${email}`);
    }
    
    return {
        links: allLinks || [],
        currentUser: {
            email: session && session?.user ? session.user.email : '',
            name: session && session?.user ? session.user.name : ''
        },
        tags: []
    }
}