// Utilities for working with authorization token
import type { BackendlessUser } from "./backendless-types";

const TOKEN_KEY = "backendless_user_token";
const USER_ID_KEY = "backendless_user_uid";

/**
 * Save user token to localStorage
 */
export function saveUserToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove user token from localStorage
 */
export function removeUserToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveUserId(userId: string): void {
  localStorage.setItem(USER_ID_KEY, userId);
}

export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function removeUserId(): void {
  localStorage.removeItem(USER_ID_KEY);
}
/**
 * Get user token from localStorage
 */
export function getUserToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Check if user token exists
 */
export function hasUserToken(): boolean {
  return getUserToken() !== null;
}

/**
 * Get user information from localStorage (if saved)
 */
export function getUserInfo(): BackendlessUser | null {
  const userInfo = localStorage.getItem("backendless_user_info");
  if (userInfo) {
    try {
      return JSON.parse(userInfo);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Save user information to localStorage
 */
export function saveUserInfo(user: BackendlessUser): void {
  localStorage.setItem("backendless_user_info", JSON.stringify(user));
}

/**
 * Remove user information from localStorage
 */
export function removeUserInfo(): void {
  localStorage.removeItem("backendless_user_info");
}
