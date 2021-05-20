import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.reservations || initialState;

export const selectReservations = createSelector(
  [selectSlice],
  addReservationsFormState => addReservationsFormState,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  addReservationsFormState => addReservationsFormState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  addReservationsFormState => addReservationsFormState.isSuccess,
);

export const selectIsError = createSelector(
  [selectSlice],
  addReservationsFormState => addReservationsFormState.isError,
);
