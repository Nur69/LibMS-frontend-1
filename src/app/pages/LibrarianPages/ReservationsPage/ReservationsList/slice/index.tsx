import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchReservationsRootState } from './saga';
import { ReservationsState } from './types';

export const initialState: ReservationsState = {
  reservations: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
};

const slice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    requestFetchReservations(state) {
      state.isFetching = true;
    },
    FetchReservationsSuccess(state, action: PayloadAction<any>) {
      state.reservations = action.payload.reservations;
      state.isSuccess = true;
      state.isError = false;
      return state;
    },
  },
});

export const { actions: fetchReservationsActions } = slice;

export const useFetchReservationsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchReservationsRootState });
  return { actions: slice.actions };
};
