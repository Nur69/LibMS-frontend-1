import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.reservations || initialState;

export const selectReservations = createSelector(
  [selectSlice],
  addReservationsFormState => addReservationsFormState,
);
