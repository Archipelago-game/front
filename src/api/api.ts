import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { CharactersUtils } from "./local-storage.ts";

import type { BackendlessUser } from "./backendless-types.ts";
import Backendless from "./backendless-config.ts";

export const api = {
  async getCharacterForm(index: number): Promise<FormType> {
    return CharactersUtils.getCharacterForm(index);
  },

  async saveCharacterForm(index: number, data: FormType) {
    CharactersUtils.setCharacterForm(index, data);
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
