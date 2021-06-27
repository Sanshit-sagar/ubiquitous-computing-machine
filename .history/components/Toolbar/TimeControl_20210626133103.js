import React, { useState } from 'react'

import { Button, Windmill } from '@windmill/react-ui'

const options = [
    { id: 0, timeControl: 1, title: '1 Day', key: '1'},
    { id: 1, timeControl: 7, title: '7 Day', key: '2'},
    { id: 2, timeControl: 30, title: '30 Day', key: '3'},
]

const TimeControl = () => {
    const [selected, setSelected] = React.useState(0)

    const handleSelected = (id) => {
        setSelected(id);
    }

    return (
        // <Windmill dark>
            <div className="inline-flex justify-end align-stretch">
                <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden">
                    {options.map(function(value, index) {
                        return (
                            <Button 
                                size="small" 
                                onClick={() => handleSelected(value.id)}
                            >
                                {value.title}
                            </Button>
                        );
                    })}
                </div>
            </div>
        {/* </Windmill> */}
    )
}

export default TimeControl