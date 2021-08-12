import axios from 'axios'

export const fetcher = (url, data) => {
  axios.post(url, data).then((res) => {
    console.log(`Fetching: ${res}`);
    return res.data;
  });
}
