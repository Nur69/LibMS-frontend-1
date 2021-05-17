import { AUTH_ENDPOINTS } from 'app/configs/endpoints';
import {
  clearToken,
  getToken,
  setToken,
} from 'app/services/auth/tokens.service';
import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { userActions as actions } from '.';

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

    yield put(actions.refreshSuccess());
    return accessToken;
  } catch (e) {
    yield call(clearToken);
    yield put(actions.refreshFailed({ message: 'Session dropped' }));
    return null;
  }
}

function* loginUserSaga(action) {
  try {
    const token = yield call(getToken);
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const { accessToken } = yield call(request, AUTH_ENDPOINTS.login, options);
    yield put(
      actions.loginSuccess({
        email: action.payload.email,
      }),
    );

    yield call(setToken, accessToken.token);
  } catch (error) {
    yield put(
      actions.loginFailed({
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
  yield takeLatest(actions.requestLogin.type, loginUserSaga);
}
