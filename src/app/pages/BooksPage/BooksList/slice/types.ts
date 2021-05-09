import { Author } from '../../../AddBookPage/components/AuthorsAutoComplete/slice/types';

export interface BooksState {
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
