import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { refreshTokenFlow } from 'app/pages/LoginPage/LoginForm/slice/saga';
import {
  getAccessToken,
  getRefreshToken,
} from 'app/services/auth/tokens.service';
import { call, put, take } from 'redux-saga/effects';
import { request } from 'utils/request';
import { userProfileActions } from '.';
import { User } from './types';

function* fetchUserProfile(accessToken) {
  try {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };
    const user: User = yield call(request, USER_ENDPOINTS.profile, options);
    yield put(userProfileActions.fetchProfileSuccess(user));
    return user;
  } catch (error) {
    yield put(
      userProfileActions.fetchProfileFailed({
        message: 'Fetching Profile Failed',
      }),
    );
    return null;
  }
}

export function* userProfileSaga() {
  yield take(userProfileActions.requestUserProfile.type);
  let accessToken = yield call(getAccessToken);
  const user = yield call(fetchUserProfile, accessToken);
  console.log('User', user);
  if (!user) {
    const refreshToken = yield call(getRefreshToken);
    accessToken = yield call(refreshTokenFlow, refreshToken);
    if (accessToken) yield call(fetchUserProfile, accessToken);
  }
}
