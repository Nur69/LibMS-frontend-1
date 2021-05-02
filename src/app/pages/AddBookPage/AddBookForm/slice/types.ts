import { Author } from '../../components/AuthorsAutoComplete/slice/types';

export interface Book {
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publishedDate: string;
  image: string;
  pageCount: number;
  overview?: string;
  publisher: string;
}

export interface AddBookState extends Book {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
