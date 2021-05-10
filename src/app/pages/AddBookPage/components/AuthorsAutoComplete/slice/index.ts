import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { addBookAuthorsSaga } from './saga';
import { AddBookAuthorsState, Author } from './types';

export const initialState: AddBookAuthorsState = {
  fetchedList: false,
  isFetching: false,
  authorsList: [],
};

const slice = createSlice({
  name: 'addBookAuthors',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    requestAuthors(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    requestAuthorsSuccess(state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.fetchedList = true;
    },
    requestAuthorsFailed(state, action: PayloadAction<any>) {},
    setAuthors(state, action: PayloadAction<{ authors: Author[] }>) {
      return {
        ...state,
        authorsList: action.payload.authors,
      };
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
