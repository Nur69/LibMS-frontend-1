const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const SUFFIX = 'api';

export const AUTH_ENDPOINTS = {
  login: `${BASE_URL}/${SUFFIX}/user/auth`,
  refresh: `${BASE_URL}/${SUFFIX}/user/refresh`,
  register: `${BASE_URL}/${SUFFIX}/user`,
};

export const BOOK_ENDPOINTS = {
  addBook: `${BASE_URL}/${SUFFIX}/book`,
};

export const USER_ENDPOINTS = {
  profile: `${BASE_URL}/profile`,
};
