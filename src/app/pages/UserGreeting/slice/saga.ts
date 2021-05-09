import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { refreshTokenFlow } from 'app/pages/LoginPage/LoginForm/slice/saga';
import { getRefreshToken } from 'app/services/auth/tokens.service';
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
  }
}

export function* userProfileSaga() {
  while (true) {
    yield take(userProfileActions.requestUserProfile.type);
    const refreshToken = getRefreshToken();
    const accessToken = yield call(refreshTokenFlow, refreshToken);
    if (accessToken) {
      yield call(fetchUserProfile, accessToken);
    }
  }
}
