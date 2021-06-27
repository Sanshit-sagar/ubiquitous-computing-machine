import React from 'react'
// import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

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

const LineChart = ({ data, title }) => {
    const dataObj = [
        {
          "id": `${title}`,
          "color": "hsl(328, 70%, 50%)",
          "data": data,
        },
    ]; 

    return (
        <div style={{ height: '400px', width: '900px', backgroundColor: 'white', borderRadius: '5px' }}>
            <ResponsiveLine
                data={dataObj}
                margin={{ top: 25, right: 80, bottom: 50, left: 50 }}
                xScale={{ type: 'point', min: 0, max: 'auto', stacked: false, reverse: true }}
                yScale={{
                    type: 'curve',
                    stacked: false
                }}
                // enableGridX={true}
                curve="monotoneX"
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues: 'every two days',
                    legend: 'time scale',
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
                        itemHeight: 50,
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