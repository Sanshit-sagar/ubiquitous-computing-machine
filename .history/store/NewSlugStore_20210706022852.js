import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'assign':
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }; 
        case 'append':
            return {
                ...state,
                [action.payload.key]: [...state[action.payload.key], action.payload.value],
            }; 
        case 'filter':
            return {
                ...state,
                [action.payload.key]: state[action.payload.key].filter(function(value, index) {
                    return index!==action.payload.index; 
                })
            }
        case 'toggle': 
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: state[action.payload.key] ? false : true,
            };
        case 'publish_link':
            return {
                ...state,
                publishedLink: `${ApiGateway}/${action.payload.slug}`,
                publishedLinkDetails: {
                    ...state.publishedLinkDetails,
                    slug: action.payload.slug,
                    destination: state.destination,
                    config: {
                        ...state.publishedLinkDetails.config,
                        ttl: state.ttl,
                        password: state.password,
                        blacklist: [...state.blacklist],
                        seoTags: [...state.seoTags],
                        routingStatus: state.routingStatus
                    },
                }
            }; 
        case 'clear_inputs':
            return {
                ...state,
                destination: '',
                slug: '',
                title: '',
                password: '',
                blacklist: [],
                seoTags: [],
                ttl: '',
                routingStatus: '',
                
            }
        default:
            return state
    };
}


const categoryKeyMap = {
    'category1': ['key1', 'key2', 'key3'],
    'cateogry2': ['key4', 'key5', 'key6'],
    'category3': ['key7', 'key8', 'key9'],
}; 
  

const ApiGateway = 'https://writer.hashably.workers.dev' 

const initialState = {
    currentTab: 'destination',
    destination: '',
    slug: '',
    title: '', 
    password: '',
    blacklist: [],
    seoTags: [],
    ttl: '',
    routingStatus: 301,
    categories: Object.keys(categoryKeyMap),
    keysByCategory: categoryKeyMap,
    publishedLink: '',
    publishedLinkDetails: {
        slug: '',
        destination: '',
        config: {
            ttl: '',
            password: '',
            blacklist: [],
            seoTags: [],
            routingStatus: '',
        }
    },
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