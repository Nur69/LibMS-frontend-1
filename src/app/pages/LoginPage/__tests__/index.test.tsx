import * as React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { LoginPage } from '..';

const renderWithRouter = (component: JSX.Element) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe('<LoginPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<LoginPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
