import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { loginUserSaga } from './saga';
import { UserState } from './types';

export const initialState: UserState = {
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  accessToken: '',
  refreshToken: '',
  // This a bad practice, credentials should not be in the store
  // I'm just doing this for the sake of using redux-toolkit
  password: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // These are actions
    someAction(state, action: PayloadAction<any>) {},
    requestLogin(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ accesToken: string; refreshToken: string }>,
    ) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      // Just for testing, they need to be moved to local storage
      state.accessToken = action.payload.accesToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loginFailed(state, action: PayloadAction<{ message: string }>) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

// Export actions

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginUserSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
