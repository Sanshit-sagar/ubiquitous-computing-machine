import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";

const data = [
    {
      day: "2021-05-22",
      value: 9
    },
    {
      day: "2021-05-23",
      value: 19
    },
    {
      day: "2021-05-24",
      value: 5
    },
    {
        day: "2021-05-25",
        value: 3
    },
];

const MyResponsiveTimeRange = () => {

    return (
        <ResponsiveTimeRange
            data={data}
            from="2021-05-01"
            to="2021-05-31"
            emptyColor="#eeeeee"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
            {
                anchor: "bottom-right",
                direction: "row",
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: "right-to-left"
            }
            ]}
        />
    );
}

const HeatedCalendar = () => {
    return (
        <div style={{ width: 600, height: 700 }}>
            <MyResponsiveTimeRange data={data} />
        </div>
    )
}

export default HeatedCalendar