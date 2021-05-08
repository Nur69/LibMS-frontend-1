const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const SUFFIX = 'api';

export const AUTH_ENDPOINTS = {
  login: `${BASE_URL}/${SUFFIX}/user/auth`,
  refresh: `${BASE_URL}/${SUFFIX}/user/refresh`,
  register: `${BASE_URL}/${SUFFIX}/user`,
  profile: `${BASE_URL}/profile`,
};

export const BOOK_ENDPOINTS = {
  addBook: `${BASE_URL}/${SUFFIX}/book`,
};
