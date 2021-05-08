import { AUTH_ENDPOINTS } from 'app/configs/endpoints';
import {
  clearTokens,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'app/services/auth/tokens.service';
import {
  call,
  cancel,
  cancelled,
  delay,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Tokens } from 'types/Tokens';
import { request } from 'utils/request';
import { userActions } from '.';
import { useLogoutActions } from '../../../AuthPage/slice/index';

function* refreshTokenFlow(refreshToken) {
  try {
    // Try to refresh access token then store the new access token
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + refreshToken,
      },
    };
    const accessToken: string = yield call(
      request,
      AUTH_ENDPOINTS.refresh,
      options,
    );

    yield call(setAccessToken, accessToken);

    yield put(userActions.refreshSuccess());
    return accessToken;
  } catch (e) {
    yield call(clearTokens);
    yield put(userActions.refreshFailed(e));
    return null;
  }
}

function* authorizeLoop(refreshToken) {
  while (true) {
    const { accessToken } = yield call(refreshTokenFlow, refreshToken);
    if (accessToken == null) return;
    const decodedAccessToken: JwtPayload = jwt_decode(accessToken);
    if (!decodedAccessToken.exp || !decodedAccessToken.iat) return;
    // Compute remaining time
    yield delay((decodedAccessToken.exp - decodedAccessToken.iat) * 1000);
  }
}

function* authentication() {
  const storedToken = yield call(getRefreshToken);

  // If no tokens found, wait until login successful
  if (!storedToken) yield take(userActions.loginSuccess.type);
  yield fork(authorizeLoop, storedToken);
}

function* loginUserSaga(email, password) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const tokens: Tokens = yield call(request, AUTH_ENDPOINTS.login, options);
    yield put(
      userActions.loginSuccess({
        email: email,
        tokens: tokens,
      }),
    );

    yield call(setAccessToken, tokens.accessToken);
    yield call(setRefreshToken, tokens.refreshToken);

    return tokens;
  } catch (error) {
    yield put(
      userActions.loginFailed({
        message: 'Login Failed: Please check your credentials',
      }),
    );
  } finally {
    if (yield cancelled()) {
      yield call(clearTokens);
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
    const refreshTask = yield fork(authentication);
    // Placeholder for eventual logout functionality
    const action = yield take([
      useLogoutActions.logoutSuccess.type,
      userActions.loginFailed.type,
    ]);
    if (action.type === useLogoutActions.logoutSuccess.type) {
      yield cancel(loginTask);
      yield cancel(refreshTask);
    }
    yield call(clearTokens);
  }
}
