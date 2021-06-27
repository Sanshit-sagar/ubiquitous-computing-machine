import { ResponsiveTimeRange } from '@nivo/calendar';
import { BasicTooltip } from '@nivo/tooltip';
import { TickFormatter } from '@nivo/axes';
import * as dayjs from 'dayjs'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data);

import Loader from '../../Loader' 

export const sampleData = [
    {
      day: "2015-06-23",
      value: 145
    },
    {
      day: "2016-01-31",
      value: 384
    },
    {
      day: "2015-12-20",
      value: 273
    },
    {
      day: "2015-05-31",
      value: 380
    },
    {
      day: "2015-12-05",
      value: 161
    },
    {
      day: "2016-01-03",
      value: 69
    },
    {
      day: "2015-10-05",
      value: 18
    },
    {
      day: "2016-07-11",
      value: 137
    },
    {
      day: "2015-07-28",
      value: 117
    },
    {
      day: "2015-06-01",
      value: 118
    },
    {
      day: "2016-02-24",
      value: 281
    },
    {
      day: "2016-06-27",
      value: 153
    },
    {
      day: "2015-04-20",
      value: 337
    },
    {
      day: "2016-04-19",
      value: 131
    },
    {
      day: "2016-02-15",
      value: 263
    },
    {
      day: "2016-07-03",
      value: 306
    },
    {
      day: "2016-02-22",
      value: 63
    },
    {
      day: "2015-08-08",
      value: 60
    },
    {
      day: "2016-07-21",
      value: 244
    },
    {
      day: "2016-07-13",
      value: 204
    },
    {
      day: "2015-04-11",
      value: 331
    },
    {
      day: "2016-06-08",
      value: 188
    },
    {
      day: "2016-07-19",
      value: 397
    },
    {
      day: "2016-03-21",
      value: 294
    },
    {
      day: "2016-03-05",
      value: 199
    },
    {
      day: "2016-03-04",
      value: 233
    },
    {
      day: "2015-04-19",
      value: 203
    },
    {
      day: "2015-10-09",
      value: 26
    },
    {
      day: "2015-11-05",
      value: 175
    },
    {
      day: "2016-02-06",
      value: 35
    },
    {
      day: "2016-03-31",
      value: 27
    },
    {
      day: "2015-10-26",
      value: 66
    },
    {
      day: "2015-07-01",
      value: 71
    },
    {
      day: "2015-07-11",
      value: 275
    },
    {
      day: "2015-12-10",
      value: 387
    },
    {
      day: "2016-04-05",
      value: 115
    },
    {
      day: "2015-04-12",
      value: 87
    },
    {
      day: "2015-11-30",
      value: 275
    },
    {
      day: "2015-05-28",
      value: 64
    },
    {
      day: "2015-07-09",
      value: 81
    },
    {
      day: "2015-09-05",
      value: 146
    },
    {
      day: "2016-07-01",
      value: 349
    },
    {
      day: "2015-05-25",
      value: 306
    },
    {
      day: "2015-06-29",
      value: 144
    },
    {
      day: "2016-07-29",
      value: 222
    },
    {
      day: "2015-10-23",
      value: 333
    },
    {
      day: "2016-03-13",
      value: 105
    },
    {
      day: "2015-04-09",
      value: 59
    },
    {
      day: "2016-01-10",
      value: 387
    },
    {
      day: "2015-11-04",
      value: 124
    },
    {
      day: "2016-04-23",
      value: 347
    },
    {
      day: "2015-07-19",
      value: 210
    },
    {
      day: "2015-05-22",
      value: 312
    },
    {
      day: "2015-07-15",
      value: 336
    },
    {
      day: "2015-05-19",
      value: 314
    },
    {
      day: "2016-02-08",
      value: 102
    },
    {
      day: "2015-10-28",
      value: 88
    },
    {
      day: "2015-08-07",
      value: 321
    },
    {
      day: "2015-11-14",
      value: 199
    },
    {
      day: "2015-04-08",
      value: 69
    },
    {
      day: "2016-02-28",
      value: 57
    },
    {
      day: "2015-09-23",
      value: 176
    },
    {
      day: "2016-03-08",
      value: 269
    },
];

export const CalTooltip = ({ date, value }) => {
    const dayStr = dayjs(date).format('ll');
    
    return (
        <div className="" style={{ backgroundColor: 'black', borderRadius: '5px', border: 'thin solid white' }}>
            <span className="text-white font-extralight"> 
                {`Date: ${dayStr}`}
            </span> 
            <span> 
                {`Value: ${value}`}
            </span>
        </div>
    );
};

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


    let fromDateStr = `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDate()}`
    let toDateStr = `${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDate()}`

    var sanitizedFrequencies = []; 
    var frequencies = data.freqs
    Object.entries(frequencies).map(function(val, i) {
        sanitizedFrequencies.push({
            value: parseInt(val[1]), 
            day: val[0],
        })
    });
    


    return (
        <div style={{ height: '750px', width: '1000px', backgroundColor: 'black' }}>
            <ResponsiveTimeRange
                data={sanitizedFrequencies}
                from="2021-5-22"
                to="2021-5-25"
                emptyColor="#eeeeee"
                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
                monthLegendOffset={19}
                dayRadius={4}
                dayBorderWidth={2}
                dayBorderColor="#000000"
                tooltip={CalTooltip}
                isInteractive={true}
                onClick={(event) => alert(`Clicked ${event.target.id}`)}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        justify: false,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                        translateX: -85,
                        translateY: -240,
                        symbolSize: 20
                    },
                ]}
            />
        </div>
    );
}

export default HeatedCalendar