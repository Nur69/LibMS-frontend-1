import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { loginFlow } from './saga';
import { LoginUserState } from './types';

export const initialState: LoginUserState = {
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  accessToken: '',
  refreshToken: '',
};

const slice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    requestLogin(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    loginSuccess(state, action) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;

      state.email = action.payload.email;
    },
    loginFailed(state, action: PayloadAction<{ message: string }>) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
    refreshSuccess(state) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
    },
    refreshFailed(state, action: PayloadAction<{ message: string }>) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginFlow });
  return { actions: slice.actions };
};
