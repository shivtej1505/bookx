import React, {useState} from "react";

import { googleBookSearchApi, addBookApi } from '../api';

function BookSearch() {
  const [books, setBooks] = useState([]);
  let previousRequestCancelCallback;

  async function onchange(event) {
    if (previousRequestCancelCallback !== undefined) {
      previousRequestCancelCallback();
    }

    let query = event.target.value;
    let { request: searchRequest, cancel } = googleBookSearchApi(query);
    previousRequestCancelCallback = cancel;

    if (query === undefined || query.length === 0) {
      setBooks([])
    }

    let bookResults = await searchRequest;
    if (bookResults && typeof bookResults === typeof []) {
      setBooks(bookResults);
    }
  }

  function addBook(book) {
    let data = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
    }

    addBookApi(data)
      .then(() => {
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
