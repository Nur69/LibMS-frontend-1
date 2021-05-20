import { User } from 'app/pages/CommonPages/UserProfilePage/slice/types';
import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export interface Reservation {
  book: Book;
  reservedAt: string;
  user: User;
  reservationStatus: string;
  id: string;
}

export interface ReservationsState {
  reservations: Reservation[];
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
}
