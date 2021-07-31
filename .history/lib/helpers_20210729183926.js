import axios from 'axios'

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function formatDate(date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  const year = date.getFullYear()

  if (month.length < 2)
      month = '0' + month
  if (day.length < 2)
      day = '0' + day

  return `${[year, month, day].join('-')}@${date.getHours()}`
}

export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

export const convertCumulativeToDailyNewStars = (history) => {
    const result = []
    const copied = [...history]
    const reversed = copied.reverse()
    for (let i = 0; i < reversed.length; i++) {
      let increase
      if (i + 1 < reversed.length) {
        increase = reversed[i].starNumber - reversed[i + 1].starNumber
      } else {
        increase = reversed[i].starNumber
      }
      result.push({date: reversed[i].date, starNumber: increase})
    }
    return result.reverse()
}

export const fetcher = (url, data) => {
  axios.post(url, data).then((res) => {
    console.log(`Fetching: ${res}`);
    return res.data;
  });
}
