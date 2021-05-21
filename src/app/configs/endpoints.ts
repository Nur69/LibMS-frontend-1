const API_PREFIX = 'api';

export const AUTH_ENDPOINTS = {
  login: `${API_PREFIX}/user/auth`,
  refresh: `${API_PREFIX}/user/refresh`,
  register: `${API_PREFIX}/user`,
};

export const BOOK_ENDPOINTS = {
  addBook: `${API_PREFIX}/book`,
  books: `${API_PREFIX}/books`,
  authors: `${API_PREFIX}/book/authors`,
};

export const USER_ENDPOINTS = {
  profile: `${API_PREFIX}/user/@me`,
};

export const RESERVATION_ENDPOINTS = {
  reservations: `${API_PREFIX}/reservation/reservations`,
  acceptReservation: `${API_PREFIX}/reservation/accept-reservation`,
  denyReservation: `${API_PREFIX}/reservation/deny-reservation`,
};

export const ASSETS_ENDPOINTS = {
  images: `${process.env.REACT_APP_BACKEND_URL}/upload/images`,
};
