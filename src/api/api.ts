import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import {
  getLocalStorage,
  setLocalStorage,
  getCurrentCharacter,
  getAllCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  setCurrentCharacterId,
  getCurrentCharacterId,
} from "./local-storage.ts";
import { getUserToken, getUserInfo } from "./token-utils.ts";
import type { BackendlessUser } from "./backendless-types.ts";
import { characterApi } from "./character-api.ts";
import { syncService } from "./sync-service.ts";
import { updateBackendlessToken } from "./backendless-config.ts";
import type { Character } from "./character-types.ts";
import type { LocalCharacter, SyncResult } from "./types.ts";

export const api = {
  // === Обратная совместимость ===

  /**
   * Получить данные текущего персонажа (для обратной совместимости)
   * @deprecated Используйте getCurrentCharacterData() вместо этого
   */
  async getOne(): Promise<FormType> {
    // Автоматическая синхронизация при загрузке (только если пользователь авторизован)
    try {
      const user = this.getCurrentUser();
      if (user) {
        await this.syncAll();
      }
    } catch (error) {
      console.warn("Не удалось синхронизировать при загрузке:", error);
    }

    return getLocalStorage();
  },

  /**
   * Сохранить данные текущего персонажа (для обратной совместимости)
   * @deprecated Используйте saveCurrentCharacterData() вместо этого
   */
  async save(data: FormType) {
    setLocalStorage(data);

    // Автоматическая синхронизация с сервером
    try {
      await this.syncAll();
    } catch (error) {
      console.warn("Не удалось синхронизировать с сервером:", error);
      // Не прерываем сохранение, если синхронизация не удалась
    }
  },

  // === Новая система персонажей ===

  /**
   * Получить данные текущего персонажа
   */
  async getCurrentCharacterData(): Promise<FormType> {
    const currentCharacter = getCurrentCharacter();
    return currentCharacter?.characterData || getLocalStorage();
  },

  /**
   * Сохранить данные текущего персонажа
   */
  async saveCurrentCharacterData(data: FormType): Promise<void> {
    const currentCharacter = getCurrentCharacter();
    if (currentCharacter) {
      updateCharacter(currentCharacter.id, { characterData: data });
    } else {
      // Создаем нового персонажа
      const newCharacter = createCharacter(data.name || "Новый персонаж", data);
      setCurrentCharacterId(newCharacter.id);
    }

    // Автоматическая синхронизация с сервером
    try {
      await this.syncAll();
    } catch (error) {
      console.warn("Не удалось синхронизировать с сервером:", error);
      // Не прерываем сохранение, если синхронизация не удалась
    }
  },

  /**
   * Получить всех персонажей
   */
  async getAllCharacters(): Promise<LocalCharacter[]> {
    return getAllCharacters();
  },

  /**
   * Получить текущего персонажа
   */
  async getCurrentCharacter(): Promise<LocalCharacter | null> {
    return getCurrentCharacter();
  },

  /**
   * Создать нового персонажа
   */
  async createCharacter(
    name: string,
    characterData?: FormType,
  ): Promise<LocalCharacter> {
    return createCharacter(name, characterData);
  },

  /**
   * Обновить персонажа
   */
  async updateCharacter(
    characterId: string,
    updates: Partial<LocalCharacter>,
  ): Promise<void> {
    updateCharacter(characterId, updates);
  },

  /**
   * Удалить персонажа
   */
  async deleteCharacter(characterId: string): Promise<void> {
    deleteCharacter(characterId);
  },

  /**
   * Установить текущего персонажа
   */
  async setCurrentCharacter(characterId: string): Promise<void> {
    setCurrentCharacterId(characterId);
  },

  /**
   * Получить ID текущего персонажа
   */
  async getCurrentCharacterId(): Promise<string | null> {
    return getCurrentCharacterId();
  },

  // === Синхронизация с Backendless ===

  /**
   * Синхронизировать всех персонажей с сервером
   */
  async syncAll(): Promise<SyncResult> {
    // Обновляем токен перед синхронизацией
    updateBackendlessToken();
    return syncService.syncAll();
  },

  /**
   * Синхронизировать конкретного персонажа
   */
  async syncCharacter(characterId: string): Promise<SyncResult> {
    // Обновляем токен перед синхронизацией
    updateBackendlessToken();
    return syncService.syncCharacter(characterId);
  },

  /**
   * Разрешить конфликт версий
   */
  async resolveConflict(
    characterId: string,
    resolution: "local" | "remote",
  ): Promise<void> {
    return syncService.resolveConflict(characterId, resolution);
  },

  /**
   * Проверить, выполняется ли синхронизация
   */
  isSyncInProgress(): boolean {
    return syncService.isSyncInProgress();
  },

  /**
   * Получить время последней синхронизации
   */
  getLastSyncTime(): Date | null {
    return syncService.getLastSyncTime();
  },

  // === Backendless API ===

  /**
   * Создать персонажа на сервере
   */
  async createCharacterOnServer(
    characterData: FormType,
    name: string,
  ): Promise<Character> {
    return characterApi.createCharacter(characterData, name);
  },

  /**
   * Получить всех персонажей пользователя с сервера
   */
  async getUserCharactersFromServer(): Promise<Character[]> {
    return characterApi.getUserCharacters();
  },

  /**
   * Получить персонажа с сервера по ID
   */
  async getCharacterFromServer(characterId: string): Promise<Character> {
    return characterApi.getCharacterById(characterId);
  },

  /**
   * Обновить персонажа на сервере
   */
  async updateCharacterOnServer(
    characterId: string,
    characterData: FormType,
    version: number,
  ): Promise<Character> {
    return characterApi.updateCharacter(characterId, characterData, version);
  },

  /**
   * Удалить персонажа на сервере
   */
  async deleteCharacterOnServer(characterId: string): Promise<void> {
    return characterApi.deleteCharacter(characterId);
  },

  /**
   * Архивировать персонажа на сервере
   */
  async archiveCharacterOnServer(characterId: string): Promise<void> {
    return characterApi.archiveCharacter(characterId);
  },

  /**
   * Восстановить персонажа из архива на сервере
   */
  async restoreCharacterOnServer(characterId: string): Promise<void> {
    return characterApi.restoreCharacter(characterId);
  },

  // === Пользователь ===

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

  /**
   * Обновить токен Backendless (вызывать после авторизации)
   */
  updateToken(): void {
    updateBackendlessToken();
  },
};
