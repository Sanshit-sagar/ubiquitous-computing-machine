

const OptionsBar = () => {

    return (
      <Tabs
        type="underlined"
        size="medium"
        scrollable
        addOnBefore={[<Button type="outline">Action button</Button>]}
      >
        <Tabs.Panel id="one" label="Tab one">
          Bar
        </Tabs.Panel>
        <Tabs.Panel id="two" label="Tab two">
          Line
        </Tabs.Panel>
        <Tabs.Panel id="three" label="Tab three">
          Map
        </Tabs.Panel>
      </Tabs>
    );
}

export default OptionsBar 