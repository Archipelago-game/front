import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";
import type { FormValues } from "../modules/game-form/types/form-values.type.ts";

const STORAGE_KEY = "ARCHIPELAGO";

export function getLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  console.log(`local storage by key ${STORAGE_KEY} is empty`);
  return FORM_DEFAULT_VALUES;
}

export function setLocalStorage(data: FormValues) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
