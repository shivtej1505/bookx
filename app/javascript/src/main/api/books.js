import axios from "axios";
import {BASE_API_URL, DEFAULT_HEADERS} from "../utils/constants";

async function add(data) {
  return axios({
    method: 'post',
    url: `${BASE_API_URL}/books`,
    data: JSON.stringify(data),
    headers: DEFAULT_HEADERS,
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    // TODO: What to do in case of error?
    console.log(error);
  });
}

export { add };
