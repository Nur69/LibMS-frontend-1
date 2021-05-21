import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { denyReservationActions as actions, denyReservationActions } from '.';
import { DenyReservation } from './types';

export function* fetchDenyReservation(action) {
  try {
    const param: DenyReservation = {
      id: action.payload.id,
    };
    const options: AxiosRequestConfig = {
      method: 'POST',
    };
    yield call(
      request,
      `${RESERVATION_ENDPOINTS.denyReservation}/${param.id}`,
      options,
    );
    yield put(
      denyReservationActions.denyReservationSuccess({
        message: 'Reservation rejected!',
      }),
    );
  } catch (error) {
    yield put(denyReservationActions.denyReservationFailed());
  }
}
export function* watchRequestDenyReservation() {
  yield takeLatest(actions.requestDenyReservation.type, fetchDenyReservation);
}

export default function* rootSaga() {
  yield [watchRequestDenyReservation()];
}
