export interface AddBookState {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isbn10: string;
  title: string;
  authors: Array<{ firstName: string; lastName: string }>;
  subtitle: string;
  originalTitle: string;
  publisher: string;
  publishedDate: string;
  errorMessage: string;
  pageCount: number;
}
