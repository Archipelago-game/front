import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";

const STORAGE_KEY = "ARCHIPELAGO";
const USER_TOKEN_KEY = "USER_TOKEN";
const USER_ID_KEY = "USER_ID";

export function getLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  console.log(`local storage by key ${STORAGE_KEY} is empty`);
  return FORM_DEFAULT_VALUES;
}

export function setLocalStorage(data: FormType) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function setTokenLocalStorage(token: string | null) {
  if (!token) {
    localStorage.removeItem(USER_TOKEN_KEY);
  }
  localStorage.setItem(USER_TOKEN_KEY, token || "");
}

export function getTokenLocalStorage() {
  localStorage.getItem(USER_TOKEN_KEY);
}

export function setUserIdLocalStorage(userId: string | null) {
  if (!userId) {
    localStorage.removeItem(USER_ID_KEY);
  }
  localStorage.setItem(USER_ID_KEY, userId || "");
}

export function getUserIdLocalStorage() {
  localStorage.getItem(USER_ID_KEY);
}
