import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { watchRequestAcceptReservation } from './saga';
import { AcceptReservationState } from './types';

export const initialState: AcceptReservationState = {
  id: '',
  returnDate: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const slice = createSlice({
  name: 'acceptReservation',
  initialState,
  reducers: {
    requestAcceptReservation(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    acceptReservationSuccess(state, action: PayloadAction<any>) {
      console.log(action);
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.returnDate = action.payload.returnDate;
    },
    acceptReservationFailed(state) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
    },
  },
});

export const { actions: acceptReservationActions } = slice;

export const useAcceptReservationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: watchRequestAcceptReservation });
  return { acceptReservationActions: slice.actions };
};
