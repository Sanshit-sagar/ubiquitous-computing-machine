import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const baseUrl = 'https://analyticly.hashably.workers.dev/hashed';

const reducer = (state, action) => {
    switch(action.type) {
        case 'update_destination':
            return {
                ...state,
                destination: action.payload.value
            };
        case 'update_ttl':
            return {
                ...state,
                ttl: action.payload.value
            };
        case 'publish_link':
            return {
                ...state,
                publishedLink: `${baseUrl}/${action.payload.slug}`,
                publishedLinkDetails: {
                    ...state.publishedLinkDetails,
                    slug: action.payload.slug,
                    destination: state.destination,
                    config: {
                        ...state.publishedLinkDetails.config,
                        ttl: state.ttl,
                    },
                }
            }; 
        case 'clear_stale_input':
            return {
                ...state,
                destination: '',
                ttl: '',
            }
        case 'toggle_dark_mode': 
            return {
                ...state,
                darkMode: !state.darkMode
            };
        case 'navigate':
            return {
                ...state,
                router: {
                    ...state.router,
                    current: action.payload.route,
                    history: [
                        ...state.router.history, 
                        action.payload.route
                    ],
                }
            };
        case 'toggle_map_value':
            return {
                ...state,
                selectedRows: {
                    ...state.selectedRows,
                    [action.payload.key]: !state[`${action.payload.key}`] ? true : !state.action.payload.key
                }
            };
        case 'toggle':
            return {
                ...state,
                [action.payload.key]: !state.menuOpen,
            };
        default:
            return state
    };
}

const initialState = {
    darkMode: false,
    destination: '',
    ttl: '',
    publishedLink: '',
    publishedLinkDetails: {
        slug: '',
        destination: '',
        config: {
            ttl: '',
        }
    },
    router: {
        current: '/root',
        history: ['/root'],
        breadcrumbs: [
            { index: 0, name: '/root', href: '/', current: true },
        ],
    },
    menuOpen: false,
    selectedRows: {},
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