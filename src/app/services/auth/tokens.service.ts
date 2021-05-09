import { Tokens } from 'types/Tokens';

export function getAccessToken(): string {
  let accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
  return accessToken;
}

export function setAccessToken(token): void {
  localStorage.setItem('accessToken', JSON.stringify(token));
}

export function removeAccessToken(): void {
  localStorage.removeItem('accessToken');
}

export function getRefreshToken(): string {
  let refreshToken = JSON.parse(localStorage.getItem('refreshToken') || '');
  return refreshToken;
}

export function setRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', JSON.stringify(token));
}

export function removeRefreshToken(): void {
  localStorage.removeItem('refreshToken');
}

export function getTokens(): Tokens {
  return { accessToken: getAccessToken(), refreshToken: getRefreshToken() };
}

export function clearTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}
