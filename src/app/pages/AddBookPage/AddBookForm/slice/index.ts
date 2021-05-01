import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { rootAddBookSaga } from './saga';
import { AddBookState } from './types';

export const initialState: AddBookState = {
  isFetching: false,
  isError: false,
  isSuccess: false,
  isbn10: '',
  title: '',
  authors: [],
  subtitle: '',
  originalTitle: '',
  publisher: '',
  publishedDate: '',
  errorMessage: '',
  pageCount: 0,
};

const slice = createSlice({
  name: 'addBook',
  initialState,
  reducers: {
    requestAddBook(state, action: PayloadAction<any>) {
      state.isFetching = true;
      console.log('hello');
    },
    addBookSuccess(
      state,
      action: PayloadAction<{
        isbn10: string;
        title: string;
        authors: Array<{ firstName: string; lastName: string }>;
        subtitle: string;
        originalTitle: string;
        publisher: string;
        publishedDate: string;
        pageCount: number;
      }>,
    ) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.isbn10 = action.payload.isbn10;
      state.title = action.payload.title;
      state.authors = action.payload.authors;
      state.subtitle = action.payload.subtitle;
      state.originalTitle = action.payload.originalTitle;
      state.publisher = action.payload.publisher;
      state.publishedDate = action.payload.publishedDate;
      state.pageCount = action.payload.pageCount;
    },
    addBookFail(state, action: PayloadAction<any>) {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: useAddBookActions } = slice;
export const useAddBookSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: rootAddBookSaga });
  return { actions: slice.actions };
};
