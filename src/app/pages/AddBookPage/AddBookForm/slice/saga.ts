import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import objectToFormData from 'utils/form-data';
import { request } from 'utils/request';
import { addBookActions as actions, addBookActions } from '.';
import { Book } from './types';

export function* addBookSaga(action) {
  try {
    const book: Book = {
      isbn: action.payload.isbn,
      title: action.payload.title,
      authors: action.payload.authors,
      subtitle: action.payload.subtitle,
      originalTitle: action.payload.originalTitle,
      publisher: action.payload.publisher,
      publishedDate: action.payload.publicationDate,
      pageCount: action.payload.pageCount,
      image: action.payload.image,
    };
    console.table(book);
    const formData = objectToFormData(book);
    console.table(Object.fromEntries(formData));
    const options = {
      method: 'POST',
      body: formData,
    };
    yield call(request, BOOK_ENDPOINTS.addBook, options);
    yield put(
      addBookActions.addBookSuccess({
        ...book,
        message: 'Book Added Successfully',
      }),
    );
  } catch (error) {
    if (error.response?.status !== 200) {
      yield put(
        addBookActions.addBookFailed({
          message: 'Adding Book Failed: Please retry',
        }),
      );
    }
  }
}

export function* watchRequestAddBook() {
  yield takeLatest(actions.requestAddBook.type, addBookSaga);
}
