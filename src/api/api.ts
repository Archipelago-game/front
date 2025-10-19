import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { getLocalStorage, setLocalStorage } from "./local-storage.ts";
import { getUserToken, getUserInfo } from "./token-utils.ts";
import type { BackendlessUser } from "./backendless-types.ts";

export const api = {
  async getOne(): Promise<FormType> {
    return getLocalStorage();
  },

  async save(data: FormType) {
    setLocalStorage(data);
  },

  /**
   * Get user token for API requests
   */
  getUserToken(): string | null {
    return getUserToken();
  },

  /**
   * Get current user information
   */
  getCurrentUser(): BackendlessUser | null {
    return getUserInfo();
  },
};
