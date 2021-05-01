/* --- STATE --- */

export interface Author {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface AddBookAuthorsState {
  fetchedList: boolean;
  authorsList: Author[];
  addedBookAuthorsList: Author[];
}
