import {ResponsivePie } from '@nivo/pie'

// id, label, value, color

const PieChart = ({ sortedData, title }) => {
    const colors = [  
      "hsl(231, 70%, 50%)", 
      "hsl(147, 70%, 50%)", 
      "hsl(48, 70%, 50%)", 
      "hsl(259, 70%, 50%)",  
      "hsl(48, 70%, 50%)"
    ];
  

    let data = [];
    let counter = 0; 

    sortedData.forEach((datum) => {
      data.push({
        id: `${datum[0]}`,
        label: `${datum[0].substring(0, 10)}`,
        value: datum[1],
        color: colors[counter],
      })
      ++counter;
    }); 

    return (
      <div style = {{ height: '425px', width: '450px', border: 'thin solid transparent', borderRadius: '5px' }}>
        <ResponsivePie
            data={data}
            margin={{ top: 10, right: 80, bottom: 80, left: 70 }}
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