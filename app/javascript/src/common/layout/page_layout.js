import React from "react";

function PageLayout({children}) {
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
      {children}
    </div>
  )
}

export default PageLayout;
