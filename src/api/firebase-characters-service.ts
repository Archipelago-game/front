import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { db } from "./firebase-config";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { CharactersUtils } from "./local-storage";

// Интерфейс для персонажа в Firestore
export interface CharacterDocument {
  id: string;
  data: FormType;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  version: number; // Версия для отслеживания изменений
  lastModifiedBy: string; // UID пользователя, который последний раз изменял
  deviceId?: string; // ID устройства для отслеживания
}

// Интерфейс для локального персонажа с метаданными
export interface LocalCharacter {
  data: FormType;
  lastSyncAt: Date;
  version: number;
  isDirty: boolean; // Есть ли несинхронизированные изменения
}

// Интерфейс для ошибок Firebase
export interface FirebaseError {
  code: string;
  message: string;
}

export class FirebaseCharactersService {
  /**
   * Генерирует уникальный ID устройства
   */
  private static getDeviceId(): string {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  }

  /**
   * Проверяет, есть ли конфликт версий
   */
  private static hasVersionConflict(
    localVersion: number,
    remoteVersion: number,
    localLastSync: Date,
    remoteLastUpdate: Date,
  ): boolean {
    // Конфликт если:
    // 1. Локальная версия больше удаленной (локальные изменения)
    // 2. И удаленная версия больше локальной (удаленные изменения)
    // 3. И времена обновления пересекаются
    return localVersion > remoteVersion && remoteLastUpdate > localLastSync;
  }

  /**
   * Объединяет данные персонажа при конфликте
   */
  static mergeCharacterData(
    localData: FormType,
    remoteData: FormType,
    conflictResolution: "local" | "remote" | "merge" = "merge",
  ): FormType {
    if (conflictResolution === "local") {
      return localData;
    }
    if (conflictResolution === "remote") {
      return remoteData;
    }

    // Стратегия слияния: умное объединение данных
    const mergedData = { ...remoteData };

    // Объединяем основные поля
    if (localData.name && localData.name.trim() !== "") {
      mergedData.name = localData.name;
    }

    // Объединяем возраст (берем большее значение)
    mergedData.age = Math.max(localData.age, remoteData.age);

    // Объединяем опыт (берем большее значение)
    mergedData.experience = {
      total: Math.max(localData.experience.total, remoteData.experience.total),
      used: Math.max(localData.experience.used, remoteData.experience.used),
    };

    // Объединяем родину (приоритет непустому значению)
    if (localData.homeland && localData.homeland.trim() !== "") {
      mergedData.homeland = localData.homeland;
    }

    // Объединяем языки (объединяем списки)
    const localLanguages = localData.languages
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l);
    const remoteLanguages = remoteData.languages
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l);
    const allLanguages = [...new Set([...localLanguages, ...remoteLanguages])];
    mergedData.languages = allLanguages.join(", ");

    // Объединяем кошелек (берем большее значение)
    mergedData.inventory.wallet = Math.max(
      localData.inventory.wallet,
      remoteData.inventory.wallet,
    );

    // Объединяем снаряжение (объединяем списки)
    const localEquipment = localData.inventory.equipment.list
      .map((e) => e.value)
      .filter((e) => e.trim());
    const remoteEquipment = remoteData.inventory.equipment.list
      .map((e) => e.value)
      .filter((e) => e.trim());
    const allEquipment = [...new Set([...localEquipment, ...remoteEquipment])];
    mergedData.inventory.equipment = {
      list: allEquipment.map((value) => ({ value })),
    };

    // Для сложных структур (статы, атака, защита) пока берем удаленную версию
    // В будущем можно добавить более сложную логику слияния

    return mergedData;
  }

  /**
   * Проверяет, можно ли автоматически разрешить конфликт
   */
  private static canAutoResolveConflict(
    localData: FormType,
    remoteData: FormType,
  ): boolean {
    // Автоматически разрешаем, если:
    // 1. Изменилось только имя
    // 2. Изменились только числовые поля (возраст, опыт)
    // 3. Добавились новые таланты без изменения существующих

    const nameChanged = localData.name !== remoteData.name;
    const ageChanged = localData.age !== remoteData.age;
    const experienceChanged =
      localData.experience.total !== remoteData.experience.total ||
      localData.experience.used !== remoteData.experience.used;

    // Если изменились только простые поля - можно автоматически разрешить
    const simpleChanges = nameChanged || ageChanged || experienceChanged;

    // Проверяем, что не изменились сложные структуры
    const complexStructuresUnchanged =
      JSON.stringify(localData.stats) === JSON.stringify(remoteData.stats) &&
      JSON.stringify(localData.attack) === JSON.stringify(remoteData.attack) &&
      JSON.stringify(localData.defence) === JSON.stringify(remoteData.defence);

    return simpleChanges && complexStructuresUnchanged;
  }
  /**
   * Получить всех персонажей пользователя из Firebase
   */
  static async getCharacters(userId: string): Promise<FormType[]> {
    try {
      if (!userId) {
        console.warn("UserId не предоставлен, используем localStorage");
        return CharactersUtils.getCharacters();
      }

      const charactersRef = collection(db, "users", userId, "documents");
      const snapshot = await getDocs(charactersRef);

      const characters: FormType[] = [];
      snapshot.forEach((doc) => {
        const characterData = doc.data() as CharacterDocument;
        characters.push(characterData.data);
      });

      return characters;
    } catch (error) {
      console.error("Ошибка загрузки персонажей из Firebase:", error);
      console.error("Детали ошибки:", {
        code: (error as { code: string })?.code,
        message: (error as { message: string })?.message,
        userId,
      });
      // Fallback на localStorage
      return CharactersUtils.getCharacters();
    }
  }

  /**
   * Получить конкретного персонажа по индексу
   */
  static async getCharacter(
    userId: string,
    characterIndex: number,
  ): Promise<FormType> {
    try {
      const characters = await this.getCharacters(userId);
      if (characters.length > characterIndex) {
        return characters[characterIndex];
      }

      // Fallback на localStorage
      return CharactersUtils.getCharacterForm(characterIndex);
    } catch (error) {
      console.error("Ошибка загрузки персонажа из Firebase:", error);
      return CharactersUtils.getCharacterForm(characterIndex);
    }
  }

  /**
   * Сохранить персонажа в Firebase с версионированием
   */
  static async saveCharacter(
    userId: string,
    characterIndex: number,
    characterData: FormType,
  ): Promise<void> {
    try {
      const characterId = `character_${characterIndex}`;
      const characterRef = doc(db, "users", userId, "documents", characterId);

      // Получаем текущие метаданные
      const localMetadata = this.getLocalCharacterMetadata();
      const currentVersion = (localMetadata[characterIndex]?.version || 0) + 1;

      const characterDoc: Omit<CharacterDocument, "id"> = {
        data: characterData,
        createdAt: serverTimestamp() as unknown as Date,
        updatedAt: serverTimestamp() as unknown as Date,
        userId,
        version: currentVersion,
        lastModifiedBy: userId,
        deviceId: this.getDeviceId(),
      };

      await setDoc(characterRef, characterDoc);

      // Обновляем локальные метаданные
      const updatedMetadata = [...localMetadata];
      updatedMetadata[characterIndex] = {
        data: characterData,
        lastSyncAt: new Date(),
        version: currentVersion,
        isDirty: false,
      };
      this.saveLocalCharacterMetadata(updatedMetadata);

      // Также сохраняем в localStorage для офлайн режима
      CharactersUtils.setCharacterForm(characterIndex, characterData);
    } catch (error) {
      console.error("Ошибка сохранения персонажа в Firebase:", error);

      // Помечаем как "грязный" для последующей синхронизации
      const localMetadata = this.getLocalCharacterMetadata();
      if (localMetadata[characterIndex]) {
        localMetadata[characterIndex].isDirty = true;
        this.saveLocalCharacterMetadata(localMetadata);
      }

      // Fallback на localStorage
      CharactersUtils.setCharacterForm(characterIndex, characterData);
      throw this.handleFirebaseError(
        error as { code?: string; message?: string },
      );
    }
  }

  /**
   * Создать нового персонажа
   */
  static async createCharacter(userId: string): Promise<number> {
    try {
      const characters = await this.getCharacters(userId);
      const newIndex = characters.length;

      // Создаем нового персонажа с дефолтными значениями
      const newCharacter = CharactersUtils.getCharacterForm(0); // Получаем дефолтные значения

      await this.saveCharacter(userId, newIndex, newCharacter);

      return newIndex;
    } catch (error) {
      console.error("Ошибка создания персонажа в Firebase:", error);
      // Fallback на localStorage
      CharactersUtils.setNewCharacterForm();
      return CharactersUtils.getCharacters().length - 1;
    }
  }

  /**
   * Удалить персонажа
   */
  static async deleteCharacter(
    userId: string,
    characterIndex: number,
  ): Promise<void> {
    try {
      const characterId = `character_${characterIndex}`;
      const characterRef = doc(db, "users", userId, "documents", characterId);

      await deleteDoc(characterRef);

      // Также удаляем из localStorage
      const characters = CharactersUtils.getCharacters();
      const newCharacters = characters.filter(
        (_, index) => index !== characterIndex,
      );
      CharactersUtils.setCharacters(newCharacters);
    } catch (error) {
      console.error("Ошибка удаления персонажа из Firebase:", error);
      throw this.handleFirebaseError(
        error as { code?: string; message?: string },
      );
    }
  }

  /**
   * Синхронизировать данные между Firebase и localStorage с разрешением конфликтов
   */
  static async syncWithLocalStorage(userId: string): Promise<void> {
    try {
      const firebaseCharacters = await this.getCharacters(userId);
      const localCharacters = CharactersUtils.getCharacters();

      // Получаем метаданные локальных персонажей
      const localMetadata = this.getLocalCharacterMetadata();

      // Если Firebase пустой, но localStorage не пустой - загружаем из localStorage
      if (firebaseCharacters.length === 0 && localCharacters.length > 0) {
        console.log(
          "Синхронизация: загружаем данные из localStorage в Firebase",
        );
        for (let i = 0; i < localCharacters.length; i++) {
          await this.saveCharacter(userId, i, localCharacters[i]);
        }
        return;
      }

      // Если Firebase не пустой - проверяем конфликты
      if (firebaseCharacters.length > 0) {
        console.log(
          "Синхронизация: проверяем конфликты и синхронизируем данные",
        );

        const mergedCharacters: FormType[] = [];
        const conflicts: Array<{
          index: number;
          local: FormType;
          remote: FormType;
        }> = [];

        // Обрабатываем каждого персонажа
        for (
          let i = 0;
          i < Math.max(firebaseCharacters.length, localCharacters.length);
          i++
        ) {
          const localChar = localCharacters[i];
          const remoteChar = firebaseCharacters[i];

          if (!localChar && remoteChar) {
            // Только удаленный персонаж - берем его
            mergedCharacters.push(remoteChar);
          } else if (localChar && !remoteChar) {
            // Только локальный персонаж - сохраняем в Firebase
            mergedCharacters.push(localChar);
            await this.saveCharacter(userId, i, localChar);
          } else if (localChar && remoteChar) {
            // Есть оба - проверяем конфликт
            const localMeta = localMetadata[i];
            const hasConflict =
              localMeta &&
              this.hasVersionConflict(
                localMeta.version,
                1, // Упрощенно, в реальности нужно получать версию из Firebase
                localMeta.lastSyncAt,
                new Date(), // Упрощенно
              );

            if (hasConflict) {
              // Пытаемся автоматически разрешить простые конфликты
              const autoMerged = this.mergeCharacterData(
                localChar,
                remoteChar,
                "merge",
              );

              // Проверяем, можно ли автоматически разрешить конфликт
              const canAutoResolve = this.canAutoResolveConflict(
                localChar,
                remoteChar,
              );

              if (canAutoResolve) {
                // Автоматически разрешаем конфликт
                console.log(
                  `Автоматически разрешен конфликт для персонажа ${i}`,
                );
                mergedCharacters.push(autoMerged);
              } else {
                // Сложный конфликт - добавляем в список для ручного разрешения
                conflicts.push({
                  index: i,
                  local: localChar,
                  remote: remoteChar,
                });

                // Пока используем удаленную версию, но помечаем конфликт
                mergedCharacters.push(remoteChar);
              }
            } else {
              // Нет конфликта - используем более новую версию
              mergedCharacters.push(remoteChar);
            }
          }
        }

        // Обновляем localStorage
        CharactersUtils.setCharacters(mergedCharacters);

        // Если есть конфликты - уведомляем пользователя
        if (conflicts.length > 0) {
          console.warn(
            `Обнаружено ${conflicts.length} конфликтов при синхронизации`,
          );
          this.notifyConflicts(conflicts);
        }
      }
    } catch (error) {
      console.error("Ошибка синхронизации:", error);
    }
  }

  /**
   * Получить метаданные локальных персонажей
   */
  private static getLocalCharacterMetadata(): LocalCharacter[] {
    const metadata = localStorage.getItem("characterMetadata");
    if (metadata) {
      return JSON.parse(metadata);
    }
    return [];
  }

  /**
   * Сохранить метаданные локальных персонажей
   */
  private static saveLocalCharacterMetadata(metadata: LocalCharacter[]): void {
    localStorage.setItem("characterMetadata", JSON.stringify(metadata));
  }

  /**
   * Уведомить о конфликтах
   */
  private static notifyConflicts(
    conflicts: Array<{ index: number; local: FormType; remote: FormType }>,
  ): void {
    console.warn("Обнаружены конфликты данных:", conflicts);

    // Сохраняем конфликты в localStorage для последующего разрешения
    localStorage.setItem("pendingConflicts", JSON.stringify(conflicts));

    // Можно добавить уведомление через snackbar или модальное окно
    // Например: showConflictDialog(conflicts);
  }

  /**
   * Получить ожидающие разрешения конфликты
   */
  static getPendingConflicts(): Array<{
    index: number;
    local: FormType;
    remote: FormType;
  }> {
    const conflicts = localStorage.getItem("pendingConflicts");
    if (conflicts) {
      return JSON.parse(conflicts);
    }
    return [];
  }

  /**
   * Очистить ожидающие конфликты
   */
  static clearPendingConflicts(): void {
    localStorage.removeItem("pendingConflicts");
  }

  /**
   * Подписаться на изменения персонажей в реальном времени
   */
  static subscribeToCharacters(
    userId: string,
    callback: (characters: FormType[]) => void,
  ): Unsubscribe {
    const charactersRef = collection(db, "users", userId, "documents");

    return onSnapshot(
      charactersRef,
      (snapshot) => {
        const characters: FormType[] = [];
        snapshot.forEach((doc) => {
          const characterData = doc.data() as CharacterDocument;
          characters.push(characterData.data);
        });

        // Обновляем localStorage
        CharactersUtils.setCharacters(characters);

        callback(characters);
      },
      (error) => {
        console.error("Ошибка подписки на персонажей:", error);
        // Fallback на localStorage
        callback(CharactersUtils.getCharacters());
      },
    );
  }

  /**
   * Проверить подключение к интернету
   */
  static isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Обработка ошибок Firebase
   */
  private static handleFirebaseError(error: {
    code?: string;
    message?: string;
  }): FirebaseError {
    let message = "Произошла ошибка при работе с Firebase";

    switch (error.code) {
      case "permission-denied":
        message = "Нет прав доступа к данным";
        break;
      case "unavailable":
        message = "Сервис временно недоступен";
        break;
      case "network-request-failed":
        message = "Ошибка сети";
        break;
      default:
        message = error.message || message;
    }

    return {
      code: error.code || "unknown",
      message,
    };
  }
}
