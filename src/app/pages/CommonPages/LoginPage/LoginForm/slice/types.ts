/* --- STATE --- */
export interface LoginUserState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  accessToken: string;
  refreshToken: string;
}
