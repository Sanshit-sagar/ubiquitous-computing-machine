import React from 'react'
// import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

const getRequiredDateFormat = (timeStamp, format = "HH-MM-DD-YYYY") => {
    let date = new Date(timestamp)
    return `${date.getHours()}-${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;  
};

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
                data={dataObj}
                margin={{ top: 25, right: 50, bottom: 50, left: 50 }}
                xScale={{ 
                    type: 'point', 
                    min: 0, 
                    max: 'auto', 
                }}
                yScale={{
                    type: 'linear',
                    stacked: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    legend: 'linear scale',
                }}
                axisBottom={{
                    tickValues=[1,2,4],
                }}
                enableSlices={false}
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
                        symbolBorderColor: 'rgba(0, 0, 0, 0.8)',
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

export default LineChart