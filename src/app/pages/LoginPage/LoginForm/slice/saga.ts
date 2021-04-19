import { AUTH_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UserLoggedIn } from 'types/UserLoggedIn';
import { request } from 'utils/request';
import { userActions as actions, userActions } from '.';

// function* doSomething() {}

export function* loginUserSaga(action) {
  try {
    // Saga's way of dispatching actions
    const requestLogin: UserLoggedIn = yield call(
      request,
      AUTH_ENDPOINTS.login,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: action.payload.email,
          password: action.payload.password,
        }),
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
      yield put(userActions.loginFailed({ message: 'Login Failed: Please check your credentials' }));
    }
  }
}

export function* rootLoginUserSaga() {
  yield takeLatest(actions.requestLogin.type, loginUserSaga);
}
