const tokenStorageKey = "voting-admin-token";

export function setLoginToken (token: string) {
  window.localStorage.setItem(tokenStorageKey, token);
}

export function getLoginToken () {
  return window.localStorage.getItem(tokenStorageKey);
}

export function removeLoginToken() {
  window.localStorage.removeItem(tokenStorageKey);
}