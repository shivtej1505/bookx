import React from 'react'
import ReactDOM from 'react-dom'

function AllBooks() {
  return (
    <div>
      All Books
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AllBooks />,
    document.body.appendChild(document.createElement('div')),
  )
})
