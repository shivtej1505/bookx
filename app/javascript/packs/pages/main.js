import React from 'react';
import ReactDOM from 'react-dom';

import { PageLayout } from '../../src/common';
import Main from '../../src/main';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PageLayout>
      <Main />
    </PageLayout>,
    document.body.appendChild(document.createElement('div')),
  )
})
