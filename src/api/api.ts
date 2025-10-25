import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { CharactersUtils } from "./local-storage.ts";
import { FirebaseAuthService } from "./firebase-auth-service.ts";
import { FirebaseCharactersService } from "./firebase-characters-service.ts";
import type { FirebaseUserData } from "./firebase-types.ts";

export const api = {
  async getCharacters() {
    const currentUser = FirebaseAuthService.getCurrentUser();

    if (currentUser && FirebaseCharactersService.isOnline()) {
      try {
        // Сначала синхронизируем данные
        await FirebaseCharactersService.syncWithLocalStorage(currentUser.uid);
        return await FirebaseCharactersService.getCharacters(currentUser.uid);
      } catch (error) {
        console.warn(
          "Ошибка загрузки из Firebase, используем localStorage:",
          error,
        );
        return CharactersUtils.getCharacters();
      }
    }

    return CharactersUtils.getCharacters();
  },

  async addNewCharacter() {
    const currentUser = FirebaseAuthService.getCurrentUser();

    if (currentUser && FirebaseCharactersService.isOnline()) {
      try {
        return await FirebaseCharactersService.createCharacter(currentUser.uid);
      } catch (error) {
        console.warn(
          "Ошибка создания персонажа в Firebase, используем localStorage:",
          error,
        );
        CharactersUtils.setNewCharacterForm();
        return CharactersUtils.getCharacters().length - 1;
      }
    }

    CharactersUtils.setNewCharacterForm();
    return CharactersUtils.getCharacters().length - 1;
  },

  async getCharacterForm(index: number): Promise<FormType> {
    const currentUser = FirebaseAuthService.getCurrentUser();

    if (currentUser && FirebaseCharactersService.isOnline()) {
      try {
        return await FirebaseCharactersService.getCharacter(
          currentUser.uid,
          index,
        );
      } catch (error) {
        console.warn(
          "Ошибка загрузки персонажа из Firebase, используем localStorage:",
          error,
        );
        return CharactersUtils.getCharacterForm(index);
      }
    }

    return CharactersUtils.getCharacterForm(index);
  },

  async saveCharacterForm(index: number, data: FormType) {
    const currentUser = FirebaseAuthService.getCurrentUser();

    if (currentUser && FirebaseCharactersService.isOnline()) {
      try {
        await FirebaseCharactersService.saveCharacter(
          currentUser.uid,
          index,
          data,
        );
        return;
      } catch (error) {
        console.warn(
          "Ошибка сохранения персонажа в Firebase, используем localStorage:",
          error,
        );
      }
    }

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

  /**
   * Подписаться на изменения персонажей в реальном времени
   */
  subscribeToCharacters(callback: (characters: FormType[]) => void) {
    const currentUser = FirebaseAuthService.getCurrentUser();

    if (currentUser && FirebaseCharactersService.isOnline()) {
      return FirebaseCharactersService.subscribeToCharacters(
        currentUser.uid,
        callback,
      );
    }

    // Fallback на localStorage
    callback(CharactersUtils.getCharacters());
    return () => {}; // Пустая функция отписки
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
