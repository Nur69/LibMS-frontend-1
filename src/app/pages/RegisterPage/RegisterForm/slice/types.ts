export interface RegisterUserState {
  universityID: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  errorMessage: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}
