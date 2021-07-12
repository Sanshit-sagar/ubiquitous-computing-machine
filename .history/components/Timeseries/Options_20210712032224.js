import React from 'react'
import { Tabs, Button } from '@supabase/ui'

const OptionsBar = ({ bar, line, scatter, toggleFill }) => {

    return (
      <Tabs
        type="underlined"
        size="medium"
        scrollable
        addOnBefore={[
            <Button 
                onClick={toggleFill}
                type="outline"
            >
                Time Period
            </Button>
        ]}
      >
        <Tabs.Panel id="bar" label="Page Views">
          {bar}
        </Tabs.Panel>
        <Tabs.Panel id="line" label="Total Visits">
          {line}
        </Tabs.Panel>
        <Tabs.Panel id="scatter" label="Scatter Plot">
          {scatter}
        </Tabs.Panel>
      </Tabs>
    );
}

export default OptionsBar 