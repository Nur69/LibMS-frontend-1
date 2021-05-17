import { Book } from 'app/pages/AddBookPage/AddBookForm/slice/types';
import { User } from 'app/pages/UserProfilePage/slice/types';

export interface Reservation {
  book: Book;
  reservationDate: string;
  user: User;
  reservationStatus: string;
}

export interface ReservationsState {
  reservations: Reservation[];
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
}
