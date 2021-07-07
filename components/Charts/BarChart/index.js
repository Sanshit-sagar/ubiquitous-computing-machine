import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ sortedData, title, type }) => {

    if(sortedData.length > 5) {
        sortedData = sortedData.split(0, 5);
    }

    let data = [];
    let counter = 0; 
    const colors = [  
        "hsl(231, 70%, 50%)", 
        "hsl(147, 70%, 50%)", 
        "hsl(48, 70%, 50%)", 
        "hsl(259, 70%, 50%)",  
        "hsl(48, 70%, 50%)"
    ];

    sortedData.forEach((datum, index) => {
      data.push({
        id: index,
        label: `${datum[0]}`,
        value: datum[1],
        color: colors[counter],
      })
      ++counter;
    });  

    return (
        <div style = {{ 
                height: '425px', width: '350px', border: 'thin solid transparent', 
                borderRadius: '5px' 
            }}
        >
            <ResponsiveBar
                data={data}
                margin={{ top:60,right: 80,bottom: 60,left:80 }}
                legends={[
                    { 
                        dataFrom: 'indexes', 
                        anchor: 'bottom-right', 
                        direction: 'column', 
                        justify: true 
                    }
                ]}
            />
        </div>
    );
}

export default BarChart