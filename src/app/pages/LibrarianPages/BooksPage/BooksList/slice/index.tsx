import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchBooksRootState } from './saga';
import { BooksState } from './types';

export const initialState: BooksState = {
  books: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
};

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    requestFetchBooks(state) {
      state.isFetching = true;
    },
    FetchBooksSuccess(state, action: PayloadAction<any>) {
      state.books = action.payload.books;
      state.isSuccess = true;
      state.isError = false;
      return state;
    },
  },
});

export const { actions: fetchBooksActions } = slice;

export const useFetchBooksSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchBooksRootState });
  return { actions: slice.actions };
};
