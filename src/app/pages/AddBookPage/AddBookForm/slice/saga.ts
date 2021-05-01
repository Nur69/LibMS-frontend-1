import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { useAddBookActions as actions, useAddBookActions } from '.';

export function* addBookSaga(action) {
  try {
    console.log('hello');
    yield call(request, BOOK_ENDPOINTS.addBook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isbn10: action.payload.isbn10,
        title: action.payload.title,
        authors: action.payload.authors,
        subtitle: action.payload.subtitle,
        originalTitle: action.payload.originalTitle,
        publisher: action.payload.publisher,
        publishedDate: action.payload.publishedDate,
        pageCount: action.payload.pageCount,
      }),
    });
    yield put(
      useAddBookActions.addBookSuccess({
        isbn10: action.payload.isbn,
        title: action.payload.title,
        authors: action.payload.authors,
        subtitle: action.payload.subtitle,
        originalTitle: action.payload.originalTitle,
        publisher: action.payload.publisher,
        publishedDate: action.payload.publishedDate,
        pageCount: action.payload.pageCount,
      }),
    );
  } catch (error) {
    if (error.response?.status === 409) {
      yield put(
        useAddBookActions.addBookFail({
          message: 'Adding Book Failed: Please retry',
        }),
      );
    }
  }
}

export function* rootAddBookSaga() {
  yield takeLatest(actions.requestAddBook.type, addBookSaga);
}
