/* --- STATE --- */

export interface Author {
  id: string | number;
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface AddBookAuthorsState {
  fetchedList: boolean;
  authorsList: Author[];
  addedBookAuthorsList: Author[];
}
