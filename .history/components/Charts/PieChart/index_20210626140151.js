import {ResponsivePie } from '@nivo/pie'

const PieChart = () => {
    const data = [
        {
            "id": "c",
            "label": "c",
            "value": 65,
            "color": "hsl(231, 70%, 50%)"
          },
          {
            "id": "haskell",
            "label": "haskell",
            "value": 13,
            "color": "hsl(147, 70%, 50%)"
          },
          {
            "id": "elixir",
            "label": "elixir",
            "value": 532,
            "color": "hsl(48, 70%, 50%)"
          },
          {
            "id": "css",
            "label": "css",
            "value": 459,
            "color": "hsl(259, 70%, 50%)"
          },
          {
            "id": "stylus",
            "label": "stylus",
            "value": 448,
            "color": "hsl(48, 70%, 50%)"
          }
    ];

    return (
      <div style={{ height: '300px', width: '320px' }}>
      <ResponsivePie
          data={data}
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
          defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
      </div>
    )
}

export default PieChart