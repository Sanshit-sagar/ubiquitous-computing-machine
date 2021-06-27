import { ResponsiveCalendar, CalendarDayData } from '@nivo/calendar';
import { BasicTooltip } from '@nivo/tooltip';
import { TickFormatter } from '@nivo/axes';

import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data);

import Loader from '../../Loader' 

// export const CalTooltip = ({ date, value, color }) => {
//     const dayStr = dayjs(date).format('ll');
    
//     return (
//         <BasicTooltip 
//             id={dayStr} 
//             value={value} 
//             color={color} 
//             enableChip 
//         />
//     );
// };

const useDailyTimeseries = () => {
    const { data, error } = useSWR('/api/stream/timeseries', fetcher); 

    return {
        data: data ? data : null,
        loading: !data && !error,
        error
    }
}

const HeatedCalendar = () => {
    const { data, loading, error } = useDailyTimeseries();

    if(loading) return <Loader />
    if(error) return <p> Error! </p> 

    const fromDate = new Date(data.earliestEvent);
    const toDate = new Date(data.latestEvent);  

    var sanitizedFrequencies = []; 
    var frequencies = data.freqs
    Object.entries(frequencies).map(function(val, i) {
        sanitizedFrequencies.push({
            value: val[1], 
            day: val[0],
        })
    });



    return (
        <div style={{ height: '100%', width: '20rem' }}>
            {/* <span className="text-black font-extralight">
                {`${fromDate}-${toDate}***${JSON.stringify(sanitizedFrequencies)}`}
            </span>  */}
            <ResponsiveCalendar
                data={sanitizedFrequencies}
                from={fromDate}
                to={toDate}
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                // tooltip={CalTooltip}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                    },
                ]}
            />
        </div>
    );
}

export default HeatedCalendar