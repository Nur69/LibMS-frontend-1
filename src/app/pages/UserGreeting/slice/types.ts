/* --- STATE --- */
export interface User {
  id: string;
  email: string;
  fullName: string;
  universityID: string;
  isAuthenticated: boolean;
}

export interface UserProfileState extends User {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
