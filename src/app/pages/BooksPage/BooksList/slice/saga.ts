import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fetchBooksActions as actions, fetchBooksActions } from '.';

export function* addBookSaga(action) {
  try {
    const options = {
      method: 'GET',
      Headers: { 'Content-Type': 'application/json' },
    };
    const books = yield call(request, BOOK_ENDPOINTS.books, options);
    yield put(
      fetchBooksActions.FetchBookSuccess({
        ...books,
      }),
    );
  } catch (error) {
    if (error.response?.status !== 200) {
      console.log('IIrror');
    }
  }
}

export function* fetchBookRootState() {
  yield takeLatest(actions.requestFetchBook.type, addBookSaga);
}
