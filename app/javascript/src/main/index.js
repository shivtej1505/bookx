import React from 'react';

import BookSearch from "./book_search";

function Main() {

  function _headerUi() {
    return (
      <div>
        <h1>BooKX</h1>
        <h4>Meet all intellectual needs</h4>
      </div>
    )
  }

  return (
    <div>
      {_headerUi()}
      <BookSearch />
    </div>
  )
}

export default Main;
