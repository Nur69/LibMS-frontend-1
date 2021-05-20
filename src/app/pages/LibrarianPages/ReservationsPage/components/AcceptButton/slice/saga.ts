import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  acceptReservationActions as actions,
  acceptReservationActions,
} from '.';
import { AcceptReservation } from './types';

export function* addBookSaga(action) {
  try {
    const param: AcceptReservation = {
      id: action.payload.id,
    };
    const options: AxiosRequestConfig = {
      method: 'POST',
      params: 'ae7e2afd-3296-4946-83f7-0479a4871ce1',
    };
    yield call(
      request,
      `${RESERVATION_ENDPOINTS.acceptReservation}/${param.id}`,
      options,
    );
    yield put(
      acceptReservationActions.acceptReservationSuccess({
        message: 'Book added!',
      }),
    );
  } catch (error) {
    yield put(acceptReservationActions.acceptReservationFailed());
  }
}

export function* watchRequestAcceptReservation() {
  yield takeLatest(actions.requestAcceptReservation.type, addBookSaga);
}
