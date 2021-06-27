import { fetchAndWait, postAndWait } from './fetchWrapper'

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

export const generateIframeCode = (organization, repository, chartType) => {
  return `
    <iframe width=600 height=400 src="http://repository.surf/${organization}/${repository}/embed?chart=${chartType}"></iframe>
  `.trim()
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

// This function converts a history of cumulative star counts
// to daily increases.
//
// Example:
// history: [{date: "2019-10-25", starNumber: 2},
//           {date: "2019-10-26", starNumber: 3},
//           {date: "2019-10-27", starNumber: 5},
//           {date: "2019-10-28", starNumber: 10}]
//
// output: [{date: "2019-10-25", starNumber: 2},
//          {date: "2019-10-26", starNumber: 1},
//          {date: "2019-10-27", starNumber: 2},
//          {date: "2019-10-28", starNumber: 5}]



// export const updateUserPreferences = (organization, newPreferences) => {
//   const userPreferences = JSON.parse(localStorage.getItem(`repoSurf_${organization}`))
//   const updatedPreferences = {
//     ...userPreferences,
//     ...newPreferences
//   }
//   localStorage.setItem(`repoSurf_${organization}`, JSON.stringify(updatedPreferences))
// }