// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { LoginUserState } from 'app/pages/CommonPages/LoginPage/LoginForm/slice/types';
import { LogoutUserState } from 'app/pages/CommonPages/LogoutPage/slice/types';
import { RegisterUserState } from 'app/pages/CommonPages/RegisterPage/RegisterForm/slice/types';
import { UserProfileState } from 'app/pages/CommonPages/UserProfilePage/slice/types';
import { AddBookState } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';
import { AddBookAuthorsState } from 'app/pages/LibrarianPages/AddBookPage/components/AuthorsAutoComplete/slice/types';
import { BooksState } from 'app/pages/LibrarianPages/BooksPage/BooksList/slice/types';
import { AcceptReservationState } from 'app/pages/LibrarianPages/ReservationsPage/components/AcceptButton/slice/types';
import { ReservationsState } from 'app/pages/LibrarianPages/ReservationsPage/ReservationsList/slice/types';
import { DenyReservationState } from 'app/pages/LibrarianPages/ReservationsPage/components/DenyButton/slice/types';
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  loginUser: LoginUserState;
  registerUser: RegisterUserState;
  addBookAuthors: AddBookAuthorsState;
  addBook: AddBookState;
  books: BooksState;
  logoutUser: LogoutUserState;
  userProfile: UserProfileState;
  reservations: ReservationsState;
  acceptReservation: AcceptReservationState;
  denyReservation: DenyReservationState;
}
