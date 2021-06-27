import { ResponsiveCalendar, CalendarDayData } from '@nivo/calendar';
import { BasicTooltip } from '@nivo/tooltip';
import { TickFormatter } from '@nivo/axes';


export const CalTooltip = ({ date, value, color }) => {
    const dayStr = dayjs(date).format('ll');
    
    return (
        <BasicTooltip 
            id={dayStr} 
            value={value} 
            color={color} 
            enableChip 
        />
    );
};

const useDailyTimeseries = () => {
    const { data, error } = useSWR('/api/stream/timeseries', fetcher); 
    
    return {
        timeseries: data ? data : null,
        loading: !data && !error,
        error
    }
}

const HeatedCalendar = ({ data }) => {
    const { data, loading, error } = useDailyTimeseries();
    
    return (
        <p>
            {loading ? <Loader /> : !error ? JSON.stringify(data) : <p> Error! </p>}
        </p>
    )

    // const from = new Date(date('from', new Date(2020, 6, 27)))
    // const to = new Date(date('to', new Date(2021, 0, 7))

    // return (
    //     <div style={{ height: '100%', width: '20rem' }}>
    //         <ResponsiveCalendar
    //                 data={data}
    //                 from="2015-03-01"
    //                 to="2016-07-12"
    //                 emptyColor="#eeeeee"
    //                 colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
    //                 margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    //                 yearSpacing={40}
    //                 monthBorderColor="#ffffff"
    //                 dayBorderWidth={2}
    //                 dayBorderColor="#ffffff"
    //                 tooltip={CalTooltip}
    //                 legends={[
    //                     {
    //                         anchor: 'bottom-right',
    //                         direction: 'row',
    //                         translateY: 36,
    //                         itemCount: 4,
    //                         itemWidth: 42,
    //                         itemHeight: 36,
    //                         itemsSpacing: 14,
    //                         itemDirection: 'right-to-left',
    //                     },
    //                 ]}
    //             />
    //     </div>
    // );
}
