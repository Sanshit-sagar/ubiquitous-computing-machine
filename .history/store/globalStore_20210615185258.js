import { useImmerReducer } from "use-immer";

const initialState = {
    count: 0
}; 

function reducer(draft, action) {
    switch (action.type) {
      case "reset":
        return initialState;
      case "increment":
        return void draft.count++;
      case "decrement":
        return void draft.count--;
    }
}