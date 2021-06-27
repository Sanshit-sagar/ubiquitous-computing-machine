import React from 'react'

import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      "country": "AD",
      "hot dog": 87,
      "hot dogColor": "hsl(98, 70%, 50%)",
      "burger": 120,
      "burgerColor": "hsl(7, 70%, 50%)",
      "sandwich": 88,
      "sandwichColor": "hsl(132, 70%, 50%)",
      "kebab": 17,
      "kebabColor": "hsl(309, 70%, 50%)",
      "fries": 69,
      "friesColor": "hsl(57, 70%, 50%)",
      "donut": 140,
      "donutColor": "hsl(277, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 130,
      "hot dogColor": "hsl(62, 70%, 50%)",
      "burger": 157,
      "burgerColor": "hsl(131, 70%, 50%)",
      "sandwich": 50,
      "sandwichColor": "hsl(3, 70%, 50%)",
      "kebab": 62,
      "kebabColor": "hsl(249, 70%, 50%)",
      "fries": 116,
      "friesColor": "hsl(77, 70%, 50%)",
      "donut": 76,
      "donutColor": "hsl(180, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 91,
      "hot dogColor": "hsl(311, 70%, 50%)",
      "burger": 160,
      "burgerColor": "hsl(120, 70%, 50%)",
      "sandwich": 119,
      "sandwichColor": "hsl(271, 70%, 50%)",
      "kebab": 16,
      "kebabColor": "hsl(277, 70%, 50%)",
      "fries": 110,
      "friesColor": "hsl(30, 70%, 50%)",
      "donut": 57,
      "donutColor": "hsl(360, 70%, 50%)"
    },
]; 

const BarChart = () => {

    return (
        <div style = {{ 
                display: 'flex', flexDirection:'row', alignSelf: 'flex-start', 
                justifyContent: 'stretch', height: '400px', width: '400px', 
                backgroundColor: 'white', border: 'thin solid transparent', 
                borderRadius: '5px' 
            }}
        >
            <ResponsiveBar
                data={data}
                keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
}

export default BarChart