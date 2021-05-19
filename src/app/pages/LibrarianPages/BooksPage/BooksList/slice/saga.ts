import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { fetchBooksActions as actions, fetchBooksActions } from '.';

export function* fetchBooksSaga(action) {
  try {
    const books = yield call(request.get, BOOK_ENDPOINTS.books);
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
