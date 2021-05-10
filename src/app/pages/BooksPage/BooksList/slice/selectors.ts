import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';
const selectSlice = (state: RootState) => state.books || initialState;

export const selectState = createSelector(
  [selectSlice],
  addBooksFormState => addBooksFormState,
);
