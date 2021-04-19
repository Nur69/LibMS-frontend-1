import * as React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { configureAppStore } from 'store/configureStore';
import { LoginPage } from '..';
import { Provider } from 'react-redux';

const store = configureAppStore();

const renderWithRouter = (component: JSX.Element) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>{' '}
      </Provider>,
    ),
  };
};

describe('<LoginPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<LoginPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
