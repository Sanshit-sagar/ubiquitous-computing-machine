import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const baseUrl = 'https://analyticly.hashably.workers.dev/hashed';

function isInvalidState(state, action) {
    return !state[action.payload.key]?.length;
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'update_array':
            if(isInvalidState(state, action)) return state;

            return {
                ...state,
                [action.payload.key]: [...action.payload.value],
                lastUpdatedAt: new Date().getTime().toString(),
            };
        case 'increment':
            return {
                ...state,
                [action.payload.key]: state[action.payload.key] + 1,
            };
        default: 
            return state;
}