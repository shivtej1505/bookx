import React, {useState} from "react";
import axios from "axios";

function BookSearch() {
  const [books, setBooks] = useState([]);

  let cancelToken;

  // TODO: Move to better place
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  // TODO
  // Only query required fields
  // Only search if char >= 3
  // Only fetching top 10 results. What about other stuff?
  // loading??
  // Show total number of results??
  function onchange(event) {
    console.log(event.target.value);

    if (cancelToken !== undefined) {
      // Remove msg
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();

    let query = event.target.value;

    // TODO: Should we remove empty the books array here?
    if (query === undefined || query.length === 0) {
      return;
    }

    // TODO: Better place
    let fields = 'totalItems,items(id,volumeInfo/title,volumeInfo/authors)';
    axios({
      method: 'get',
      url: `https://www.googleapis.com/books/v1/volumes?q=${query}&fields=${fields}`,
      cancelToken: cancelToken.token,
      headers: defaultHeaders,
    }).then(({data}) => {
      if (data.totalItems > 0) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    }).catch((error) => {
      // TODO: What to do in case of error?
      console.log(error);
    });
  }

  function addBook(book) {
    console.log(book);

    let data = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
    }

    axios({
      method: 'post',
      url: `http://localhost:3000/api/v1/books`,
      data: JSON.stringify(data),
      headers: defaultHeaders,
    }).then((response) => {
      console.log(response);
      console.log("book successfully added");
    }).catch((error) => {
      // TODO: What to do in case of error?
      console.log(error);
    });
  }

  function _emptyResultsUi() {
    return (
      <div>
        <p>No matching results :(</p>
        <p>Try something else</p>
      </div>
    )
  }

  function _resultsTableHeaderUi() {
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Authors</th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }

  function _resultsTableBodyUi() {
    return (
      <tbody>
        {books.map((book, index) => {
          return (
            <tr key={index}>
              <td>{book.volumeInfo.title}</td>
              <td>{book.volumeInfo.authors}</td>
              <td>
                <div>
                  <button onClick={() => addBook(book)}>Add</button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  function _resultsTableUi() {
    if (books.length === 0) {
      return _emptyResultsUi();
    }
    return (
      <table>
        {_resultsTableHeaderUi()}
        {_resultsTableBodyUi()}
      </table>
    )
  }

  return (
    <div>
      Search
      <input onChange={(event) => onchange(event)}/>
      {_resultsTableUi()}
    </div>
  )
}

export default BookSearch;
