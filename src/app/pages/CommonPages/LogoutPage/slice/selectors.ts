import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.logoutUser || initialState;

export const selectLogout = createSelector([selectSlice], state => state);

export const selectIsError = createSelector(
  [selectSlice],
  logoutUserState => logoutUserState.isError,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  logoutUserState => logoutUserState.errorMessage,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  logoutUserState => logoutUserState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  logoutUserState => logoutUserState.isSuccess,
);
