import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { getToken } from 'app/services/auth/tokens.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fetchBooksActions as actions, fetchBooksActions } from '.';

export function* fetchBooksSaga(action) {
  try {
    const options = {
      method: 'GET',
      Headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    };
    const books = yield call(request, BOOK_ENDPOINTS.books, options);
    yield put(
      fetchBooksActions.FetchBooksSuccess({
        ...books,
      }),
    );
  } catch (error) {
    if (error.response?.status !== 200) {
      console.log('IIrror');
    }
  }
}

export function* fetchBooksRootState() {
  yield takeLatest(actions.requestFetchBooks.type, fetchBooksSaga);
}
