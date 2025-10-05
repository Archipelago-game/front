import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { getLocalStorage, setLocalStorage } from "./local-storage.ts";

export const api = {
  async getOne(): Promise<FormType> {
    return getLocalStorage();
  },

  async save(data: FormType) {
    setLocalStorage(data);
  },
};
