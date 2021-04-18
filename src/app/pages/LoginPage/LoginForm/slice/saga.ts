import { AUTH_ENDPOINTS } from 'app/configs/endpoints';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { UserLoggedIn } from 'types/UserLoggedIn';
import { request } from 'utils/request';
import { userActions as actions, userActions } from '.';

// function* doSomething() {}

export function* loginUserSaga({ email, password }) {
  // yield takeLatest(actions.someAction.type, doSomething);

  try {
    // Saga's way of dispatching actions
    yield put(userActions.requestLogin({}));
    const requestLogin: UserLoggedIn = yield call(
      request,
      AUTH_ENDPOINTS.login,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );
    yield put(
      userActions.loginSuccess({
        refreshToken: requestLogin.refreshToken,
        accesToken: requestLogin.accessToken,
      }),
    );
  } catch (error) {
    if (error.response?.status === 401) {
      yield put(userActions.loginFailed({ message: 'WRONG_CREDENTIALS' }));
    }
  }
}
