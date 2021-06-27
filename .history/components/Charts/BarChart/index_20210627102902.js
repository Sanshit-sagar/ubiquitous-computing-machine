import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ sortedData, title, type }) => {
    // let dataKeys = [];
    // sortedData.map(function(value, index) {
    //     dataKeys.push(value.id)
    // }); 

    let data = {
        id: `${title}`,
        data: sortedData,
    }; 

    return (
        <div style = {{ 
                height: '300px', width: '300px', border: 'thin solid transparent', 
                borderRadius: '5px' 
            }}
        >
                <ResponsiveBar
                    data={data}
                    legends={[
                        {
                            dataFrom: 'indexes',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false
                        }
                    ]}
                />
        </div>
    );
}

export default BarChart