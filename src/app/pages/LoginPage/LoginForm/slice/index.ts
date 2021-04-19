import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { rootLoginUserSaga } from './saga';
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
    // These are actions
    someAction(state, action: PayloadAction<any>) {},
    requestLogin(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        accesToken: string;
        refreshToken: string;
        email: string;
      }>,
    ) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      // Just for testing, they need to be moved to local storage
      state.accessToken = action.payload.accesToken;
      state.refreshToken = action.payload.refreshToken;
      state.email = action.payload.email;
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
  useInjectSaga({ key: slice.name, saga: rootLoginUserSaga });
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
