import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import * as time from 'd3-time'
// import { timeFormat } from 'd3-time-format'

const LineChart = ({ data, title }) => {
    // const timedData = [];
    // data.forEach((datum) => {
    //     timedData.push({
    //         y: datum.y,
    //         x: time.timeMinute.offset(datum.x, 30),
    //     })
    // });

    const dataObj = [
        {
          "id": 'Cummulative',
          "data": data,
        },
    ]; 

    // const formatTime = timeFormat('%Y %b %d')

    return (
        <div style={{ height: '400px', width: '750px', backgroundColor: 'white', borderRadius: '5px' }}>
            <ResponsiveLine
                margin={{ top: 50, right: 80, bottom: 80, left: 50 }}
                data={dataObj}
                xScale={{ type: 'time', format: 'native' }}
                yScale={{ type: 'linear', max: 100 }}
                axisTop={{
                    format: '%H:%M',
                    tickValues: 'every 4 hours',
                }}
                axisBottom={{
                    format: '%H:%M',
                    tickValues: 'every 4 hours',
                    legend: `yoyoyo`,
                    legendPosition: 'middle',
                    legendOffset: 46,
                }}
                axisRight={{}}
                enablePoints={false}
                enableGridX={true}
                curve="monotoneX"
                animate={false}
                motionStiffness={120}
                motionDamping={50}
                isInteractive={false}
                enableSlices={false}
                useMesh={true}
                theme={{
                    axis: { ticks: { text: { fontSize: 14 } } },
                    grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
                }}
                sliceTooltip={({ slice }) => {
                    const date = slice.points[0].data.xFormatted;
                    return (
                    <div>
                        <strong>
                          {`Date: ${getRequiredDateFormat(date, "YYYY-MM-DD")}`}
                        </strong>
                        {slice.points.map(point => (
                            <div key={point.id}>
                            <strong style={{ color: point.serieColor }}>
                                {`${point.serieId} ${point.data.yFormatted}`}
                            </strong>
                            </div>
                        ))}
                    </div>
                )}}
                tooltipFormat={value => {
                    return value;
                }}
                legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
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