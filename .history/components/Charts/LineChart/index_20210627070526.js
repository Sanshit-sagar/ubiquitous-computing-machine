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
                margin={{ top: 25, right: 50, bottom: 50, left: 50 }}
                xScale={{ type: 'time', format: 'native' }}
                yScale={{
                    type: 'linear',
                    stacked: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: '%H:%M',
                    tickValues: 'every 4 hours',
                    legend: `${formatTime(data[0].x)} ——— ${formatTime(data[data.length].x)}`,
                    legendPosition: 'middle',
                    legendOffset: 0,
                }}
                axisLeft={{
                    legend: 'linear scale',
                }}
                // enableSlices={false}
                curve="monotoneX"
                theme={{
                    axis: { ticks: { text: { fontSize: 14 } } },
                    grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
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