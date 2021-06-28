import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { BasicTooltip } from '@nivo/core'

const data = [
    {
      "value": 49,
      "day": "2018-04-01"
    },
    {
      "value": 287,
      "day": "2018-04-02"
    },
    {
      "value": 399,
      "day": "2018-04-03"
    },
    {
      "value": 117,
      "day": "2018-04-04"
    },
  ];

const MyResponsiveTimeRange = () => {

    const handleClick = (e) => {
        alert('im clicked')
    }

    return (
        <div style={{ height: '250px', width: '1000px', backgroundColor: 'white', border: 'thin solid black', borderRadius: '5px' }}>
            <ResponsiveTimeRange
                data={data}
                from="2021-04-01"
                to="2021-08-12"
                emptyColor="#000000"
                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                minValue='auto'
                maxValue='auto'
                margin={{ top: 40, right: 20, bottom: 40, left: 40 }}
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
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'left-to-right',
                        translateX: 0,
                        translateY: 0,
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