import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'assignment':
            if(!state[action.payload.key]) {
                return state;
            }
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }; 
        case 'toggle': 
            return {
                ...state,
                flag: state.flag ? false : true,
            };
        default:
            return state
    };
}

const initialState = {
    password: 'n/a',
    flag: false,
};

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    
    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>
                { children }
            </Dispatch.Provider>
        </State.Provider>
    );
}

export const NewSlugStore = {
    State,
    Dispatch,
    Provider,
};