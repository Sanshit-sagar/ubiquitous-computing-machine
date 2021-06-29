import produce from "immer"

export const tagManagerReducer = produce((draft, action) => {
  switch(action.type) {
    case 'add':
        const { slugId, name, value } = action
        draft.tags.push({
            slugId,
            name, 
            value,
            usedBy: undefined
        })
        break; 
    case 'toggle':
        const tag = draft.tags.find(tag => tag.id===action.id)
        tag.usedBy = tag.usedBy===undefined 
            ? draft.currentSlug.id 
            : tag.usedBy===draft.currentSlug.id 
            ? undefined : draft.usedBy;     
        break; 
    case 'update': 
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

export async function getInitialUserState(email) {
    let allLinks = [];
    if(email && email.length) {
        allLinks = await fetch(`/api/slugs/getAll/${email}`);
    }
    
    return {
        links: allLinks || [],
        currentUser: email, 
        tags: []
    }
}