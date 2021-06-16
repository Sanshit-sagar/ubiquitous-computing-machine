import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'destination_url_update':
            return {
                ...state,
                destinationUrl: action.payload.value
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
    darkMode: false,
    destinationUrl,
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