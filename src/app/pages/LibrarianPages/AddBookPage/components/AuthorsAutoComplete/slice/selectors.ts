import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.addBookAuthors || initialState;

export const selectAddBookAuthors = createSelector(
  [selectSlice],
  state => state,
);

export const selectAuthors = createSelector(
  [selectSlice],
  state => state.authorsList,
);
