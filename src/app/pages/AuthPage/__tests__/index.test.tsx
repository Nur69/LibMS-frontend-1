import * as React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { AuthPage } from '..';

const renderWithRouter = (component: JSX.Element) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe('<AuthPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<AuthPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
