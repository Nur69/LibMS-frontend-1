// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { addBookAuthorsActions as actions } from '.';

import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { addBookAuthorsActions as actions } from '.';

export function* fetchAuthorsSaga(action) {
  try {
    const authorsList = yield call(request, BOOK_ENDPOINTS.authors, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + action.payload.accessToken,
      },
    });

    yield put(actions.setAuthors({ authors: authorsList.authors }));
  } catch (error) {
    console.log(error);
  }
}

export function* addBookAuthorsSaga() {
  yield takeLatest(actions.requestAuthors.type, fetchAuthorsSaga);
}
