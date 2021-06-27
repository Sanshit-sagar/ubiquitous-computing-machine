import React from 'react'
// import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

// import config from './config'

// const data = [
//     {
//       "id": "7 day",
//       "color": "hsl(328, 70%, 50%)",
//       "data": [
//         {
//           "x": "162442787500",
//           "y": 11
//         },
//         {
//           "x": "162442779100",
//           "y": 15
//         },
//         {
//           "x": "162442784200",
//           "y": 17
//         },
//         {
//           "x": "162442784700",
//           "y": 18
//         },
//         {
//           "x": "1624427848500",
//           "y": 19
//         },
//         {
//           "x": "1624427849349",
//           "y": 20
//         },
//         {
//           "x": "1624427849524",
//           "y": 21
//         }
//       ]
//     },
// ];
const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
        <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
        <circle
            r={size / 5}
            strokeWidth={borderWidth}
            stroke={borderColor}
            fill={color}
            fillOpacity={0.35}
        />
    </g>
)

const LineChart = ({ data }) => {
    const dataObj = [
        {
          "id": "7 day",
          "color": "hsl(328, 70%, 50%)",
          "data": data,
        },
    ]; 

    return (
        <div style={{ height: '400px', width: '900px', backgroundColor: 'white', borderRadius: '5px' }}>
            <ResponsiveLine
                data={dataObj}
                margin={{ top: 25, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: 'point', min: 0, max: 'auto', stacked: false, reverse: true }}
                yScale={{
                    type: 'linear',
                    stacked: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues: 'every two days',
                    legend: 'time scale',
                    // legendOffset: -12,
                }}
                axisLeft={{
                    legend: 'linear scale',
                    legendOffset: 12,
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, 1)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, 1)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
}

export default LineChart