import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { getToken } from 'app/services/auth/tokens.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import {
  fetchReservationsActions as actions,
  fetchReservationsActions,
} from '.';

export function* fetchReservationsSaga(action) {
  try {
    const accessToken = yield call(getToken);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };
    const reservations = yield call(
      request,
      RESERVATION_ENDPOINTS.reservations,
      options,
    );
    yield put(
      fetchReservationsActions.FetchReservationsSuccess({
        ...reservations,
      }),
    );
  } catch (error) {
    if (error.response?.status !== 200) {
      console.log('Error');
    }
  }
}

export function* fetchReservationsRootState() {
  yield takeLatest(
    actions.requestFetchReservations.type,
    fetchReservationsSaga,
  );
}
