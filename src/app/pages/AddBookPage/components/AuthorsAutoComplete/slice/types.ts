/* --- STATE --- */

export interface Author {
  id: string | number;
  fullName: string;
}

export interface AddBookAuthorsState {
  fetchedList: boolean;
  isFetching: boolean;
  authorsList: Author[];
}
