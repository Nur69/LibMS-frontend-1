/* --- STATE --- */
export interface LoginUserState {
  email: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  accessToken: string;
  refreshToken: string;
}
