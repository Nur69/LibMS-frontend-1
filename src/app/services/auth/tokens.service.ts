export function getToken(): string | null {
  let accessToken = localStorage.getItem('accessToken');
  return accessToken;
}

export function setToken(token): void {
  localStorage.setItem('accessToken', token);
}

export function clearToken(): void {
  localStorage.removeItem('accessToken');
}
