import { fetchApi } from "./fetch-api";
import type { Character } from "./character-types";
import type { FormType } from "../modules/game-form/types/form/form.type";

/**
 * API для работы с персонажами через fetch
 */
export class CharacterApi {
  /**
   * Создать нового персонажа
   */
  async createCharacter(
    characterData: FormType,
    name: string,
  ): Promise<Character> {
    try {
      return await fetchApi.createCharacter(characterData, name);
    } catch (error) {
      console.error("Ошибка при создании персонажа:", error);
      throw error;
    }
  }

  /**
   * Получить всех персонажей пользователя
   */
  async getUserCharacters(): Promise<Character[]> {
    try {
      return await fetchApi.getUserCharacters();
    } catch (error) {
      console.error("Ошибка при получении персонажей:", error);
      throw error;
    }
  }

  /**
   * Получить персонажа по ID
   */
  async getCharacterById(characterId: string): Promise<Character> {
    try {
      const character = await fetchApi.getCharacterById(characterId);
      if (!character) {
        throw new Error("Персонаж не найден");
      }
      return character;
    } catch (error) {
      console.error("Ошибка при получении персонажа:", error);
      throw error;
    }
  }

  /**
   * Обновить персонажа
   */
  async updateCharacter(
    characterId: string,
    characterData: FormType,
    version: number,
  ): Promise<Character> {
    try {
      return await fetchApi.updateCharacter(
        characterId,
        characterData,
        version,
      );
    } catch (error) {
      console.error("Ошибка при обновлении персонажа:", error);
      throw error;
    }
  }

  /**
   * Удалить персонажа (мягкое удаление)
   */
  async deleteCharacter(characterId: string): Promise<void> {
    try {
      // Проверяем существование персонажа
      await this.getCharacterById(characterId);

      await fetchApi.deleteCharacter(characterId);
    } catch (error) {
      console.error("Ошибка при удалении персонажа:", error);
      throw error;
    }
  }

  /**
   * Архивировать персонажа
   */
  async archiveCharacter(characterId: string): Promise<void> {
    try {
      // Проверяем существование персонажа
      await this.getCharacterById(characterId);

      await fetchApi.archiveCharacter(characterId);
    } catch (error) {
      console.error("Ошибка при архивировании персонажа:", error);
      throw error;
    }
  }

  /**
   * Восстановить персонажа из архива
   */
  async restoreCharacter(characterId: string): Promise<void> {
    try {
      // Проверяем существование персонажа
      await this.getCharacterById(characterId);

      await fetchApi.restoreCharacter(characterId);
    } catch (error) {
      console.error("Ошибка при восстановлении персонажа:", error);
      throw error;
    }
  }
}

// Экспортируем экземпляр API
export const characterApi = new CharacterApi();
