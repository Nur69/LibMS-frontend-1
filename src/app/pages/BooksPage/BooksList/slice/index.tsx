import { PayloadAction } from '@reduxjs/toolkit';
import { AddBookState } from 'app/pages/AddBookPage/AddBookForm/slice/types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchBookRootState } from './saga';

export const initialState: AddBookState[] = [
  {
    isbn: '',
    title: '',
    subtitle: '',
    originalTitle: '',
    authors: [],
    publishedDate: '',
    image: '',
    pageCount: 0,
    overview: '',
    publisher: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
];

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    requestFetchBook(state) {
      console.log(state);
    },
    FetchBookSuccess(state, action: PayloadAction<any>) {
      state = action.payload.books;
      return state;
    },
  },
});

export const { actions: fetchBooksActions } = slice;

export const useFetchBooksSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchBookRootState });
  return { actions: slice.actions };
};
