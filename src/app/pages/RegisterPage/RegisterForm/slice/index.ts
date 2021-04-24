import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { RegisterUserState } from './types';
import { rootRegisterUserSaga } from './saga';

export const initialState: RegisterUserState = {
  email: '',
  password: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  firstName: '',
  lastName: '',
  universityID: 0,
};

const slice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    requestRegister(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    registerSuccess(
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        universityID: number;
      }>,
    ) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.universityID = action.payload.universityID;
    },
    registerFail(state, action: PayloadAction<any>) {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: useRegistrationActions } = slice;

export const useRegistrationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: rootRegisterUserSaga });
  return { actions: slice.actions };
};
