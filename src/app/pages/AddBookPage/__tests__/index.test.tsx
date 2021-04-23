import * as React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AddBookPage } from '..';
import { Router } from 'react-router-dom';

const renderWithRouter = (component: JSX.Element) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe('<AddBookPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<AddBookPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
