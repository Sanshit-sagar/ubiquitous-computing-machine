import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { BasicTooltip } from '@nivo/core'

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

    const handleClick = (e) => {
        alert('im clicked')
    }

    return (
        <div style={{ height: '500px', width: '500px', backgroundColor: 'purple', border: 'thin solid black', borderRadius: '5px' }}>
            <ResponsiveTimeRange
                data={data}
                from="2021-04-01"
                to="2021-08-12"
                emptyColor="#e2dd"
                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                minValue='auto'
                maxValue='auto'
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                monthLegendOffset={19}
                dayRadius={4}
                dayBorderWidth={2}
                dayBorderColor="#000000"
                onClick={handleClick}
                direction='horizontal'
                tooltip={({ value, color, coordinates, height, width }) => (
                    <div
                        style={{
                            padding: 12,
                            color,
                            background: '#222222',
                        }}
                    >
                        <span>Look, I'm custom :)</span>
                        <br />
                        <span> {color} </span>
                        <span> {JSON.stringify(coordinates)} </span>
                        <span> {height} </span>
                        <span> {width} </span>
                    </div>
                )}
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
        </div>
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