import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  Timestamp,
  type FirestoreDataConverter,
  type DocumentData,
  orderBy,
  query,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { db } from "./firebase-config";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";

import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";
import type { MigrationState } from "../app/migrations/migration.type.ts";
import { migrationUtils } from "../app/migrations/migration-utils.class.ts";

export interface Meta {
  characterFormMigration: MigrationState;
}

// Интерфейс для персонажа в Firestore
export interface CharacterDocument {
  id?: string;
  data: FormType;
  userId: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  version: number; // Версия для отслеживания изменений
  lastModifiedBy: string; // UID пользователя, который последний раз изменял
  deviceId?: string; // ID устройства для отслеживания
  deleted: boolean;
  meta?: Meta;
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
      const queryCharacterDocs = query(
        charactersRef,
        orderBy("createdAt", "asc"),
      );
      const snapshot = await getDocs(queryCharacterDocs);

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
   * Создать нового персонажа
   */
  static createCharacterDocument(
    userId: string,
    data?: FormType,
  ): CharacterDocument {
    const now = new Date();
    return {
      data: data ?? FORM_DEFAULT_VALUES,
      userId,
      createdAt: now,
      updatedAt: now,
      version: 1,
      lastModifiedBy: userId,
      deviceId: this.getDeviceId(),
      deleted: false,
      meta: {
        characterFormMigration: migrationUtils.setDefaultMigrationState(userId),
      },
    };
  }

  static async createCharacter(userId: string, data?: FormType) {
    const newCharacterDoc = this.createCharacterDocument(userId, data);
    const charactersRef = this.getUserCharactersRef(userId);
    const docRef = doc(charactersRef);

    setDoc(docRef, newCharacterDoc);

    if (this.isOnline()) {
      await updateDoc(docRef, {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      updateDoc(docRef, {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return docRef.id;
  }

  static async updateCharacter(data: {
    userId: string;
    characterId: string;
    newData: Partial<CharacterDocument>;
  }): Promise<void> {
    const { userId, characterId, newData } = data;
    const ref = doc(db, "users", userId, "characters", characterId);
    const newDoc: Partial<CharacterDocument> = {
      ...newData,
      updatedAt: serverTimestamp() as unknown as Timestamp,
      lastModifiedBy: userId,
    };
    await updateDoc(ref, newDoc);
  }

  /**
   * Сохранить персонажа
   */
  static async saveCharacter(
    userId: string,
    characterData: CharacterDocument,
  ): Promise<void> {
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
   * Подписаться на изменения персонажей в реальном времени
   */
  static subscribeToCharacters(
    userId: string,
    callback: (characters: CharacterDocument[]) => void,
  ): Unsubscribe {
    const charactersRef = this.getUserCharactersRef(userId);

    return onSnapshot(
      charactersRef,
      (snapshot) => {
        const characters: CharacterDocument[] = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as CharacterDocument),
          }))
          .filter((character) => !character.deleted);

        callback(characters);
      },
      (error) => {
        console.error("Ошибка подписки на персонажей:", error);
        throw error;
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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
