import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { CharactersUtils } from "./local-storage.ts";
import { FirebaseAuthService } from "./firebase-auth-service.ts";
import {
  type CharacterDocument,
  FirebaseCharactersService,
} from "./firebase-characters-service.ts";
import type { FirebaseUserData } from "./firebase-types.ts";

export const api = {
  async getCharacters(userId: string) {
    return await FirebaseCharactersService.getCharacters(userId);
  },

  async addNewCharacter(userId: string) {
    return await FirebaseCharactersService.createCharacter(userId);
  },

  async getCharacterForm(
    userId: string,
    characterId: string,
  ): Promise<CharacterDocument | null> {
    return await FirebaseCharactersService.getCharacter(userId, characterId);
  },

  async saveCharacterForm(userId: string, data: CharacterDocument) {
    await FirebaseCharactersService.saveCharacter(userId, data);
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

  /**
   * Подписаться на изменения персонажей в реальном времени
   */
  subscribeToCharacters(
    userId: string,
    callback: (characters: CharacterDocument[]) => void,
  ) {
    return FirebaseCharactersService.subscribeToCharacters(userId, callback);
  },

  /**
   * Синхронизировать данные при авторизации
   */
  async syncUserData() {
    const currentUser = FirebaseAuthService.getCurrentUser();

    if (currentUser && FirebaseCharactersService.isOnline()) {
      try {
        await FirebaseCharactersService.syncWithLocalStorage(currentUser.uid);
      } catch (error) {
        console.warn("Ошибка синхронизации данных:", error);
      }
    }
  },

  /**
   * Проверить статус подключения
   */
  isOnline(): boolean {
    return FirebaseCharactersService.isOnline();
  },
};
