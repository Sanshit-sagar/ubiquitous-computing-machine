import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data, title }) => {
    const dataObj = [
        {
          "id": `${title}`,
          "data": data,
        },
    ]; 

    return (
        <div style={{ height: '400px', width: '750px', backgroundColor: 'white', borderRadius: '5px' }}>
            <ResponsiveLine
                data={dataObj}
                margin={{ top: 25, right: 50, bottom: 50, left: 50 }}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    precision: 'day',
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: 'linear',
                    stacked: boolean('stacked', false),
                }}
                axisLeft={{
                    legend: 'linear scale',
                    legendOffset: 12,
                }}
                axisBottom={{
                    format: '%b %d',
                    tickValues: 'every 2 days',
                    legend: 'time scale',
                    legendOffset: -12,
                }}
                enablePointLabel={true}
                pointSize={16}
                pointBorderWidth={1}
                enableSlices={false}
                curve="monotoneX"
                theme={{
                    axis: { ticks: { text: { fontSize: 14 } } },
                    grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
                }}
                sliceTooltip={({ slice }) => {
                    const date = slice.points[0].data.xFormatted;
                    return (
                    <div>
                        <strong>
                          {`Date: ${getRequiredDateFormat(date, "HH-MM-DD-YYYY")}`}
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
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
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