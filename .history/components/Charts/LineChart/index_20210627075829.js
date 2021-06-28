import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data, title }) => {
    const dataObj = [
        {
          "id": `${title}`,
          "color": "hsl(328, 70%, 50%)",
          "data": data,
        },
    ]; 

    return (
        <div style={{ height: '400px', width: '750px', backgroundColor: 'white', borderRadius: '5px' }}>
            <ResponsiveLine
                data={[
                    {
                        id: "LineOne",
                        data: [
                            { x: "2019-05-01", y: 2 },
                            { x: "2019-06-01", y: 7 },
                            { x: "2020-03-01", y: 1 }
                        ]
                    }
                ]}
                margin={{ top: 25, right: 50, bottom: 50, left: 50 }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false
                }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d"
                }}
                xFormat="time:%Y-%m-%d"
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    legend: 'linear scale',
                }}
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
                axisBottom={{
                    format: "%b %d",
                    //tickValues: "every 2 days",
                    // tickRotation: -90,
                    legend: "time scale",
                    legendOffset: -12
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