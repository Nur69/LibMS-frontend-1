import * as React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { RegisterPage } from '..';
import { Router } from 'react-router-dom';

const renderWithRouter = (component: JSX.Element) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe('<RegisterPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<RegisterPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
