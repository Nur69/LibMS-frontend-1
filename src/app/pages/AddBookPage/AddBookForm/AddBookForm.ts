import { Author } from '../components/AuthorsAutoComplete/slice/types';

export interface AddBookForm {
  isbn: string;
  title: string;
  subtitle: string;
  originTitle: string;
  authors: Array<Author>;
  publisher: string;
  publishedDate: string;
}
