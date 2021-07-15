import useSWR from 'swr'

import { fetcher } from '../../lib/utils'

import { 
    CursorClickIcon, 
    ExternalLinkIcon, 
    SparklesIcon, 
    VideoCameraIcon 
} from '@heroicons/react/solid'

import { Spinner } from '@blueprintjs/core'
import Statistic from '../StatisticalGraphic/index'

const useUserSummarizedData = (uid) => {
    const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

    return {
        stats: data ? data.views : null,
        links: data ? data.slugsSortedByViews : [],
        clicks: data ? data.viewsSortedByTime : [],
        loading: !data && !error,
        error: error
    }
}

function StatisticsCardsBase({ stats, loading, error }) {

    const custom_icon_class = "w-5 h-5 text-gray-800 dark:text-white bg-white dark:bg-gray-800 mx-2 my-1"
    let unitsList = [
        { value: 1, title: '1 day', str: 'day', secs: 24*60*60 },
        { value: 7, title: '7 days', str: 'week', secs: 7*24*60*60 },
        { value: 30, title: '30 days', str: 'month', secs: 30*7*24*60*60 },
        { value: 100, title: 'all time', str: `since the start`, secs: 100*7*24*60*60 }, 
    ];
   
    // calculate delta using links and clicks here 

    const availableStats = [{    
        id: 'mostViewedPages',
        key: 'mostViews',
        name: 'Most Views', 
        value: loading ? <Spinner size={20} intent="primary" /> : !error ? stats.maxViews : <p> "--/--" </p>,
        icon: <VideoCameraIcon className={`${custom_icon_class}`} />,
        unit: 1,
        delta: '50%',
        fallback: <p> --/-- </p>
    }, {   
        id: 'uniqueVisitors',
        key: 'uniqueViews',
        name: 'Unique Views', 
        value: loading ? <Spinner size={20} intent="primary" /> : !error ? stats.numUnique : <p> "--/--" </p>,
        icon: <SparklesIcon className={`${custom_icon_class}`} />,
        unit: 2,
        delta: '50%',
        fallback: <p> --/-- </p>
    }, {
        id: 'allViews',
        key: 'totalViews',
        name: 'Total Views', 
        value: loading ? <Spinner size={20} intent="primary" /> : !error ? stats.totalViews : <p> "--/--" </p>,
        icon: <CursorClickIcon className={`${custom_icon_class}`} />,
        unit: 2,
        delta: '50%',
        fallback: <p> --/-- </p>
    }, {
        id: 'allLinks',
        key: 'numLinks',
        name: 'Links Created', 
        value: loading ? <Spinner size={20} intent="primary" /> : !error ? stats.numLinks : <p> "--/--" </p>,
        icon: <ExternalLinkIcon className={`${custom_icon_class}`} />,
        unit: 0,
        delta: '50%',
        fallback: <p> --/-- </p>
    }];

    return (
        <div className="flex-col justify-start align-stretch space-y-2 mx-3">
            {Object.entries(availableStats).map(function(stat, i) {
                return (
                    <div key={i}>
                        <Statistic 
                            stat={stat[1]} 
                            unitsList={unitsList} 
                            loading={loading} 
                        />
                    </div>
                );
            })}
        </div>
    );  
}


function StatisticsCards({ email }) {
    const uid = email
    const { stats, links, clicks, loading, error } = useUserSummarizedData(uid)

    return (
        <StatisticsCardsBase 
            stats={stats} 
            loading={loading} 
            error={error} 
        />
    );
}


export default StatisticsCards