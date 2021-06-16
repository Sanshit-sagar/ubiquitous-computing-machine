import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return {
                ...state,
                counter: state.counter + 1
            };
        case 'decrement':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'reset':
            return {
                ...state,
                counter: 0
            }; 
        case 'toggle_dark_mode': 
            return {
                ...state,
                darkMode: !state.darkMode
            };
        default:
            return state
    };
}

const initialState = {
    // breadcrumbs: {
    //     history: [],
    //     current: '',
    // },
    isDarkMode: false,
    counter: 0,
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

export const GlobalStore = {
    State,
    Dispatch,
    Provider,
};