import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { userProfileActions as actions } from '.';
import { User } from './types';

function* fetchUserProfile() {
  try {
    const user: User = yield call(request.get, USER_ENDPOINTS.profile);
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
