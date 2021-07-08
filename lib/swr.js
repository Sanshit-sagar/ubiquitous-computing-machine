
import axios from "axios";
import useSWR from "swr";
import { dequal } from "dequal/lite";
import React from "react";

const fetcher = (url, data) => {
  axios.post(url, data).then((res) => {
    console.log(res);
    return res.data;
  })
}

export function useObjectSWR(key, fn, option) {
    const stableKey = React.useRef(key);
    React.useEffect(() => {
      if (!dequal(stableKey.current, key)) stableKey.current = key;
    });
    return useSWR(stableKey.current, fn, option);
}

export default function DayPage({ message }) {
    const { data, error } = useObjectSWR(["/api/v1/day", message], fetcher);
    console.log("data", data);
    return <div>{data}</div>;
}