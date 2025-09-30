import type { FormValues } from "../modules/game-form/types/form-values.type.ts";
import { getLocalStorage, setLocalStorage } from "./local-storage.ts";

export const api = {
  async getOne(): Promise<FormValues> {
    return getLocalStorage();
  },

  async save(data: FormValues) {
    setLocalStorage(data);
  },
};
