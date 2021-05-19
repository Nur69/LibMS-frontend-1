import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.addBook || initialState;

export const selectIsError = createSelector(
  [selectSlice],
  addBookFormState => addBookFormState.isError,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  addBookFormState => addBookFormState.errorMessage,
);

export const selectSuccessMessage = createSelector(
  [selectSlice],
  addBookFormState => addBookFormState.successMessage,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  addBookFormState => addBookFormState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  addBookFormState => addBookFormState.isSuccess,
);

export const selectAuthors = createSelector(
  [selectSlice],
  addBookFormState => addBookFormState.authors,
);
