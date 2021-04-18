/* --- STATE --- */
export interface UserState {
  email: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  accessToken: string;
  refreshToken: string;
  password: string;
}
