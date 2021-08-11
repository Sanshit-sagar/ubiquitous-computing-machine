import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'assign':
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: action.payload.value,
                lastUpdatedAt: new Date().getTime().toString(),
            }; 
        case 'assign_array':
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: [...action.payload.value],
                lastUpdatedAt: new Date().getTime().toString(),
            };
        case 'append':
            return {
                ...state,
                [action.payload.key]: [...state[action.payload.key], action.payload.value],
                lastUpdatedAt: new Date().getTime().toString(),
            }; 
        case 'filter':
            return {
                ...state,
                [action.payload.key]: state[action.payload.key].filter(function(value, index) {
                    return index!==action.payload.index; 
                }),
                lastUpdatedAt: new Date().getTime().toString(),
            }; 
        case 'toggle': 
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: state[action.payload.key] ? false : true,
                lastUpdatedAt: new Date().getTime().toString(),
            };
        case 'publish':
            return {
                ...state,
                publishedLink: `${ApiGateway}/${action.payload.slug}`,
                publishedLinkDetails: {
                    ...state.publishedLinkDetails,
                    slug: action.payload.slug,
                    destination: state.destination,
                    timestamp: state.lastUpdatedAt,
                    config: {
                        ...state.publishedLinkDetails.config,
                        ttl: state.ttl,
                        password: state.password,
                        blacklist: [...state.blacklist],
                        seoTags: [...state.seoTags],
                        routingStatus: state.routingStatus
                    },
                },
                lastUpdatedAt: new Date().getTime(),
            }; 
        case 'reset':
            return {
                ...state,
                currentTab: 'destination',
                destination: '',
                slug: '',
                title: '',
                password: '',
                blacklist: [],
                seoTags: [],
                ttl: '',
                routingStatus: '',
                lastUpdatedAt: new Date().getTime(),
            }; 
        case 'openModal':
            return {
                ...state,
                modalOpen: true,
                modalData: {
                    ...state.modalData,
                    tenant: action.payload.tenant,
                    title: action.payload.title,
                    description: action.payload.description || '',
                    content: action.payload.content,
                    lastUpdatedAt: new Date().getTime(),
                },
                lastUpdatedAt: new Date().getTime(),
            };
        case 'closeModal':
            return {
                ...state,
                modalOpen: false,
                modalData: {
                    tenant: '',
                    title: '',
                    description: '',
                    content: '',
                    status: '',
                    lastUpdatedAt: new Date().getTime(),
                },
                lastUpdatedAt: new Date().getTime(),
            }; 
        case 'resize':
            return {
                ...state,
                datasetSize: action.payload.value,
                lastUpdatedAt: new Date().getTime(),
            };
        case 'search_results':
            return {
                ...state,
                searchbar: {
                    ...state.searchbar,
                    results: [...action.payload.results],
                    isOpen: action.payload.results.length ? true : false,
                },
                lastUpdatedAt: new Date().getTime(),
            };
        case 'validation':
            return {
                ...state,
                hasError: {
                    ...state.hasError,
                    [`${action.payload.key}`]: action.payload.isValid ? false : true,
                },
                validated: {
                    ...state.validated,
                    [`${action.payload.key}`]: action.payload.isValid ? true : false,
                },
                lastUpdatedAt: new Date().getTime(),
            };
        default:
            return state
    };
}


const categoryKeyMap = {
    'iOS': ['Fallback Link', 'Bundle ID', 'iPad Fallback Link', 'iPad Bundle ID', '', ''],
    'Android': ['key4', 'key5', 'key6'],
    'Google Play': ['', 'key8', 'key9'],
}; 

const campaignParameters = [
    'utm_source', 
    'utm_medium', 
    'utm_term',
    'utm_content',
    'utm_campaign',
];
  

const ApiGateway = 'https://writer.hashably.workers.dev' 

const initialState = {
    doRefresh=false,
    links: [],
    searchbar: {
        isOpen: false,
        results: [],
    },
    currentTab: 'destination',
    lastUpdatedAt: '',
    destination: '',
    slug: '',
    slugType: 'autogenerated',
    title: '', 
    password: '',
    blacklist: [],
    seoTags: [],
    ttl: '',
    routingStatus: 301,
    activeDataset: {
        index: 0,
        variable: 'destinations',
        title: 'Top Destinations', 
        stat: [],
    },
    hasError: {
        'url': false,
        'slug': false,
        'ttl': false,
        'blacklist': false,
        'security': false,
        'utm': false,
        'routing': false,
    },
    validated: {
        'url': false,
        'slug': false,
        'ttl': false,
        'blacklist': false,
        'security': false,
        'utm': false,
        'routing': false,
    },
    datasetSize: 100,
    activeChart: 'pie',
    categories: Object.keys(categoryKeyMap),
    keysByCategory: categoryKeyMap,
    publishedLink: '',
    publishedLinkDetails: {
        slug: '',
        destination: '',
        timestamp: '',
        config: {
            ttl: '',
            password: '',
            blacklist: [],
            seoTags: [],
            routingStatus: '',
        }
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

export const NewSlugStore = {
    State,
    Dispatch,
    Provider,
};