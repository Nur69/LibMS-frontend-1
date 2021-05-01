import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { addBookAuthorsSaga } from './saga';
import { AddBookAuthorsState } from './types';

export const initialState: AddBookAuthorsState = {
  fetchedList: false,
  authorsList: [],
  addedBookAuthorsList: [],
};

const slice = createSlice({
  name: 'addBookAuthors',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    getAuthors(state, action: PayloadAction<any>) {
      state.fetchedList = true;
    },
  },
});

export const { actions: addBookAuthorsActions } = slice;

export const useAddBookAuthorsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: addBookAuthorsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAddBookAuthorsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
