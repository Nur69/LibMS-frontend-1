import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.user || initialState;

export const selectUser = createSelector([selectSlice], state => state);

export const selectIsError = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.isError,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.errorMessage,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.isSuccess,
);

export const selectEmail = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.email,
);
