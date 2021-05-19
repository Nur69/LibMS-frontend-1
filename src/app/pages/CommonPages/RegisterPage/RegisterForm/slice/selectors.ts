import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.registerUser || initialState;

export const selectUser = createSelector([selectSlice], state => state);

export const selectIsError = createSelector(
  [selectSlice],
  registerUserFormState => registerUserFormState.isError,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  registerUserFormState => registerUserFormState.errorMessage,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  registerUserFormState => registerUserFormState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  registerUserFormState => registerUserFormState.isSuccess,
);
