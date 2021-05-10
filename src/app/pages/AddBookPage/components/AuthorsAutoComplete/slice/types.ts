/* --- STATE --- */

export interface Author {
  id: string | number;
  name: string;
}

export interface AddBookAuthorsState {
  fetchedList: boolean;
  isFetching: boolean;
  authorsList: Author[];
}
