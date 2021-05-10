import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.userProfile || initialState;

export const selectUserProfile = createSelector([selectSlice], state => state);

export const selectEmail = createSelector(
  [selectSlice],
  userProfileState => userProfileState.email,
);

export const selectIsAuthenticated = createSelector(
  [selectSlice],
  userProfileState => userProfileState.isAuthenticated,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  userProfileState => userProfileState.isFetching,
);

export const selectIsDone = createSelector(
  [selectSlice],
  userProfileState => userProfileState.isDone,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  userProfileState => userProfileState.errorMessage,
);
