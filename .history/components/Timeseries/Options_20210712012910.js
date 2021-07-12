import React, { useState, useEffect, useContext } from 'react'
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
        <Tabs.Panel id="one" label="Tab one">
          {barChart}
        </Tabs.Panel>
        <Tabs.Panel id="two" label="Tab two">
          {lineChart}
        </Tabs.Panel>
        <Tabs.Panel id="three" label="Tab three">
          {mapChart}
        </Tabs.Panel>
      </Tabs>
    );
}

export default OptionsBar 