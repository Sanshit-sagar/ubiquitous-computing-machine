import produce from "immer"

export const tagManagerReducer = produce((draft, action) => {
  switch(action.type) {
    case "add_tag":
      const { slugId, name, value } = action
      draft.tags.push({
        slugId,
        name, 
        value,
        usedBy: undefined
      })
      break; 
    case "toggle_tag": 
      const tag = draft.tags.find(tag => tag.id===action.id)  
        tag.usedBy = tag.usedBy===undefined 
          ? draft.currentSlug.id 
          : tag.usedBy===draft.currentSlug.id 
          ? undefined
          : draft.usedBy
    case "reset":
      return initialState; 
  }
}); 
