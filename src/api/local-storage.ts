import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";

const STORAGE_KEY = "ARCHIPELAGO";

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
