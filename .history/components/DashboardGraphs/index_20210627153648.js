import React,{ useState, useEffect } from 'react'

import toast from 'react-hot-toast'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../Loader'
import HeatedCalendar from '../Charts/HeatedCalendar'
import ClickstreamTimeseries from './ClickstreamTimeseries'

export const fetcher = url => axios.get(url).then(res => res.data);

function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


// import { Windmill } from '@windmill/react-ui'
// import Toolbar from '../Toolbar'
// import GraphError from '../Error'
// import ButtonGroup from '../ButtonGroup'
// import TimeseriesList from './TimeseriesList'
// import TimeseriesGraph from './TimeseriesGraph'
// import StatisticsCards from '../StatisticsCards'

// const options = [
//     {
//         key: 'allTime',
//         label: 'All time',
//     },
//     {
//         key: 'pastNinetyDays',
//         label: 'Past 90 days',
//         duration: 90*24*60*60*1000,
//     },
//     {
//         key: 'pastThirtyDays',
//         label: 'Past 30 days',
//         duration: 30*24*60*60*1000,
//     },
//     {
//         key: 'pastWeek',
//         label: 'Past week',
//         duration: 7*24*60*60*1000,
//     },
// ];

// function seriesGenerator(clickstream) {
//     let timeseries = [];
//     let details = []; 

//     var numUnique = 0; 
//     var numInvalid = 0; 
//     var ipSet = new Map();
//     var uaSet = new Map();
//     var locSet = new Map(); 

//     clickstream.forEach((e, i) => {
//         let ip = e.user ? e.user.ip : e.visitor ? e.visitor.ip : ''
//         let ua = e.ser ? e.user.ip : e.visitor ? e.visitor.ip : ''
//         let loc = e.geo ? e.geo.country : e.geodata ? e.geodata.country : ''

//         if(!ip.length || !ua.length || !loc.length) {
//             return;
//         }

//         let seen = ipSet.has(ip) || uaSet.has(ua) || locSet.has(loc) 
        
//         if(!seen) {
//             ++numUnique;
//             ipSet.set(ip, e);
//             uaSet.set(ua, e);
//             locSet.set(loc, e);
//         }

//         var clickDetails = {
//             index: i,
//             timestamp: e.misc.finalTimestamp,
//             destination: e.destination,
//             slug: e.slug,
//             isUnique: seen
//         };

//         details.push(clickDetails);
//         timeseries.push({
//             'x': e.misc.finalTimestamp, 
//             'y': i 
//         })
//     });

//     let series = { 'details': details, 'timeseries': timeseries, numUnique, numInvalid };

//     console.log(`details ${details}`)
//     console.log(`timeseries ${timeseries}`)
//     console.log(`Unique Count: ${numUnique}`)
//     console.log(`Invalid Count: ${numInvalid}`)

//     return series;
// }

// const Nav = ({ children }) =>  {
//     return (
//       <nav className="p-4">
//         <ul className="flex space-x-2">
//           {children}
//         </ul>
//       </nav>
//     )
//   }

// const NavItem = ({ href, isActive, children }) => {
//     let items = []; 

//     return (
//         <Nav>
//             {items.map((item, i) => {
//                 return (
//                     <div key={i}>
//                         <NavItem>
//                             {items[i].value}
//                         </NavItem>
//                     </div>
//                 );
//             })}
//         </Nav>        
//     );
// }

const EmptyGraph = () => {

    return (
        <div class="container mx-auto">
            <h1> NO DATA 
                <a href="/new"> Create </a>
            </h1>
        </div>
    )
}


const TimeseriesVisualizers = ({ timeseriesLoading, timeseriesError }) => {

    return (
        <div className="w-full h-full container mx-auto mt-3 inline-flex justify-between align-stretch">
            <div className="w-90 max-w-90 flex-col justify-between align-stretch">
                <TimeseriesList />
            </div>
            <div className="w-full h-full flex-col justify-start align-stretch ml-4 m-2">
                {
                        timeseriesLoading   ? <Loader /> 
                    :   timeseriesError     ? <h1> !Error!! </h1> 
                    :   <StatisticsCards />
                }   
                <ClickstreamTimeseries /> 
            </div>
        </div> 
    )
}    


// const TimeseriesVisualizers = () => {

//     return (
//         <div className="container mx-auto">
//             <div class="h-screen w-full p-2 m-1 flex-col flex-start align-stretch">
//                 {/* <HeatedCalendar />  */}
//                 <ClickstreamTimeseries />  
//             </div>
//         </div>
//     )
// }

const TimeseriesWrapper = ({ email, mounted, setMounted }) => {
    const [fetchCount, setFetchCount] = useState(0)
    const [lastUpdatedAt, setLastUpdatedAt] = useState('')

    const [details, setDetails] = useState([])
    const [timeseries, setTimeseries] = useState([])
    const [timeseriesLoading, setTimeseriesLoading] = useState(false)
    const [timeseriesError, setTimeseriesError] = useState(false)

    const [statistics, setStatistics] = useState({}) 
    const [timeFilter, setTimeFilter] = useState('30')

    const updateTimeFilter = (key) => {
        setTimeFilter(key)
    }

    const updateStatistics = (timeseries, uniqueCount, skipCount) => {
        setStatistics({
            ...statistics,
            size: timeseries.length,
            start: timeseries[0].x,
            end: timeseries[timeseries.length-1].x,
            numDays: (timeseries[0].x-timeseries[timeseries.length-1].x ) / (24*60*60),
            unique: uniqueCount,
            skipped: skipCount,
            avgTimePerPageview: (timeseries[0].x-timeseries[timeseries.length-1].x) / timeseries.length,
            latestPageview: timeseries[timeseries.length-1].x,
            earliestPageview: timeseries[0].x
        });
    }

    const { clickstream, loading, error } = useUserClickstreams(email, timeFilter)

    useEffect(() => {
        if(mounted && !loading && !error && clickstream && clickstream.length) {
            setTimeseriesLoading(true)
            
            const {details, timeseries, numUnique, numInvalid} = seriesGenerator(clickstream)
            setTimeseries([...timeseries])
            setDetails([...details]);
            updateStatistics(timeseries, numUnique, numInvalid); 
            setLastUpdatedAt(new Date().getTime().toString())


            setFetchCount(fetch + 1)
            setTimeseriesLoading(false)
        }
    }, [mounted, clickstream, timeseries, details, lastUpdatedAt])

    return (
        <TimeseriesVisualizers
            email={email} 
            timeseries={timeseries}
            setTimeseries={setTimeseries}
            timeseriesLoading={timeseriesLoading}
            timeseriesError={timeseriesError}
            timeFilter={timeFilter}
            updateTimeFilter={updateTimeFilter}
            statistics={statistics}
            details={details}
            lastUpdatedAt={lastUpdatedAt}
        />
    )
}

const DashboardGraphs = () => {
    const [mounted, setMounted] = useState(false)
    const [session, userLoading] = useSession()

    useEffect(() => {
        if(mounted) setMounted(true);
    }, [mounted]);

    const email = session && session.user ? session.user.email : ''

    return (
        <div className="container mx-auto h-full">
            <TimeseriesWrapper 
                email={email}
                mounted={mounted} 
            /> 
        </div>
    );
}

export default DashboardGraphs
