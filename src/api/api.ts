import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { CharactersUtils } from "./local-storage.ts";
import { FirebaseAuthService } from "./firebase-auth-service.ts";
import type { FirebaseUserData } from "./firebase-types.ts";

export const api = {
  async getCharacters() {
    return CharactersUtils.getCharacters();
  },

  async addNewCharacter() {
    CharactersUtils.setNewCharacterForm();
  },

  async getCharacterForm(index: number): Promise<FormType> {
    return CharactersUtils.getCharacterForm(index);
  },

  async saveCharacterForm(index: number, data: FormType) {
    CharactersUtils.setCharacterForm(index, data);
  },

  /**
   * Get current user information
   */
  async getCurrentUser(userId: string): Promise<FirebaseUserData | null> {
    try {
      const userData = await FirebaseAuthService.getUserData(userId);
      if (userData) {
        return {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          emailVerified: userData.emailVerified,
        };
      }
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
};
