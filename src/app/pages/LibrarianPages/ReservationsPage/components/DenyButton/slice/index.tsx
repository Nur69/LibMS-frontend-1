import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { watchRequestDenyReservation } from './saga';
import { DenyReservationState } from './types';

export const initialState: DenyReservationState = {
  id: '',
  returnDate: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const slice = createSlice({
  name: 'denyReservation',
  initialState,
  reducers: {
    requestDenyReservation(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    denyReservationSuccess(state, action: PayloadAction<any>) {
      console.log(action);
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.returnDate = action.payload.returnDate;
    },
    denyReservationFailed(state) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
    },
  },
});

export const { actions: denyReservationActions } = slice;

export const useDenyReservationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: watchRequestDenyReservation });
  return { denyReservationActions: slice.actions };
};
