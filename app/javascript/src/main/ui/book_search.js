import React, {useState, useEffect} from "react";

import { googleBookSearchApi } from '../api';
import { addBookApi, listBookApi } from '../../common/api'

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  let previousRequestCancelCallback;

  useEffect(() => {
    listBookApi().then(data => {
      console.log(data);
      setAvailableBooks(data);
    })
  }, []);

  function setBooksWithAvailability(bookResult) {
    let booksWithAvailability = [];
    let availableBookIds = availableBooks.map(({google_id}) => google_id );
    bookResult.map((bookResult) => {
      booksWithAvailability.push({...bookResult, isAvailable: availableBookIds.includes(bookResult.id)})
    })
    setBooks(booksWithAvailability);
  }


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
      setBooksWithAvailability(bookResults);
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
          <th>Available?</th>
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
                  <button onClick={() => addBook(book)} disabled={book.isAvailable} >Add</button>
                </div>
              </td>
              <td>{ book.isAvailable ? 'Yes': 'No' }</td>
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
