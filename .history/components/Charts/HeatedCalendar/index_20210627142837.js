import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";

const data = [
    {
      day: "2021-05-22",
      value: 9
    },
    {
      day: "2021-05-23",
      value: 19
    },
    {
      day: "2021-05-24",
      value: 5
    },
    {
        day: "2021-05-25",
        value: 3
    },
];

const MyResponsiveTimeRange = () => {

    return (
        <ResponsiveTimeRange
            data={data}
            from="2021-04-01"
            to="2021-08-12"
            emptyColor="#eeeeee"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            minValue={300}
            maxValue={100}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            monthLegendOffset={19}
            dayRadius={4}
            dayBorderWidth={2}
            dayBorderColor="#000000"
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
            }
            ]}
        />
    );
}

const HeatedCalendar = () => {
    return (
        <div style={{ width: 600, height: 700 }}>
            <MyResponsiveTimeRange data={data} />
        </div>
    )
}

export default HeatedCalendar