import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { getToken } from 'app/services/auth/tokens.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { userProfileActions as actions } from '.';
import { User } from './types';

function* fetchUserProfile() {
  try {
    const accessToken = yield call(getToken);
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };
    const user: User = yield call(request, USER_ENDPOINTS.profile, options);
    yield put(actions.fetchProfileSuccess(user));
  } catch (error) {
    yield put(
      actions.fetchProfileFailed({
        message: 'Fetching Profile Failed',
      }),
    );
  }
}

export function* userProfileSaga() {
  yield takeLatest(actions.requestUserProfile.type, fetchUserProfile);
}
