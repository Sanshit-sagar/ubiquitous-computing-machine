import {ResponsivePie } from '@nivo/pie'

const CustomPieChart = () => {
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
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
        />
    )
}

export default CustomPieChart