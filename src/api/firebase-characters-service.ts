import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  Timestamp,
  addDoc,
  type FirestoreDataConverter,
  type DocumentData,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { db } from "./firebase-config";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import { CharactersUtils } from "./local-storage";
import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";

// Интерфейс для персонажа в Firestore
export interface CharacterDocument {
  id?: string;
  data: FormType;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  version: number; // Версия для отслеживания изменений
  lastModifiedBy: string; // UID пользователя, который последний раз изменял
  deviceId?: string; // ID устройства для отслеживания
  deleted: boolean;
}

// Интерфейс для локального персонажа с метаданными
export interface LocalCharacter extends FormType {
  id: string;
}

// Интерфейс для ошибок Firebase
export interface FirebaseError {
  code: string;
  message: string;
}

const characterConverter: FirestoreDataConverter<CharacterDocument> = {
  toFirestore(character: CharacterDocument): DocumentData {
    // eslint-disable-next-line
    const { id, ...data } = character;
    return data;
  },
  fromFirestore(snapshot, options): CharacterDocument {
    const data = snapshot.data(options);
    return { id: snapshot.id, ...data } as CharacterDocument;
  },
};

export class FirebaseCharactersService {
  /**
   * Генерирует уникальный ID устройства
   */
  private static getDeviceId(): string {
    // todo сделать отдельный метод сохранения deviceId в localStorage
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  }

  static getUserCharactersRef(userId: string) {
    return collection(db, "users", userId, "characters").withConverter(
      characterConverter,
    );
  }

  /**
   * Получить всех персонажей пользователя из Firebase
   */
  static async getCharacters(userId: string): Promise<CharacterDocument[]> {
    try {
      const charactersRef = this.getUserCharactersRef(userId);
      const snapshot = await getDocs(charactersRef);

      return snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as CharacterDocument),
        }))
        .filter((character) => !character.deleted);
    } catch (error) {
      console.error("Ошибка загрузки персонажей из Firebase:", error);
      console.error("Детали ошибки:", {
        code: (error as { code: string })?.code,
        message: (error as { message: string })?.message,
        userId,
      });
      // todo решить что лучше: выбрасывать ошибку или возвращать пустой массив
      throw error;
    }
  }

  /**
   * Получить конкретного персонажа по индексу
   */
  static async getCharacter(
    userId: string,
    characterId: string,
  ): Promise<CharacterDocument | null> {
    // todo добавить try\catch и загрузку из localStorage в случае catch
    const charactersRef = this.getUserCharactersRef(userId);
    const characterDocRef = doc(charactersRef, characterId);

    const snapshot = await getDoc(characterDocRef);

    if (!snapshot.exists()) {
      return null; // персонаж не найден
    }
    return snapshot.data();
  }

  /**
   * Сохранить персонажа в Firebase с версионированием
   */
  static async saveCharacter(
    userId: string,
    characterData: CharacterDocument,
  ): Promise<void> {
    // todo добавить try\catch и сохранение в localStorage в случае catch
    const charactersRef = this.getUserCharactersRef(userId);
    const characterDocRef = doc(charactersRef, characterData.id);
    const newVersion = characterData.version + 1;

    const characterDoc: CharacterDocument = {
      ...characterData,
      updatedAt: serverTimestamp() as unknown as Timestamp,
      version: newVersion,
      lastModifiedBy: userId,
      deviceId: this.getDeviceId(),
    };

    await setDoc(characterDocRef, characterDoc);
  }

  /**
   * Создать нового персонажа
   */
  static async createCharacter(userId: string) {
    const newCharacterDoc: CharacterDocument = {
      data: FORM_DEFAULT_VALUES,
      userId,
      createdAt: serverTimestamp() as unknown as Timestamp,
      updatedAt: serverTimestamp() as unknown as Timestamp,
      version: 1,
      lastModifiedBy: userId,
      deviceId: this.getDeviceId(),
      deleted: false,
    };
    try {
      const charactersRef = this.getUserCharactersRef(userId);
      await addDoc(charactersRef, newCharacterDoc);
    } catch (error) {
      console.error("Ошибка создания персонажа в Firebase:", error);
      // Fallback на localStorage
      CharactersUtils.setNewCharacterForm();
    }
  }

  /**
   * Удалить персонажа
   */
  static async deleteCharacter(userId: string, characterId: string) {
    // todo добавить try\catch и работу с localStorage в случае catch
    const characterDoc = await this.getCharacter(userId, characterId);
    if (characterDoc) {
      await this.saveCharacter(userId, {
        ...characterDoc,
        deleted: true,
      });
    }
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
