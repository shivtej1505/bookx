import axios from "axios";
import {BASE_API_URL, DEFAULT_HEADERS} from "../../main/utils/constants";

async function list() {
  return axios({
    method: 'get',
    url: `${BASE_API_URL}/books`,
    headers: DEFAULT_HEADERS,
  }).then((response) => {
    return response.data;
  });
}

async function add(data) {
  return axios({
    method: 'post',
    url: `${BASE_API_URL}/books`,
    data: JSON.stringify(data),
    headers: DEFAULT_HEADERS,
  }).then((response) => {
    return response.data;
  });
}

async function updateInventory(book_id, inventory) {
  return axios({
    method: 'post',
    url: `${BASE_API_URL}/books`,
    data: JSON.stringify({
      id: book_id,
      inventory: inventory
    }),
    headers: DEFAULT_HEADERS,
  }).then((response) => {
    return response.data;
  });
}

export { add, list, updateInventory };
