import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { watchUserLogout } from './saga';

export const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const slice = createSlice({
  name: 'logoutUser',
  initialState,
  reducers: {
    requestLogout(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    logoutSuccess(state) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
    },
    logoutFailed(state, action: PayloadAction<any>) {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: useLogoutActions } = slice;

export const useLogoutSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: watchUserLogout });
  return { actions: slice.actions };
};
