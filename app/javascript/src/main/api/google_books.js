import axios from "axios";
import {GOOGLE_BOOKS_API_URL} from "../utils/constants";

function search(query) {
  let cancelTokenSource = axios.CancelToken.source();
  let fields = 'totalItems,items(id,volumeInfo/title,volumeInfo/authors)';
  let request = axios({
      method: 'get',
      url: `${GOOGLE_BOOKS_API_URL}?q=${query}&fields=${fields}`,
      cancelToken: cancelTokenSource.token,
  }).then(({data}) => {
    if (data.totalItems > 0) {
      return data.items;
    } else {
      return [];
    }
  }).catch((error) => {
    // TODO: What to do in case of error?
    console.log(error);
  });

  return {
    request,
    cancel: cancelTokenSource.cancel
  }
}


export { search };
