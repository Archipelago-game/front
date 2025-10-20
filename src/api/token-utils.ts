// note Utilities for working with authorization token

const TOKEN_KEY = "backendless_user_token";
const USER_ID_KEY = "backendless_user_uid";

export const AuthUtils = {
  saveUserId(userId: string): void {
    localStorage.setItem(USER_ID_KEY, userId);
  },

  getUserId() {
    return localStorage.getItem(USER_ID_KEY);
  },

  removeUserId(): void {
    localStorage.removeItem(USER_ID_KEY);
  },

  saveUserToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getUserToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeUserToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};
