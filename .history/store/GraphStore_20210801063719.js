import React, { useReducer, createContext } from 'react';

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
                lastUpdatedAt: new Date().getTime().toString(),
            };
        case 'toggle':
            return {
                ...state,
                [action.payload.key]: !action.payload.key ? true : false,
                lastUpdatedAt: new Date().getTime().toString(),
            };
        case 'select': 
            return {
                ...state, 
                [action.payload.key]: [action.payload.value],
            }; 
        default: 
            return state;
    }
}

export const BAR_CHART_STR = "Daily Pageviews"
export const LINE_CHART_STR = "Total Pageviews"
export const SCATTER_PLOT_STR = "Scatter Plot"

const initialState = {
    freqsArr: [],
    cummFreqsArr: [],
    scatterPlotArr: [],
    freqsLabels: [],
    data: [],
    loading: false,
    error: null,
    fetchCount: 0,
    lastUpdatedAt: 'n/a',
    selectedTab: 1,
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

export const GraphStore = {
    State,
    Dispatch,
    Provider,
};