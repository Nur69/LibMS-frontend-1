import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorData } from './types/request-typings';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};
const onResponseError = (err: AxiosError<ErrorData>) => {
  if (err.response) return Promise.reject(err.response.data);
  return Promise.reject(err);
};

instance.interceptors.response.use(onResponseSuccess, onResponseError);

export default instance;
