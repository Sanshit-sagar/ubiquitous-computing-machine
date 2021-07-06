import useSWR from 'swr'

import { fetcher } from '../../lib/utils'
import { useSession } from 'next-auth/client'

import { 
    CursorClickIcon, 
    ExternalLinkIcon, 
    SparklesIcon, 
    VideoCameraIcon 
} from '@heroicons/react/solid'

import Loader from '../Loader'
import Statistic from '../StatisticalGraphic/index'

const useUserSummarizedData = (uid) => {
    const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

    return {
        views: data ? data.views : null,
        loading: !data && !error,
        error: error
    }
}

function StatisticsCardsBase({ uid }) {

    const custom_icon_class = "w-6 h-6 text-indigo-700 dark:text-white"
    let unitsList = [
        { value: 1, title: '1 day', str: 'day', secs: 24*60*60 },
        { value: 7, title: '7 days', str: 'week', secs: 7*24*60*60 },
        { value: 30, title: '30 days', str: 'month', secs: 30*7*24*60*60 },
        { value: 100, title: 'all time', str: `since the start`, secs: 100*7*24*60*60 }, 
    ];
    const { views, loading, error } = useUserSummarizedData(uid)

    const availableStats = [{    
        key: 'mostViews',
        name: 'Most Views', 
        value: loading ? <Loader /> : !error ? views.maxViews : null,
        icon: <VideoCameraIcon className={`${custom_icon_class}`} />,
        unit: 1,
        delta: '50%',
        fallback: <p> --/-- </p>
    }, {   
        key: 'uniqueViews',
        name: 'Unique Views', 
        value: loading ? <Loader /> : !error ? views.numUnique : null,
        icon: <SparklesIcon className={`${custom_icon_class}`} />,
        unit: 2,
        delta: '50%',
        fallback: <p> --/-- </p>
    }, {
        key: 'totalViews',
        name: 'Total Views', 
        value: loading ? <Loader /> : !error ? views.totalViews : null,
        icon: <CursorClickIcon className={`${custom_icon_class}`} />,
        unit: 2,
        delta: '50%',
        fallback: <p> --/-- </p>
    }, {
        key: 'numLinks',
        name: 'Links Created', 
        value: loading ? <Loader /> : !error ? views.numLinks : null,
        icon: <ExternalLinkIcon className={`${custom_icon_class}`} />,
        unit: 0,
        delta: '50%',
        fallback: <p> --/-- </p>
    },
];

    return (
        <div className="contaner mx-auto bg-gray-700 mb-4 mr-4 p-3 rounded-md shadow-lg">
            <div className="inline-flex justify-start align-stretch space-x-2">
                {Object.entries(availableStats).map(function(stat, i) {
                    return (
                        <span 
                            key={i} 
                            className="rounded-md shadow-lg"
                        >
                            <Statistic 
                                stat={stat[1]} 
                                unitsList={unitsList} 
                                loading={loading} 
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );  
}

function StatisticsCards() {
    const [session] = useSession()

    if(loading) return <p> loading... </p> //TODO: SKELETON
    if(!session && !loading) return <p> error... </p> //LOG AND REDIRECT

    const uid = session && session.user ? session.user.email : '';

    return <StatisticsCardsBase uid={uid} />;
}


export default StatisticsCards