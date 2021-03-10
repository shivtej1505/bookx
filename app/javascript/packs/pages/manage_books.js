import React from 'react';
import ReactDOM from 'react-dom';

import { PageLayout } from '../../src/common';
import ManageBooks from '../../src/manage_books';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PageLayout>
      <ManageBooks />
    </PageLayout>,
    document.body.appendChild(document.createElement('div')),
  )
})
