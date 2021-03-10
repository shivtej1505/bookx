import React, {useEffect, useState} from "react";
import {listBookApi, updateBookInventoryApi} from "../common/api";

function ManageBooks() {
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
  }, []);

  function fetchBooks() {
    listBookApi().then(data => {
      setAvailableBooks(data);
    })
  }

  function updateInventory(book_id, inventory) {
    updateBookInventoryApi(book_id, inventory)
      .then(() => {
        fetchBooks();
    });
  }

  function addInventory(book_id, inventory) {
    updateInventory(book_id, inventory + 1);
  }

  function removeInventory(book_id, inventory) {
    if (inventory > 0) {
      updateInventory(book_id, inventory - 1);
    }
  }

  function _emptyTableUi() {
    return (
      <div>
        <p>No books</p>
      </div>
    )
  }

  function _booksTableHeaderUi() {
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Inventory</th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }

  function _booksTableBodyUi() {
    return (
      <tbody>
        {availableBooks.map((book, index) => {
          return (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.inventory}</td>
              <td>
                <div>
                  <button onClick={() => addInventory(book.id, book.inventory)} >Add Copy</button>
                  <button onClick={() => removeInventory(book.id, book.inventory)} >Remove Copy</button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  function _booksTableUi() {
    if (availableBooks.length === 0) {
      return _emptyTableUi();
    }
    return (
      <table>
        {_booksTableBodyUi()}
        {_booksTableHeaderUi()}
      </table>
    )
  }

  return (
    <div>
      Manage Books
      {_booksTableUi()}
    </div>
  )
}

export default ManageBooks;
