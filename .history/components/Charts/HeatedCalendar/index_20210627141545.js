import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

const data = [
    {
      day: "2015-07-22",
      value: 284
    },
    {
      day: "2017-11-28",
      value: 219
    },
    {
      day: "2016-10-06",
      value: 12
    }
];

const MyResponsiveCalendar = () => {

    return (
        <ResponsiveCalendar
            data={data}
            from="2015-03-01"
            to="2016-07-12"
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
            <MyResponsiveCalendar data={data} />
        </div>
    )
}

export default HeatedCalendar