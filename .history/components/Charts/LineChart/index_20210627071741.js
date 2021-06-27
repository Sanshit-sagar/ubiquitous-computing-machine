import React from 'react'
// import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import * as time from 'd3-time'
import { timeFormat } from 'd3-time-format'

// const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
//     <g>
//         <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
//         <circle
//             r={size / 5}
//             strokeWidth={borderWidth}
//             stroke={borderColor}
//             fill={color}
//             fillOpacity={0.35}
//         />
//     </g>
// )

class LineChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: `${props.title}`,
            color: "hsl(328, 70%, 50%)",
            data: props.data,
        }; 

        this.formatTime = timeFormat('%Y %b %d')
    }

    render() {
        const { id, color, data } = this.state;

        return (
            <div style={{ height: '400px', width: '900px', backgroundColor: 'white', borderRadius: '5px' }}>
                <ResponsiveLine
                    data={data}
                    margin={{ top: 25, right: 50, bottom: 50, left: 50 }}
                    xScale={{ type: 'time', format: 'native' }}
                    yScale={{
                        type: 'linear'
                    }}
                    axisTop={{
                        format: '%H:%M',
                        tickValues: 'every 4 hours',
                    }}
                    enableGridX={true}
                    curve="monotoneX"
                    axisRight={null}
                    axisLeft={{
                        legend: 'linear scale',
                    }}
                    enableSlices={true}
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
                            symbolBorderColor: 'rgba(0, 0, 0, 0.9)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, 0.1)',
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
}

export default LineChart