import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { BasicTooltip } from '@nivo/core'

const data = [
    {
      "value": 49,
      "day": "2018-04-01"
    },
    {
      "value": 287,
      "day": "2018-04-02"
    },
    {
      "value": 399,
      "day": "2018-04-03"
    },
    {
      "value": 117,
      "day": "2018-04-04"
    },
    {
      "value": 229,
      "day": "2018-04-05"
    },
    {
      "value": 140,
      "day": "2018-04-06"
    },
    {
      "value": 129,
      "day": "2018-04-07"
    },
    {
      "value": 27,
      "day": "2018-04-08"
    },
    {
      "value": 357,
      "day": "2018-04-09"
    },
    {
      "value": 25,
      "day": "2018-04-10"
    },
    {
      "value": 258,
      "day": "2018-04-11"
    },
    {
      "value": 307,
      "day": "2018-04-12"
    },
    {
      "value": 108,
      "day": "2018-04-13"
    },
    {
      "value": 390,
      "day": "2018-04-14"
    },
    {
      "value": 34,
      "day": "2018-04-15"
    },
    {
      "value": 237,
      "day": "2018-04-16"
    },
    {
      "value": 364,
      "day": "2018-04-17"
    },
    {
      "value": 205,
      "day": "2018-04-18"
    },
    {
      "value": 278,
      "day": "2018-04-19"
    },
    {
      "value": 349,
      "day": "2018-04-20"
    },
    {
      "value": 136,
      "day": "2018-04-21"
    },
    {
      "value": 152,
      "day": "2018-04-22"
    },
    {
      "value": 370,
      "day": "2018-04-23"
    },
    {
      "value": 168,
      "day": "2018-04-24"
    },
    {
      "value": 212,
      "day": "2018-04-25"
    },
    {
      "value": 306,
      "day": "2018-04-26"
    },
    {
      "value": 19,
      "day": "2018-04-27"
    },
    {
      "value": 302,
      "day": "2018-04-28"
    },
    {
      "value": 350,
      "day": "2018-04-29"
    },
    {
      "value": 146,
      "day": "2018-04-30"
    },
    {
      "value": 252,
      "day": "2018-05-01"
    },
    {
      "value": 391,
      "day": "2018-05-02"
    },
    {
      "value": 97,
      "day": "2018-05-03"
    },
    {
      "value": 298,
      "day": "2018-05-04"
    },
    {
      "value": 125,
      "day": "2018-05-05"
    },
    {
      "value": 100,
      "day": "2018-05-06"
    },
    {
      "value": 172,
      "day": "2018-05-07"
    },
    {
      "value": 63,
      "day": "2018-05-08"
    },
    {
      "value": 271,
      "day": "2018-05-09"
    },
    {
      "value": 110,
      "day": "2018-05-10"
    },
    {
      "value": 40,
      "day": "2018-05-11"
    },
    {
      "value": 175,
      "day": "2018-05-12"
    },
    {
      "value": 143,
      "day": "2018-05-13"
    },
    {
      "value": 332,
      "day": "2018-05-14"
    },
    {
      "value": 91,
      "day": "2018-05-15"
    },
    {
      "value": 178,
      "day": "2018-05-16"
    },
    {
      "value": 193,
      "day": "2018-05-17"
    },
    {
      "value": 193,
      "day": "2018-05-18"
    },
    {
      "value": 343,
      "day": "2018-05-19"
    },
    {
      "value": 3,
      "day": "2018-05-20"
    },
    {
      "value": 388,
      "day": "2018-05-21"
    },
    {
      "value": 275,
      "day": "2018-05-22"
    },
    {
      "value": 41,
      "day": "2018-05-23"
    },
    {
      "value": 249,
      "day": "2018-05-24"
    },
    {
      "value": 157,
      "day": "2018-05-25"
    },
    {
      "value": 28,
      "day": "2018-05-26"
    },
    {
      "value": 91,
      "day": "2018-05-27"
    },
    {
      "value": 44,
      "day": "2018-05-28"
    },
    {
      "value": 9,
      "day": "2018-05-29"
    },
    {
      "value": 107,
      "day": "2018-05-30"
    },
    {
      "value": 99,
      "day": "2018-05-31"
    },
    {
      "value": 159,
      "day": "2018-06-01"
    },
    {
      "value": 258,
      "day": "2018-06-02"
    },
    {
      "value": 327,
      "day": "2018-06-03"
    },
    {
      "value": 70,
      "day": "2018-06-04"
    },
    {
      "value": 215,
      "day": "2018-06-05"
    },
    {
      "value": 190,
      "day": "2018-06-06"
    },
    {
      "value": 132,
      "day": "2018-06-07"
    },
    {
      "value": 164,
      "day": "2018-06-08"
    },
    {
      "value": 246,
      "day": "2018-06-09"
    },
    {
      "value": 140,
      "day": "2018-06-10"
    },
    {
      "value": 317,
      "day": "2018-06-11"
    },
    {
      "value": 296,
      "day": "2018-06-12"
    },
    {
      "value": 232,
      "day": "2018-06-13"
    },
    {
      "value": 179,
      "day": "2018-06-14"
    },
    {
      "value": 8,
      "day": "2018-06-15"
    },
    {
      "value": 187,
      "day": "2018-06-16"
    },
    {
      "value": 323,
      "day": "2018-06-17"
    },
    {
      "value": 336,
      "day": "2018-06-18"
    },
    {
      "value": 143,
      "day": "2018-06-19"
    },
    {
      "value": 282,
      "day": "2018-06-20"
    },
    {
      "value": 150,
      "day": "2018-06-21"
    },
    {
      "value": 140,
      "day": "2018-06-22"
    },
    {
      "value": 366,
      "day": "2018-06-23"
    },
    {
      "value": 341,
      "day": "2018-06-24"
    },
    {
      "value": 15,
      "day": "2018-06-25"
    },
    {
      "value": 134,
      "day": "2018-06-26"
    },
    {
      "value": 321,
      "day": "2018-06-27"
    },
    {
      "value": 137,
      "day": "2018-06-28"
    },
    {
      "value": 347,
      "day": "2018-06-29"
    },
    {
      "value": 149,
      "day": "2018-06-30"
    },
    {
      "value": 263,
      "day": "2018-07-01"
    },
    {
      "value": 156,
      "day": "2018-07-02"
    },
    {
      "value": 39,
      "day": "2018-07-03"
    },
    {
      "value": 382,
      "day": "2018-07-04"
    },
    {
      "value": 92,
      "day": "2018-07-05"
    },
    {
      "value": 246,
      "day": "2018-07-06"
    },
    {
      "value": 337,
      "day": "2018-07-07"
    },
    {
      "value": 54,
      "day": "2018-07-08"
    },
    {
      "value": 260,
      "day": "2018-07-09"
    },
    {
      "value": 60,
      "day": "2018-07-10"
    },
    {
      "value": 80,
      "day": "2018-07-11"
    },
    {
      "value": 208,
      "day": "2018-07-12"
    },
    {
      "value": 399,
      "day": "2018-07-13"
    },
    {
      "value": 272,
      "day": "2018-07-14"
    },
    {
      "value": 393,
      "day": "2018-07-15"
    },
    {
      "value": 349,
      "day": "2018-07-16"
    },
    {
      "value": 226,
      "day": "2018-07-17"
    },
    {
      "value": 41,
      "day": "2018-07-18"
    },
    {
      "value": 242,
      "day": "2018-07-19"
    },
    {
      "value": 84,
      "day": "2018-07-20"
    },
    {
      "value": 30,
      "day": "2018-07-21"
    },
    {
      "value": 347,
      "day": "2018-07-22"
    },
    {
      "value": 275,
      "day": "2018-07-23"
    },
    {
      "value": 195,
      "day": "2018-07-24"
    },
    {
      "value": 40,
      "day": "2018-07-25"
    },
    {
      "value": 391,
      "day": "2018-07-26"
    },
    {
      "value": 319,
      "day": "2018-07-27"
    },
    {
      "value": 132,
      "day": "2018-07-28"
    },
    {
      "value": 31,
      "day": "2018-07-29"
    },
    {
      "value": 60,
      "day": "2018-07-30"
    },
    {
      "value": 149,
      "day": "2018-07-31"
    },
    {
      "value": 353,
      "day": "2018-08-01"
    },
    {
      "value": 247,
      "day": "2018-08-02"
    },
    {
      "value": 17,
      "day": "2018-08-03"
    },
    {
      "value": 128,
      "day": "2018-08-04"
    },
    {
      "value": 187,
      "day": "2018-08-05"
    },
    {
      "value": 47,
      "day": "2018-08-06"
    },
    {
      "value": 5,
      "day": "2018-08-07"
    },
    {
      "value": 111,
      "day": "2018-08-08"
    },
    {
      "value": 161,
      "day": "2018-08-09"
    },
    {
      "value": 54,
      "day": "2018-08-10"
    },
    {
      "value": 96,
      "day": "2018-08-11"
    }
  ];

const MyResponsiveTimeRange = () => {

    const handleClick = (e) => {
        alert('im clicked')
    }

    return (
        <div style={{ height: '250px', width: '1000px', backgroundColor: 'white', border: 'thin solid black', borderRadius: '5px' }}>
            <ResponsiveTimeRange
                data={data}
                from="2021-04-01"
                to="2021-08-12"
                emptyColor="#ffffff"
                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                minValue='auto'
                maxValue='auto'
                margin={{ top: 40, right: 20, bottom: 40, left: 40 }}
                monthLegendOffset={19}
                dayRadius={4}
                dayBorderWidth={2}
                dayBorderColor="#000000"
                onClick={handleClick}
                direction='horizontal'
                tooltip={({ value, color, coordinates, height, width }) => (
                    <div
                        style={{
                            padding: 12,
                            color,
                            background: '#222222',
                        }}
                    >
                        <span>Look, I'm custom :)</span>
                        <br />
                        <span> {color} </span>
                        <span> {JSON.stringify(coordinates)} </span>
                        <span> {height} </span>
                        <span> {width} </span>
                    </div>
                )}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        justify: false,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                        translateX: -85,
                        translateY: -240,
                        symbolSize: 20
                    }
                ]}
            />
        </div>
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