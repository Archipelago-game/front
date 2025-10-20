import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { getLocalStorage, setLocalStorage } from "./local-storage.ts";

import type { BackendlessUser } from "./backendless-types.ts";
import Backendless from "./backendless-config.ts";

export const api = {
  async getOne(): Promise<FormType> {
    return getLocalStorage();
  },

  async save(data: FormType) {
    setLocalStorage(data);
  },

  /**
   * Get current user information
   */
  async getCurrentUser(userId: string): Promise<BackendlessUser> {
    return (await Backendless.Data.of("Users").findById(
      userId,
    )) as BackendlessUser;
  },
};
