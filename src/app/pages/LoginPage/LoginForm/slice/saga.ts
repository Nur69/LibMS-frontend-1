import { AUTH_ENDPOINTS } from 'app/configs/endpoints';
import {
  clearToken,
  getToken,
  setToken,
} from 'app/services/auth/tokens.service';
import { call, cancel, cancelled, put, take } from 'redux-saga/effects';
import { request } from 'utils/request';
import { userActions } from '.';
import { useLogoutActions } from '../../../AuthPage/slice/index';

export function* refreshTokenFlow(refreshToken) {
  try {
    // Try to refresh access token then store the new access token
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { accessToken } = yield call(
      request,
      AUTH_ENDPOINTS.refresh,
      options,
    );
    yield call(setToken, accessToken);

    yield put(userActions.refreshSuccess());
    return accessToken;
  } catch (e) {
    yield call(clearToken);
    yield put(userActions.refreshFailed({ message: 'Session dropped' }));
    return null;
  }
}

function* loginUserSaga(email, password) {
  try {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    };

    const { accessToken } = yield call(request, AUTH_ENDPOINTS.login, options);
    console.log(accessToken);
    yield put(
      userActions.loginSuccess({
        email: email,
        accessToken: accessToken,
      }),
    );

    yield call(setToken, accessToken.token);

    return accessToken;
  } catch (error) {
    yield put(
      userActions.loginFailed({
        message: 'Login Failed: Please check your credentials',
      }),
    );
  } finally {
    if (yield cancelled()) {
      yield call(clearToken);
    }
  }
}

export function* loginFlow() {
  while (true) {
    const loginAction = yield take(userActions.requestLogin.type);
    // fork return a Task object
    const loginTask = yield call(
      loginUserSaga,
      loginAction.payload.email,
      loginAction.payload.password,
    );
    const action = yield take([
      useLogoutActions.logoutSuccess.type,
      userActions.loginFailed.type,
    ]);
    if (action.type === useLogoutActions.logoutSuccess.type) {
      yield cancel(loginTask);
    }
    yield call(clearToken);
  }
}
