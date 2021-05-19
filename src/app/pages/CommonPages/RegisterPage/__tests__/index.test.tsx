import * as React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { RegisterPage } from '..';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

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

describe('<RegisterPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<RegisterPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
