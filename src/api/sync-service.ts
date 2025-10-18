import { characterApi } from "./character-api";
import type { Character } from "./character-types";
import {
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  syncCharacterWithBackend,
  markCharacterAsLocal,
  getLastSyncTime,
  setLastSyncTime,
  createCharacter,
} from "./local-storage";
import type { LocalCharacter, SyncResult, ConflictInfo } from "./types";

/**
 * Сервис синхронизации данных персонажей между localStorage и Backendless
 */
export class SyncService {
  private isSyncing = false;

  /**
   * Полная синхронизация всех персонажей
   */
  async syncAll(): Promise<SyncResult> {
    if (this.isSyncing) {
      throw new Error("Синхронизация уже выполняется");
    }

    this.isSyncing = true;
    const result: SyncResult = {
      success: true,
      syncedCount: 0,
      conflicts: [],
      errors: [],
    };

    try {
      console.log("Начинаем синхронизацию персонажей...");

      // 1. Загружаем персонажей с сервера
      const remoteCharacters = await characterApi.getUserCharacters();
      console.log(`Загружено ${remoteCharacters.length} персонажей с сервера`);

      // 2. Получаем локальных персонажей
      const localCharacters = getAllCharacters();
      console.log(`Найдено ${localCharacters.length} локальных персонажей`);

      // 3. Синхронизируем локальные изменения на сервер
      await this.syncLocalToRemote(localCharacters, result);

      // 4. Синхронизируем удаленные изменения локально
      await this.syncRemoteToLocal(remoteCharacters, localCharacters, result);

      // 5. Обновляем время последней синхронизации
      setLastSyncTime(new Date());

      result.success = result.errors.length === 0;
      console.log(
        `Синхронизация завершена. Обработано: ${result.syncedCount}, конфликтов: ${result.conflicts.length}, ошибок: ${result.errors.length}`,
      );
    } catch (error) {
      result.success = false;
      result.errors.push(
        `Ошибка синхронизации: ${error instanceof Error ? error.message : String(error)}`,
      );
      console.error("Ошибка при синхронизации:", error);
    } finally {
      this.isSyncing = false;
    }

    return result;
  }

  /**
   * Синхронизация конкретного персонажа
   */
  async syncCharacter(characterId: string): Promise<SyncResult> {
    const result: SyncResult = {
      success: true,
      syncedCount: 0,
      conflicts: [],
      errors: [],
    };

    try {
      const localCharacter = getCharacterById(characterId);
      if (!localCharacter) {
        throw new Error("Персонаж не найден локально");
      }

      if (localCharacter.isLocal) {
        // Персонаж существует только локально - создаем на сервере
        await this.createCharacterOnServer(localCharacter, result);
      } else if (localCharacter.backendId) {
        // Персонаж синхронизирован - обновляем на сервере
        await this.updateCharacterOnServer(localCharacter, result);
      }
    } catch (error) {
      result.success = false;
      result.errors.push(
        `Ошибка синхронизации персонажа: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return result;
  }

  /**
   * Создать персонажа на сервере
   */
  async createCharacterOnServer(
    localCharacter: LocalCharacter,
    result: SyncResult,
  ): Promise<void> {
    try {
      const backendCharacter = await characterApi.createCharacter(
        localCharacter.characterData,
        localCharacter.name,
      );

      syncCharacterWithBackend(localCharacter.id, backendCharacter);
      result.syncedCount++;
      console.log(`Персонаж "${localCharacter.name}" создан на сервере`);
    } catch (error) {
      markCharacterAsLocal(localCharacter.id);
      result.errors.push(
        `Не удалось создать персонажа "${localCharacter.name}": ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Обновить персонажа на сервере
   */
  async updateCharacterOnServer(
    localCharacter: LocalCharacter,
    result: SyncResult,
  ): Promise<void> {
    if (!localCharacter.backendId) return;

    try {
      const backendCharacter = await characterApi.updateCharacter(
        localCharacter.backendId,
        localCharacter.characterData,
        localCharacter.version,
      );

      syncCharacterWithBackend(localCharacter.id, backendCharacter);
      result.syncedCount++;
      console.log(`Персонаж "${localCharacter.name}" обновлен на сервере`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Конфликт версий")) {
        // Обрабатываем конфликт версий
        const conflict: ConflictInfo = {
          characterId: localCharacter.id,
          characterName: localCharacter.name,
          localVersion: localCharacter.version,
          remoteVersion: 0, // Получим с сервера
          localModified: localCharacter.lastModified,
          remoteModified: new Date(),
          resolution: "manual",
        };
        result.conflicts.push(conflict);
        console.warn(`Конфликт версий для персонажа "${localCharacter.name}"`);
      } else {
        result.errors.push(
          `Не удалось обновить персонажа "${localCharacter.name}": ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }

  /**
   * Синхронизация локальных изменений на сервер
   */
  private async syncLocalToRemote(
    localCharacters: LocalCharacter[],
    result: SyncResult,
  ): Promise<void> {
    for (const localChar of localCharacters) {
      if (localChar.isLocal) {
        // Создаем нового персонажа на сервере
        await this.createCharacterOnServer(localChar, result);
      } else if (localChar.backendId) {
        // Обновляем существующего персонажа
        await this.updateCharacterOnServer(localChar, result);
      }
    }
  }

  /**
   * Синхронизация удаленных изменений локально
   */
  private async syncRemoteToLocal(
    remoteCharacters: Character[],
    localCharacters: LocalCharacter[],
    result: SyncResult,
  ): Promise<void> {
    for (const remoteChar of remoteCharacters) {
      const localChar = localCharacters.find(
        (lc) => lc.backendId === remoteChar.objectId,
      );

      if (!localChar) {
        // Персонаж существует только на сервере - создаем локально
        const newLocalChar = createCharacter(
          remoteChar.name,
          remoteChar.characterData,
        );
        syncCharacterWithBackend(newLocalChar.id, remoteChar);
        result.syncedCount++;
        console.log(`Персонаж "${remoteChar.name}" загружен с сервера`);
      } else {
        // Проверяем, нужно ли обновить локальную версию
        const remoteModified = new Date(remoteChar.lastModified);
        if (remoteModified > localChar.lastModified) {
          // Серверная версия новее - обновляем локальную
          updateCharacter(localChar.id, {
            characterData: remoteChar.characterData,
            name: remoteChar.name,
            version: remoteChar.version,
            lastModified: remoteModified,
          });
          result.syncedCount++;
          console.log(`Персонаж "${remoteChar.name}" обновлен с сервера`);
        }
      }
    }

    // Удаляем локальных персонажей, которых нет на сервере (если они были удалены)
    const lastSync = getLastSyncTime();
    if (lastSync) {
      for (const localChar of localCharacters) {
        if (!localChar.isLocal && localChar.backendId) {
          const remoteChar = remoteCharacters.find(
            (rc) => rc.objectId === localChar.backendId,
          );
          if (!remoteChar) {
            // Персонаж был удален на сервере - удаляем локально
            deleteCharacter(localChar.id);
            result.syncedCount++;
            console.log(
              `Персонаж "${localChar.name}" удален (был удален на сервере)`,
            );
          }
        }
      }
    }
  }

  /**
   * Разрешить конфликт версий
   */
  async resolveConflict(
    characterId: string,
    resolution: "local" | "remote",
  ): Promise<void> {
    const localCharacter = getCharacterById(characterId);
    if (!localCharacter || !localCharacter.backendId) {
      throw new Error("Персонаж не найден или не синхронизирован");
    }

    if (resolution === "local") {
      // Принудительно обновляем серверную версию локальной
      await characterApi.updateCharacter(
        localCharacter.backendId,
        localCharacter.characterData,
        localCharacter.version,
      );
    } else if (resolution === "remote") {
      // Загружаем серверную версию
      const remoteCharacter = await characterApi.getCharacterById(
        localCharacter.backendId,
      );
      updateCharacter(characterId, {
        characterData: remoteCharacter.characterData,
        name: remoteCharacter.name,
        version: remoteCharacter.version,
        lastModified: new Date(remoteCharacter.lastModified),
      });
    }
  }

  /**
   * Проверить, выполняется ли синхронизация
   */
  isSyncInProgress(): boolean {
    return this.isSyncing;
  }

  /**
   * Получить время последней синхронизации
   */
  getLastSyncTime(): Date | null {
    return getLastSyncTime();
  }
}

// Экспортируем экземпляр сервиса
export const syncService = new SyncService();
