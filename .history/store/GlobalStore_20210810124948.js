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
                darkMode: state.darkMode ? false : true,
            };
        case 'navigate':
            return {
                ...state,
                currentPage: action.payload.value, 
                currentTab: '',
            };
        case 'toggle_map_value':
            return {
                ...state,
                selectedRows: {
                    ...state.selectedRows,
                    // [action.payload.key]: !state[`${action.payload.key}`] ? true : !state.action.payload.key
                }
            };
        case 'toggle_slug_modal':
            return {
                ...state,
                showSlugDetails: !state.showSlugDetails,
                activeSlug: {
                    ...state.activeSlug,
                    slug: action.payload.slug
                },
            };
        case 'toggle_dropdown':
            return {
                ...state,
                timeSelector: {
                    ...state.timeSelector,
                    isOpen: state.timeSelector.isOpen ? false : true,
                }
            }; 
        case 'change_tabs':
            return {
                ...state,
                currentTab: action.payload.value
            }; 
        case 'toggle':
            return {
                ...state,
                [action.payload.key]: !state.menuOpen,
            };
        case 'mount':
            if(state.mounted) return;
            return {
                ...state,
                mounted: true,
            }; 
        default:
            return state
    };
}

const initialState = {
    currentTab: 'destination',
    currentPage: 'new',
    mounted: false, 
    router: {
        current: '/home',
        history:  [],
    }
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