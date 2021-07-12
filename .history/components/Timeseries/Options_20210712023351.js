import React from 'react'
import { Tabs, Button } from '@supabase/ui'

const OptionsBar = ({ barChart, lineChart, mapChart }) => {

    return (
      <Tabs
        type="underlined"
        size="medium"
        scrollable
        addOnBefore={[
            <Button type="outline">
                Action
            </Button>
        ]}
      >
        <Tabs.Panel id="one" label="Pageviews">
          {barChart}
        </Tabs.Panel>
        <Tabs.Panel id="two" label="Total Visits">
          {lineChart}
        </Tabs.Panel>
        <Tabs.Panel id="three" label="Scatter Plot">
          {mapChart}
        </Tabs.Panel>
      </Tabs>
    );
}

export default OptionsBar 