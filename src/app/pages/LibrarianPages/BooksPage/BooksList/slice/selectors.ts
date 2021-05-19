import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.books || initialState;

export const selectState = createSelector(
  [selectSlice],
  addBooksFormState => addBooksFormState,
);

export const selectBookByISBN = (isbn: string) => {
  return createSelector([selectSlice], state =>
    state.books.filter(b => b.isbn === isbn),
  );
};
